"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useDeletePost, usePosts, useUpdatePost } from "@/app/hooks/usePost";
import { Card, Input, Text } from "@/src/components/ui";

export default function PostsListClient() {
  const { data: posts = [], isLoading } = usePosts();
  const updateMutation = useUpdatePost();
  const deleteMutation = useDeletePost();
  const [filter, setFilter] = useState<"all" | "published" | "drafts">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return posts
      .filter((p) =>
        filter === "all"
          ? true
          : filter === "published"
            ? p.published
            : !p.published,
      )
      .filter(
        (p) =>
          !query ||
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.join(" ").toLowerCase().includes(query.toLowerCase()),
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }, [posts, filter, query]);

  const handleToggle = (id: number, published: boolean) => {
    updateMutation.mutate({ id, data: { published: !published } });
  };

  const handleDelete = (id: number) => {
    // eslint-disable-next-line no-alert
    if (!confirm("Delete this post? Cannot be undone.")) return;
    deleteMutation.mutate(id);
  };

  const filterOpts = [
    { id: "all" as const, label: "All", count: posts.length },
    {
      id: "published" as const,
      label: "Published",
      count: posts.filter((p) => p.published).length,
    },
    {
      id: "drafts" as const,
      label: "Drafts",
      count: posts.filter((p) => !p.published).length,
    },
  ];

  if (isLoading) {
    return (
      <Text muted style={{ padding: "60px 0", textAlign: "center" }}>
        Loading posts…
      </Text>
    );
  }

  const isMutating = updateMutation.isPending || deleteMutation.isPending;

  return (
    <div style={{ opacity: isMutating ? 0.7 : 1, transition: "opacity 0.2s" }}>
      {/* Filter & search */}
      <Card
        variant="sm"
        style={{
          padding: 12,
          borderRadius: 14,
          display: "flex",
          gap: 10,
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 4,
            padding: 4,
            background: "var(--surface)",
            borderRadius: 10,
            border: "1px solid var(--line)",
          }}
        >
          {filterOpts.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: "8px 14px",
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 7,
                background:
                  filter === f.id ? "var(--surface-2)" : "transparent",
                color: filter === f.id ? "var(--fg)" : "var(--fg-muted)",
                border:
                  filter === f.id
                    ? "1px solid var(--line)"
                    : "1px solid transparent",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {f.label}
              <span style={{ fontSize: 10, color: "var(--fg-dim)" }}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or tag…"
          style={{ height: 40, borderRadius: 10, fontSize: 13 }}
          icon={
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          }
        />
      </Card>

      {/* Table */}
      <Card variant="sm" style={{ borderRadius: 14, overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 150px 130px 130px 220px",
            padding: "14px 20px",
            gap: 16,
            borderBottom: "1px solid var(--line)",
            background: "var(--surface)",
          }}
          className="mono"
        >
          <span style={{ color: "var(--fg-dim)", fontSize: 10 }}>TITLE</span>
          <span style={{ color: "var(--fg-dim)", fontSize: 10 }}>CATEGORY</span>
          <span style={{ color: "var(--fg-dim)", fontSize: 10 }}>STATUS</span>
          <span style={{ color: "var(--fg-dim)", fontSize: 10 }}>UPDATED</span>
          <span
            style={{ color: "var(--fg-dim)", fontSize: 10, textAlign: "right" }}
          >
            ACTIONS
          </span>
        </div>

        {filtered.length === 0 ? (
          <div
            style={{
              padding: 60,
              textAlign: "center",
              color: "var(--fg-muted)",
            }}
          >
            No posts match.
          </div>
        ) : (
          filtered.map((p) => (
            <div
              key={p.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 150px 130px 130px 220px",
                padding: "16px 20px",
                gap: 16,
                alignItems: "center",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <Link
                  href={`/admin/posts/${p.id}`}
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    display: "block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {p.title}
                </Link>
                <div
                  className="mono"
                  style={{ fontSize: 10, color: "var(--fg-dim)", marginTop: 4 }}
                >
                  /{p.slug}
                </div>
              </div>

              <span className="chip" style={{ height: 26, fontSize: 11 }}>
                {p.category}
              </span>

              <span
                className="chip"
                style={{
                  height: 26,
                  fontSize: 11,
                  background: p.published
                    ? "color-mix(in oklab, var(--accent) 14%, transparent)"
                    : "var(--surface-2)",
                  color: p.published ? "var(--accent)" : "var(--fg-muted)",
                  borderColor: p.published
                    ? "color-mix(in oklab, var(--accent) 30%, transparent)"
                    : "var(--line)",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: p.published ? "var(--accent)" : "var(--fg-dim)",
                    flexShrink: 0,
                  }}
                />
                {p.published ? "Published" : "Draft"}
              </span>

              <div
                className="mono"
                style={{ fontSize: 11, color: "var(--fg-muted)" }}
              >
                {new Date(p.updatedAt).toLocaleDateString()}
              </div>

              <div
                style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}
              >
                <button
                  onClick={() => handleToggle(p.id, p.published)}
                  style={{
                    height: 32,
                    padding: "0 12px",
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 7,
                    background: "var(--surface-2)",
                    border: "1px solid var(--line)",
                    color: "var(--fg)",
                  }}
                >
                  {p.published ? "Unpublish" : "Publish"}
                </button>
                <Link
                  href={`/admin/posts/${p.id}`}
                  style={{
                    height: 32,
                    padding: "0 12px",
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 7,
                    background: "var(--surface-2)",
                    border: "1px solid var(--line)",
                    color: "var(--fg)",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 7,
                    background: "var(--surface-2)",
                    border: "1px solid var(--line)",
                    color: "var(--fg-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </Card>

      <div
        style={{
          marginTop: 18,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 12,
          color: "var(--fg-muted)",
        }}
        className="mono"
      >
        <span>
          {filtered.length} OF {posts.length} POSTS
        </span>
        <span>REVALIDATE: /blog · /blog/[slug]</span>
      </div>
    </div>
  );
}
