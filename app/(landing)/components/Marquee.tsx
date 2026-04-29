import { PORTFOLIO_DATA } from "../../../src/lib/data";

export default function Marquee() {
  const items = [...PORTFOLIO_DATA.marquee, ...PORTFOLIO_DATA.marquee];

  return (
    <section
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        overflow: "hidden",
        padding: "26px 0",
        background: "var(--surface-2)",
      }}
    >
      <div className="marquee">
        {items.map((s, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 60,
              fontSize: 28,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
            }}
          >
            {s}
            <span style={{ color: "var(--accent)", fontSize: 18 }}>✱</span>
          </span>
        ))}
      </div>
    </section>
  );
}
