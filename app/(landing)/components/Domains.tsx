'use client';

import { PORTFOLIO_DATA } from '../../../src/lib/data';

export default function Domains() {
  const D = PORTFOLIO_DATA;

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section id="domains" className="shell" style={{ paddingTop: 140, paddingBottom: 100 }}>
      <div
        className="reveal"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          marginBottom: 72,
          alignItems: 'end',
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 28 }}>
            ◍ TECHNICAL DOMAINS — 06
          </div>
          <h2 className="h-section" style={{ margin: 0 }}>
            The disciplines
            <br />I work across.
          </h2>
        </div>
        <p className="body" style={{ maxWidth: 480 }}>
          I&rsquo;m a generalist by curiosity, a specialist by focus. The list below is what I&rsquo;ve actually shipped
          — production, in front of users — not just dabbled with on a weekend.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {D.domains.map((d, i) => (
          <article
            key={d.id}
            className="glass domain-card reveal"
            onMouseMove={handleMove}
            style={{
              padding: 32,
              minHeight: 320,
              display: 'flex',
              flexDirection: 'column',
              transitionDelay: `${i * 60}ms`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 60 }}>
              <span className="mono" style={{ color: 'var(--accent)' }}>
                /{d.id}
              </span>
              <span className="chip">{d.meta}</span>
            </div>
            <h3 style={{ margin: 0, fontSize: 28, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.15 }}>
              {d.title}
            </h3>
            <p className="body" style={{ marginTop: 16, marginBottom: 'auto', fontSize: 14, lineHeight: 1.75 }}>
              {d.blurb}
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
                marginTop: 28,
                paddingTop: 20,
                borderTop: '1px solid var(--line)',
              }}
            >
              {d.stack.map((s) => (
                <span key={s} className="chip" style={{ height: 26, fontSize: 11, padding: '0 10px' }}>
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
