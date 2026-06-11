"use client";

import { useEffect, useRef } from "react";
import { aboutData } from "@/config/data";

const SKILLS = aboutData.technologies;

/**
 * AboutSignal — Asymmetric two-column layout.
 * Left: editorial pull-quote + bio paragraphs.
 * Right: skills as animated "signal meter" bars.
 * NO dominant profile photo — keeps the design clean.
 */
export default function AboutSignal() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);

  // Animate skill bars on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            barsRef.current.forEach((bar, i) => {
              if (bar) {
                bar.style.transitionDelay = `${i * 0.07}s`;
                bar.style.transform = "scaleX(1)";
              }
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: "8rem 0",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Section label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "4rem",
          }}
        >
          <span className="label">About</span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(90deg, var(--wire-2), transparent)",
              maxWidth: "200px",
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6rem",
            alignItems: "start",
          }}
        >
          {/* LEFT: Editorial content */}
          <div>
            {/* Pull quote */}
            <blockquote
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "var(--text-hi)",
                marginBottom: "2.5rem",
                borderLeft: "2px solid var(--signal)",
                paddingLeft: "1.5rem",
              }}
            >
              Building things that live — and matter — on the internet.
            </blockquote>

            {/* Bio paragraphs */}
            {aboutData.paragraphs.map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                  color: "var(--text-mid)",
                  marginBottom: "1.25rem",
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* RIGHT: Signal skill meters */}
          <div>
            <p
              className="label"
              style={{ marginBottom: "2rem" }}
            >
              Core stack
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
              }}
            >
              {SKILLS.map((skill, i) => {
                // Give each skill a "signal strength" (70–100%)
                const strengths = [98, 95, 92, 88, 85, 80, 78, 75];
                const pct = strengths[i % strengths.length];

                return (
                  <div key={skill}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.35rem",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-space-grotesk), monospace",
                          fontSize: "0.72rem",
                          fontWeight: 500,
                          color: "var(--text-hi)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {skill}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-space-grotesk), monospace",
                          fontSize: "0.6rem",
                          color: "var(--signal)",
                        }}
                      >
                        {pct}%
                      </span>
                    </div>

                    {/* Track */}
                    <div
                      style={{
                        width: "100%",
                        height: "2px",
                        background: "var(--wire)",
                        borderRadius: "1px",
                        overflow: "hidden",
                      }}
                    >
                      {/* Bar */}
                      <div
                        ref={(el) => {
                          if (el) barsRef.current[i] = el;
                        }}
                        style={{
                          height: "100%",
                          width: `${pct}%`,
                          background: `linear-gradient(90deg, var(--signal), var(--burn))`,
                          transform: "scaleX(0)",
                          transformOrigin: "left",
                          transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                          boxShadow: "0 0 6px var(--signal-glow)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Small profile avatar — not dominant */}
            <div
              style={{
                marginTop: "3rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  border: "1px solid var(--wire-2)",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src={aboutData.profileImage}
                  alt="Rois Anwar"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--text-hi)",
                  }}
                >
                  Rois Anwar
                </div>
                <div className="label-dim" style={{ fontSize: "0.55rem" }}>
                  Software Engineer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
