"use client";

/**
 * BroadcastTicker — Continuous horizontal marquee between sections.
 * Like a broadcast news ticker / stock feed.
 */
interface Props {
  items?: string[];
  speed?: number; /* seconds for one full loop */
}

const DEFAULT_ITEMS = [
  "Available for work",
  "Software Engineer",
  "Building for the web",
  "Rois Anwar",
  "Open to collaboration",
  "Based in Indonesia",
  "Crafting digital experiences",
];

export default function BroadcastTicker({
  items = DEFAULT_ITEMS,
  speed = 30,
}: Props) {
  // Double the items so the loop is seamless
  const all = [...items, ...items];

  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--wire)",
        borderBottom: "1px solid var(--wire)",
        padding: "0.7rem 0",
        position: "relative",
        background: "var(--void-2)",
      }}
      aria-hidden="true"
    >
      {/* Left fade */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "80px",
          background: "linear-gradient(90deg, var(--void-2), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      {/* Right fade */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "80px",
          background: "linear-gradient(-90deg, var(--void-2), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "0",
          animation: `ticker ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {all.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1.5rem",
              padding: "0 2rem",
              fontFamily: "var(--font-space-grotesk), monospace",
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: i % (items.length) === 0 ? "var(--signal)" : "var(--text-lo)",
              whiteSpace: "nowrap",
            }}
          >
            {item}
            <span
              style={{
                display: "inline-block",
                width: "3px",
                height: "3px",
                background: "var(--wire-2)",
                borderRadius: "50%",
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
