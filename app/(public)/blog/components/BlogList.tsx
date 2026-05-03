"use client";

import type { Post } from "../../../../src/lib/db/schema";
import Link from "next/link";
import { useState } from "react";
import { usePublicPosts } from "@/app/hooks/usePublicData";
import { Badge } from "@/src/components/ui";
import ProjectArt from "../../../../src/components/project-art";
import { formatDate, readTime } from "../../../../src/lib/utils";
import FeaturedPost from "./FeaturedPost";

/* ---- Skeleton shapes ---- */
function SkeletonFeatured() {
  return (
    <section className="shell pb-[60px]">
      <div
        className="skeleton reveal rounded-[var(--radius)] overflow-hidden"
        style={{ height: 420 }}
      />
    </section>
  );
}

function SkeletonCard() {
  return (
    <div className="glass rounded-[var(--radius-sm)] overflow-hidden flex flex-col">
      <div className="skeleton aspect-[16/10]" />
      <div className="p-7 flex flex-col gap-3">
        <div className="skeleton h-3 w-24 rounded" />
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-5/6 rounded" />
      </div>
    </div>
  );
}

export default function BlogList({ count }: { count?: number }) {
  const { data: posts, isLoading } = usePublicPosts();
  const [filter, setFilter] = useState("All");

  if (isLoading) {
    return (
      <>
        <SkeletonFeatured />
        <section className="shell pb-[100px]">
          <div className="reveal grid grid-cols-3 gap-4">
            {Array.from({ length: count ?? 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </section>
      </>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <section className="shell pb-[100px]">
        <div className="text-center text-fg-muted py-20">
          No posts published yet.
        </div>
      </section>
    );
  }

  const categories = [
    "All",
    ...Array.from(new Set(posts.map((p) => p.category))),
  ];
  const [featured, ...rest] = posts;
  const filtered =
    filter === "All" ? rest : rest.filter((p) => p.category === filter);

  return (
    <>
      <FeaturedPost post={featured} />

      <section className="shell pb-[100px]">
        <div className="reveal flex justify-between items-center pb-7 border-b border-line mb-10 flex-wrap gap-4">
          <div className="mono text-fg-muted">
            ◍ ALL POSTS - {filtered.length}
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className="h-[30px] px-3.5 rounded-full text-xs font-semibold tracking-[0.02em] border transition-all duration-[250ms]"
                style={{
                  borderColor: filter === c ? "var(--accent)" : "var(--line)",
                  background: filter === c ? "var(--accent)" : "transparent",
                  color: filter === c ? "#111" : "var(--fg-muted)",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="reveal grid grid-cols-3 gap-4">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="glass blog-card flex flex-col p-0 overflow-hidden"
            >
              <div className="aspect-[16/10] bg-bg-3 relative overflow-hidden">
                <ProjectArt
                  kind={post.cover as import("@/src/lib/data").ArtKind}
                  animated={false}
                />
                <div className="absolute left-3.5 top-3.5">
                  <Badge variant="glass">{post.category}</Badge>
                </div>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <div className="mono text-fg-muted mb-3.5 text-[11px]">
                  {formatDate(post.createdAt)} · {readTime(post.body)}
                </div>
                <h3 className="m-0 text-[22px] font-medium tracking-[-0.01em] leading-[1.25]">
                  {post.title}
                </h3>
                <p className="body mt-3.5 mb-5 text-sm leading-[1.7]">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-line flex justify-between items-center">
                  <div className="flex gap-1 flex-wrap">
                    {post.tags.slice(0, 2).map((t) => (
                      <Badge
                        key={t}
                        size="sm"
                        style={{ height: 22, fontSize: 10 }}
                      >
                        #{t}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-accent font-semibold text-xs">
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
