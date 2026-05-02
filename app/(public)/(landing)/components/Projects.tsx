"use client";

import Link from "next/link";
import { useState } from "react";
import ProjectArt from "../../../../src/components/project-art";
import { PORTFOLIO_DATA } from "../../../../src/lib/data";

export default function Projects() {
  const D = PORTFOLIO_DATA;
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="work"
      className="shell"
      style={{ paddingTop: 140, paddingBottom: 120 }}
    >
      <div
        className="reveal"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          alignItems: "end",
          marginBottom: 80,
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 28 }}>
            ◍ SELECTED WORK - 2023 → 2025
          </div>
          <h2 className="h-section" style={{ margin: 0 }}>
            Five projects.
            <br />
            One{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
              through-line.
            </span>
          </h2>
        </div>
        <p className="body" style={{ maxWidth: 480 }}>
          Each one of these started as someone saying &ldquo;I don&rsquo;t think
          this is possible in the browser.&rdquo; They were wrong, mostly. A few
          are open-source; a few are quietly running inside larger products
          you&rsquo;ve used.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {D.projects.map((p, i) => {
          const reverse = i % 2 === 1;
          return (
            <article
              key={p.id}
              className="glass project-card reveal"
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: 28,
                display: "grid",
                gridTemplateColumns: reverse ? "1fr 1.3fr" : "1.3fr 1fr",
                gap: 36,
                alignItems: "stretch",
              }}
            >
              {/* Visual */}
              <div
                style={{
                  order: reverse ? 2 : 1,
                  borderRadius: 18,
                  overflow: "hidden",
                  aspectRatio: "16/10",
                  position: "relative",
                  background: "#111",
                }}
              >
                <ProjectArt kind={p.art} animated={hovered === p.id} />
                <div
                  style={{
                    position: "absolute",
                    left: 16,
                    top: 16,
                    display: "flex",
                    gap: 6,
                  }}
                >
                  <span
                    className="chip"
                    style={{
                      background: "rgba(0,0,0,0.55)",
                      borderColor: "rgba(255,255,255,0.18)",
                      color: "#fff",
                    }}
                  >
                    {p.year}
                  </span>
                  <span
                    className="chip"
                    style={{
                      background: "rgba(0,0,0,0.55)",
                      borderColor: "rgba(255,255,255,0.18)",
                      color: "#fff",
                    }}
                  >
                    {p.role}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div
                style={{
                  order: reverse ? 1 : 2,
                  padding: "8px 4px 8px 8px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 16,
                  }}
                >
                  <div>
                    <div
                      className="mono"
                      style={{ color: "var(--fg-muted)", marginBottom: 16 }}
                    >
                      PROJECT /{p.id}
                    </div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 44,
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.05,
                      }}
                    >
                      {p.name}
                    </h3>
                  </div>
                  <button
                    className="arrow"
                    aria-label="Open case study"
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      border: "1px solid var(--line)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <p
                  className="body"
                  style={{ marginTop: 20, marginBottom: 24, maxWidth: 520 }}
                >
                  {p.blurb}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    marginBottom: 32,
                  }}
                >
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="chip"
                      style={{ height: 26, fontSize: 11 }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "auto",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    paddingTop: 24,
                    borderTop: "1px solid var(--line)",
                  }}
                >
                  {p.metrics.map((m, k) => (
                    <div key={k}>
                      <div
                        style={{
                          fontSize: 28,
                          fontWeight: 400,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {m.value}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--fg-muted)",
                          marginTop: 2,
                        }}
                      >
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* CTA */}
      <div
        className="reveal"
        style={{
          marginTop: 64,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          padding: "60px 40px",
          borderRadius: "var(--radius)",
          background: "var(--surface-2)",
          border: "1px solid var(--line)",
          textAlign: "center",
        }}
      >
        <div className="mono" style={{ color: "var(--fg-muted)" }}>
          ◍ THE FULL ARCHIVE
        </div>
        <h3
          style={{
            margin: 0,
            fontSize: "clamp(28px, 3vw, 48px)",
            fontWeight: 500,
            letterSpacing: "-0.015em",
            lineHeight: 1.15,
            maxWidth: 720,
          }}
        >
          Want the long version?
          <br />
          <span style={{ color: "var(--fg-muted)" }}>
            Every project, every detail.
          </span>
        </h3>
        <p className="body" style={{ maxWidth: 480, margin: 0 }}>
          The page above is the highlight reel. The full archive includes
          process notes, architecture diagrams, and the trade-offs behind every
          decision.
        </p>
        <Link
          href="/experiences"
          className="btn btn-primary"
          style={{ height: 56, padding: "0 28px", fontSize: 15, marginTop: 8 }}
        >
          See all experiences
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
