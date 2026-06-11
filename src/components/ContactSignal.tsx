"use client";

import { contactData, siteConfig } from "@/config/data";

export default function ContactSignal() {
  return (
    <section
      id="contact"
      style={{
        padding: "10rem 0 8rem",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Large background text — decorative */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-syne), sans-serif",
          fontWeight: 800,
          fontSize: "clamp(8rem, 25vw, 22rem)",
          color: "transparent",
          WebkitTextStroke: "1px var(--wire)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
          opacity: 0.4,
        }}
      >
        HELLO
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Section label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "var(--signal)",
            }}
          />
          <span className="label">{contactData.header}</span>
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "var(--signal)",
            }}
          />
        </div>

        {/* Main heading */}
        <h2
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            letterSpacing: "-0.03em",
            lineHeight: 0.95,
            color: "var(--text-hi)",
            marginBottom: "2rem",
          }}
        >
          {contactData.title}
          <span
            style={{
              color: "var(--signal)",
              display: "inline-block",
              marginLeft: "0.2em",
              fontSize: "0.6em",
              verticalAlign: "super",
            }}
          >
            ●
          </span>
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "var(--text-mid)",
            maxWidth: "500px",
            margin: "0 auto 3rem",
          }}
        >
          {contactData.description}
        </p>

        {/* Email CTA */}
        <a
          href={`mailto:${siteConfig.email}`}
          className="btn-signal"
          style={{ fontSize: "0.72rem", letterSpacing: "0.16em" }}
        >
          {contactData.ctaText} ↗
        </a>

        {/* Social links */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            marginTop: "4rem",
          }}
        >
          {Object.entries(siteConfig.socials).map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "var(--font-space-grotesk), monospace",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
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
              {key}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
