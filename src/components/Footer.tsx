"use client";

import { footerData, siteConfig } from "@/config/data";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--wire)",
        padding: "2rem 0",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-space-grotesk), monospace",
            fontSize: "0.6rem",
            color: "var(--text-lo)",
            letterSpacing: "0.08em",
          }}
        >
          {footerData.text} · {new Date().getFullYear()}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span className="status-dot" style={{ width: "4px", height: "4px" }} />
          <span
            style={{
              fontFamily: "var(--font-space-grotesk), monospace",
              fontSize: "0.55rem",
              color: "var(--signal)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Signal active
          </span>
        </div>
      </div>
    </footer>
  );
}
