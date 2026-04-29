import Link from 'next/link';
import type { BlogPost } from '../../../src/lib/data';
import ProjectArt from '../../../src/lib/components/project-art';

export default function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <section className="shell" style={{ paddingBottom: 60 }}>
      <Link
        href={`/blog/${post.slug}`}
        className="reveal featured-post-link"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 0,
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          border: '1px solid var(--line)',
          background: 'var(--surface)',
        }}
      >
        <div style={{ aspectRatio: '16/11', background: 'var(--bg-3)', position: 'relative' }}>
          <ProjectArt kind={post.cover} animated={false} />
          <div style={{ position: 'absolute', left: 20, top: 20, display: 'flex', gap: 6 }}>
            <span className="chip chip-accent">FEATURED</span>
            <span
              className="chip"
              style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', borderColor: 'rgba(255,255,255,0.18)' }}
            >
              {post.category}
            </span>
          </div>
        </div>

        <div style={{ padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="mono" style={{ color: 'var(--fg-muted)', marginBottom: 20 }}>
            {post.date} · {post.readTime}
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(28px, 3vw, 44px)',
              fontWeight: 500,
              letterSpacing: '-0.015em',
              lineHeight: 1.15,
            }}
          >
            {post.title}
          </h2>
          <p className="body" style={{ marginTop: 20, marginBottom: 28, fontSize: 16 }}>
            {post.excerpt}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {post.tags.map((t) => (
              <span key={t} className="chip" style={{ height: 26, fontSize: 11 }}>
                #{t}
              </span>
            ))}
          </div>
          <div
            style={{
              marginTop: 32,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              color: 'var(--accent)',
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Read post
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </Link>
    </section>
  );
}
