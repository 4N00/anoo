import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';

interface ProjectImageEffectProps {
  imageUrl: string;
}

const EffectContainer = styled.div.attrs({ className: 'effect-container' })`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 1;
  overflow: hidden;

  canvas {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    opacity: 1;
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Calculate distance from mouse position
    float dist = distance(uv, uMouse);
    
    // Create distortion effect based on mouse distance and hover state
    float wave = sin(dist * 10.0 - uTime) * 0.05 * uHover;
    
    // Apply distortion to UV coordinates only when hovering
    vec2 distortedUV = uv + vec2(wave * (uMouse.x - uv.x), wave * (uMouse.y - uv.y));
    
    // Sample texture with distorted coordinates
    vec4 color = texture2D(uTexture, distortedUV);
    
    gl_FragColor = color;
  }
`;

const ProjectImageEffect: React.FC<ProjectImageEffectProps> = ({ imageUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup - use simple orthographic camera
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageUrl, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      textureRef.current = texture;

      // Create material
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: texture },
          uTime: { value: 0 },
          uMouse: { value: mouseRef.current },
          uHover: { value: 0 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
      });
      materialRef.current = material;

      // Create mesh with scaled geometry based on texture aspect ratio
      const imageAspect = texture.image.width / texture.image.height;
      const geometry = new THREE.PlaneGeometry(imageAspect * 2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Initial render
      handleResize();
      renderer.render(scene, camera);
    });

    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      if (materialRef.current) {
        materialRef.current.dispose();
      }
      if (textureRef.current) {
        textureRef.current.dispose();
      }
    };
  }, [imageUrl]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (!materialRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

      if (materialRef.current.uniforms.uTime) {
        materialRef.current.uniforms.uTime.value += 0.01;
      }

      if (materialRef.current.uniforms.uHover) {
        materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
          materialRef.current.uniforms.uHover.value || 0,
          isHovered ? 1 : 0,
          0.1
        );
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isHovered]);

  const handleResize = () => {
    if (!containerRef.current || !rendererRef.current || !cameraRef.current || !textureRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();
    rendererRef.current.setSize(width, height);

    const imageAspect = textureRef.current.image.width / textureRef.current.image.height;
    const containerAspect = width / height;

    // Scale the camera viewport to fit the container while maintaining aspect ratio
    const camera = cameraRef.current;
    const scale = containerAspect < imageAspect ? 1 : imageAspect / containerAspect;
    
    camera.left = -1;
    camera.right = 1;
    camera.top = scale;
    camera.bottom = -scale;
    camera.updateProjectionMatrix();

    if (sceneRef.current) {
      rendererRef.current.render(sceneRef.current, camera);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !materialRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = 1 - (event.clientY - rect.top) / rect.height;

    mouseRef.current.set(x, y);
    if (materialRef.current.uniforms.uMouse) {
      materialRef.current.uniforms.uMouse.value = mouseRef.current;
    }
  };

  return (
    <EffectContainer
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

export default ProjectImageEffect; 