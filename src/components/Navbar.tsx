"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/data";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = siteConfig.navLinks;

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ── Hydration + theme bootstrap ── */
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    // Default to dark if no preference saved
    const dark = saved === "dark" || !saved;
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);

  /* ── Scroll shadow ── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── Lock body ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  if (!mounted) return null;

  return (
    <>
      {/* ─── Main Bar ─── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2.5rem",
          background: scrolled ? "var(--c-nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--c-border)" : "1px solid transparent",
          transition: "background 0.4s, border-color 0.4s",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: "var(--font-bebas), sans-serif",
            fontSize: "1.75rem",
            letterSpacing: "0.05em",
            color: "var(--c-text)",
            textDecoration: "none",
            lineHeight: 1,
          }}
          aria-label="Home"
        >
          RA
          <span style={{ color: "var(--c-accent)" }}>.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex" style={{ alignItems: "center", gap: "2.5rem" }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                fontFamily: "var(--font-space-grotesk), monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--c-text-2)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-text-2)")}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              background: "none",
              border: "1px solid var(--c-border-2)",
              color: "var(--c-text-2)",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "none",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "var(--c-accent)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "var(--c-text-2)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-border-2)";
            }}
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{
              background: "none",
              border: "1px solid var(--c-border-2)",
              color: "var(--c-text)",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "none",
              gap: "0",
              flexDirection: "column",
              padding: "0 9px",
            }}
          >
            <span style={{ display: "block", width: "100%", height: "1px", background: "currentColor", marginBottom: "5px" }} />
            <span style={{ display: "block", width: "100%", height: "1px", background: "currentColor" }} />
          </button>
        </div>
      </header>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 950,
              background: "var(--c-bg)",
              display: "flex",
              flexDirection: "column",
              padding: "1.5rem 2rem 3rem",
            }}
          >
            {/* Top row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "1.75rem",
                  letterSpacing: "0.05em",
                  color: "var(--c-text)",
                }}
              >
                RA<span style={{ color: "var(--c-accent)" }}>.</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--c-text)",
                  fontSize: "1.5rem",
                  cursor: "none",
                  lineHeight: 1,
                  padding: "0.5rem",
                }}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Links */}
            <nav style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "0" }}>
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(3rem, 12vw, 5rem)",
                    color: "var(--c-text-2)",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                    lineHeight: 1.1,
                    borderBottom: "1px solid var(--c-border)",
                    padding: "0.6rem 0",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-text-2)")}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            {/* Bottom */}
            <p style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "0.65rem", letterSpacing: "0.12em", color: "var(--c-text-3)", textTransform: "uppercase" }}>
              {siteConfig.email}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
