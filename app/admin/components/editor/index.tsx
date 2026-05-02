"use client";

import type { FormatCmd } from "./actions";
import { useCallback, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { applyFormat, smartEnter } from "./actions";
import { highlight } from "./highlight";

// ─── Toolbar definition ──────────────────────────────────────────────────────

interface ToolbarBtn {
  cmd: FormatCmd;
  title: string;
  shortcut?: string;
  icon: React.ReactNode;
}

const TOOLBAR_GROUPS: ToolbarBtn[][] = [
  [
    {
      cmd: "h1",
      title: "Heading 1",
      icon: (
        <span
          style={{ fontSize: 10, fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          H1
        </span>
      ),
    },
    {
      cmd: "h2",
      title: "Heading 2",
      icon: (
        <span
          style={{ fontSize: 10, fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          H2
        </span>
      ),
    },
    {
      cmd: "h3",
      title: "Heading 3",
      icon: (
        <span
          style={{ fontSize: 10, fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          H3
        </span>
      ),
    },
  ],
  [
    {
      cmd: "bold",
      title: "Bold",
      shortcut: "⌘B",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
        </svg>
      ),
    },
    {
      cmd: "italic",
      title: "Italic",
      shortcut: "⌘I",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" />
        </svg>
      ),
    },
    {
      cmd: "code",
      title: "Inline code",
      shortcut: "⌘E",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
        </svg>
      ),
    },
  ],
  [
    {
      cmd: "link",
      title: "Link",
      shortcut: "⌘K",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
        </svg>
      ),
    },
    {
      cmd: "quote",
      title: "Blockquote",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
        </svg>
      ),
    },
    {
      cmd: "ul",
      title: "Bullet list",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
        </svg>
      ),
    },
    {
      cmd: "ol",
      title: "Numbered list",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z" />
        </svg>
      ),
    },
  ],
  [
    {
      cmd: "codeblock",
      title: "Code block",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />
        </svg>
      ),
    },
    {
      cmd: "hr",
      title: "Horizontal rule",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 13H5v-2h14v2z" />
        </svg>
      ),
    },
  ],
];

// ─── Toolbar ─────────────────────────────────────────────────────────────────

function Toolbar({ onFormat }: { onFormat: (cmd: FormatCmd) => void }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: "7px 12px",
        borderBottom: "1px solid var(--line)",
        background: "var(--bg-2)",
        flexWrap: "wrap",
        minHeight: 42,
      }}
    >
      {TOOLBAR_GROUPS.map((group, gi) => (
        <span
          key={gi}
          style={{ display: "inline-flex", gap: 1, alignItems: "center" }}
        >
          {gi > 0 && (
            <span
              style={{
                width: 1,
                height: 14,
                background: "var(--line-2)",
                margin: "0 5px",
                flexShrink: 0,
                display: "block",
              }}
            />
          )}
          {group.map((btn) => (
            <button
              key={btn.cmd}
              type="button"
              title={btn.shortcut ? `${btn.title}  ${btn.shortcut}` : btn.title}
              onClick={() => onFormat(btn.cmd)}
              className="toolbar-btn"
            >
              {btn.icon}
            </button>
          ))}
        </span>
      ))}
    </div>
  );
}

// ─── Edit pane (textarea + syntax highlight overlay) ─────────────────────────

interface EditPaneProps {
  value: string;
  onChange: (v: string) => void;
  minHeight: number;
  borderRight?: boolean;
  taRef: React.RefObject<HTMLTextAreaElement | null>;
}

