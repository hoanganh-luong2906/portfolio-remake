"use client";

import type { ArtKind } from "@/src/lib/data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCreatePost, usePost, useUpdatePost } from "@/app/hooks/usePost";
import ProjectArt from "@/src/components/project-art";
import MarkdownEditor from "./editor";

export const CATEGORIES = ["Engineering", "Design", "Career", "Process", "OSS"];
export const COVERS: ArtKind[] = ["loom", "helix", "tessera", "pulse", "atlas"];

interface PostForm {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  cover: string;
  tags: string;
  body: string;
}

interface Props {
  mode: "new" | "edit";
  postId?: number;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div
        className="mono"
        style={{ fontSize: 10, color: "var(--fg-dim)", marginBottom: 8 }}
      >
        — {label}
      </div>
      {children}
    </div>
  );
}

export default function PostEditorClient({ mode, postId }: Props) {
  const router = useRouter();
  const { data: post, isLoading: isLoadingPost } = usePost(postId ?? 0);
  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost();
  const isPending = createMutation.isPending || updateMutation.isPending;
  const publishIntentRef = useRef(false);

  const [form, setForm] = useState<PostForm>({
    title: "",
    slug: "",
    excerpt: "",
    category: CATEGORIES[0],
    cover: COVERS[0],
    tags: "",
    body: "# New post\n\nWrite your opening paragraph here.\n",
  });

  useEffect(() => {
    if (mode === "edit" && post) {
      setForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        category: post.category,
        cover: COVERS.includes(post.cover as ArtKind)
          ? (post.cover as ArtKind)
          : COVERS[0],
        tags: post.tags.join(", "),
        body: post.body,
      });
    }
  }, [post, mode]);

  const update = (k: keyof PostForm, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onTitle = (v: string) => {
    update("title", v);
    if (mode === "new" || !form.slug) update("slug", slugify(v));
  };

  const wordCount = useMemo(
    () => form.body.trim().split(/\s+/).filter(Boolean).length,
    [form.body],
  );
  const readTime = Math.max(1, Math.round(wordCount / 220));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      excerpt: form.excerpt,
      category: form.category,
      cover: form.cover,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      body: form.body,
      published: publishIntentRef.current,
    };
    if (mode === "new") {
      createMutation.mutate(data, {
        onSuccess: () => router.push("/admin/posts"),
      });
    } else {
      updateMutation.mutate(
        { id: postId!, data },
        { onSuccess: () => router.push("/admin/posts") },
      );
    }
  };

  if (mode === "edit" && isLoadingPost) {
    return (
      <div style={{ padding: "80px 36px", color: "var(--fg-muted)" }}>
        Loading post…
      </div>
    );
  }

  const EDITOR_HEIGHT = 580;

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ padding: "32px 36px 80px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 28,
            gap: 24,
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>
              ◍ {mode === "new" ? "NEW POST" : "EDIT POST"}
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: 32,
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              {form.title || (mode === "new" ? "Untitled draft" : "Edit")}
            </h1>
            <div
              className="mono"
              style={{ fontSize: 11, color: "var(--fg-dim)", marginTop: 8 }}
            >
              /{form.slug || "slug-from-title"} · {wordCount} words · ~
              {readTime} min read
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Link
              href="/admin/posts"
              className="btn btn-ghost"
              style={{ height: 44 }}
            >
              Cancel
            </Link>
            <button
              type="submit"
              onClick={() => {
                publishIntentRef.current = false;
              }}
              disabled={isPending}
              className="btn btn-ghost"
              style={{ height: 44 }}
            >
              Save draft
            </button>
            <button
              type="submit"
              onClick={() => {
                publishIntentRef.current = true;
              }}
              disabled={isPending}
              className="btn btn-primary"
              style={{ height: 44 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12l5 5L20 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isPending ? "Saving…" : "Publish"}
            </button>
          </div>
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: 24,
            alignItems: "start",
          }}
        >
          {/* Meta sidebar */}
          <div
            className="glass"
            style={{
              padding: 24,
              borderRadius: 14,
              position: "sticky",
              top: 84,
            }}
          >
            <Field label="TITLE">
              <input
                name="title"
                required
                value={form.title}
                onChange={(e) => onTitle(e.target.value)}
                placeholder="A field guide to…"
                style={{
                  width: "100%",
                  height: 40,
                  padding: "0 12px",
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 8,
                  color: "var(--fg)",
                  fontSize: 13,
                  outline: "none",
                }}
              />
            </Field>

            <Field label="SLUG">
              <input
                value={form.slug}
                onChange={(e) => update("slug", e.target.value)}
                placeholder="auto-from-title"
                style={{
                  width: "100%",
                  height: 40,
                  padding: "0 12px",
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 8,
                  color: "var(--fg)",
                  fontSize: 12,
                  outline: "none",
                  fontFamily:
                    'var(--font-jetbrains-mono, "JetBrains Mono"), monospace',
                }}
              />
            </Field>

            <Field label="EXCERPT">
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={(e) => update("excerpt", e.target.value)}
                rows={3}
                placeholder="One or two sentences shown in listings."
                style={{
                  width: "100%",
                  padding: 12,
                  resize: "vertical",
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 8,
                  color: "var(--fg)",
                  fontSize: 13,
                  outline: "none",
                  lineHeight: 1.55,
                  fontFamily: "inherit",
                }}
              />
            </Field>

            <Field label="CATEGORY">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => update("category", c)}
                    className="chip"
                    style={{
                      cursor: "pointer",
                      background:
                        form.category === c
                          ? "var(--accent)"
                          : "var(--surface-2)",
                      color:
                        form.category === c
                          ? "var(--accent-ink)"
                          : "var(--fg-muted)",
                      borderColor:
                        form.category === c ? "var(--accent)" : "var(--line)",
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="COVER ART">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: 6,
                }}
              >
                {COVERS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => update("cover", c)}
                    title={c}
                    style={{
                      aspectRatio: "1/1",
                      borderRadius: 8,
                      overflow: "hidden",
                      background: "var(--bg-3)",
                      border:
                        form.cover === c
                          ? "2px solid var(--accent)"
                          : "1px solid var(--line)",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    <ProjectArt kind={c} animated={false} />
                  </button>
                ))}
              </div>
              <div
                className="mono"
                style={{ fontSize: 10, color: "var(--fg-dim)", marginTop: 8 }}
              >
                {form.cover.toUpperCase()}
              </div>
            </Field>

            <Field label="TAGS">
              <input
                name="tags"
                value={form.tags}
                onChange={(e) => update("tags", e.target.value)}
                placeholder="comma, separated, tags"
                style={{
                  width: "100%",
                  height: 40,
                  padding: "0 12px",
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 8,
                  color: "var(--fg)",
                  fontSize: 13,
                  outline: "none",
                }}
              />
            </Field>
          </div>

          {/* Editor pane */}
          <div
            className="glass"
            style={{ borderRadius: 14, overflow: "hidden" }}
          >
            <MarkdownEditor
              value={form.body}
              onChange={(v) => update("body", v)}
              height={EDITOR_HEIGHT}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: 18,
            display: "flex",
            justifyContent: "flex-end",
            fontSize: 11,
            color: "var(--fg-dim)",
          }}
          className="mono"
        >
          <span>
            {wordCount} WORDS · ~{readTime} MIN READ
          </span>
        </div>
      </div>
    </form>
  );
}
