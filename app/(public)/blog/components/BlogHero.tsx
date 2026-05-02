import { PORTFOLIO_DATA } from "../../../../src/lib/data";

export default function BlogHero() {
  const D = PORTFOLIO_DATA;

  return (
    <section className="shell" style={{ paddingTop: 160, paddingBottom: 60 }}>
      <div
        className="reveal"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 60,
          borderBottom: "1px solid var(--line)",
          marginBottom: 80,
        }}
      >
        <div className="mono" style={{ color: "var(--fg-muted)" }}>
          ◍ WRITING · {D.blog.length} POSTS
        </div>
        <div className="mono" style={{ color: "var(--fg-muted)" }}>
          UPDATED — APR 2026
        </div>
      </div>

      <div className="reveal">
        <div className="eyebrow" style={{ marginBottom: 28 }}>
          ◍ BLOG — NOTES & ESSAYS
        </div>
        <h1
          className="h-display"
          style={{ margin: 0, fontWeight: 500, maxWidth: 1100 }}
        >
          Notes from
          <br />
          <span style={{ color: "var(--fg-muted)" }}>the workshop.</span>
        </h1>
        <p className="body" style={{ marginTop: 32, maxWidth: 640 }}>
          Short writing on engineering, design systems, and the trade-offs that
          don&rsquo;t fit in a tweet. Roughly one post a month, sometimes two.
        </p>
      </div>
    </section>
  );
}
