import Link from "next/link";

export default function ExperienceFooter() {
  return (
    <section className="shell" style={{ paddingBottom: 120 }}>
      <div
        className="reveal"
        style={{
          padding: 60,
          borderRadius: "var(--radius)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          border: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "clamp(28px, 3vw, 44px)",
              fontWeight: 500,
              letterSpacing: "-0.015em",
              lineHeight: 1.1,
            }}
          >
            Got a project in mind?
          </h3>
          <p
            className="body"
            style={{ marginTop: 12, marginBottom: 0, maxWidth: 480 }}
          >
            The fastest way to start a conversation is an email with one
            paragraph and one rough deadline.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Link
            href="/#contact"
            className="btn btn-primary"
            style={{ height: 56, padding: "0 28px", fontSize: 15 }}
          >
            Contact me
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href="/"
            className="btn btn-ghost"
            style={{ height: 56, padding: "0 24px", fontSize: 15 }}
          >
            Back to portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
