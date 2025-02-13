'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
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
    
    // Animation speeds
    float t1 = time * 0.08;
    float t2 = time * 0.06;
    float t3 = time * 0.04;
    
    // Movement ranges
    float moveRange1 = 0.25;  // Primary movement range
    float moveRange2 = 0.2;   // Secondary range
    
    // Shape sizes
    float size1 = 0.1;  // Primary size
    float size2 = 0.05;   // Secondary size
    
    // Blend amount between shapes in same clump
    float blendAmount = 0.58;  // Increased for more merging in center
    
    // Top clump (y: 0.6)
    vec2 c1_1 = vec2(sin(t1) * moveRange1 - 0.2, cos(t1) * moveRange1 + 0.6);
    vec2 c1_2 = vec2(sin(t2 + 1.0) * moveRange2, cos(t2 + 1.0) * moveRange2 + 0.6);
    vec2 c1_3 = vec2(sin(t3 + 2.0) * moveRange1 + 0.2, cos(t3 + 2.0) * moveRange1 + 0.55);
    vec2 c1_4 = vec2(sin(t1 + 3.0) * moveRange2 - 0.1, cos(t1 + 3.0) * moveRange2 + 0.65);
    vec2 c1_5 = vec2(sin(t2 + 4.0) * moveRange1 + 0.1, cos(t2 + 4.0) * moveRange1 + 0.5);
    vec2 c1_6 = vec2(sin(t3 + 5.0) * moveRange2 + 0.3, cos(t3 + 5.0) * moveRange2 + 0.6);
    
    // Middle clump (y: 0.0)
    vec2 c2_1 = vec2(sin(t3) * moveRange1 - 0.1, cos(t3) * moveRange1);
    vec2 c2_2 = vec2(sin(t1 + 2.0) * moveRange2 + 0.2, cos(t1 + 2.0) * moveRange2);
    vec2 c2_3 = vec2(sin(t2 + 3.0) * moveRange1, cos(t2 + 3.0) * moveRange1 - 0.05);
    vec2 c2_4 = vec2(sin(t3 + 4.0) * moveRange2 - 0.2, cos(t3 + 4.0) * moveRange2 + 0.05);
    vec2 c2_5 = vec2(sin(t1 + 5.0) * moveRange1 + 0.1, cos(t1 + 5.0) * moveRange1 - 0.1);
    vec2 c2_6 = vec2(sin(t2 + 6.0) * moveRange2 + 0.3, cos(t2 + 6.0) * moveRange2);
    
    // Bottom clump (y: -0.6)
    vec2 c3_1 = vec2(sin(t2) * moveRange1 + 0.2, cos(t2) * moveRange1 - 0.6);
    vec2 c3_2 = vec2(sin(t3 + 3.0) * moveRange2, cos(t3 + 3.0) * moveRange2 - 0.6);
    vec2 c3_3 = vec2(sin(t1 + 4.0) * moveRange1 - 0.2, cos(t1 + 4.0) * moveRange1 - 0.55);
    vec2 c3_4 = vec2(sin(t2 + 5.0) * moveRange2 + 0.1, cos(t2 + 5.0) * moveRange2 - 0.65);
    vec2 c3_5 = vec2(sin(t3 + 6.0) * moveRange1 - 0.1, cos(t3 + 6.0) * moveRange1 - 0.5);
    vec2 c3_6 = vec2(sin(t1 + 7.0) * moveRange2 - 0.3, cos(t1 + 7.0) * moveRange2 - 0.6);
    
    // Calculate distances for each clump
    float d1_1 = sdSphere(uv, c1_1, size1);
    float d1_2 = sdSphere(uv, c1_2, size2);
    float d1_3 = sdSphere(uv, c1_3, size1);
    float d1_4 = sdSphere(uv, c1_4, size2);
    float d1_5 = sdSphere(uv, c1_5, size1);
    float d1_6 = sdSphere(uv, c1_6, size2);
    
    float d2_1 = sdSphere(uv, c2_1, size1);
    float d2_2 = sdSphere(uv, c2_2, size2);
    float d2_3 = sdSphere(uv, c2_3, size1);
    float d2_4 = sdSphere(uv, c2_4, size2);
    float d2_5 = sdSphere(uv, c2_5, size1);
    float d2_6 = sdSphere(uv, c2_6, size2);
    
    float d3_1 = sdSphere(uv, c3_1, size1);
    float d3_2 = sdSphere(uv, c3_2, size2);
    float d3_3 = sdSphere(uv, c3_3, size1);
    float d3_4 = sdSphere(uv, c3_4, size2);
    float d3_5 = sdSphere(uv, c3_5, size1);
    float d3_6 = sdSphere(uv, c3_6, size2);
    
    // Blend shapes within each clump
    float clump1 = smin(smin(smin(smin(smin(d1_1, d1_2, blendAmount), d1_3, blendAmount), d1_4, blendAmount), d1_5, blendAmount), d1_6, blendAmount);
    float clump2 = smin(smin(smin(smin(smin(d2_1, d2_2, blendAmount), d2_3, blendAmount), d2_4, blendAmount), d2_5, blendAmount), d2_6, blendAmount);
    float clump3 = smin(smin(smin(smin(smin(d3_1, d3_2, blendAmount), d3_3, blendAmount), d3_4, blendAmount), d3_5, blendAmount), d3_6, blendAmount);
    
    // Combine all clumps with minimal interaction
    float d = min(min(clump1, clump2), clump3);
    
    // Create gradient colors with more variation
    vec3 color1 = vec3(1.0, 0.4, 0.7); // Pink
    vec3 color2 = vec3(1.0, 0.6, 0.2); // Orange
    vec3 color3 = vec3(1.0, 0.3, 0.5); // Another pink shade
    vec3 color4 = vec3(1.0, 0.5, 0.3); // Coral
    
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

const LavaLamp = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.Camera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const uniformsRef = useRef<any>();
  const pathname = usePathname();

  useEffect(() => {
    // Show on home page (root path)
    if (pathname !== '/') return;
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

    const container = mountRef.current.parentElement;
    const containerHeight = container?.offsetHeight || window.innerHeight;
    renderer.setSize(window.innerWidth, containerHeight);
    mountRef.current.appendChild(renderer.domElement);

    uniformsRef.current = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, containerHeight) }
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
      
      const newContainerHeight = container?.offsetHeight || window.innerHeight;
      uniformsRef.current.resolution.value.x = window.innerWidth;
      uniformsRef.current.resolution.value.y = newContainerHeight;
      renderer.setSize(window.innerWidth, newContainerHeight);
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

  if (pathname !== '/') return null;

  return (
    <EffectContainer>
      <Container ref={mountRef} />
    </EffectContainer>
  );
};

export default LavaLamp; 