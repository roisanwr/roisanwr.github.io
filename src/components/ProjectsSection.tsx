"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { workData } from "@/config/data";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface Project {
  title: string;
  isFeatured: boolean;
  description: string;
  tech: string[];
  githubLink: string;
  externalLink: string;
  image: string;
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          borderBottom: "1px solid var(--c-border)",
          overflow: "hidden",
          transition: "background 0.3s",
          background: hovered ? "var(--c-surface)" : "transparent",
        }}
        className="md:grid-cols-[1fr_360px]"
      >
        {/* Left: info */}
        <div
          style={{
            padding: "2.5rem 2.5rem 2.5rem 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}
        >
          <div>
            {/* Number + title row */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1rem" }}>
              <span
                className="label"
                style={{ color: "var(--c-text-3)", minWidth: "2ch" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3
                className="font-display"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  color: hovered ? "var(--c-accent)" : "var(--c-text)",
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                  transition: "color 0.25s",
                }}
              >
                {project.title}
              </h3>
            </div>

            <p
              className="font-body"
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.75,
                color: "var(--c-text-2)",
                maxWidth: "520px",
              }}
            >
              {project.description}
            </p>
          </div>

          {/* Bottom row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            {/* Tech badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {project.tech.slice(0, 4).map((t) => (
                <span key={t} className="badge">{t}</span>
              ))}
            </div>
            {/* Links */}
            <div style={{ display: "flex", gap: "1rem" }}>
              {project.githubLink && project.githubLink !== "#" && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--c-text-3)", transition: "color 0.2s", display: "flex" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-text-3)")}
                >
                  <FaGithub size={18} />
                </a>
              )}
              {project.externalLink && project.externalLink !== "#" && (
                <a
                  href={project.externalLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--c-text-3)", transition: "color 0.2s", display: "flex" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-text-3)")}
                >
                  <FaExternalLinkAlt size={16} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right: image */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            display: "none",
            minHeight: "260px",
          }}
          className="md:block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              filter: hovered ? "grayscale(0)" : "grayscale(0.5)",
              transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1), filter 0.5s",
            }}
          />
          {/* Dark overlay with featured badge */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(9,9,14,0.4)",
              display: "flex",
              alignItems: "flex-start",
              padding: "1rem",
              opacity: hovered ? 0 : 1,
              transition: "opacity 0.3s",
            }}
          >
            {project.isFeatured && (
              <span
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  background: "var(--c-accent)",
                  color: "var(--c-bg)",
                  padding: "0.2rem 0.55rem",
                  fontWeight: 600,
                }}
              >
                Featured
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="work" className="scroll-mt-20" style={{ padding: "6rem 0", borderTop: "1px solid var(--c-border)" }}>
      <div className="container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="label" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
            <span style={{ display: "block", width: "32px", height: "1px", background: "var(--c-accent)" }} />
            Selected Work
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "4rem",
            }}
          >
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                color: "var(--c-text)",
                letterSpacing: "0.02em",
                lineHeight: 0.95,
              }}
            >
              Things I&apos;ve<br />
              built<span style={{ color: "var(--c-accent)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "0.75em", verticalAlign: "middle" }}>•</span>
            </h2>
            <a
              href="https://github.com/roisanwr"
              target="_blank"
              rel="noreferrer"
              className="mag-btn"
              style={{ flexShrink: 0, alignSelf: "flex-end" }}
            >
              <span>View all →</span>
            </a>
          </div>
        </motion.div>

        {/* Project list */}
        <div style={{ borderTop: "1px solid var(--c-border)" }}>
          {workData.length === 0 ? (
            <div
              style={{
                padding: "4rem 0",
                textAlign: "center",
                color: "var(--c-text-3)",
              }}
            >
              <p className="label">Projects coming soon</p>
            </div>
          ) : (
            workData.map((project, i) => (
              <ProjectRow key={project.title} project={project} index={i} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
