import { PORTFOLIO_DATA } from "../../../src/lib/data";
import Logo from "./Logo";

export default function Contact() {
  const D = PORTFOLIO_DATA;

  return (
    <section
      id="contact"
      className="shell"
      style={{ paddingTop: 80, paddingBottom: 80, position: "relative" }}
    >
      <div
        className="reveal"
        style={{ borderTop: "1px solid var(--line)", paddingTop: 80 }}
      >
        <div className="eyebrow" style={{ marginBottom: 28 }}>
          ◍ CONTACT
        </div>
        <h2
          style={{
            margin: 0,
            fontSize: "clamp(80px, 14vw, 220px)",
            fontWeight: 500,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
          }}
        >
          Let&rsquo;s build
          <br />
          <span
            style={{
              fontStyle: "italic",
              fontWeight: 300,
              color: "var(--fg-muted)",
            }}
          >
            something
          </span>
          <br />
          worth shipping<span style={{ color: "var(--accent)" }}>.</span>
        </h2>

        <div
          style={{
            marginTop: 80,
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            gap: 40,
            paddingTop: 60,
            borderTop: "1px solid var(--line)",
          }}
        >
          <div>
            <Logo />
            <p
              className="body"
              style={{ marginTop: 20, maxWidth: 320, fontSize: 14 }}
            >
              Independent front-end developer building tools, systems, and the
              web&rsquo;s quieter corners. Available for select work.
            </p>
            <div
              className="mono"
              style={{ marginTop: 24, color: "var(--fg-muted)" }}
            >
              © 2026 — H.A.L.
            </div>
          </div>

          <div>
            <div
              className="mono"
              style={{ color: "var(--fg-muted)", marginBottom: 18 }}
            >
              Reach out
            </div>
            <a
              href={`mailto:${D.identity.email}`}
              style={{ display: "block", fontSize: 17, marginBottom: 8 }}
            >
              {D.identity.email}
            </a>
            <a
              href="#"
              style={{
                display: "block",
                fontSize: 17,
                color: "var(--fg-muted)",
                marginBottom: 8,
              }}
            >
              +1 (646) 555-0199
            </a>
            <div
              style={{ fontSize: 14, color: "var(--fg-muted)", marginTop: 20 }}
            >
              99 Mercer Street, 5th Floor
              <br />
              New York, NY 10012
            </div>
          </div>

          <div>
            <div
              className="mono"
              style={{ color: "var(--fg-muted)", marginBottom: 18 }}
            >
              Elsewhere
            </div>
            {(
              [
                ["GitHub", "@hal"],
                ["Read.cv", "/hal"],
                ["Twitter", "@hal_dev"],
                ["Are.na", "/hal"],
              ] as [string, string][]
            ).map(([k, v]) => (
              <a
                key={k}
                href="#"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid var(--line)",
                  fontSize: 14,
                }}
              >
                <span>{k}</span>
                <span style={{ color: "var(--fg-muted)" }}>{v} →</span>
              </a>
            ))}
          </div>

          <div>
            <div
              className="mono"
              style={{ color: "var(--fg-muted)", marginBottom: 18 }}
            >
              This site
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: 14,
                color: "var(--fg-muted)",
                lineHeight: 2,
              }}
            >
              <li>Built in 1 evening</li>
              <li>Built with Next.js · App Router</li>
              <li>Type: Plus Jakarta Sans</li>
              <li>Color: lime accent on charcoal</li>
              <li>No analytics, no cookies</li>
            </ul>
          </div>
        </div>

        {/* Big lettering */}
        <div
          aria-hidden="true"
          style={{
            marginTop: 60,
            paddingTop: 40,
            borderTop: "1px solid var(--line)",
            fontSize: "clamp(80px, 16vw, 280px)",
            letterSpacing: "-0.05em",
            fontWeight: 200,
            lineHeight: 0.85,
            color: "var(--surface-2)",
            textAlign: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          HOANG · ANH · LUONG
        </div>
      </div>
    </section>
  );
}
