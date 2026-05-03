"use client";

import type { ArtKind } from "@/src/lib/data";
import type { Metric, NewProject, Project } from "@/src/lib/db/schema";
import { useMemo, useState } from "react";
import {
  useCreateProject,
  useDeleteProject,
  useProjects,
  useUpdateProject,
} from "@/app/hooks/useProject";
import ProjectArt from "@/src/components/project-art";
import { Badge, Card, Input, Text } from "@/src/components/ui";

const ART_OPTIONS: ArtKind[] = ["loom", "helix", "atlas", "tessera", "pulse"];
const TONE_OPTIONS = ["lime", "ember", "sky", "rose", "mint", "violet"];

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface ProjectForm {
  title: string;
  slug: string;
  year: string;
  role: string;
  company: string;
  art: ArtKind;
  tone: string;
  stack: string;
  summary: string;
  metrics: Metric[];
  featured: boolean;
}

const BLANK: ProjectForm = {
  title: "",
  slug: "",
  year: "",
  role: "",
  company: "",
  art: "loom",
  tone: "lime",
  stack: "",
  summary: "",
  metrics: [{ value: "", label: "" }],
  featured: false,
};

function projectToForm(p: Project): ProjectForm {
  return {
    title: p.title,
    slug: p.slug,
    year: p.year,
    role: p.role,
    company: p.company,
    art: p.art as ArtKind,
    tone: p.tone,
    stack: p.stack.join(", "),
    summary: p.summary,
    metrics: p.metrics.length ? p.metrics : [{ value: "", label: "" }],
    featured: p.featured,
  };
}

function formToPayload(f: ProjectForm): Partial<NewProject> {
  return {
    title: f.title,
    slug: f.slug,
    year: f.year,
    role: f.role,
    company: f.company,
    art: f.art,
    tone: f.tone,
    stack: f.stack
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    summary: f.summary,
    metrics: f.metrics.filter((m) => m.value || m.label),
    featured: f.featured,
  };
}

/* ---- sub-components ---- */

function FieldWrap({
  label,
  full,
  children,
}: {
  label: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ gridColumn: full ? "1 / -1" : "auto" }}>
      <Text
        variant="mono"
        dim
        style={{ fontSize: 10, letterSpacing: "0.1em", marginBottom: 8 }}
      >
        {label}
      </Text>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 40,
  padding: "0 12px",
  borderRadius: 8,
  border: "1px solid var(--line)",
  background: "var(--input-bg)",
  color: "var(--fg)",
  fontSize: 13,
  outline: "none",
};

const monoStyle: React.CSSProperties = {
  ...inputStyle,
  fontFamily: "'JetBrains Mono', monospace",
};

