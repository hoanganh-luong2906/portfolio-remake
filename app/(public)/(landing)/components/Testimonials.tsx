import { Card, Text } from "@/src/components/ui";
import { PORTFOLIO_DATA } from "@/src/lib/data";

export default function Testimonials() {
  const D = PORTFOLIO_DATA;

  return (
    <section className="shell" style={{ paddingTop: 60, paddingBottom: 120 }}>
      <div className="reveal" style={{ marginBottom: 60 }}>
        <Text variant="eyebrow" style={{ marginBottom: 28 }}>
          ◍ KIND WORDS
        </Text>
        <Text variant="h-section" style={{ margin: 0, maxWidth: 980 }}>
          What collaborators
          <br />
          tend to say.
        </Text>
      </div>

      <div
        className="reveal"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
      >
        {D.testimonials.map((t, i) => (
          <Card
            key={i}
            as="figure"
            style={{
              padding: 36,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 28,
            }}
          >
            <svg
              width="32"
              height="24"
              viewBox="0 0 32 24"
              fill="var(--accent)"
              style={{ opacity: 0.7 }}
            >
              <path d="M0 24V14C0 6.27 5.06 0.93 12 0L13.2 4.4c-3.73.93-6.13 3.6-6.93 7.13H12V24H0zm18.8 0V14c0-7.73 5.07-13.07 12-14l1.2 4.4c-3.73.93-6.13 3.6-6.93 7.13H32V24H18.8z" />
            </svg>
            <p
              style={{
                margin: 0,
                fontSize: 22,
                lineHeight: 1.55,
                fontWeight: 500,
                letterSpacing: "-0.005em",
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>
            <figcaption
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginTop: "auto",
                paddingTop: 16,
                borderTop: "1px solid var(--line)",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, var(--accent), var(--accent-2))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-ink)",
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                {t.name
                  .split(" ")
                  .map((s) => s[0])
                  .join("")}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>
                  {t.title}
                </div>
              </div>
            </figcaption>
          </Card>
        ))}
      </div>
    </section>
  );
}
