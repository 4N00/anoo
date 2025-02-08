import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 30vw;
  width: 100vw;
  height: 100vh;
  z-index: -999;
  opacity: 0.3;
  transition: opacity 0.3s ease;
  pointer-events: none;
  overflow: hidden;
  background: transparent;

  @media (max-width: 768px) {
    display: none;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
`;

const TrefoilKnot: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const knot = useRef<THREE.Mesh | null>(null);
  const material = useRef<THREE.ShaderMaterial | null>(null);
  const geometry = useRef<THREE.TorusKnotGeometry | null>(null);
  
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const { clientWidth: width, clientHeight: height } = container;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    // Create a larger background trefoil knot
    geometry.current = new THREE.TorusKnotGeometry(12, 3, 400, 50, 2, 3);
    
    // Create a custom vertex shader for grayscale gradient
    const customVertexShader = `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    // Create a custom fragment shader for white to grey gradient
    const customFragmentShader = `
      varying vec3 vNormal;
      void main() {
        vec3 light = vec3(1.0, 1.0, 1.0);
        float intensity = pow(0.8 - dot(vNormal, light), 2.0);
        vec3 lightGrey = vec3(0.8, 0.8, 0.8);
        vec3 darkGrey = vec3(0.05, 0.05, 0.05);
        vec3 color = mix(lightGrey, darkGrey, intensity);
        gl_FragColor = vec4(color, 0.9);
      }
    `;

    material.current = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: customVertexShader,
      fragmentShader: customFragmentShader,
      wireframe: true,
      transparent: true
    });

    knot.current = new THREE.Mesh(geometry.current, material.current);
    
    // Initial rotation for better viewing angle
    knot.current.rotation.x = Math.PI / 4;
    knot.current.rotation.z = Math.PI / 6;
    
    scene.add(knot.current);

    // Position camera for full view of larger knot
    camera.position.z = 28;  // Moved camera further back
    camera.position.y = 3;   // Slightly higher angle

    // No need for lights with shader material
    
    let prevScrollY = 0;
    let targetRotationY = 0;
    let currentRotationY = 0;
    let lastTime = Date.now();

    const animate = () => {
      if (!knot.current) return;

      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const currentScrollY = scrollYProgress.get();
      
      // Reversed direction (positive instead of negative) and slowed down more
      const parallaxY = currentScrollY * window.innerHeight * 0.01;
      
      const rotationDelta = (currentScrollY - prevScrollY) * Math.PI;
      targetRotationY += rotationDelta * 0.02; // Even slower rotation
      
      const rotationSpeed = 0.5 * deltaTime; // Even slower interpolation
      currentRotationY += (targetRotationY - currentRotationY) * rotationSpeed;
      
      knot.current.rotation.y = currentRotationY;
      knot.current.rotation.x += rotationDelta * 0.002; // Much slower X rotation
      knot.current.rotation.z += rotationDelta * 0.001; // Much slower Z rotation

      // Even subtler scale effect
      const scaleFactor = 1 + Math.abs(rotationDelta) * 0.1;
      const targetScale = Math.max(0.99, Math.min(1.01, scaleFactor));
      const currentScale = knot.current.scale.x;
      knot.current.scale.setScalar(currentScale + (targetScale - currentScale) * rotationSpeed);

      // Even slower floating movement
      knot.current.position.y = Math.sin(currentRotationY * 0.05) * 0.3 + parallaxY;
      knot.current.position.x = Math.cos(currentRotationY * 0.05) * 0.3;
      
      prevScrollY = currentScrollY;

      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const { clientWidth: newWidth, clientHeight: newHeight } = container;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (geometry.current) geometry.current.dispose();
      if (material.current) material.current.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [scrollYProgress]);

  return <Container ref={mountRef} />;
};

export default TrefoilKnot; 