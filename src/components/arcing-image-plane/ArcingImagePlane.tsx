import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ArcingImagePlaneProps {
  imageUrl: string;
}

const ArcingImagePlane: React.FC<ArcingImagePlaneProps> = ({ imageUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create new renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
      premultipliedAlpha: false
    });
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Load image
    const textureLoader = new THREE.TextureLoader();
    let animationFrameId: number;

    textureLoader.load(imageUrl, (texture) => {
      texture.premultiplyAlpha = false;
      const geometry = new THREE.PlaneGeometry(16, 9, 64, 64);
      const material = new THREE.MeshBasicMaterial({ 
        map: texture, 
        side: THREE.DoubleSide,
        transparent: true,
        alphaTest: 0.5
      });
      const plane = new THREE.Mesh(geometry, material);
      scene.add(plane);

      let scrollPosition = 0;

      const handleScroll = () => {
        scrollPosition = window.scrollY;
      };

      const handleResize = () => {
        if (renderer && container) {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        }
      };

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);

      const animate = () => {
        const normalizedScroll = scrollPosition / 500;

        if (geometry.attributes.position) {
          for (let i = 0; i < geometry.attributes.position.count; i++) {
            const x = geometry.attributes.position.getX(i);
            const y = geometry.attributes.position.getY(i);
            const distance = Math.sqrt(x * x + y * y);
            
            geometry.attributes.position.setZ(i, Math.sin(distance + normalizedScroll) * 2);
          }
          geometry.attributes.position.needsUpdate = true;
        }

        plane.rotation.x = normalizedScroll;

        renderer.render(scene, camera);
        animationFrameId = window.requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        window.cancelAnimationFrame(animationFrameId);
        geometry.dispose();
        material.dispose();
        texture.dispose();
      };
    });

    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      if (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [imageUrl]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none'
      }} 
    />
  );
};

export default ArcingImagePlane;