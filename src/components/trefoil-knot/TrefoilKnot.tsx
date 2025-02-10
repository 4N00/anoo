import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';
import { Container } from './styles';

const TrefoilKnot: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const knot = useRef<THREE.Mesh | null>(null);
  const material = useRef<THREE.ShaderMaterial | null>(null);
  const geometry = useRef<THREE.TorusKnotGeometry | null>(null);
  const initialScale = useRef(6);
  const targetScale = useRef(1);
  const isAnimationComplete = useRef(false);
  
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
    
    knot.current.rotation.x = Math.PI / 8;
    knot.current.rotation.z = Math.PI / 3;
    knot.current.scale.setScalar(initialScale.current);
    knot.current.position.x = 15; 
    
    scene.add(knot.current);

    camera.position.z = 28;
    camera.position.y = 3;

    let prevScrollY = 0;
    let targetRotationY = 0;
    let currentRotationY = 0;
    let lastTime = Date.now();
    let initialAnimationStartTime = Date.now();

    const animate = () => {
      if (!knot.current) return;

      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const initialAnimationProgress = Math.min((currentTime - initialAnimationStartTime) / 3500, 1);
      const easeOutProgress = 1 - Math.pow(1 - initialAnimationProgress, 4); 
      
      const currentScrollY = scrollYProgress.get();
      const parallaxY = currentScrollY * window.innerHeight * 0.01;
      const rotationDelta = (currentScrollY - prevScrollY) * Math.PI;
      targetRotationY += rotationDelta * 0.2;
      const rotationSpeed = 1.2 * deltaTime;
      currentRotationY += (targetRotationY - currentRotationY) * rotationSpeed;

      if (!isAnimationComplete.current && initialAnimationProgress < 1) {
        const currentScale = initialScale.current + (targetScale.current - initialScale.current) * easeOutProgress;
        knot.current.scale.setScalar(currentScale);
        
        const initialRotation = deltaTime * 1.5; 
        const blendedRotation = (initialRotation * (1 - easeOutProgress)) + (currentRotationY * easeOutProgress);
        knot.current.rotation.y = blendedRotation;
        
        if (initialAnimationProgress >= 0.99) {
          isAnimationComplete.current = true;
        }
      } else {
        knot.current.rotation.y = currentRotationY;
        knot.current.rotation.x += rotationDelta * 0.01;
        knot.current.rotation.z += rotationDelta * 0.005;

        const scaleFactor = 1 + Math.abs(rotationDelta) * 0.02;
        const scrollTargetScale = Math.max(0.995, Math.min(1.005, scaleFactor));
        const currentScale = knot.current.scale.x;
        knot.current.scale.setScalar(currentScale + (scrollTargetScale - currentScale) * rotationSpeed);

        const targetY = Math.sin(currentRotationY * 0.02) * 0.2 + parallaxY;
        const targetX = Math.cos(currentRotationY * 0.02) * 0.2 + 15;
        knot.current.position.y += (targetY - knot.current.position.y) * rotationSpeed;
        knot.current.position.x += (targetX - knot.current.position.x) * rotationSpeed;
      }
      
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