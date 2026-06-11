"use client";

import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

interface ParticleSphereProps {
  isDark: boolean;
}

export default function ParticleSphere({ isDark }: ParticleSphereProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const accentColor = useMemo(() => isDark ? 0xD4FE00 : 0x4D7900, [isDark]);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ── Scene setup ──────────────────────────────────────
    const scene = new THREE.Scene();
    const w = el.clientWidth;
    const h = el.clientHeight;

    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // ── Particle geometry — Fibonacci sphere ──────────────
    const COUNT = 2800;
    const positions = new Float32Array(COUNT * 3);
    const basePositions = new Float32Array(COUNT * 3);
    const phases = new Float32Array(COUNT);

    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    const RADIUS = 1.18;

    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y) * RADIUS;
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      const vy = y * RADIUS;

      positions[i * 3]     = x;
      positions[i * 3 + 1] = vy;
      positions[i * 3 + 2] = z;

      basePositions[i * 3]     = x;
      basePositions[i * 3 + 1] = vy;
      basePositions[i * 3 + 2] = z;

      phases[i] = Math.random() * Math.PI * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.018,
      color: new THREE.Color(accentColor),
      sizeAttenuation: true,
      transparent: true,
      opacity: isDark ? 0.85 : 0.7,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // ── Mouse tracking ────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      mouseRef.current.y = ((e.clientY - rect.top)  / rect.height - 0.5) * -2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── Animation loop ────────────────────────────────────
    const clock = new THREE.Clock();
    let raf: number;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const pos = geo.attributes.position.array as Float32Array;

      // Slow global rotation
      points.rotation.y = t * 0.06;
      points.rotation.x = t * 0.025;

      // Mouse tilt
      const targetRotY = mouseRef.current.x * 0.35;
      const targetRotX = mouseRef.current.y * 0.2;
      points.rotation.y += (targetRotY - points.rotation.y) * 0.04;
      points.rotation.x += (targetRotX - points.rotation.x) * 0.04;

      // Subtle wave displacement on each particle
      for (let i = 0; i < COUNT; i++) {
        const bx = basePositions[i * 3];
        const by = basePositions[i * 3 + 1];
        const bz = basePositions[i * 3 + 2];
        const phase = phases[i];
        const amp = 0.025;
        const freq = 1.2;

        pos[i * 3]     = bx + Math.sin(t * freq + phase) * amp;
        pos[i * 3 + 1] = by + Math.cos(t * freq + phase * 1.3) * amp;
        pos[i * 3 + 2] = bz + Math.sin(t * freq * 0.7 + phase * 0.9) * amp;
      }

      geo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // ── Resize ────────────────────────────────────────────
    const onResize = () => {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [accentColor, isDark]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
