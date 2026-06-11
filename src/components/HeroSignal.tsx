"use client";

import { useEffect, useRef } from "react";
import GlitchText from "./GlitchText";
import { heroData, siteConfig } from "@/config/data";

const SOCIAL_LINKS = [
  { label: "GH", href: siteConfig.socials.github },
  { label: "LI", href: siteConfig.socials.linkedin },
  { label: "TW", href: siteConfig.socials.twitter },
];

export default function HeroSignal() {
  const contentRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on scroll
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      el.style.transform = `translateY(${y * 0.2}px)`;
      el.style.opacity = `${Math.max(0, 1 - y / 700)}`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rawName = heroData.name.replace(".", "").trim();
  const parts = rawName.split(" ");
  const firstName = parts[0] ?? "ROIS";
  const lastName = parts[1] ?? "ANWAR";

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "64px",
      }}
    >
      {/* Grid background */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: [
            "linear-gradient(rgba(37,37,64,0.5) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(37,37,64,0.5) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      {/* Central radial glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70vw",
          height: "70vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,245,212,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Left sidebar */}
      <div
        style={{
          position: "absolute",
          left: "1.75rem",
          bottom: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {SOCIAL_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "var(--font-space-grotesk), monospace",
              fontSize: "0.52rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "var(--text-lo)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "var(--signal)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "var(--text-lo)")
            }
          >
            {label}
          </a>
        ))}
        <div
          style={{
            width: "1px",
            height: "56px",
            background: "linear-gradient(to bottom, var(--wire-2), transparent)",
          }}
        />
      </div>

      {/* Right sidebar — email */}
      <div
        style={{
          position: "absolute",
          right: "1.75rem",
          bottom: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <a
          href={`mailto:${siteConfig.email}`}
          className="vertical-lr"
          style={{
            fontFamily: "var(--font-space-grotesk), monospace",
            fontSize: "0.52rem",
            letterSpacing: "0.14em",
            color: "var(--text-lo)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.color = "var(--signal)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.color = "var(--text-lo)")
          }
        >
          {siteConfig.email}
        </a>
        <div
          style={{
            width: "1px",
            height: "56px",
            background: "linear-gradient(to bottom, var(--wire-2), transparent)",
          }}
        />
      </div>

      {/* Main content */}
      <div
        ref={contentRef}
        className="container"
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* Eyebrow label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.5rem",
            animation: "fade-up 0.7s ease 0.1s both",
          }}
        >
          <span className="label">{heroData.greeting}</span>
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "var(--wire)",
            }}
          />
        </div>

        {/* Hero name — two lines */}
        <div
          style={{
            marginBottom: "2.5rem",
            animation: "fade-up 0.7s ease 0.25s both",
          }}
        >
          {/* First name — solid */}
          <GlitchText
            text={firstName.toUpperCase()}
            className="font-display"
            style={{
              fontSize: "clamp(5rem, 17vw, 17rem)",
              lineHeight: 0.85,
              color: "var(--text-hi)",
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
            }}
          />

          {/* Second name row — outline + signal dot */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "0.6rem" }}>
            <GlitchText
              text={lastName.toUpperCase()}
              className="font-display"
              style={{
                fontSize: "clamp(5rem, 17vw, 17rem)",
                lineHeight: 0.85,
                color: "transparent",
                WebkitTextStroke: "1.5px var(--wire-2)",
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
              }}
            />
            {/* Signal dot accent */}
            <span
              style={{
                display: "inline-block",
                width: "clamp(12px, 2vw, 22px)",
                height: "clamp(12px, 2vw, 22px)",
                background: "var(--signal)",
                borderRadius: "50%",
                flexShrink: 0,
                marginBottom: "clamp(10px, 2vw, 20px)",
                boxShadow:
                  "0 0 18px var(--signal), 0 0 40px rgba(0,245,212,0.3)",
                animation: "pulse-dot 3s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        {/* Role tags */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
            animation: "fade-up 0.7s ease 0.4s both",
          }}
        >
          {["Software Engineer", "Builder", "Problem Solver"].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-space-grotesk), monospace",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-lo)",
                padding: "0.3rem 0.75rem",
                border: "1px solid var(--wire)",
                borderRadius: "2px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom row: description + stats */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "3rem",
            flexWrap: "wrap",
            animation: "fade-up 0.7s ease 0.55s both",
          }}
        >
          <div style={{ maxWidth: "440px" }}>
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: "var(--text-mid)",
                marginBottom: "2rem",
              }}
            >
              {heroData.description}
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#work" className="mag-btn">
                <span>View Work</span>
              </a>
              <a
                href="#about"
                className="mag-btn"
                style={{ borderColor: "var(--wire)" }}
              >
                <span>About</span>
              </a>
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.5rem 3rem",
            }}
          >
            {[
              { n: "5+", label: "Years" },
              { n: "30+", label: "Projects" },
              { n: "100%", label: "Dedication" },
              { n: "∞", label: "Drive" },
            ].map(({ n, label }) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    color: "var(--signal)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {n}
                </div>
                <div
                  className="label-dim"
                  style={{ marginTop: "0.2rem", fontSize: "0.52rem" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          animation: "fade-up 0.8s ease 1s both",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, var(--signal), transparent)",
          }}
        />
        <span className="label-dim" style={{ fontSize: "0.48rem" }}>
          scroll
        </span>
      </div>
    </section>
  );
}
