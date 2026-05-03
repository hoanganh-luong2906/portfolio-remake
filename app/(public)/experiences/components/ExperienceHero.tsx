import Link from "next/link";
import { Text } from "@/src/components/ui";
import { PORTFOLIO_DATA } from "../../../../src/lib/data";

export default function ExperienceHero() {
  const D = PORTFOLIO_DATA;

  return (
    <section className="shell" style={{ paddingTop: 160, paddingBottom: 80 }}>
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
          ◍ THE ARCHIVE · {D.projects.length} PROJECTS
        </Text>
        <Link
          href="/"
          className="mono"
          style={{
            color: "var(--fg-muted)",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M11 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          BACK TO PORTFOLIO
        </Link>
      </div>

      <div className="reveal">
        <Text variant="eyebrow" style={{ marginBottom: 28 }}>
          ◍ EXPERIENCES - DETAILED
        </Text>
        <Text
          variant="h-display"
          as="h1"
          style={{ margin: 0, fontWeight: 500 }}
        >
          Every project,
          <br />
          <span style={{ color: "var(--fg-muted)" }}>unfolded.</span>
        </Text>
        <Text variant="body" style={{ marginTop: 32, maxWidth: 640 }}>
          Click any project below to expand its case study. Each entry includes
          the context, the architecture choices, the trade-offs, and what
          I&rsquo;d do differently with another year of perspective.
        </Text>
      </div>
    </section>
  );
}
