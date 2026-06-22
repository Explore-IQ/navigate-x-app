'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Helpers ──────────────────────────────────────────────────────────────── */
function latLonToXYZ(lat: number, lon: number, r: number): [number, number, number] {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -(r * Math.sin(phi) * Math.cos(theta)),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta),
  ];
}

/* ── India cities ─────────────────────────────────────────────────────────── */
const CITIES = [
  { lat: 28.6, lon: 77.2 },  // Delhi
  { lat: 19.1, lon: 72.9 },  // Mumbai
  { lat: 15.5, lon: 73.8 },  // Goa
  { lat:  9.9, lon: 76.3 },  // Kerala
  { lat: 26.9, lon: 75.8 },  // Jaipur
  { lat: 25.3, lon: 83.0 },  // Varanasi
  { lat: 27.2, lon: 78.0 },  // Agra
  { lat: 13.1, lon: 80.3 },  // Chennai
  { lat: 27.0, lon: 88.3 },  // Darjeeling
];

/* ── Pulsing city dot ─────────────────────────────────────────────────────── */
interface CityDotProps { lat: number; lon: number; phase: number }

function CityDot({ lat, lon, phase }: CityDotProps) {
  const pos = useMemo(() => latLonToXYZ(lat, lon, 2.54), [lat, lon]);
  const pulseRef  = useRef<THREE.Mesh>(null!);
  const pulseMatRef = useRef<THREE.MeshBasicMaterial>(null!);

  useFrame(({ clock }) => {
    const pulse = (Math.sin(clock.elapsedTime * 1.8 + phase) + 1) / 2;
    if (pulseRef.current) {
      pulseRef.current.scale.setScalar(1 + pulse * 3.5);
      pulseMatRef.current.opacity = 0.55 * (1 - pulse * 0.9);
    }
  });

  return (
    <group position={pos}>
      {/* Solid core */}
      <mesh>
        <sphereGeometry args={[0.055, 8, 8]} />
        <meshBasicMaterial color="#EBA86B" />
      </mesh>
      {/* Expanding pulse ring */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.055, 8, 8]} />
        <meshBasicMaterial ref={pulseMatRef} color="#EBA86B" transparent opacity={0.55} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ── Globe (rotating group) ───────────────────────────────────────────────── */
function GlobeGroup() {
  const ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.08;
  });

  return (
    <group ref={ref}>
      {/* Dark inner sphere */}
      <mesh>
        <sphereGeometry args={[2.5, 48, 48]} />
        <meshPhysicalMaterial color="#091520" transparent opacity={0.88} roughness={0.1} metalness={0.3} />
      </mesh>

      {/* Latitude / longitude wireframe */}
      <mesh>
        <sphereGeometry args={[2.52, 28, 14]} />
        <meshBasicMaterial color="#6CB6E4" wireframe transparent opacity={0.22} />
      </mesh>

      {/* City dots */}
      {CITIES.map((c, i) => (
        <CityDot key={i} lat={c.lat} lon={c.lon} phase={i * 0.75} />
      ))}
    </group>
  );
}

/* ── Full globe scene (positioned, scaled) ───────────────────────────────── */
function GlobeScene() {
  const { size } = useThree();
  const isMobile = size.width < 768;
  const pos: [number, number, number] = isMobile ? [1.8, -0.8, 0] : [3.5, 0, 0];
  const scale = isMobile ? 0.52 : 1;

  return (
    <group position={pos} scale={[scale, scale, scale]}>
      {/* Atmospheric glow — BackSide spheres */}
      <mesh>
        <sphereGeometry args={[3.1, 32, 32]} />
        <meshBasicMaterial color="#6CB6E4" transparent opacity={0.06} side={THREE.BackSide} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.85, 32, 32]} />
        <meshBasicMaterial color="#6CB6E4" transparent opacity={0.04} side={THREE.BackSide} depthWrite={false} />
      </mesh>

      <GlobeGroup />

      {/* Equatorial glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.66, 0.1, 8, 80]} />
        <meshBasicMaterial color="#6CB6E4" transparent opacity={0.42} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ── Ambient star particles ───────────────────────────────────────────────── */
function Starfield({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 26;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#6CB6E4" transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ── Canvas export (dynamically imported with ssr:false) ──────────────────── */
export function HeroBackgroundCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <ambientLight color="#203A43" intensity={1.0} />
      <pointLight position={[-4, 4, 4]}  color="#6CB6E4" intensity={5} distance={22} decay={2} />
      <pointLight position={[ 4, -2, 3]} color="#EBA86B" intensity={2} distance={18} decay={2} />

      <GlobeScene />
      <Starfield count={300} />
    </Canvas>
  );
}
