"use client";

import { useEffect, useRef, useState, CSSProperties } from "react";

interface Props {
  text: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * GlitchText — Text with SVG feTurbulence displacement filter.
 * On mouse proximity: letters warp with spring physics.
 * On idle: periodic amber glitch channel shift.
 */
export default function GlitchText({ text, className = "", style }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<SVGFETurbulenceElement>(null);
  const animFrameRef = useRef<number>(0);
  const glitchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isGlitching, setIsGlitching] = useState(false);
  const turbRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: -9999, y: -9999 });

  // Periodic glitch
  useEffect(() => {
    const schedule = () => {
      const delay = 3500 + Math.random() * 5000;
      glitchTimerRef.current = setTimeout(() => {
        setIsGlitching(true);
        setTimeout(() => {
          setIsGlitching(false);
          schedule();
        }, 280);
      }, delay);
    };
    schedule();
    return () => {
      if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);
    };
  }, []);

  // Mouse-reactive distortion
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    const animate = () => {
      if (filterRef.current && wrapRef.current) {
        const rect = wrapRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mouseRef.current.x - cx;
        const dy = mouseRef.current.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 700;
        const prox = Math.max(0, 1 - dist / maxDist);

        const targetX = prox * 0.025;
        const targetY = prox * 0.018;

        turbRef.current.x += (targetX - turbRef.current.x) * 0.07;
        turbRef.current.y += (targetY - turbRef.current.y) * 0.07;

        filterRef.current.setAttribute(
          "baseFrequency",
          `${turbRef.current.x.toFixed(5)} ${turbRef.current.y.toFixed(5)}`
        );
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const filterId = `glitch-${text.replace(/\s/g, "-").toLowerCase()}`;

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        position: "relative",
        display: "block",
        ...style,
      }}
    >
      {/* Hidden SVG filter definition */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
      >
        <defs>
          <filter id={filterId}>
            <feTurbulence
              ref={filterRef}
              type="turbulence"
              baseFrequency="0 0"
              numOctaves="3"
              seed="5"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="10"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Glitch clone — amber channel shift */}
      {isGlitching && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            color: "var(--burn)",
            clipPath: "inset(30% 0 40% 0)",
            transform: "translateX(-5px)",
            fontFamily: "inherit",
            fontSize: "inherit",
            fontWeight: "inherit",
            lineHeight: "inherit",
            letterSpacing: "inherit",
            pointerEvents: "none",
            userSelect: "none",
            display: "block",
          }}
        >
          {text}
        </span>
      )}

      {/* Main text with filter */}
      <span
        style={{
          display: "block",
          filter: `url(#${filterId})`,
          willChange: "filter",
          userSelect: "none",
        }}
      >
        {text}
      </span>
    </div>
  );
}
