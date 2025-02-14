'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { usePathname } from 'next/navigation';
import { Container, AboutEffectContainer } from './styles';

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
    
    // Create multiple organic moving shapes
    float t1 = time * 0.08;
    float t2 = time * 0.06;
    float t3 = time * 0.04;
    
    // Top cluster
    vec2 c1 = vec2(
      sin(t1) * 0.4 - 0.2,
      cos(t1) * 0.3 + 0.6
    );
    
    vec2 c2 = vec2(
      sin(t2 + 2.0) * 0.35 + 0.2,
      cos(t2 + 1.0) * 0.35 + 0.7
    );

    // New top-left sphere
    vec2 c12 = vec2(
      sin(t3 + 1.5) * 0.3 - 0.5,
      cos(t3 + 2.0) * 0.25 + 0.65
    );

    // Middle cluster
    vec2 c3 = vec2(
      sin(t3 + 4.0) * 0.35 - 0.3,
      cos(t3 + 3.0) * 0.35
    );

    vec2 c4 = vec2(
      sin(t1 + 3.0) * 0.32 + 0.3,
      cos(t1 + 2.0) * 0.32 - 0.1
    );

    // Bottom cluster
    vec2 c5 = vec2(
      sin(t2) * 0.4 - 0.1,
      cos(t2) * 0.3 - 0.7
    );
    
    vec2 c6 = vec2(
      sin(t3 + 2.0) * 0.35 + 0.2,
      cos(t3 + 1.0) * 0.35 - 0.6
    );

    // Additional middle shapes
    vec2 c7 = vec2(
      sin(t1 + 5.0) * 0.3 - 0.4,
      cos(t1 + 4.0) * 0.3 + 0.2
    );

    vec2 c8 = vec2(
      sin(t2 + 6.0) * 0.35 + 0.4,
      cos(t2 + 3.0) * 0.35 - 0.3
    );

    // New lower cluster
    vec2 c9 = vec2(
      sin(t1 + 7.0) * 0.4 - 0.2,
      cos(t1 + 5.0) * 0.3 - 1.4
    );
    
    vec2 c10 = vec2(
      sin(t2 + 8.0) * 0.35 + 0.3,
      cos(t2 + 6.0) * 0.35 - 1.3
    );

    vec2 c11 = vec2(
      sin(t3 + 9.0) * 0.38 - 0.1,
      cos(t3 + 7.0) * 0.32 - 1.5
    );
    
    // Create smooth blending between shapes
    float d1 = sdSphere(uv, c1, 0.35);
    float d2 = sdSphere(uv, c2, 0.3);
    float d3 = sdSphere(uv, c3, 0.33);
    float d4 = sdSphere(uv, c4, 0.32);
    float d5 = sdSphere(uv, c5, 0.35);
    float d6 = sdSphere(uv, c6, 0.3);
    float d7 = sdSphere(uv, c7, 0.32);
    float d8 = sdSphere(uv, c8, 0.31);
    float d9 = sdSphere(uv, c9, 0.34);
    float d10 = sdSphere(uv, c10, 0.31);
    float d11 = sdSphere(uv, c11, 0.33);
    float d12 = sdSphere(uv, c12, 0.25);
    
    // Blend shapes within clusters
    float topCluster = smin(smin(d1, d2, 0.5), d12, 0.5);
    float middleCluster = smin(smin(d3, d4, 0.5), smin(d7, d8, 0.5), 0.5);
    float bottomCluster = smin(d5, d6, 0.5);
    float lowerCluster = smin(smin(d9, d10, 0.5), d11, 0.5);
    
    // Blend clusters with less interaction between them
    float d = min(min(min(topCluster, middleCluster), bottomCluster), lowerCluster);
    
    // Create gradient colors with more variation
    vec3 color1 = vec3(1.0, 0.1, .2); 
    vec3 color2 = vec3(9.0, 0.2, 0.1); 
    vec3 color3 = vec3(1.0, 0.6, 0.1); 
    vec3 color4 = vec3(0.29, 0.4, 1.1); 
    
    // Mix colors based on position and time
    vec3 color = mix(
      mix(
        mix(color1, color2, sin(uv.x + time * 0.05) * 0.5 + 0.5),
        color3,
        sin(uv.y + time * 0.07) * 0.5 + 0.5
      ),
      color4,
      sin(length(uv) + time * 0.06) * 0.5 + 0.5
    );
    
    float shape = smoothstep(0.0, 0.25, -d);
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

const AboutLavaLamp = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.Camera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const uniformsRef = useRef<any>();
  const pathname = usePathname();

  useEffect(() => {
    // Show on home page (root path)
    if (pathname !== '/about') return;
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

    renderer.setSize(window.innerWidth, window.innerHeight * 1.3);
    mountRef.current.appendChild(renderer.domElement);

    uniformsRef.current = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight * 1.3) }
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
      uniformsRef.current.resolution.value.y = window.innerHeight * 1.3;
      renderer.setSize(window.innerWidth, window.innerHeight * 1.3);
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

  if (pathname !== '/about') return null;

  return (
    <AboutEffectContainer>  
      <Container ref={mountRef} />
    </AboutEffectContainer>
  );
};

export default AboutLavaLamp; 