'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { usePathname } from 'next/navigation';
import { ContactEffectContainer, Container } from './styles';

const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  uniform vec2 mouse;  // Add mouse position uniform

  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }

  float sdSphere(vec2 p, vec2 center, float radius) {
    return length(p - center) - radius;
  }

  // Function to calculate repulsion from mouse
  vec2 getRepulsion(vec2 pos, vec2 mouse, float strength) {
    vec2 diff = pos - mouse;
    float dist = length(diff);
    float repulsion = strength / (dist * dist + 0.001);
    return normalize(diff) * repulsion;
  }
  
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv = uv * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    
    // Convert mouse position to UV space
    vec2 mouseUV = mouse.xy / resolution.xy;
    mouseUV = mouseUV * 2.0 - 1.0;
    mouseUV.x *= resolution.x / resolution.y;

    // Animation speed for each time variable
    float t1 = time * 0.08;  // Main time variable
    float t2 = time * 0.06;  // Secondary time
    float t3 = time * 0.04;  // Tertiary time
    
    // Movement range multipliers
    float moveRange1 = 0.35;  // Primary movement range
    float moveRange2 = 0.3;   // Secondary range
    float moveRange3 = 0.25;  // Tertiary range

    // Repulsion strength
    float repStrength = 0.03;  // Reduced from 0.15 to 0.0375 (25% of original)
    
    // Calculate base positions with mouse repulsion
    vec2 c1_base = vec2(sin(t1) * moveRange1 - 0.2, cos(t1) * moveRange1 + 0.4);
    vec2 c1 = c1_base + getRepulsion(c1_base, mouseUV, repStrength);
    
    vec2 c2_base = vec2(sin(t2 + 2.0) * moveRange2 + 0.2, cos(t2 + 1.0) * moveRange2 + 0.5);
    vec2 c2 = c2_base + getRepulsion(c2_base, mouseUV, repStrength);

    vec2 c3_base = vec2(sin(t3 + 4.0) * moveRange2 - 0.3, cos(t3 + 3.0) * moveRange2);
    vec2 c3 = c3_base + getRepulsion(c3_base, mouseUV, repStrength);

    vec2 c4_base = vec2(sin(t1 + 3.0) * moveRange3 + 0.3, cos(t1 + 2.0) * moveRange3 - 0.1);
    vec2 c4 = c4_base + getRepulsion(c4_base, mouseUV, repStrength);

    vec2 c5_base = vec2(sin(t2) * moveRange1 - 0.1, cos(t2) * moveRange1 - 0.5);
    vec2 c5 = c5_base + getRepulsion(c5_base, mouseUV, repStrength);
    
    vec2 c6_base = vec2(sin(t3 + 2.0) * moveRange2 + 0.2, cos(t3 + 1.0) * moveRange2 - 0.4);
    vec2 c6 = c6_base + getRepulsion(c6_base, mouseUV, repStrength);

    vec2 c7_base = vec2(sin(t1 + 5.0) * moveRange3 - 0.4, cos(t1 + 4.0) * moveRange3 + 0.2);
    vec2 c7 = c7_base + getRepulsion(c7_base, mouseUV, repStrength);

    vec2 c8_base = vec2(sin(t2 + 6.0) * moveRange2 + 0.4, cos(t2 + 3.0) * moveRange2 - 0.3);
    vec2 c8 = c8_base + getRepulsion(c8_base, mouseUV, repStrength);
    
    // Shape sizes
    float size1 = 0.28;  // Primary size
    float size2 = 0.25;  // Secondary size
    float size3 = 0.23;  // Tertiary size
    
    // Create smooth blending between shapes
    float d1 = sdSphere(uv, c1, size1);
    float d2 = sdSphere(uv, c2, size2);
    float d3 = sdSphere(uv, c3, size2);
    float d4 = sdSphere(uv, c4, size3);
    float d5 = sdSphere(uv, c5, size1);
    float d6 = sdSphere(uv, c6, size2);
    float d7 = sdSphere(uv, c7, size3);
    float d8 = sdSphere(uv, c8, size2);
    
    // Blend amount between shapes
    float blendAmount = 0.4;  // Blend radius
    
    // Blend shapes within clusters
    float topCluster = smin(d1, d2, blendAmount);
    float middleCluster = smin(smin(d3, d4, blendAmount), smin(d7, d8, blendAmount), blendAmount);
    float bottomCluster = smin(d5, d6, blendAmount);
    
    // Blend clusters with less interaction between them
    float d = min(min(topCluster, middleCluster), bottomCluster);
    
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

const ContactLavaLamp = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.Camera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const uniformsRef = useRef<any>();
  const pathname = usePathname();

  useEffect(() => {
    // Show on contact page
    if (pathname !== '/contact') return;
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
      resolution: { value: new THREE.Vector2(window.innerWidth, containerHeight) },
      mouse: { value: new THREE.Vector2(0.5, 0.5) }  // Add mouse uniform
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

    const handleMouseMove = (event: MouseEvent) => {
      if (!uniformsRef.current) return;
      uniformsRef.current.mouse.value.x = event.clientX;
      uniformsRef.current.mouse.value.y = window.innerHeight - event.clientY;
    };

    const handleResize = () => {
      if (!uniformsRef.current || !renderer) return;
      
      const newContainerHeight = container?.offsetHeight || window.innerHeight;
      uniformsRef.current.resolution.value.x = window.innerWidth;
      uniformsRef.current.resolution.value.y = newContainerHeight;
      renderer.setSize(window.innerWidth, newContainerHeight);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [pathname]);

  if (pathname !== '/contact') return null;

  return (
    <ContactEffectContainer>
      <Container ref={mountRef} />
    </ContactEffectContainer>
  );
};

export default ContactLavaLamp; 