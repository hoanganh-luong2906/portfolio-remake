'use client';

import type { Project } from '../../../src/lib/data';
import ProjectArt from '../../../src/lib/components/project-art';

const PLACEHOLDER_SECTIONS = [
  {
    heading: 'Context',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. The team came to me with a clear problem and a fuzzy solution space. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. The constraints were real: a six-week timeline, a designer-light org, and a customer base that would notice every regression.',
  },
  {
    heading: 'Architecture',
    body: 'Built on Next.js with the App Router and React Server Components for the data-heavy pages. State machines for the editor surfaces, optimistic UI for everything else. The hot path was instrumented from day one — every interaction emits a span, and the slowest 1% of sessions get sampled for replay.',
  },
  {
    heading: 'Trade-offs',
    body: 'Chose to ship without a full design system because the surface area was too small to justify one. Shipped without dark mode at launch. Chose Postgres over a planet-scale option because the actual data shape was relational and the team would benefit more from familiar tools than from theoretical ceiling.',
  },
  {
    heading: "What I'd change",
    body: "I'd start with the boring parts first — auth, billing, observability — and let the marquee features bake longer. The version we shipped was the right product, but the second six weeks would have produced a much sharper version of the same idea.",
  },
];

interface ExperienceItemProps {
  p: Project;
  open: boolean;
  onToggle: () => void;
}

export default function ExperienceItem({ p, open, onToggle }: ExperienceItemProps) {
  return (
    <article
      className="glass"
      style={{
        overflow: 'hidden',
        transition: 'transform .4s cubic-bezier(.2,.8,.2,1), border-color .3s ease',
      }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          textAlign: 'left',
          background: 'transparent',
          border: 0,
          cursor: 'pointer',
          padding: 36,
          display: 'grid',
          gridTemplateColumns: '60px 1fr 200px 200px auto',
          gap: 32,
          alignItems: 'center',
        }}
      >
        <span className="mono" style={{ color: 'var(--accent)', fontSize: 14 }}>
          /{p.id}
        </span>
        <div>
          <div className="mono" style={{ color: 'var(--fg-muted)', marginBottom: 8, fontSize: 11 }}>
            {p.year} · {p.role}
          </div>
          <h2 style={{ margin: 0, fontSize: 36, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1 }}>
            {p.name}
          </h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {p.stack.slice(0, 3).map((s) => (
            <span key={s} className="chip" style={{ height: 24, fontSize: 11 }}>
              {s}
            </span>
          ))}
        </div>
        <div className="mono" style={{ color: 'var(--fg-muted)', fontSize: 12 }}>
          {p.metrics[0]?.value} <span style={{ opacity: 0.6 }}>{p.metrics[0]?.label}</span>
        </div>
        <span
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '1px solid var(--line)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'transform .35s ease, background .35s ease, color .35s ease',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            background: open ? 'var(--accent)' : 'transparent',
            color: open ? '#111' : '#fff',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* Expandable body */}
      <div
        style={{
          maxHeight: open ? 2400 : 0,
          overflow: 'hidden',
          transition: 'max-height .7s cubic-bezier(.2,.8,.2,1)',
        }}
      >
        <div style={{ padding: '0 36px 40px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40 }}>
          {/* Visual + summary */}
          <div>
            <div
              style={{
                borderRadius: 18,
                overflow: 'hidden',
                aspectRatio: '16/10',
                background: '#111',
                marginBottom: 24,
              }}
            >
              <ProjectArt kind={p.art} animated={open} />
            </div>
            <p className="body" style={{ marginTop: 0, fontSize: 16, lineHeight: 1.85 }}>
              {p.blurb}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
              {p.stack.map((s) => (
                <span key={s} className="chip" style={{ height: 26, fontSize: 11 }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Detail sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                paddingBottom: 24,
                borderBottom: '1px solid var(--line)',
              }}
            >
              {p.metrics.map((m, k) => (
                <div key={k}>
                  <div style={{ fontSize: 32, fontWeight: 400, letterSpacing: '-0.01em' }}>{m.value}</div>
                  <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 4 }}>{m.label}</div>
                </div>
              ))}
            </div>

            {PLACEHOLDER_SECTIONS.map((s, k) => (
              <div key={k}>
                <div className="mono" style={{ color: 'var(--accent)', marginBottom: 12, fontSize: 11 }}>
                  — 0{k + 1} · {s.heading.toUpperCase()}
                </div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: 'rgba(255,255,255,0.75)' }}>{s.body}</p>
              </div>
            ))}

            <div style={{ display: 'flex', gap: 10, marginTop: 8, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
              <a href="#" className="btn btn-ghost" style={{ height: 40, fontSize: 13 }}>
                Live site
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L17 7M9 7h8v8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a href="#" className="btn btn-ghost" style={{ height: 40, fontSize: 13 }}>
                Repo
              </a>
              <a href="#" className="btn btn-ghost" style={{ height: 40, fontSize: 13 }}>
                Case study PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
