'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PORTFOLIO_DATA } from '../../../src/lib/data';

export default function Hero() {
  const D = PORTFOLIO_DATA;
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const opts: Intl.DateTimeFormatOptions = {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTime(new Date().toLocaleTimeString('en-US', opts));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="shell" style={{ paddingTop: 140, paddingBottom: 80, position: 'relative' }}>
      {/* Top meta row */}
      <div
        className="reveal"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 60,
          borderBottom: '1px solid var(--line)',
          marginBottom: 60,
        }}
      >
        <div className="mono" style={{ color: 'var(--fg-muted)' }}>
          PORTFOLIO · 2024 — 2026
        </div>
        <div className="mono" style={{ color: 'var(--fg-muted)', display: 'flex', gap: 24 }}>
          <span>NYC · {time}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#7AFFB8' }}>
            <span
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#7AFFB8', boxShadow: '0 0 12px #7AFFB8' }}
            />
            AVAILABLE Q3
          </span>
        </div>
      </div>

      {/* Display name */}
      <div className="reveal">
        <div className="eyebrow" style={{ marginBottom: 28 }}>
          ◍ Front-end Developer · Design Engineer
        </div>
        <h1 className="h-display" style={{ margin: 0, fontWeight: 500 }}>
          <span style={{ display: 'block' }}>Hoang Anh</span>
          <span style={{ display: 'block' }}>
            Luong<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
        </h1>
      </div>

      {/* Lower content */}
      <div
        className="reveal"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr 1fr',
          gap: 40,
          marginTop: 80,
          alignItems: 'end',
        }}
      >
        <div>
          <p className="body" style={{ maxWidth: 460, marginTop: 0 }}>
            {D.identity.tagline} I work across the seam between design and engineering — building tools, design systems,
            and the occasional shader.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
            <Link href="#work" className="btn btn-primary">
              See selected work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M6 13l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link href="#contact" className="btn btn-ghost">
              Get in touch
            </Link>
          </div>
        </div>

        {/* Stats card */}
        <div className="glass" style={{ padding: 28 }}>
          <div className="mono" style={{ color: 'var(--fg-muted)', marginBottom: 12 }}>
            — FOCUS
          </div>
          <div style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.35, marginBottom: 18 }}>
            Domain-focused
            <br />
            and patient.
          </div>
          <p style={{ fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.7, margin: 0 }}>
            Three or four problems a year, gone deep. The shape of the work matters more than the headcount.
          </p>
        </div>

        {/* YoE */}
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              fontSize: 80,
              fontWeight: 200,
              lineHeight: 1,
              fontFamily: "var(--font-plus-jakarta, 'Plus Jakarta Sans')",
              color: 'var(--fg)',
              letterSpacing: '-0.04em',
            }}
          >
            +5
            <span style={{ fontSize: 30, fontWeight: 300, color: 'var(--accent)', marginLeft: 6 }}>YoE</span>
          </div>
          <div
            style={{
              fontSize: 13,
              color: 'var(--fg-muted)',
              marginTop: 8,
              lineHeight: 1.7,
              maxWidth: 240,
              marginLeft: 'auto',
            }}
          >
            Worked & collaborated with two-dozen
            <br />
            teams across four time zones.
          </div>
        </div>
      </div>
    </section>
  );
}
