import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100vh;
  z-index: 1;
  opacity: 0.6;
  pointer-events: none;
`;

const TrefoilKnot: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

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
    const geometry = new THREE.TorusKnotGeometry(4, 1, 300, 40, 2, 3);
    const material = new THREE.MeshNormalMaterial({
      wireframe: true,
      wireframeLinewidth: 1
    });
    const trefoilKnot = new THREE.Mesh(geometry, material);
    
    // Tilt the knot slightly
    trefoilKnot.rotation.x = Math.PI / 6;
    trefoilKnot.rotation.z = Math.PI / 12;
    
    scene.add(trefoilKnot);

    // Position camera for better view
    camera.position.z = 12;
    camera.position.y = 2;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Smoother animation
    const animate = () => {
      window.requestAnimationFrame(animate);
      trefoilKnot.rotation.x += 0.003;
      trefoilKnot.rotation.y += 0.002;
      trefoilKnot.rotation.z += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const { clientWidth: newWidth, clientHeight: newHeight } = container;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <Container ref={mountRef} />;
};

export default TrefoilKnot; 