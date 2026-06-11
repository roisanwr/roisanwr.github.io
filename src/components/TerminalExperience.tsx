"use client";

import { useState } from "react";
import { experienceData } from "@/config/data";

/**
 * TerminalExperience — Experience displayed as terminal output.
 * Each item shows as a terminal command → output block.
 * Hover reveals full detail.
 */
export default function TerminalExperience() {
  const [expanded, setExpanded] = useState<string>(experienceData[0]?.id ?? "");

  return (
    <section
      id="experience"
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
          <span className="label">Experience</span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(90deg, var(--wire-2), transparent)",
              maxWidth: "200px",
            }}
          />
        </div>

        {/* Terminal window */}
        <div
          style={{
            background: "var(--static)",
            border: "1px solid var(--wire)",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          {/* Terminal title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1rem",
              borderBottom: "1px solid var(--wire)",
              background: "var(--void-2)",
            }}
          >
            {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
              <div
                key={c}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: c,
                  opacity: 0.7,
                }}
              />
            ))}
            <span
              style={{
                marginLeft: "0.75rem",
                fontFamily: "var(--font-space-grotesk), monospace",
                fontSize: "0.6rem",
                color: "var(--text-lo)",
                letterSpacing: "0.08em",
              }}
            >
              career.log — roisanwar
            </span>
          </div>

          {/* Terminal body */}
          <div style={{ padding: "1.5rem" }}>
            {/* Initial prompt */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <span
                className="terminal-prompt"
                style={{ color: "var(--signal)" }}
              >
                ~
              </span>
              <span
                style={{
                  fontFamily: "var(--font-space-grotesk), monospace",
                  fontSize: "0.75rem",
                  color: "var(--text-mid)",
                }}
              >
                $ cat career.log
              </span>
            </div>

            {/* Experience entries */}
            {experienceData.map((exp, idx) => (
              <div
                key={exp.id}
                style={{
                  marginBottom: idx < experienceData.length - 1 ? "2rem" : 0,
                }}
              >
                {/* Entry header — clickable */}
                <button
                  onClick={() =>
                    setExpanded(expanded === exp.id ? "" : exp.id)
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    background: "none",
                    border: "none",
                    padding: "0",
                    cursor: "none",
                    width: "100%",
                    textAlign: "left",
                    marginBottom: "0.75rem",
                  }}
                >
                  {/* Chevron */}
                  <span
                    style={{
                      fontFamily: "var(--font-space-grotesk), monospace",
                      fontSize: "0.65rem",
                      color: "var(--signal)",
                      transition: "transform 0.2s",
                      transform:
                        expanded === exp.id ? "rotate(90deg)" : "rotate(0deg)",
                      display: "inline-block",
                    }}
                  >
                    ▶
                  </span>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.5rem",
                      flex: 1,
                    }}
                  >
                    {/* Duration */}
                    <span
                      style={{
                        fontFamily: "var(--font-space-grotesk), monospace",
                        fontSize: "0.65rem",
                        color: "var(--text-lo)",
                        minWidth: "160px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {exp.duration}
                    </span>

                    {/* Company */}
                    <span
                      style={{
                        fontFamily: "var(--font-syne), sans-serif",
                        fontWeight: 700,
                        fontSize: "1rem",
                        color:
                          expanded === exp.id ? "var(--signal)" : "var(--text-hi)",
                        letterSpacing: "-0.01em",
                        transition: "color 0.2s",
                      }}
                    >
                      {exp.company}
                    </span>

                    {/* Role badge */}
                    <span className="badge">{exp.role}</span>
                  </div>
                </button>

                {/* Expanded output */}
                {expanded === exp.id && (
                  <div
                    style={{
                      paddingLeft: "2rem",
                      animation: "panel-open 0.25s ease both",
                    }}
                  >
                    <div
                      style={{
                        borderLeft: "1px solid var(--wire-2)",
                        paddingLeft: "1.25rem",
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem",
                      }}
                    >
                      {exp.achievements.map((item, i) => (
                        <div
                          key={i}
                          className={`terminal-line ${
                            i === exp.achievements.length - 1 ? "last" : ""
                          }`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Blinking cursor */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginTop: "1.5rem",
              }}
            >
              <span
                className="terminal-prompt"
                style={{ color: "var(--signal)" }}
              >
                ~
              </span>
              <span
                style={{
                  fontFamily: "var(--font-space-grotesk), monospace",
                  fontSize: "0.75rem",
                  color: "var(--text-mid)",
                }}
              >
                $
              </span>
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "14px",
                  background: "var(--signal)",
                  animation: "hud-blink 1.2s step-end infinite",
                  marginTop: "1px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
