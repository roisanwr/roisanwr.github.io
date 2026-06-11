"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      rx = lerp(rx, mx, 0.10);
      ry = lerp(ry, my, 0.10);
      ring.style.left = `${rx}px`;
      ring.style.top  = `${ry}px`;
      raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("mousemove", onMove, { passive: true });

    // Cursor states for hoverable elements
    const onEnter = () => {
      if (!dot || !ring) return;
      dot.style.width = "12px";
      dot.style.height = "12px";
      ring.style.width = "52px";
      ring.style.height = "52px";
      ring.style.opacity = "1";
    };

    const onLeave = () => {
      if (!dot || !ring) return;
      dot.style.width = "8px";
      dot.style.height = "8px";
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.opacity = "0.6";
    };

    const hoverEls = document.querySelectorAll("a, button, [data-cursor='hover']");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Hide on canvas (3D area)
    const hideCursor = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; };
    const showCursor = () => { dot.style.opacity = "1"; ring.style.opacity = "0.6"; };
    const canvasEls = document.querySelectorAll("canvas");
    canvasEls.forEach((c) => {
      c.addEventListener("mouseenter", hideCursor);
      c.addEventListener("mouseleave", showCursor);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div id="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
