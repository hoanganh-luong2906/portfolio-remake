"use client";

import type { Experience, NewExperience } from "@/src/lib/db/schema";
import { useMemo, useState } from "react";
import {
  useCreateExperience,
  useDeleteExperience,
  useExperiences,
  useUpdateExperience,
} from "@/app/hooks/useExperience";
import { Badge, Card, Input, Text } from "@/src/components/ui";

interface ExperienceForm {
  year: string;
  role: string;
  company: string;
  note: string;
  current: boolean;
}

const BLANK: ExperienceForm = {
  year: "",
  role: "",
  company: "",
  note: "",
  current: false,
};

function expToForm(e: Experience): ExperienceForm {
  return {
    year: e.year,
    role: e.role,
    company: e.company,
    note: e.note,
    current: e.current,
  };
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

export default function ExperiencesListClient() {
  const { data: experiences = [], isLoading } = useExperiences();
  const createMutation = useCreateExperience();
  const updateMutation = useUpdateExperience();
  const deleteMutation = useDeleteExperience();

  const [editing, setEditing] = useState<{
    id: number | null;
    form: ExperienceForm;
  } | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return experiences;
    const q = search.toLowerCase();
    return experiences.filter(
      (e) =>
        e.role.toLowerCase().includes(q) ||
        e.company.toLowerCase().includes(q) ||
        e.note.toLowerCase().includes(q),
    );
  }, [experiences, search]);

  const startNew = () => setEditing({ id: null, form: { ...BLANK } });
  const startEdit = (e: Experience) =>
    setEditing({ id: e.id, form: expToForm(e) });
  const cancel = () => setEditing(null);

  const setForm = (patch: Partial<ExperienceForm>) =>
    setEditing((prev) => prev && { ...prev, form: { ...prev.form, ...patch } });

  const handleSave = () => {
    if (!editing) return;
    const { role, company } = editing.form;
    if (!role || !company) return;

    if (editing.id === null) {
      createMutation.mutate(
        {
          ...(editing.form as NewExperience),
          sortOrder: experiences.length,
        },
        { onSuccess: () => setEditing(null) },
      );
    } else {
      updateMutation.mutate(
        { id: editing.id, data: editing.form },
        { onSuccess: () => setEditing(null) },
      );
    }
  };

  const handleDelete = (id: number) => {
    // eslint-disable-next-line no-alert
    if (!confirm("Delete this experience? Cannot be undone.")) return;
    deleteMutation.mutate(id, { onSuccess: () => setEditing(null) });
  };

  const moveUp = (idx: number) => {
    const list = [...experiences];
    if (idx === 0) return;
    const a = list[idx - 1];
    const b = list[idx];
    updateMutation.mutate({ id: a.id, data: { sortOrder: b.sortOrder } });
    updateMutation.mutate({ id: b.id, data: { sortOrder: a.sortOrder } });
  };

  const moveDown = (idx: number) => {
    const list = [...experiences];
    if (idx === list.length - 1) return;
    const a = list[idx];
    const b = list[idx + 1];
    updateMutation.mutate({ id: a.id, data: { sortOrder: b.sortOrder } });
    updateMutation.mutate({ id: b.id, data: { sortOrder: a.sortOrder } });
  };

  const isMutating =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  if (isLoading) {
    return (
      <Text muted style={{ padding: "60px 0", textAlign: "center" }}>
        Loading experiences…
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
            placeholder="Search by role, company or note…"
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
          New experience
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
            <Text
              variant="mono"
              style={{ fontSize: 11, color: "var(--accent)" }}
            >
              — {editing.id === null ? "NEW EXPERIENCE" : "EDITING"}
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
            <FieldWrap label="YEAR(S)">
              <input
                style={monoStyle}
                placeholder="2024 - Now"
                value={editing.form.year}
                onChange={(e) => setForm({ year: e.target.value })}
              />
            </FieldWrap>

            <FieldWrap label="ROLE">
              <input
                style={inputStyle}
                value={editing.form.role}
                onChange={(e) => setForm({ role: e.target.value })}
              />
            </FieldWrap>

            <FieldWrap label="COMPANY">
              <input
                style={inputStyle}
                value={editing.form.company}
                onChange={(e) => setForm({ company: e.target.value })}
              />
            </FieldWrap>

            <FieldWrap label="NOTE">
              <input
                style={inputStyle}
                value={editing.form.note}
                onChange={(e) => setForm({ note: e.target.value })}
              />
            </FieldWrap>
          </div>

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
              checked={editing.form.current}
              onChange={(e) => setForm({ current: e.target.checked })}
            />
            <Text style={{ fontSize: 13 }}>Current role</Text>
          </label>

          <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
            <button
              onClick={handleSave}
              disabled={
                isMutating || !editing.form.role || !editing.form.company
              }
              className="btn btn-primary"
              style={{ height: 40, padding: "0 18px" }}
            >
              {editing.id === null ? "Create" : "Save changes"}
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
            gridTemplateColumns: "44px 140px 1fr 1fr 120px 80px",
            padding: "14px 20px",
            gap: 16,
            borderBottom: "1px solid var(--line)",
            background: "var(--surface)",
          }}
          className="mono"
        >
          <span style={{ color: "var(--fg-dim)", fontSize: 10 }} />
          <span style={{ color: "var(--fg-dim)", fontSize: 10 }}>YEAR</span>
          <span style={{ color: "var(--fg-dim)", fontSize: 10 }}>ROLE</span>
          <span style={{ color: "var(--fg-dim)", fontSize: 10 }}>COMPANY</span>
          <span style={{ color: "var(--fg-dim)", fontSize: 10 }}>STATUS</span>
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
            No experiences found.
          </div>
        ) : (
          filtered.map((e, idx) => (
            <div
              key={e.id}
              style={{
                display: "grid",
                gridTemplateColumns: "44px 140px 1fr 1fr 120px 80px",
                padding: "16px 20px",
                gap: 16,
                alignItems: "center",
                borderBottom: "1px solid var(--line)",
              }}
            >
              {/* Reorder buttons */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <button
                  onClick={() => moveUp(idx)}
                  disabled={idx === 0 || isMutating}
                  style={{
                    width: 24,
                    height: 20,
                    borderRadius: 4,
                    border: "1px solid var(--line)",
                    background: "var(--surface-2)",
                    color: idx === 0 ? "var(--fg-dim)" : "var(--fg-muted)",
                    cursor: idx === 0 ? "default" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                  }}
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveDown(idx)}
                  disabled={
                    idx === filtered.length - 1 || isMutating
                  }
                  style={{
                    width: 24,
                    height: 20,
                    borderRadius: 4,
                    border: "1px solid var(--line)",
                    background: "var(--surface-2)",
                    color:
                      idx === filtered.length - 1
                        ? "var(--fg-dim)"
                        : "var(--fg-muted)",
                    cursor:
                      idx === filtered.length - 1 ? "default" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                  }}
                  aria-label="Move down"
                >
                  ↓
                </button>
              </div>

              {/* Year */}
              <div
                className="mono"
                style={{ fontSize: 12, color: "var(--fg-muted)" }}
              >
                {e.year}
              </div>

              {/* Role */}
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{e.role}</div>
                {e.note && (
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--fg-dim)",
                      marginTop: 2,
                    }}
                  >
                    {e.note}
                  </div>
                )}
              </div>

              {/* Company */}
              <div style={{ fontSize: 13, fontWeight: 500 }}>{e.company}</div>

              {/* Current badge */}
              <div>
                {e.current && (
                  <Badge
                    size="sm"
                    style={{
                      height: 22,
                      fontSize: 10,
                      background: "var(--accent)",
                      color: "var(--accent-ink, #000)",
                    }}
                  >
                    CURRENT
                  </Badge>
                )}
              </div>

              {/* Edit */}
              <button
                onClick={() => startEdit(e)}
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
