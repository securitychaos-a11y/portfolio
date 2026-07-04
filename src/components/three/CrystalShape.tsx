"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function CrystalShape() {
    const meshRef = useRef<THREE.Mesh>(null);
    const wireRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const { pointer } = useThree();

    // Create icosahedron geometry
    const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.8, 1), []);

    // Custom shader material for the inner crystal
    const crystalMaterial = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: new THREE.Color("#6d28d9"),
                metalness: 0.9,
                roughness: 0.1,
                transparent: true,
                opacity: 0.3,
                side: THREE.DoubleSide,
            }),
        []
    );

    // Wireframe material
    const wireMaterial = useMemo(
        () =>
            new THREE.MeshBasicMaterial({
                color: new THREE.Color("#00d4ff"),
                wireframe: true,
                transparent: true,
                opacity: 0.4,
            }),
        []
    );

    // Outer glow
    const glowMaterial = useMemo(
        () =>
            new THREE.MeshBasicMaterial({
                color: new THREE.Color("#a855f7"),
                transparent: true,
                opacity: 0.05,
                side: THREE.BackSide,
            }),
        []
    );

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (meshRef.current) {
            // Auto rotation
            meshRef.current.rotation.x = t * 0.15 + pointer.y * 0.5;
            meshRef.current.rotation.y = t * 0.2 + pointer.x * 0.5;

            // Floating motion
            meshRef.current.position.y = Math.sin(t * 0.8) * 0.2;

            // Scale pulse
            const scale = 1 + Math.sin(t * 1.2) * 0.03;
            meshRef.current.scale.setScalar(scale);
        }

        if (wireRef.current) {
            wireRef.current.rotation.x = t * 0.15 + pointer.y * 0.5;
            wireRef.current.rotation.y = t * 0.2 + pointer.x * 0.5;
            wireRef.current.position.y = Math.sin(t * 0.8) * 0.2;

            const scale = 1.02 + Math.sin(t * 1.2) * 0.03;
            wireRef.current.scale.setScalar(scale);
        }

        if (glowRef.current) {
            glowRef.current.rotation.x = t * 0.1 + pointer.y * 0.3;
            glowRef.current.rotation.y = t * 0.15 + pointer.x * 0.3;
            glowRef.current.position.y = Math.sin(t * 0.8) * 0.2;

            const scale = 1.5 + Math.sin(t * 0.8) * 0.1;
            glowRef.current.scale.setScalar(scale);
        }
    });

    return (
        <group>
            {/* Core crystal */}
            <mesh ref={meshRef} geometry={geometry} material={crystalMaterial} />

            {/* Wireframe overlay */}
            <mesh ref={wireRef} geometry={geometry} material={wireMaterial} />

            {/* Outer glow sphere */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[2.5, 32, 32]} />
                <primitive object={glowMaterial} attach="material" />
            </mesh>

            {/* Ambient particles / points */}
            <Points />
        </group>
    );
}

function Points() {
    const ref = useRef<THREE.Points>(null);
    const geoRef = useRef<THREE.BufferGeometry>(null);
    const count = 200;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 3 + Math.random() * 4;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, []);

    // Set geometry attributes imperatively
    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        return geo;
    }, [positions]);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
            ref.current.rotation.x = state.clock.getElapsedTime() * 0.03;
        }
    });

    return (
        <points ref={ref} geometry={geometry}>
            <pointsMaterial
                size={0.02}
                color="#00d4ff"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

