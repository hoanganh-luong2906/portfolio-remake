import Link from 'next/link';
import type { BlogPost } from '../../../src/lib/data';
import { PORTFOLIO_DATA } from '../../../src/lib/data';
import ProjectArt from '../../../src/lib/components/project-art';
import BlogFooter from './BlogFooter';

const POST_SECTIONS = [
  {
    heading: null as string | null,
    lead: true,
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat — and that's just the warm-up. The interesting part comes when the real-world constraints meet the textbook theory.",
    pull: null as string | null,
    list: null as string[] | null,
    code: null as string | null,
  },
  {
    heading: 'The setup',
    lead: false,
    body: "I've been thinking about this problem for a while now. The first time I noticed it was on a Tuesday afternoon, debugging a render path that should have been instantaneous. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore. The numbers said one thing, the user-facing experience said another, and I'd seen this disagreement enough times to know it wasn't a measurement bug.",
    pull: null,
    list: null,
    code: null,
  },
  {
    heading: 'What surprised me',
    lead: false,
    body: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. The conventional wisdom is that you should optimize the hot path, ship, and measure. The conventional wisdom is mostly right — but it has a blind spot.',
    pull: 'The thing nobody mentions is that the hot path moves around. The optimization you ship today is the bottleneck you debug in six months.',
    list: null,
    code: null,
  },
  {
    heading: "How I'd do it now",
    lead: false,
    body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Three things I'd do differently with another year of hindsight: instrument earlier, write down the hypothesis before running the experiment, and resist the urge to ship the first version that works.",
    pull: null,
    list: [
      'Instrument before you optimize. The first hour of any perf work should be establishing a baseline you trust.',
      'Write down what you expect to happen. Half the value of a measurement is the gap between prediction and result.',
      'Resist the urge to ship the first thing that works. The second version is the real product.',
    ],
    code: null,
  },
  {
    heading: 'Code, briefly',
    lead: false,
    body: 'A small example — placeholder, but the shape is right.',
    pull: null,
    list: null,
    code: `// app/[slug]/page.tsx
export default async function Post({ params }) {
  const post = await getPost(params.slug);
  return (
    <article>
      <h1>{post.title}</h1>
      <Markdown>{post.body}</Markdown>
    </article>
  );
}`,
  },
  {
    heading: 'Closing',
    lead: false,
    body: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. If you've made it this far and want to discuss any of this, the contact form on the home page works. So does email. I'd love to hear what you're working on.",
    pull: null,
    list: null,
    code: null,
  },
];

export default function BlogPostDetail({ slug }: { slug: string }) {
  const D = PORTFOLIO_DATA;
  const post: BlogPost = D.blog.find((p) => p.slug === slug) ?? D.blog[0];
  const idx = D.blog.findIndex((p) => p.slug === post.slug);
  const prev = D.blog[idx - 1] as BlogPost | undefined;
  const next = D.blog[idx + 1] as BlogPost | undefined;

  return (
    <>
      {/* Hero */}
      <section className="shell" style={{ paddingTop: 160, paddingBottom: 60 }}>
        <div className="reveal" style={{ marginBottom: 60 }}>
          <Link
            href="/blog"
            className="mono"
            style={{ color: 'var(--fg-muted)', display: 'inline-flex', alignItems: 'center', gap: 8 }}
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
            BACK TO BLOG
          </Link>
        </div>

        <div className="reveal" style={{ maxWidth: 880 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
            <span className="chip chip-accent">{post.category}</span>
            <span className="chip">{post.date}</span>
            <span className="chip">{post.readTime}</span>
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(40px, 5.6vw, 84px)',
              fontWeight: 500,
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
            }}
          >
            {post.title}
          </h1>
          <p className="body" style={{ marginTop: 32, fontSize: 20, lineHeight: 1.7, maxWidth: 720 }}>
            {post.excerpt}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginTop: 40,
              paddingTop: 32,
              borderTop: '1px solid var(--line)',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#111',
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              HAL
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Hoang Anh Luong</div>
              <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>Front-end Developer · Brooklyn, NY</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover */}
      <section className="shell" style={{ paddingBottom: 60 }}>
        <div
          className="reveal"
          style={{ aspectRatio: '16/8', borderRadius: 'var(--radius)', overflow: 'hidden', background: 'var(--bg-3)' }}
        >
          <ProjectArt kind={post.cover} animated={false} />
        </div>
      </section>

      {/* Body */}
      <section className="shell" style={{ paddingBottom: 100 }}>
        <article
          className="reveal"
          style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 36 }}
        >
          {POST_SECTIONS.map((s, i) => (
            <div key={i}>
              {s.heading && (
                <h2
                  style={{
                    margin: '0 0 20px',
                    fontSize: 28,
                    fontWeight: 500,
                    letterSpacing: '-0.015em',
                    lineHeight: 1.2,
                  }}
                >
                  {s.heading}
                </h2>
              )}
              <p
                style={{
                  margin: 0,
                  fontSize: s.lead ? 22 : 17,
                  lineHeight: s.lead ? 1.65 : 1.85,
                  color: 'var(--fg)',
                  opacity: s.lead ? 0.95 : 0.82,
                }}
              >
                {s.body}
              </p>
              {s.pull && (
                <blockquote
                  style={{
                    margin: '32px 0 0',
                    padding: '24px 28px',
                    borderLeft: '3px solid var(--accent)',
                    background: 'var(--surface)',
                    borderRadius: '0 12px 12px 0',
                    fontSize: 22,
                    lineHeight: 1.5,
                    fontStyle: 'italic',
                    color: 'var(--fg)',
                    opacity: 0.95,
                  }}
                >
                  &ldquo;{s.pull}&rdquo;
                </blockquote>
              )}
              {s.list && (
                <ol style={{ margin: '20px 0 0', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {s.list.map((item, k) => (
                    <li key={k} style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--fg)', opacity: 0.82 }}>
                      {item}
                    </li>
                  ))}
                </ol>
              )}
              {s.code && (
                <pre
                  style={{
                    margin: '20px 0 0',
                    padding: 24,
                    borderRadius: 12,
                    background: 'var(--code-bg)',
                    border: '1px solid var(--line)',
                    fontSize: 13,
                    fontFamily: "var(--font-jetbrains-mono, 'JetBrains Mono'), ui-monospace, monospace",
                    color: 'var(--fg)',
                    opacity: 0.92,
                    overflowX: 'auto',
                    lineHeight: 1.7,
                  }}
                >
                  <code>{s.code}</code>
                </pre>
              )}
            </div>
          ))}

          {/* Tags */}
          <div
            style={{
              marginTop: 28,
              paddingTop: 32,
              borderTop: '1px solid var(--line)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
            }}
          >
            {post.tags.map((t) => (
              <span key={t} className="chip">
                #{t}
              </span>
            ))}
          </div>
        </article>
      </section>

      {/* Prev / Next */}
      <section className="shell" style={{ paddingBottom: 80 }}>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {prev ? (
            <Link href={`/blog/${prev.slug}`} className="glass" style={{ padding: 28, display: 'block' }}>
              <div className="mono" style={{ color: 'var(--fg-muted)', marginBottom: 12, fontSize: 11 }}>
                ← PREVIOUS
              </div>
              <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.005em' }}>{prev.title}</div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="glass"
              style={{ padding: 28, display: 'block', textAlign: 'right' }}
            >
              <div className="mono" style={{ color: 'var(--fg-muted)', marginBottom: 12, fontSize: 11 }}>
                NEXT →
              </div>
              <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.005em' }}>{next.title}</div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      <BlogFooter />
    </>
  );
}
