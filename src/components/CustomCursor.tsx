"use client";

import { useEffect, useRef } from "react";

/**
 * CustomCursor — Minimal signal dot + lagging ring.
 * Signal teal dot with glow. Ring lags behind.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const move = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", move);

    // Hover effect: expand ring on interactive elements
    const onEnter = () => {
      if (ring) {
        ring.style.width = "56px";
        ring.style.height = "56px";
        ring.style.borderColor = "var(--signal)";
        ring.style.opacity = "0.9";
      }
    };
    const onLeave = () => {
      if (ring) {
        ring.style.width = "32px";
        ring.style.height = "32px";
        ring.style.borderColor = "rgba(0, 245, 212, 0.5)";
        ring.style.opacity = "0.6";
      }
    };

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    const animate = () => {
      const { x, y } = posRef.current;
      // Dot: instant
      if (dot) {
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
      }
      // Ring: lerp
      ringPos.current.x += (x - ringPos.current.x) * 0.14;
      ringPos.current.y += (y - ringPos.current.y) * 0.14;
      if (ring) {
        ring.style.left = `${ringPos.current.x}px`;
        ring.style.top = `${ringPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafRef.current);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