function EditPane({
  value,
  onChange,
  minHeight,
  borderRight,
  taRef,
}: EditPaneProps) {
  const preRef = useRef<HTMLPreElement>(null);

  const syncScroll = useCallback(() => {
    if (taRef.current && preRef.current) {
      preRef.current.scrollTop = taRef.current.scrollTop;
    }
  }, [taRef]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const ta = e.currentTarget;
      const { selectionStart: ss, selectionEnd: se } = ta;

      // Tab / Shift+Tab — insert or remove 2-space indent
      if (e.key === "Tab") {
        e.preventDefault();
        if (e.shiftKey) {
          const lStart = value.lastIndexOf("\n", ss - 1) + 1;
          if (value.slice(lStart, lStart + 2) === "  ") {
            const next = value.slice(0, lStart) + value.slice(lStart + 2);
            onChange(next);
            requestAnimationFrame(() =>
              ta.setSelectionRange(
                Math.max(lStart, ss - 2),
                Math.max(lStart, se - 2),
              ),
            );
          }
        } else {
          onChange(`${value.slice(0, ss)}  ${value.slice(se)}`);
          requestAnimationFrame(() => ta.setSelectionRange(ss + 2, ss + 2));
        }
        return;
      }

      // Smart Enter — continue list items
      if (e.key === "Enter" && !e.shiftKey) {
        const result = smartEnter(value, ss);
        if (result) {
          e.preventDefault();
          onChange(result.value);
          requestAnimationFrame(() =>
            ta.setSelectionRange(result.selStart, result.selEnd),
          );
        }
        return;
      }

      // Cmd / Ctrl shortcuts
      if (e.metaKey || e.ctrlKey) {
        const map: Record<string, FormatCmd> = {
          b: "bold",
          i: "italic",
          e: "code",
          k: "link",
        };
        const cmd = map[e.key.toLowerCase()];
        if (cmd) {
          e.preventDefault();
          const result = applyFormat(value, ss, se, cmd);
          onChange(result.value);
          requestAnimationFrame(() =>
            ta.setSelectionRange(result.selStart, result.selEnd),
          );
        }
      }
    },
    [value, onChange],
  );

  return (
    <div
      style={{
        position: "relative",
        minHeight,
        borderRight: borderRight ? "1px solid var(--line)" : "none",
        overflow: "hidden",
      }}
    >
      {/* Syntax highlight layer — sits under the transparent textarea */}
      <pre
        ref={preRef}
        aria-hidden
        className="editor-pre"
        dangerouslySetInnerHTML={{ __html: highlight(value) }}
      />

      {/* Input layer — transparent text so the pre shows through */}
      <textarea
        ref={taRef as React.RefObject<HTMLTextAreaElement>}
        className="editor-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={syncScroll}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        style={{ minHeight }}
      />
    </div>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

type Tab = "edit" | "split" | "preview";
const TABS: { id: Tab; label: string }[] = [
  { id: "edit", label: "Markdown" },
  { id: "split", label: "Split" },
  { id: "preview", label: "Preview" },
];

// ─── Public API ───────────────────────────────────────────────────────────────

interface Props {
  value: string;
  onChange: (v: string) => void;
  height?: number;
}

export default function MarkdownEditor({
  value,
  onChange,
  height = 580,
}: Props) {
  const [tab, setTab] = useState<Tab>("split");
  const taRef = useRef<HTMLTextAreaElement>(null);

  const format = useCallback(
    (cmd: FormatCmd) => {
      const ta = taRef.current;
      if (!ta) return;
      const result = applyFormat(
        value,
        ta.selectionStart,
        ta.selectionEnd,
        cmd,
      );
      onChange(result.value);
      requestAnimationFrame(() => {
        ta.focus();
        ta.setSelectionRange(result.selStart, result.selEnd);
      });
    },
    [value, onChange],
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
      }}
    >
      <Toolbar onFormat={format} />

      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid var(--line)",
          background: "var(--surface)",
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            style={{
              padding: "10px 18px",
              fontSize: 12,
              fontWeight: 600,
              background: "transparent",
              color: tab === t.id ? "var(--fg)" : "var(--fg-muted)",
              borderBottom:
                tab === t.id
                  ? "2px solid var(--accent)"
                  : "2px solid transparent",
              marginBottom: -1,
            }}
          >
            {t.label}
          </button>
        ))}
        <div style={{ marginLeft: "auto", paddingRight: 16 }} className="mono">
          <span style={{ fontSize: 10, color: "var(--fg-dim)" }}>
            GFM · TABLES · CODE BLOCKS
          </span>
        </div>
      </div>

      {/* Panes */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: tab === "split" ? "1fr 1fr" : "1fr",
        }}
      >
        {(tab === "edit" || tab === "split") && (
          <EditPane
            value={value}
            onChange={onChange}
            minHeight={height}
            borderRight={tab === "split"}
            taRef={taRef}
          />
        )}
        {(tab === "preview" || tab === "split") && (
          <div
            className="admin-preview"
            style={{
              padding: "20px 24px",
              maxHeight: height,
              overflowY: "auto",
            }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
