"use client";

import { siteConfig, footerData } from "@/config/data";
import { FaGithub, FaLinkedin, FaTwitter, FaCodepen } from "react-icons/fa";

const socials = [
  { icon: FaGithub,   href: siteConfig.socials.github,  label: "GitHub" },
  { icon: FaLinkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
  { icon: FaTwitter,  href: siteConfig.socials.twitter,  label: "Twitter" },
  { icon: FaCodepen,  href: siteConfig.socials.codepen,  label: "CodePen" },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--c-border)",
        padding: "3rem 0",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        {/* Social icons */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              style={{
                color: "var(--c-text-3)",
                transition: "color 0.2s, transform 0.2s",
                display: "flex",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-accent)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-text-3)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              <Icon size={17} />
            </a>
          ))}
        </div>

        {/* Logo mark */}
        <div
          className="font-display"
          style={{
            fontSize: "2.5rem",
            letterSpacing: "0.05em",
            color: "var(--c-text-3)",
            lineHeight: 1,
          }}
        >
          RA<span style={{ color: "var(--c-accent)" }}>.</span>
        </div>

        {/* Credit text */}
        <p
          className="font-mono label"
          style={{
            color: "var(--c-text-3)",
            letterSpacing: "0.12em",
            fontSize: "0.62rem",
          }}
        >
          {footerData.text}
        </p>
      </div>
    </footer>
  );
}
