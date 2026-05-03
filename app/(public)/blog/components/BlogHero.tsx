import { Text } from "@/src/components/ui";
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
        <Text variant="mono" muted>
          ◍ WRITING · {D.blog.length} POSTS
        </Text>
        <Text variant="mono" muted>
          UPDATED - APR 2026
        </Text>
      </div>

      <div className="reveal">
        <Text variant="eyebrow" style={{ marginBottom: 28 }}>
          ◍ BLOG - NOTES & ESSAYS
        </Text>
        <Text
          variant="h-display"
          as="h1"
          style={{ margin: 0, fontWeight: 500, maxWidth: 1100 }}
        >
          Notes from
          <br />
          <span style={{ color: "var(--fg-muted)" }}>the workshop.</span>
        </Text>
        <Text variant="body" style={{ marginTop: 32, maxWidth: 640 }}>
          Short writing on engineering, design systems, and the trade-offs that
          don&rsquo;t fit in a tweet. Roughly one post a month, sometimes two.
        </Text>
      </div>
    </section>
  );
}
