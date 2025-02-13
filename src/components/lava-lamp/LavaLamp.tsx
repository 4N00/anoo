'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Container, EffectContainer } from './styles';

const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;

  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }

  float sdSphere(vec2 p, vec2 center, float radius) {
    return length(p - center) - radius;
  }
  
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv = uv * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    
    // Create organic moving shapes
    float t1 = time * 0.1;
    float t2 = time * 0.08;
    float t3 = time * 0.06;
    float t4 = time * 0.07;
    
    vec2 c1 = vec2(
      sin(t1) * 0.6 + cos(t2) * 0.4,
      cos(t1) * 0.6 + sin(t3) * 0.4
    );
    
    vec2 c2 = vec2(
      sin(t2 + 2.0) * 0.7 + cos(t3) * 0.4,
      cos(t2 + 1.0) * 0.7 + sin(t1) * 0.4
    );
    
    vec2 c3 = vec2(
      sin(t3 + 4.0) * 0.65 + cos(t1) * 0.4,
      cos(t3 + 3.0) * 0.65 + sin(t2) * 0.4
    );

    vec2 c4 = vec2(
      sin(t4 + 3.0) * 0.68 + cos(t2) * 0.4,
      cos(t4 + 2.0) * 0.68 + sin(t3) * 0.4
    );
    
    // Create smooth blending between shapes
    float d1 = sdSphere(uv, c1, 0.45);
    float d2 = sdSphere(uv, c2, 0.4);
    float d3 = sdSphere(uv, c3, 0.43);
    float d4 = sdSphere(uv, c4, 0.42);
    
    float d = smin(smin(smin(d1, d2, 0.5), d3, 0.5), d4, 0.5);
    
    // Create gradient colors
    vec3 color1 = vec3(1.0, 0.4, 0.7); // Pink
    vec3 color2 = vec3(1.0, 0.6, 0.2); // Orange
    vec3 color3 = vec3(1.0, 0.3, 0.5); // Another pink shade
    vec3 color4 = vec3(1.0, 0.5, 0.3); // Coral
    
    // Mix colors based on position and time
    vec3 color = mix(
      mix(
        mix(color1, color2, sin(uv.x + time * 0.07) * 0.5 + 0.5),
        color3,
        sin(uv.y + time * 0.1) * 0.5 + 0.5
      ),
      color4,
      sin(length(uv) + time * 0.08) * 0.5 + 0.5
    );
    
    // Create smooth falloff
    float shape = smoothstep(0.0, 0.2, -d);
    
    gl_FragColor = vec4(color, shape * 0.8);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const LavaLamp = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.Camera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const uniformsRef = useRef<any>();
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname?.includes('/about')) return;
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      premultipliedAlpha: false,
    });
    
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    uniformsRef.current = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    };

    const material = new THREE.ShaderMaterial({
      uniforms: uniformsRef.current,
      fragmentShader,
      vertexShader,
      transparent: true,
      blending: THREE.NormalBlending,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const animate = () => {
      if (!uniformsRef.current) return;
      
      uniformsRef.current.time.value += 0.01;
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!uniformsRef.current || !renderer) return;
      
      uniformsRef.current.resolution.value.x = window.innerWidth;
      uniformsRef.current.resolution.value.y = window.innerHeight;
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [pathname]);

  useEffect(() => {
    if (!pathname?.includes('/about')) return;
    if (!uniformsRef.current) return;

    const unsubscribe = scrollY.onChange((latest) => {
      uniformsRef.current.time.value += latest * 0.0001;
    });

    return () => unsubscribe();
  }, [scrollY, pathname]);

  if (!pathname?.includes('/about')) return null;

  return (
    <EffectContainer>
      <Container ref={mountRef} />
    </EffectContainer>
  );
};

export default LavaLamp; 