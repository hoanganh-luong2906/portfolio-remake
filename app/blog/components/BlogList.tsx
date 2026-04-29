'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PORTFOLIO_DATA } from '../../../src/lib/data';
import FeaturedPost from './FeaturedPost';
import ProjectArt from '../../../src/lib/components/project-art';

export default function BlogList() {
  const D = PORTFOLIO_DATA;
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(D.blog.map((p) => p.category)))];
  const [featured, ...rest] = D.blog;
  const filtered = filter === 'All' ? rest : rest.filter((p) => p.category === filter);

  return (
    <>
      <FeaturedPost post={featured} />

      <section className="shell" style={{ paddingBottom: 100 }}>
        <div
          className="reveal"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 28,
            borderBottom: '1px solid var(--line)',
            marginBottom: 40,
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div className="mono" style={{ color: 'var(--fg-muted)' }}>
            ◍ ALL POSTS — {filtered.length}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                style={{
                  height: 30,
                  padding: '0 14px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  border: '1px solid',
                  borderColor: filter === c ? 'var(--accent)' : 'var(--line)',
                  background: filter === c ? 'var(--accent)' : 'transparent',
                  color: filter === c ? '#111' : 'var(--fg-muted)',
                  cursor: 'pointer',
                  transition: 'all .25s ease',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="glass blog-card"
              style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}
            >
              <div
                style={{ aspectRatio: '16/10', background: 'var(--bg-3)', position: 'relative', overflow: 'hidden' }}
              >
                <ProjectArt kind={post.cover} animated={false} />
                <div style={{ position: 'absolute', left: 14, top: 14 }}>
                  <span
                    className="chip"
                    style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', borderColor: 'rgba(255,255,255,0.18)' }}
                  >
                    {post.category}
                  </span>
                </div>
              </div>
              <div style={{ padding: 28, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div className="mono" style={{ color: 'var(--fg-muted)', marginBottom: 14, fontSize: 11 }}>
                  {post.date} · {post.readTime}
                </div>
                <h3 style={{ margin: 0, fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.25 }}>
                  {post.title}
                </h3>
                <p className="body" style={{ marginTop: 14, marginBottom: 20, fontSize: 14, lineHeight: 1.7 }}>
                  {post.excerpt}
                </p>
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: 16,
                    borderTop: '1px solid var(--line)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {post.tags.slice(0, 2).map((t) => (
                      <span key={t} className="chip" style={{ height: 22, fontSize: 10 }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span style={{ color: 'var(--accent)', fontWeight: 600, fontSize: 12 }}>Read →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
