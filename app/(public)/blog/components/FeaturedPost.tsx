import type { Post } from "../../../../src/lib/db/schema";
import Link from "next/link";
import ProjectArt from "../../../../src/components/project-art";
import { formatDate, readTime } from "../../../../src/lib/utils";

export default function FeaturedPost({ post }: { post: Post }) {
  return (
    <section className="shell pb-[60px]">
      <Link
        href={`/blog/${post.slug}`}
        className="reveal featured-post-link grid overflow-hidden border border-line bg-surface rounded-[var(--radius)]"
        style={{ gridTemplateColumns: "1.1fr 1fr" }}
      >
        <div className="aspect-[16/11] bg-bg-3 relative">
          <ProjectArt
            kind={post.cover as import("@/src/lib/data").ArtKind}
            animated={false}
          />
          <div className="absolute left-5 top-5 flex gap-1.5">
            <span className="chip chip-accent">FEATURED</span>
            <span
              className="chip"
              style={{
                background: "rgba(0,0,0,0.55)",
                color: "#fff",
                borderColor: "rgba(255,255,255,0.18)",
              }}
            >
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-12 flex flex-col justify-center">
          <div className="mono text-fg-muted mb-5">
            {formatDate(post.createdAt)} · {readTime(post.body)}
          </div>
          <h2 className="m-0 text-[clamp(28px,3vw,44px)] font-medium tracking-[-0.015em] leading-[1.15]">
            {post.title}
          </h2>
          <p className="body mt-5 mb-7 text-base">{post.excerpt}</p>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span
                key={t}
                className="chip"
                style={{ height: 26, fontSize: 11 }}
              >
                #{t}
              </span>
            ))}
          </div>
          <div className="mt-8 inline-flex items-center gap-2.5 text-accent font-semibold text-sm">
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
