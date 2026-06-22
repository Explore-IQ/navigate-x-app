'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count: number;
  color: string;
  size: number;
}

function Particles({ count, color, size }: ParticlesProps) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.012;
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.08) * 0.12;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.32}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

interface ParticleFieldProps {
  count?: number;
  color?: string;
  size?: number;
}

export function ParticleFieldCanvas({
  count = 450,
  color = '#6CB6E4',
  size = 0.04,
}: ParticleFieldProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 70 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1]}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <Particles count={count} color={color} size={size} />
    </Canvas>
  );
}
