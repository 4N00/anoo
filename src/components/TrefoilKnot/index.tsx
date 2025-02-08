import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  opacity: 0.3;
  transition: opacity 0.3s ease;
  pointer-events: none;
  overflow: hidden;
  background: transparent;

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
  const material = useRef<THREE.MeshPhongMaterial | null>(null);
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
    geometry.current = new THREE.TorusKnotGeometry(8, 2.2, 400, 50, 2, 3);
    material.current = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: true,
      wireframeLinewidth: 1,
      specular: 0xcccccc,
      shininess: 30,
      transparent: true,
      opacity: 0.8
    });
    knot.current = new THREE.Mesh(geometry.current, material.current);
    
    // Initial rotation for better viewing angle
    knot.current.rotation.x = Math.PI / 4;
    knot.current.rotation.z = Math.PI / 6;
    
    scene.add(knot.current);

    // Position camera for full view
    camera.position.z = 18;
    camera.position.y = 0;

    // Add directional light for better grayscale definition
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    let prevScrollY = 0;
    let targetRotationY = 0;
    let currentRotationY = 0;
    let lastTime = Date.now();

    const animate = () => {
      if (!knot.current) return;

      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
      lastTime = currentTime;

      // Get current scroll progress (0 to 1)
      const currentScrollY = scrollYProgress.get();
      
      // Calculate rotation based on scroll change with smooth effect
      const rotationDelta = (currentScrollY - prevScrollY) * Math.PI;
      targetRotationY += rotationDelta * 0.3; // Reduced multiplier for smoother rotation
      
      // Very smooth rotation with time-based interpolation
      const rotationSpeed = 1.5 * deltaTime; // Consistent speed regardless of frame rate
      currentRotationY += (targetRotationY - currentRotationY) * rotationSpeed;
      
      // Apply rotations with smoothing
      knot.current.rotation.y = currentRotationY;
      knot.current.rotation.x += rotationDelta * 0.05;
      knot.current.rotation.z += rotationDelta * 0.03;

      // Smoother scale effect
      const scaleFactor = 1 + Math.abs(rotationDelta) * 0.5;
      const targetScale = Math.max(0.95, Math.min(1.05, scaleFactor));
      const currentScale = knot.current.scale.x;
      knot.current.scale.setScalar(currentScale + (targetScale - currentScale) * rotationSpeed);

      // Gentler floating movement
      knot.current.position.y = Math.sin(currentRotationY * 0.3) * 0.8;
      knot.current.position.x = Math.cos(currentRotationY * 0.3) * 0.8;
      
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