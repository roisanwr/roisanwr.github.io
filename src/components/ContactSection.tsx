"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { contactData, siteConfig } from "@/config/data";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      className="scroll-mt-20"
      style={{
        padding: "8rem 0",
        borderTop: "1px solid var(--c-border)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle accent glow — very faint */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, var(--c-accent) 0%, transparent 70%)",
          opacity: 0.04,
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative" }} ref={ref}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="label"
          style={{ justifyContent: "center", display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}
        >
          <span style={{ display: "block", width: "32px", height: "1px", background: "var(--c-accent)" }} />
          Get in touch
          <span style={{ display: "block", width: "32px", height: "1px", background: "var(--c-accent)" }} />
        </motion.div>

        {/* Giant heading */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display"
          style={{
            fontSize: "clamp(4rem, 14vw, 14rem)",
            lineHeight: 0.9,
            color: "var(--c-text)",
            letterSpacing: "0.02em",
            marginBottom: "2rem",
          }}
        >
          {contactData.title}
          <span style={{ color: "var(--c-accent)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "0.6em", verticalAlign: "middle" }}>•</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-body"
          style={{
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "var(--c-text-2)",
            maxWidth: "480px",
            margin: "0 auto 2.5rem",
          }}
        >
          {contactData.description}
        </motion.p>

        {/* Email */}
        <motion.a
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          href={`mailto:${siteConfig.email}`}
          className="font-mono"
          style={{
            display: "inline-block",
            fontSize: "clamp(0.8rem, 2vw, 1rem)",
            letterSpacing: "0.08em",
            color: "var(--c-accent)",
            textDecoration: "none",
            borderBottom: "1px solid var(--c-accent-bg)",
            paddingBottom: "3px",
            marginBottom: "3rem",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--c-accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--c-accent-bg)")}
        >
          {siteConfig.email}
        </motion.a>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <a href={contactData.ctaLink} className="btn-accent">
            {contactData.ctaText}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
