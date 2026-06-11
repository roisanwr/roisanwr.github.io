"use client";

import { useEffect, useState } from "react";

/**
 * HUDStatus — A small "debug overlay" fixed element.
 * Shows scroll progress % and active section.
 * Meta / self-aware design choice.
 */
export default function HUDStatus() {
  const [progress, setProgress] = useState(0);
  const [section, setSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.round((window.scrollY / total) * 100) : 0);

      const sections = ["contact", "work", "experience", "about", "hero"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setSection(id);
          return;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        zIndex: 900,
        pointerEvents: "none",
      }}
    >
      {/* Section indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          opacity: 0.5,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "4px",
            height: "4px",
            background: "var(--signal)",
            borderRadius: "50%",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-space-grotesk), monospace",
            fontSize: "0.5rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--text-lo)",
          }}
        >
          /{section}
        </span>
      </div>

      {/* Scroll % */}
      <div style={{ opacity: 0.35 }}>
        <span
          style={{
            fontFamily: "var(--font-space-grotesk), monospace",
            fontSize: "0.5rem",
            letterSpacing: "0.1em",
            color: "var(--text-lo)",
          }}
        >
          {String(progress).padStart(3, "0")}%
        </span>
      </div>
    </div>
  );
}
