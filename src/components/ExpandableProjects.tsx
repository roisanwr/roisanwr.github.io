"use client";

import { useState } from "react";
import { workData } from "@/config/data";

/**
 * ExpandableProjects — projects as full-width "signal panels".
 * Each row expands on click to reveal description, image, and links.
 */
export default function ExpandableProjects() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (i: number) => setOpenId(openId === i ? null : i);

  return (
    <section
      id="work"
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
            justifyContent: "space-between",
            marginBottom: "4rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span className="label">Work</span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "linear-gradient(90deg, var(--wire-2), transparent)",
                maxWidth: "200px",
              }}
            />
          </div>

          <a
            href={`https://github.com/roisanwr`}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "var(--font-space-grotesk), monospace",
              fontSize: "0.62rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text-lo)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--signal)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--text-lo)")
            }
          >
            View all on GitHub ↗
          </a>
        </div>

        {/* Section heading */}
        <h2
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            letterSpacing: "-0.03em",
            lineHeight: 0.9,
            color: "var(--text-hi)",
            marginBottom: "4rem",
          }}
        >
          Things I&apos;ve
          <br />
          <span style={{ color: "var(--signal)" }}>built</span>
          {" "}for the web
        </h2>

        {/* Signal panels */}
        <div>
          {workData.map((project, i) => (
            <div key={i} className="signal-panel">
              {/* Row header */}
              <button
                className="panel-header"
                onClick={() => toggle(i)}
                style={{ cursor: "none" }}
              >
                {/* Number */}
                <span
                  style={{
                    fontFamily: "var(--font-space-grotesk), monospace",
                    fontSize: "0.6rem",
                    color: "var(--text-lo)",
                    fontWeight: 500,
                    minWidth: "2rem",
                    letterSpacing: "0.06em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Title */}
                <span
                  className="panel-title"
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                    letterSpacing: "-0.01em",
                    color: "var(--text-hi)",
                    flex: 1,
                    transition: "color 0.2s",
                  }}
                >
                  {project.title}
                </span>

                {/* Tech stack (desktop) */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.4rem",
                    flexWrap: "wrap",
                    justifyContent: "flex-end",
                    maxWidth: "300px",
                  }}
                >
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="badge">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="badge">+{project.tech.length - 3}</span>
                  )}
                </div>

                {/* Chevron */}
                <span
                  style={{
                    fontFamily: "var(--font-space-grotesk), monospace",
                    fontSize: "0.8rem",
                    color: openId === i ? "var(--signal)" : "var(--text-lo)",
                    transition: "transform 0.3s, color 0.2s",
                    transform: openId === i ? "rotate(45deg)" : "rotate(0deg)",
                    display: "inline-block",
                    flexShrink: 0,
                    marginLeft: "1rem",
                  }}
                >
                  +
                </span>
              </button>

              {/* Expanded panel */}
              {openId === i && (
                <div
                  style={{
                    padding: "0 0 2rem 3.5rem",
                    animation: "panel-open 0.3s ease both",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: project.image ? "1fr auto" : "1fr",
                      gap: "2rem",
                      alignItems: "start",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-inter), sans-serif",
                          fontSize: "0.9rem",
                          lineHeight: 1.7,
                          color: "var(--text-mid)",
                          marginBottom: "1.5rem",
                          maxWidth: "600px",
                        }}
                      >
                        {project.description}
                      </p>

                      {/* All tech badges */}
                      <div
                        style={{
                          display: "flex",
                          gap: "0.4rem",
                          flexWrap: "wrap",
                          marginBottom: "1.5rem",
                        }}
                      >
                        {project.tech.map((t) => (
                          <span key={t} className="badge">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div style={{ display: "flex", gap: "1rem" }}>
                        {project.externalLink && project.externalLink !== "#" && (
                          <a
                            href={project.externalLink}
                            target="_blank"
                            rel="noreferrer"
                            className="mag-btn"
                            style={{ padding: "0.6rem 1.4rem", fontSize: "0.6rem" }}
                          >
                            <span>Live ↗</span>
                          </a>
                        )}
                        {project.githubLink && project.githubLink !== "#" && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="mag-btn"
                            style={{ padding: "0.6rem 1.4rem", fontSize: "0.6rem" }}
                          >
                            <span>GitHub</span>
                          </a>
                        )}
                        {(!project.externalLink || project.externalLink === "#") &&
                          (!project.githubLink || project.githubLink === "#") && (
                            <span
                              style={{
                                fontFamily: "var(--font-space-grotesk), monospace",
                                fontSize: "0.6rem",
                                color: "var(--text-lo)",
                              }}
                            >
                              Links coming soon
                            </span>
                          )}
                      </div>
                    </div>

                    {/* Project image */}
                    {project.image && (
                      <div
                        style={{
                          width: "220px",
                          aspectRatio: "16/10",
                          borderRadius: "4px",
                          overflow: "hidden",
                          border: "1px solid var(--wire)",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            filter: "grayscale(0.3) contrast(1.1)",
                            transition: "filter 0.3s",
                          }}
                          onMouseEnter={(e) =>
                            ((e.target as HTMLImageElement).style.filter =
                              "grayscale(0) contrast(1)")
                          }
                          onMouseLeave={(e) =>
                            ((e.target as HTMLImageElement).style.filter =
                              "grayscale(0.3) contrast(1.1)")
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
