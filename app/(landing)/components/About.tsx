import { PORTFOLIO_DATA } from '@/src/lib/data';

export default function About() {
  const D = PORTFOLIO_DATA;

  return (
    <section id="about" className="shell" style={{ paddingTop: 140, paddingBottom: 120 }}>
      <div className="reveal" style={{ marginBottom: 72 }}>
        <div className="eyebrow" style={{ marginBottom: 28 }}>
          ◍ ABOUT — A SHORT BIO
        </div>
        <h2 className="h-section" style={{ margin: 0, maxWidth: 1100 }}>
          Trained as a designer, hooked on engineering.
          <span style={{ color: 'var(--fg-muted)' }}> Now I sit in the gap.</span>
        </h2>
      </div>

      <div
        className="reveal"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 60,
          alignItems: 'start',
        }}
      >
        {/* Bio */}
        <div style={{ fontSize: 18, lineHeight: 1.85, color: 'var(--fg)', opacity: 0.88 }}>
          <p style={{ marginTop: 0 }}>
            I started as a print designer in Hanoi, switched to product design when I moved to New York, and
            accidentally became an engineer because I kept opening the inspector to fix things myself. None of that is
            on the résumé, but it&rsquo;s why I work the way I do.
          </p>
          <p>
            The most useful thing I bring to a team is taste calibrated by what&rsquo;s actually shippable. I can tell
            you in the room why a shadow is making the page feel cheap, and I can also tell you what the perf cost will
            be to fix it.
          </p>
          <p style={{ marginBottom: 0 }}>
            When I&rsquo;m not in a tab, I&rsquo;m running long, reading slow, and trying to convince anyone
            who&rsquo;ll listen that <em>cartography</em> is the most interesting design problem of the next ten years.
          </p>
        </div>

        {/* Experiences timeline */}
        <div className="glass" style={{ padding: 32 }}>
          <div className="mono" style={{ color: 'var(--fg-muted)', marginBottom: 24 }}>
            — EXPERIENCE
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {D.experiences.map((e, i) => (
              <li
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr auto',
                  gap: 16,
                  padding: '20px 0',
                  borderBottom: i < D.experiences.length - 1 ? '1px solid var(--line)' : 'none',
                  alignItems: 'baseline',
                }}
              >
                <div className="mono" style={{ color: 'var(--fg-muted)', fontSize: 11 }}>
                  {e.year}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 500 }}>{e.role}</div>
                  <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 2 }}>{e.note}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{e.company}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
