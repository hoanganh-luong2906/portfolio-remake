"use client";

import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";
import { usePosts } from "@/app/hooks/usePost";

export default function AdminPage() {
  const { firstName } = useAuth();
  const { data: allPosts = [] } = usePosts();
  const published = allPosts.filter((p) => p.published).length;
  const drafts = allPosts.length - published;

  const recent = [...allPosts]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div style={{ padding: "44px 36px 80px" }}>
      {/* Greeting */}
      <div style={{ marginBottom: 44 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>
          ◍ DASHBOARD
        </div>
        <h1
          className="h-section"
          style={{ margin: 0, fontSize: "clamp(40px, 5vw, 64px)" }}
        >
          Good to see you, {firstName ?? "there"}
          <span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p
          className="body"
          style={{ marginTop: 14, maxWidth: 540, marginBottom: 0 }}
        >
          {drafts > 0
            ? `${drafts} draft${drafts > 1 ? "s" : ""} waiting. Keep the momentum going.`
            : "All posts are live. Ready to write something new?"}
        </p>
      </div>

      {/* Stat row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 18,
          marginBottom: 44,
        }}
      >
        <StatCard
          label="— PUBLISHED"
          value={published}
          delta="↑ live now"
          hint="Posts visible at /blog right now."
          accent
        />
        <StatCard
          label="— DRAFTS"
          value={drafts}
          delta={drafts > 0 ? "in progress" : "—"}
          hint="Saved but not yet live. Resume from the editor."
        />
        <StatCard
          label="— TOTAL"
          value={allPosts.length}
          delta="all-time"
          hint="Everything written, including unpublished work."
        />
      </div>

      {/* Recent activity + quick actions */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 24 }}
      >
        {/* Recent activity */}
        <div className="glass" style={{ padding: 28, borderRadius: 20 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 22,
            }}
          >
            <div
              className="mono"
              style={{ fontSize: 11, color: "var(--fg-muted)" }}
            >
              — RECENT ACTIVITY
            </div>
            <Link
              href="/admin/posts"
              style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600 }}
            >
              View all →
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {recent.length === 0 ? (
              <div
                style={{
                  padding: "20px 0",
                  color: "var(--fg-muted)",
                  fontSize: 14,
                }}
              >
                No posts yet.
              </div>
            ) : (
              recent.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/admin/posts/${p.id}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto auto",
                    gap: 16,
                    alignItems: "center",
                    padding: "14px 0",
                    borderTop: i === 0 ? "none" : "1px solid var(--line)",
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {p.title}
                    </div>
                    <div
                      className="mono"
                      style={{
                        fontSize: 10,
                        color: "var(--fg-dim)",
                        marginTop: 4,
                      }}
                    >
                      {p.published ? "PUBLISHED" : "DRAFT"} ·{" "}
                      {new Date(p.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <span
                    className="chip"
                    style={{
                      height: 24,
                      fontSize: 10,
                      background: p.published
                        ? "color-mix(in oklab, var(--accent) 14%, transparent)"
                        : undefined,
                      color: p.published ? "var(--accent)" : undefined,
                      borderColor: p.published
                        ? "color-mix(in oklab, var(--accent) 30%, transparent)"
                        : undefined,
                    }}
                  >
                    {p.published ? "LIVE" : "DRAFT"}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ color: "var(--fg-dim)", flexShrink: 0 }}
                  >
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Link
            href="/admin/posts/new"
            className="glass"
            style={{
              padding: 28,
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              gap: 18,
              flex: 1,
            }}
          >
            <div
              className="mono"
              style={{ fontSize: 11, color: "var(--fg-muted)" }}
            >
              — NEW POST
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              Start a fresh
              <br />
              draft<span style={{ color: "var(--accent)" }}>.</span>
            </div>
            <div
              style={{
                marginTop: "auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                className="mono"
                style={{ fontSize: 11, color: "var(--fg-muted)" }}
              >
                MARKDOWN · LIVE PREVIEW
              </span>
              <span
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  color: "var(--accent-ink)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </div>
          </Link>

          <Link
            href="/admin/posts"
            className="glass"
            style={{
              padding: 28,
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              gap: 18,
              flex: 1,
            }}
          >
            <div
              className="mono"
              style={{ fontSize: 11, color: "var(--fg-muted)" }}
            >
              — MANAGE
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              Edit, publish,
              <br />
              or unpublish.
            </div>
            <div
              style={{
                marginTop: "auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                className="mono"
                style={{ fontSize: 11, color: "var(--fg-muted)" }}
              >
                {allPosts.length} POSTS · {drafts} DRAFTS
              </span>
              <span
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "var(--surface-2)",
                  border: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  delta,
  hint,
  accent,
}: {
  label: string;
  value: number;
  delta?: string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div className="glass" style={{ padding: 28, borderRadius: 20 }}>
      <div
        className="mono"
        style={{ color: "var(--fg-muted)", fontSize: 11, marginBottom: 18 }}
      >
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <div
          style={{
            fontSize: 56,
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: accent ? "var(--accent)" : "var(--fg)",
          }}
        >
          {value}
        </div>
        {delta && (
          <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>{delta}</div>
        )}
      </div>
      {hint && (
        <div
          style={{
            fontSize: 13,
            color: "var(--fg-muted)",
            marginTop: 14,
            lineHeight: 1.55,
          }}
        >
          {hint}
        </div>
      )}
    </div>
  );
}
