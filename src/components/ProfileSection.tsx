"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { aboutData } from "@/config/data";
import Image from "next/image";

const STATS = [
  { value: "5+",   label: "Years" },
  { value: "20+",  label: "Projects" },
  { value: "10+",  label: "Clients" },
];

function RevealBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ProfileSection() {
  return (
    <section id="about" className="scroll-mt-20" style={{ padding: "6rem 0" }}>
      <div className="container">
        {/* Section header */}
        <RevealBlock>
          <span className="label" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
            <span style={{ display: "block", width: "32px", height: "1px", background: "var(--c-accent)" }} />
            About
          </span>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              color: "var(--c-text)",
              letterSpacing: "0.02em",
              lineHeight: 0.95,
              marginBottom: "4rem",
            }}
          >
            A bit about<br />
            me<span style={{ color: "var(--c-accent)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "0.75em", verticalAlign: "middle" }}>•</span>
          </h2>
        </RevealBlock>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3.5rem",
            alignItems: "start",
          }}
          className="md:grid-cols-[1fr_340px]"
        >
          {/* Left: text */}
          <div>
            <RevealBlock delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
                {aboutData.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="font-body"
                    style={{
                      fontSize: "1rem",
                      lineHeight: 1.85,
                      color: "var(--c-text-2)",
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </RevealBlock>

            <RevealBlock delay={0.2}>
              <p
                className="label"
                style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span style={{ display: "block", width: "20px", height: "1px", background: "var(--c-accent)" }} />
                Technologies
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {aboutData.technologies.map((t) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
            </RevealBlock>
          </div>

          {/* Right: image */}
          <RevealBlock delay={0.15}>
            <div style={{ position: "relative", maxWidth: "340px" }}>
              {/* Accent frame — behind image */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  right: "-16px",
                  bottom: "-16px",
                  border: "1px solid var(--c-accent)",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />
              {/* Image */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  overflow: "hidden",
                  aspectRatio: "3/4",
                }}
              >
                <Image
                  src={aboutData.profileImage}
                  alt="Rois Anwar"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  style={{
                    objectFit: "cover",
                    filter: "grayscale(0.5) contrast(1.05)",
                    transition: "filter 0.5s ease, transform 0.5s ease",
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.style.filter = "grayscale(0) contrast(1)";
                    img.style.transform = "scale(1.04)";
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.style.filter = "grayscale(0.5) contrast(1.05)";
                    img.style.transform = "scale(1)";
                  }}
                />
                {/* Accent tint overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "var(--c-accent)",
                    opacity: 0.06,
                    mixBlendMode: "overlay",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </RevealBlock>
        </div>

        {/* Stats row */}
        <RevealBlock delay={0.25}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              borderTop: "1px solid var(--c-border-2)",
              borderLeft: "1px solid var(--c-border-2)",
              marginTop: "4rem",
            }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                style={{
                  borderRight: "1px solid var(--c-border-2)",
                  borderBottom: "1px solid var(--c-border-2)",
                  padding: "2rem 1.5rem",
                  textAlign: "center",
                }}
              >
                <p
                  className="font-display"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                    color: "var(--c-accent)",
                    lineHeight: 1,
                    letterSpacing: "0.02em",
                    marginBottom: "0.4rem",
                  }}
                >
                  {s.value}
                </p>
                <p
                  className="label"
                  style={{ color: "var(--c-text-3)", letterSpacing: "0.18em" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
