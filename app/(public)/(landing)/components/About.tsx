import type { Experience } from "@/src/lib/db/schema";
import { Card, Text } from "@/src/components/ui";

export default function About({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <section
      id="about"
      className="shell"
      style={{ paddingTop: 140, paddingBottom: 120 }}
    >
      <div className="reveal" style={{ marginBottom: 72 }}>
        <Text variant="eyebrow" style={{ marginBottom: 28 }}>
          ◍ ABOUT - A SHORT BIO
        </Text>
        <Text variant="h-section" style={{ margin: 0, maxWidth: 1100 }}>
          Trained as a designer, hooked on engineering.
          <span style={{ color: "var(--fg-muted)" }}>
            {" "}
            Now I sit in the gap.
          </span>
        </Text>
      </div>

      <div
        className="reveal"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 60,
          alignItems: "start",
        }}
      >
        {/* Bio */}
        <div
          style={{
            fontSize: 18,
            lineHeight: 1.85,
            color: "var(--fg)",
            opacity: 0.88,
          }}
        >
          <p style={{ marginTop: 0 }}>
            I started as a print designer in Hanoi, switched to product design
            when I moved to New York, and accidentally became an engineer
            because I kept opening the inspector to fix things myself. None of
            that is on the résumé, but it&rsquo;s why I work the way I do.
          </p>
          <p>
            The most useful thing I bring to a team is taste calibrated by
            what&rsquo;s actually shippable. I can tell you in the room why a
            shadow is making the page feel cheap, and I can also tell you what
            the perf cost will be to fix it.
          </p>
          <p style={{ marginBottom: 0 }}>
            When I&rsquo;m not in a tab, I&rsquo;m running long, reading slow,
            and trying to convince anyone who&rsquo;ll listen that{" "}
            <em>cartography</em> is the most interesting design problem of the
            next ten years.
          </p>
        </div>

        {/* Experiences timeline */}
        <Card style={{ padding: 32 }}>
          <Text variant="mono" muted style={{ marginBottom: 24 }}>
            - EXPERIENCE
          </Text>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            {experiences.map((e, i) => (
              <li
                key={e.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr auto",
                  gap: 16,
                  padding: "20px 0",
                  borderBottom:
                    i < experiences.length - 1
                      ? "1px solid var(--line)"
                      : "none",
                  alignItems: "baseline",
                }}
              >
                <div
                  className="mono"
                  style={{ color: "var(--fg-muted)", fontSize: 11 }}
                >
                  {e.year}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 500 }}>{e.role}</div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--fg-muted)",
                      marginTop: 2,
                    }}
                  >
                    {e.note}
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{e.company}</div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
