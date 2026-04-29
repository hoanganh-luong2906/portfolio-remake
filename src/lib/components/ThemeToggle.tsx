"use client";

import { useState, useEffect } from "react";

function getInitialTheme(): "dark" | "light" {
  if (typeof document === "undefined") return "dark";
  return (document.documentElement.getAttribute("data-theme") as "dark" | "light") || "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    try { localStorage.setItem("hal-theme", theme); } catch {}
  }, [theme]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "hal-theme" && (e.newValue === "dark" || e.newValue === "light")) {
        setTheme(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isDark = theme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      style={{
        height: 40,
        width: 64,
        borderRadius: 999,
        background: "var(--surface-2)",
        border: "1px solid var(--line)",
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        padding: "0 4px",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: isDark ? 4 : "calc(100% - 36px)",
          top: 3,
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "var(--accent)",
          color: "var(--accent-ink)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "left .35s cubic-bezier(.2,.8,.2,1)",
          boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
        }}
      >
        {isDark ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" fill="currentColor" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        )}
      </span>
      <span aria-hidden="true" style={{ width: 32, height: 32, display: "inline-block" }} />
      <span aria-hidden="true" style={{ width: 32, height: 32, display: "inline-block" }} />
    </button>
  );
}
