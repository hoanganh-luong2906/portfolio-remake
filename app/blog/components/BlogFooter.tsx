"use client";

export default function BlogFooter() {
  return (
    <section className="shell" style={{ paddingBottom: 120 }}>
      <div
        className="reveal"
        style={{
          padding: 60,
          borderRadius: "var(--radius)",
          background: "var(--surface-2)",
          border: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 500, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
            Get new posts in your inbox.
          </h3>
          <p className="body" style={{ marginTop: 12, marginBottom: 0, maxWidth: 520 }}>
            One email when something new goes up. No tracking, no other lists, easy unsubscribe.
          </p>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); alert("Subscribed (placeholder)"); }}
          style={{ display: "flex", gap: 8 }}
        >
          <input
            type="email"
            placeholder="you@somewhere.com"
            required
            style={{
              height: 56,
              width: 280,
              padding: "0 18px",
              borderRadius: 10,
              border: "1px solid var(--line)",
              background: "var(--input-bg)",
              color: "var(--fg)",
              fontSize: 14,
              outline: "none",
            }}
          />
          <button type="submit" className="btn btn-primary" style={{ height: 56, padding: "0 28px", fontSize: 15 }}>
            Subscribe
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
