import type { Post } from "../../../../src/lib/db/schema";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ProjectArt from "../../../../src/components/project-art";
import { formatDate, readTime } from "../../../../src/lib/utils";
import BlogFooter from "./BlogFooter";

export default function BlogPostDetail({
  post,
  prev,
  next,
}: {
  post: Post;
  prev: Post | null;
  next: Post | null;
}) {
  return (
    <>
      {/* Hero */}
      <section className="shell pt-[160px] pb-[60px]">
        <div className="reveal mb-[60px]">
          <Link
            href="/blog"
            className="mono text-fg-muted inline-flex items-center gap-2"
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

        <div className="reveal max-w-[880px]">
          <div className="flex gap-2 mb-6 flex-wrap">
            <span className="chip chip-accent">{post.category}</span>
            <span className="chip">{formatDate(post.createdAt)}</span>
            <span className="chip">{readTime(post.body)}</span>
          </div>
          <h1 className="m-0 text-[clamp(40px,5.6vw,84px)] font-medium tracking-[-0.025em] leading-[1.05]">
            {post.title}
          </h1>
          <p className="body mt-8 text-xl leading-[1.7] max-w-[720px]">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3.5 mt-10 pt-8 border-t border-line">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center text-[#111] font-bold text-sm">
              HAL
            </div>
            <div>
              <div className="text-sm font-semibold">Hoang Anh Luong</div>
              <div className="text-xs text-fg-muted">
                Front-end Developer · Ho Chi Minh City
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover */}
      <section className="shell pb-[60px]">
        <div className="reveal aspect-[16/8] rounded-[var(--radius)] overflow-hidden bg-bg-3">
          <ProjectArt
            kind={post.cover as import("@/src/lib/data").ArtKind}
            animated={false}
          />
        </div>
      </section>

      {/* Body */}
      <section className="shell pb-[100px]">
        <article className="reveal max-w-[760px] mx-auto prose-blog">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        </article>

        {/* Tags */}
        <div className="max-w-[760px] mx-auto mt-7 pt-8 border-t border-line flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <span key={t} className="chip">
              #{t}
            </span>
          ))}
        </div>
      </section>

      {/* Prev / Next */}
      <section className="shell pb-20">
        <div className="reveal grid grid-cols-2 gap-4">
          {prev ? (
            <Link href={`/blog/${prev.slug}`} className="glass block p-7">
              <div className="mono text-fg-muted mb-3 text-[11px]">
                ← PREVIOUS
              </div>
              <div className="text-lg font-medium tracking-[-0.005em]">
                {prev.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="glass block p-7 text-right"
            >
              <div className="mono text-fg-muted mb-3 text-[11px]">NEXT →</div>
              <div className="text-lg font-medium tracking-[-0.005em]">
                {next.title}
              </div>
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
