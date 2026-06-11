"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { heroData } from "@/config/data";
import dynamic from "next/dynamic";

// Client-only: particle sphere needs Three.js
const ParticleSphere = dynamic(() => import("./ParticleSphere"), { ssr: false });

/* ── Per-character reveal helper ── */
function CharReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: delay + i * 0.025,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </>
  );
}

export default function HeroSection() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Detect dark mode for particle color
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Split name for display
  const name = heroData.name.replace(/\.$/, ""); // "Rois Anwar"

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 3D Particle sphere — positioned right/center */}
      <div
        style={{
          position: "absolute",
          right: "-5%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "min(65vw, 700px)",
          height: "min(65vw, 700px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <ParticleSphere isDark={isDark} />
      </div>

      {/* Gradient fade — left side to show text */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, var(--c-bg) 45%, transparent 80%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "80px", paddingBottom: "80px" }}>
        {/* Role label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="label"
          style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}
        >
          <span style={{ display: "block", width: "32px", height: "1px", background: "var(--c-accent)" }} />
          Software Engineer
        </motion.div>

        {/* Name — Bebas Neue, huge */}
        <div style={{ overflow: "hidden", marginBottom: "2rem" }}>
          <div
            className="font-display"
            style={{
              fontSize: "clamp(5rem, 16vw, 16rem)",
              lineHeight: 0.9,
              color: "var(--c-text)",
              letterSpacing: "0.02em",
            }}
          >
            <div style={{ overflow: "hidden" }}>
              <CharReveal text={name.split(" ")[0]} delay={0.3} />
            </div>
            <div style={{ overflow: "hidden" }}>
              <CharReveal text={name.split(" ")[1] || ""} delay={0.45} />
              <motion.span
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5, ease: "backOut" }}
                style={{
                  color: "var(--c-accent)",
                  display: "inline-block",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.35em",
                  lineHeight: 1,
                  verticalAlign: "0.25em",
                  marginLeft: "0.12em",
                }}
              >
                •
              </motion.span>
            </div>
          </div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            maxWidth: "400px",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "1rem",
            lineHeight: 1.75,
            color: "var(--c-text-2)",
            marginBottom: "2.5rem",
          }}
        >
          {heroData.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          <a href="#work" className="btn-accent">
            See my work
          </a>
          <a href="#contact" className="mag-btn">
            <span>Get in touch</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "2.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          zIndex: 2,
        }}
      >
        <span
          className="label"
          style={{ fontSize: "0.55rem" }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "var(--c-accent)",
            animation: "scroll-bounce 1.8s ease-in-out infinite",
            transformOrigin: "top",
          }}
        />
      </motion.div>

      {/* Bottom border */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "var(--c-border)",
        }}
      />
    </section>
  );
}
