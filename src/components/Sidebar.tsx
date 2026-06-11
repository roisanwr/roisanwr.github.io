"use client";

import { siteConfig } from "@/config/data";
import { FaGithub, FaLinkedin, FaTwitter, FaCodepen } from "react-icons/fa";

const socials = [
  { icon: FaGithub,   href: siteConfig.socials.github,  label: "GitHub" },
  { icon: FaLinkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
  { icon: FaTwitter,  href: siteConfig.socials.twitter,  label: "Twitter" },
  { icon: FaCodepen,  href: siteConfig.socials.codepen,  label: "CodePen" },
];

export default function Sidebar() {
  return (
    <>
      {/* Left — social icons */}
      <aside
        className="hidden lg:flex"
        style={{
          position: "fixed",
          left: "1.5rem",
          bottom: 0,
          width: "40px",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
          zIndex: 50,
          paddingBottom: "2rem",
        }}
      >
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
            <Icon size={16} />
          </a>
        ))}
        {/* Vertical line */}
        <div style={{ width: "1px", height: "80px", background: "var(--c-border-2)" }} />
      </aside>

      {/* Right — email */}
      <aside
        className="hidden lg:flex"
        style={{
          position: "fixed",
          right: "1.5rem",
          bottom: 0,
          width: "40px",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
          zIndex: 50,
          paddingBottom: "2rem",
        }}
      >
        <a
          href={`mailto:${siteConfig.email}`}
          className="vertical-lr label"
          style={{
            color: "var(--c-text-3)",
            textDecoration: "none",
            letterSpacing: "0.14em",
            fontSize: "0.6rem",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-text-3)")}
        >
          {siteConfig.email}
        </a>
        <div style={{ width: "1px", height: "80px", background: "var(--c-border-2)" }} />
      </aside>
    </>
  );
}
