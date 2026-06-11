"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experienceData } from "@/config/data";

function RevealBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-20" style={{ padding: "6rem 0", borderTop: "1px solid var(--c-border)" }}>
      <div className="container">
        {/* Header */}
        <RevealBlock>
          <span className="label" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
            <span style={{ display: "block", width: "32px", height: "1px", background: "var(--c-accent)" }} />
            Experience
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
            Where I&apos;ve<br />
            worked<span style={{ color: "var(--c-accent)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "0.75em", verticalAlign: "middle" }}>•</span>
          </h2>
        </RevealBlock>

        {/* Experience list */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {experienceData.map((exp, i) => (
            <RevealBlock key={exp.id} delay={i * 0.08}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "1.5rem",
                  padding: "2.5rem 0",
                  borderBottom: "1px solid var(--c-border)",
                  transition: "background 0.2s",
                }}
                className="md:grid-cols-[200px_1fr]"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "var(--c-surface)";
                  (e.currentTarget as HTMLDivElement).style.margin = "0 -2.5rem";
                  (e.currentTarget as HTMLDivElement).style.padding = "2.5rem 2.5rem";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "transparent";
                  (e.currentTarget as HTMLDivElement).style.margin = "0";
                  (e.currentTarget as HTMLDivElement).style.padding = "2.5rem 0";
                }}
              >
                {/* Left: duration + company */}
                <div>
                  <p
                    className="label"
                    style={{ color: "var(--c-accent)", marginBottom: "0.5rem", letterSpacing: "0.1em" }}
                  >
                    {exp.duration}
                  </p>
                  <p
                    className="font-mono"
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--c-text-3)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {exp.company}
                  </p>
                </div>

                {/* Right: role + bullets */}
                <div>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                      color: "var(--c-text)",
                      letterSpacing: "0.03em",
                      marginBottom: "1rem",
                    }}
                  >
                    {exp.role}
                  </h3>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {exp.achievements.map((item, idx) => (
                      <li
                        key={idx}
                        style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}
                      >
                        <span style={{ color: "var(--c-accent)", fontSize: "0.7rem", marginTop: "0.3rem", flexShrink: 0 }}>▹</span>
                        <p
                          className="font-body"
                          style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "var(--c-text-2)" }}
                        >
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
