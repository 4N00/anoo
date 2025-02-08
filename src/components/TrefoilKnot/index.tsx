import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100vh;
  z-index: 1;
  opacity: 0.75;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const TrefoilKnot: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const knot = useRef<THREE.Mesh | null>(null);
  const material = useRef<THREE.MeshNormalMaterial | null>(null);
  const geometry = useRef<THREE.TorusKnotGeometry | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  
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

    // Create a more detailed trefoil knot
    geometry.current = new THREE.TorusKnotGeometry(4.2, 1.2, 300, 40, 2, 3);
    material.current = new THREE.MeshNormalMaterial({
      wireframe: true,
      wireframeLinewidth: 1.5
    });
    knot.current = new THREE.Mesh(geometry.current, material.current);
    
    // Initial rotation
    knot.current.rotation.x = Math.PI / 6;
    knot.current.rotation.z = Math.PI / 8;
    
    scene.add(knot.current);

    // Position camera closer for more impact
    camera.position.z = 10;
    camera.position.y = 2;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    let prevScrollY = 0;
    let vertexAnimationFrame: number;
    let targetRotationY = 0;
    let currentRotationY = 0;

    const animateVertices = () => {
      if (!geometry.current || !knot.current || !isHovered) return;
      
      const positions = geometry.current.attributes.position;
      if (!positions) return;

      const time = Date.now() * 0.001;

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);

        // Create a moderate wave effect
        positions.setX(i, x + Math.sin(time + y * 0.2) * 0.15);
        positions.setY(i, y + Math.cos(time + x * 0.2) * 0.1);
        positions.setZ(i, z + Math.sin(time + x * 0.2) * 0.15);
      }

      positions.needsUpdate = true;
      vertexAnimationFrame = window.requestAnimationFrame(animateVertices);
    };

    const animate = () => {
      if (!knot.current) return;

      // Get current scroll progress (0 to 1)
      const currentScrollY = scrollYProgress.get();
      
      // Calculate rotation based on scroll change with moderate effect
      const rotationDelta = (currentScrollY - prevScrollY) * Math.PI * 1.5;
      targetRotationY += rotationDelta * 0.75;
      
      // Smooth rotation with moderate easing
      currentRotationY += (targetRotationY - currentRotationY) * 0.1;
      knot.current.rotation.y = currentRotationY;
      knot.current.rotation.x += rotationDelta * 0.15;
      knot.current.rotation.z += rotationDelta * 0.1;

      // Add scale effect based on scroll speed
      const scaleFactor = 1 + Math.abs(rotationDelta) * 1.5;
      knot.current.scale.setScalar(Math.max(0.8, Math.min(1.3, scaleFactor)));

      // Add position movement based on scroll
      knot.current.position.y = Math.sin(currentRotationY) * 1.2;
      knot.current.position.x = Math.cos(currentRotationY) * 1.2;
      knot.current.position.z = Math.sin(currentRotationY * 0.5) * 0.6;
      
      prevScrollY = currentScrollY;

      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();

    const handleMouseEnter = () => {
      setIsHovered(true);
      animateVertices();
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      if (vertexAnimationFrame) {
        window.cancelAnimationFrame(vertexAnimationFrame);
      }
      // Reset vertices to original position
      if (geometry.current) {
        geometry.current.dispose();
        geometry.current = new THREE.TorusKnotGeometry(4.2, 1.2, 300, 40, 2, 3);
        if (knot.current) {
          knot.current.geometry = geometry.current;
          knot.current.scale.setScalar(1);
          knot.current.position.set(0, 0, 0);
        }
      }
    };

    const handleResize = () => {
      if (!container) return;
      const { clientWidth: newWidth, clientHeight: newHeight } = container;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (vertexAnimationFrame) {
        window.cancelAnimationFrame(vertexAnimationFrame);
      }
      if (geometry.current) geometry.current.dispose();
      if (material.current) material.current.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [scrollYProgress]);

  return <Container ref={mountRef} />;
};

export default TrefoilKnot; 