export default function ProjectsListClient() {
  const { data: projects = [], isLoading } = useProjects();
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();

  const [editing, setEditing] = useState<{
    id: number | null;
    form: ProjectForm;
  } | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return projects;
    const q = search.toLowerCase();
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q),
    );
  }, [projects, search]);

  const startNew = () =>
    setEditing({ id: null, form: { ...BLANK, metrics: [{ value: "", label: "" }] } });
  const startEdit = (p: Project) =>
    setEditing({ id: p.id, form: projectToForm(p) });
  const cancel = () => setEditing(null);

  const setForm = (patch: Partial<ProjectForm>) =>
    setEditing((prev) => prev && { ...prev, form: { ...prev.form, ...patch } });

  const handleSave = () => {
    if (!editing) return;
    const payload = formToPayload(editing.form);
    if (!payload.title || !payload.slug) return;

    if (editing.id === null) {
      createMutation.mutate(
        { ...(payload as NewProject), sortOrder: projects.length },
        { onSuccess: () => setEditing(null) },
      );
    } else {
      updateMutation.mutate(
        { id: editing.id, data: payload },
        { onSuccess: () => setEditing(null) },
      );
    }
  };

  const handleDelete = (id: number) => {
    // eslint-disable-next-line no-alert
    if (!confirm("Delete this project? Cannot be undone.")) return;
    deleteMutation.mutate(id, { onSuccess: () => setEditing(null) });
  };

  const handleToggleFeatured = (p: Project) => {
    updateMutation.mutate({ id: p.id, data: { featured: !p.featured } });
  };

  const isMutating =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const updateMetric = (i: number, field: keyof Metric, val: string) => {
    if (!editing) return;
    const next = editing.form.metrics.map((m, idx) =>
      idx === i ? { ...m, [field]: val } : m,
    );
    setForm({ metrics: next });
  };

  const addMetric = () => {
    if (!editing) return;
    setForm({ metrics: [...editing.form.metrics, { value: "", label: "" }] });
  };

  const removeMetric = (i: number) => {
    if (!editing) return;
    setForm({ metrics: editing.form.metrics.filter((_, idx) => idx !== i) });
  };

  if (isLoading) {
    return (
      <Text muted style={{ padding: "60px 0", textAlign: "center" }}>
        Loading projects…
      </Text>
    );
  }

  return (
    <div style={{ opacity: isMutating ? 0.7 : 1, transition: "opacity 0.2s" }}>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <div style={{ flex: 1 }}>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, role or company…"
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
        </div>
        <button
          onClick={startNew}
          className="btn btn-primary"
          style={{ height: 40, padding: "0 18px", whiteSpace: "nowrap" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
              fill="currentColor"
            />
          </svg>
          New project
        </button>
      </div>

      {/* Editor drawer */}
      {editing && (
        <Card
          variant="sm"
          style={{
            padding: 28,
            borderRadius: 16,
            marginBottom: 20,
            border: "1px solid var(--accent)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 22,
            }}
          >
            <Text variant="mono" style={{ fontSize: 11, color: "var(--accent)" }}>
              — {editing.id === null ? "NEW PROJECT" : "EDITING"}
            </Text>
            <button
              onClick={cancel}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--fg-muted)",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            {/* Title */}
            <FieldWrap label="TITLE">
              <input
                style={inputStyle}
                value={editing.form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm({
                    title,
                    slug: editing.id === null ? slugify(title) : editing.form.slug,
                  });
                }}
              />
            </FieldWrap>

            {/* Slug */}
            <FieldWrap label="SLUG">
              <input
                style={monoStyle}
                value={editing.form.slug}
                onChange={(e) => setForm({ slug: e.target.value })}
              />
            </FieldWrap>

            {/* Year */}
            <FieldWrap label="YEAR">
              <input
                style={monoStyle}
                value={editing.form.year}
                onChange={(e) => setForm({ year: e.target.value })}
              />
            </FieldWrap>

            {/* Role */}
            <FieldWrap label="ROLE">
              <input
                style={inputStyle}
                value={editing.form.role}
                onChange={(e) => setForm({ role: e.target.value })}
              />
            </FieldWrap>

            {/* Company */}
            <FieldWrap label="COMPANY">
              <input
                style={inputStyle}
                value={editing.form.company}
                onChange={(e) => setForm({ company: e.target.value })}
              />
            </FieldWrap>

            {/* Tone */}
            <FieldWrap label="TONE">
              <select
                style={monoStyle}
                value={editing.form.tone}
                onChange={(e) => setForm({ tone: e.target.value })}
              >
                {TONE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </FieldWrap>

            {/* Stack */}
            <FieldWrap label="STACK (comma-separated)" full>
              <input
                style={inputStyle}
                value={editing.form.stack}
                onChange={(e) => setForm({ stack: e.target.value })}
              />
            </FieldWrap>

            {/* Summary */}
            <FieldWrap label="SUMMARY" full>
              <textarea
                style={{
                  ...inputStyle,
                  height: 80,
                  padding: "10px 12px",
                  resize: "vertical",
                }}
                value={editing.form.summary}
                onChange={(e) => setForm({ summary: e.target.value })}
                rows={3}
              />
            </FieldWrap>
          </div>

          {/* Cover art */}
          <div style={{ marginTop: 16 }}>
            <Text
              variant="mono"
              dim
              style={{ fontSize: 10, letterSpacing: "0.1em", marginBottom: 10 }}
            >
              COVER ART
            </Text>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {ART_OPTIONS.map((art) => (
                <button
                  key={art}
                  onClick={() => setForm({ art })}
                  style={{
                    width: 80,
                    height: 52,
                    borderRadius: 10,
                    overflow: "hidden",
                    border:
                      editing.form.art === art
                        ? "2px solid var(--accent)"
                        : "2px solid var(--line)",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <ProjectArt kind={art} animated={false} />
                </button>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div style={{ marginTop: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                variant="mono"
                dim
                style={{ fontSize: 10, letterSpacing: "0.1em" }}
              >
                METRICS
              </Text>
              <button
                onClick={addMetric}
                style={{
                  fontSize: 11,
                  color: "var(--accent)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                + Add
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {editing.form.metrics.map((m, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    style={{ ...monoStyle, flex: "0 0 120px" }}
                    placeholder="value"
                    value={m.value}
                    onChange={(e) => updateMetric(i, "value", e.target.value)}
                  />
                  <input
                    style={{ ...inputStyle, flex: 1 }}
                    placeholder="label"
                    value={m.label}
                    onChange={(e) => updateMetric(i, "label", e.target.value)}
                  />
                  {editing.form.metrics.length > 1 && (
                    <button
                      onClick={() => removeMetric(i)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--fg-muted)",
                        cursor: "pointer",
                        fontSize: 16,
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Featured */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 18,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={editing.form.featured}
              onChange={(e) => setForm({ featured: e.target.checked })}
            />
            <Text style={{ fontSize: 13 }}>Featured on home page</Text>
          </label>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
            <button
              onClick={handleSave}
              disabled={isMutating || !editing.form.title || !editing.form.slug}
              className="btn btn-primary"
              style={{ height: 40, padding: "0 18px" }}
            >
              {editing.id === null ? "Create project" : "Save changes"}
            </button>
            {editing.id !== null && (
              <button
                onClick={() => handleDelete(editing.id!)}
                disabled={isMutating}
                style={{
                  height: 40,
                  padding: "0 18px",
                  borderRadius: 8,
                  background: "transparent",
                  border: "1px solid var(--line)",
                  color: "#ff6b6b",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            )}
          </div>
        </Card>
      )}

      {/* Table */}
      <Card variant="sm" style={{ borderRadius: 14, overflow: "hidden" }}>
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "60px 1fr 1fr 120px 100px 80px",
            padding: "14px 20px",
            gap: 16,
            borderBottom: "1px solid var(--line)",
            background: "var(--surface)",
          }}
          className="mono"
        >
          <span style={{ color: "var(--fg-dim)", fontSize: 10 }} />
          <span style={{ color: "var(--fg-dim)", fontSize: 10 }}>PROJECT</span>
          <span style={{ color: "var(--fg-dim)", fontSize: 10 }}>STACK</span>
          <span style={{ color: "var(--fg-dim)", fontSize: 10 }}>YEAR</span>
          <span style={{ color: "var(--fg-dim)", fontSize: 10 }}>FEATURED</span>
          <span style={{ color: "var(--fg-dim)", fontSize: 10 }} />
        </div>

        {filtered.length === 0 ? (
          <div
            style={{
              padding: 60,
              textAlign: "center",
              color: "var(--fg-muted)",
            }}
          >
            No projects found.
          </div>
        ) : (
          filtered.map((p) => (
            <div
              key={p.id}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr 1fr 120px 100px 80px",
                padding: "16px 20px",
                gap: 16,
                alignItems: "center",
                borderBottom: "1px solid var(--line)",
              }}
            >
              {/* Art thumbnail */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  overflow: "hidden",
                  background: "var(--bg-3, #111)",
                  flexShrink: 0,
                }}
              >
                <ProjectArt kind={p.art as ArtKind} animated={false} />
              </div>

              {/* Title + role */}
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
                  style={{
                    fontSize: 11,
                    color: "var(--fg-dim)",
                    marginTop: 2,
                  }}
                >
                  {p.role}
                  {p.company ? ` · ${p.company}` : ""}
                </div>
              </div>

              {/* Stack chips */}
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {p.stack.slice(0, 3).map((s) => (
                  <Badge key={s} size="sm" style={{ height: 22, fontSize: 10 }}>
                    {s}
                  </Badge>
                ))}
              </div>

              {/* Year */}
              <div
                className="mono"
                style={{ fontSize: 12, color: "var(--fg-muted)" }}
              >
                {p.year}
              </div>

              {/* Featured toggle */}
              <button
                onClick={() => handleToggleFeatured(p)}
                disabled={isMutating}
                aria-label={p.featured ? "Remove from featured" : "Add to featured"}
                style={{
                  width: 36,
                  height: 22,
                  borderRadius: 999,
                  position: "relative",
                  background: p.featured
                    ? "var(--accent)"
                    : "var(--surface-2)",
                  border: "1px solid var(--line)",
                  cursor: "pointer",
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 2,
                    left: p.featured ? 16 : 2,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: p.featured
                      ? "var(--accent-ink, #000)"
                      : "var(--fg-muted)",
                    transition: "left .25s ease",
                  }}
                />
              </button>

              {/* Edit button */}
              <button
                onClick={() => startEdit(p)}
                style={{
                  height: 32,
                  padding: "0 12px",
                  borderRadius: 6,
                  background: "var(--surface-2)",
                  border: "1px solid var(--line)",
                  color: "var(--fg)",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}
