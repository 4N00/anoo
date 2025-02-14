import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { useInView } from 'react-intersection-observer';

interface Card3DProps {
  isVisible: boolean;
  position: [number, number, number];
}

const Card3D: React.FC<Card3DProps> = ({ isVisible, position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const { scale, rotation, position: animatedPosition } = useSpring({
    scale: isVisible ? [1, 1, 1] : [0.1, 0.1, 0.1],
    rotation: isVisible ? [0, 0, 0] : [Math.PI / 4, 0, Math.PI / 4],
    position: isVisible ? position : [position[0], position[1] - 10, position[2]],
    config: { mass: 1, tension: 80, friction: 20 }
  });

  useFrame((_, delta) => {
    if (meshRef.current && isVisible) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <animated.mesh
      ref={meshRef}
      position={animatedPosition}
      rotation={rotation}
      scale={scale}
    >
      <planeGeometry args={[4, 2.25, 32, 32]} />
      <meshStandardMaterial
        color="#ffffff"
        roughness={0.4}
        metalness={0.6}
        side={THREE.DoubleSide}
      />
    </animated.mesh>
  );
};

export default Card3D; 