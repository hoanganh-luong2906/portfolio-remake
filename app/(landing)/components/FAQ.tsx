'use client';

import { useState } from 'react';
import { PORTFOLIO_DATA } from '../../../src/lib/data';

export default function FAQ() {
  const D = PORTFOLIO_DATA;
  const [open, setOpen] = useState(0);

  return (
    <section className="shell" style={{ paddingTop: 60, paddingBottom: 120 }}>
      <div
        className="reveal"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 60,
          alignItems: 'start',
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 28 }}>
            ◍ FAQS
          </div>
          <h2 className="h-section" style={{ margin: 0 }}>
            Common
            <br />
            questions.
          </h2>
          <p className="body" style={{ marginTop: 24, maxWidth: 360 }}>
            Most projects start with the same five questions. Here are honest answers. If yours isn&rsquo;t here, the
            email below works.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {D.faqs.map((f, i) => (
            <div
              key={i}
              className={`glass faq-item ${open === i ? 'open' : ''}`}
              onClick={() => setOpen(open === i ? -1 : i)}
              style={{ padding: 28 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 500, letterSpacing: '-0.01em' }}>{f.q}</h3>
                <span
                  className="faq-toggle"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '1px solid var(--line)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <div className="faq-body">
                <p className="body" style={{ margin: 0, fontSize: 15 }}>
                  {f.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
