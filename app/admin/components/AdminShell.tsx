"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { Text } from "@/src/components/ui";
import { NAV_ITEMS } from "./constants";

interface Props {
  children: React.ReactNode;
}

function getActive(pathname: string) {
  if (pathname === "/admin") return "dashboard";
  if (pathname === "/admin/posts/new") return "new";
  if (pathname.startsWith("/admin/posts")) return "posts";
  return "dashboard";
}

function getBreadcrumb(pathname: string) {
  if (pathname === "/admin") {
    return [{ label: "Admin", href: "/admin" }, { label: "Dashboard" }];
  }
  if (pathname === "/admin/posts/new") {
    return [
      { label: "Admin", href: "/admin" },
      { label: "Posts", href: "/admin/posts" },
      { label: "New" },
    ];
  }
  if (/^\/admin\/posts\/\d+/.test(pathname)) {
    return [
      { label: "Admin", href: "/admin" },
      { label: "Posts", href: "/admin/posts" },
      { label: "Edit" },
    ];
  }
  if (pathname === "/admin/posts") {
    return [{ label: "Admin", href: "/admin" }, { label: "Posts" }];
  }
  return [{ label: "Admin", href: "/admin" }];
}

export default function AdminShell({ children }: Props) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const t =
      (document.documentElement.getAttribute("data-theme") as
        | "dark"
        | "light") || "dark";
    setTheme(t);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    document.body.setAttribute("data-theme", next);
    try {
      localStorage.setItem("hal-theme", next);
    } catch {}
  };

  const active = getActive(pathname);
  const breadcrumb = getBreadcrumb(pathname);
  const initials =
    user && user.name
      ? user.name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 3)
          .toUpperCase()
      : "HAL";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "260px 1fr",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          borderRight: "1px solid var(--line)",
          background: "var(--bg-2)",
          display: "flex",
          flexDirection: "column",
          padding: "28px 22px",
          overflow: "hidden",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 36,
          }}
        >
          <svg width="34" height="34" viewBox="0 0 38 38" fill="none">
            <circle cx="19" cy="19" r="18.5" stroke="var(--line-2)" />
            <path
              d="M11 13 L11 25 M11 19 L19 19 M19 13 L19 25 M23 13 L27 19 L23 25 M27 13 L23 19"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <div
            style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}
          >
            <span
              style={{ fontWeight: 700, fontSize: 16, letterSpacing: "0.02em" }}
            >
              HAL
            </span>
            <Text variant="mono" dim style={{ fontSize: 10, marginTop: 4 }}>
              ADMIN · v1.0
            </Text>
          </div>
        </Link>

        <Text
          variant="mono"
          dim
          style={{ fontSize: 10, marginBottom: 12, paddingLeft: 8 }}
        >
          WORKSPACE
        </Text>

        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV_ITEMS.map((n) => {
            const isActive = n.id === active;
            return (
              <Link
                key={n.id}
                href={n.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 500,
                  background: isActive ? "var(--surface-2)" : "transparent",
                  color: isActive ? "var(--fg)" : "var(--fg-muted)",
                  border: isActive
                    ? "1px solid var(--line)"
                    : "1px solid transparent",
                  position: "relative",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  {n.icon}
                </svg>
                {n.label}
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      right: 12,
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--accent)",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div
          style={{
            marginTop: "auto",
            paddingTop: 20,
            borderTop: "1px solid var(--line)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 4px",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent-2))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent-ink)",
                fontWeight: 700,
                fontSize: 12,
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user && user.name ? user.name : "Admin"}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--fg-dim)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user && user.email ? user.email : ""}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={toggleTheme}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
              style={{
                flex: 1,
                height: 36,
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                background: "var(--surface-2)",
                border: "1px solid var(--line)",
                color: "var(--fg-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              {theme === "dark" ? "☾  Dark" : "☀  Light"}
            </button>
            <button
              onClick={() => signOut("/")}
              title="Sign out"
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
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
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        {/* Topbar */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            height: 64,
            padding: "0 36px",
            borderBottom: "1px solid var(--line)",
            background: "var(--bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: 10 }}
            className="mono"
          >
            {breadcrumb.map((b, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {i > 0 && <span style={{ color: "var(--fg-dim)" }}>/</span>}
                {"href" in b ? (
                  <Link
                    href={b.href!}
                    style={{
                      color:
                        i === breadcrumb.length - 1
                          ? "var(--fg)"
                          : "var(--fg-muted)",
                      fontSize: 12,
                    }}
                  >
                    {b.label}
                  </Link>
                ) : (
                  <span
                    style={{
                      color:
                        i === breadcrumb.length - 1
                          ? "var(--fg)"
                          : "var(--fg-muted)",
                      fontSize: 12,
                    }}
                  >
                    {b.label}
                  </span>
                )}
              </span>
            ))}
          </div>
          <span
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--fg-dim)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#7AFFB8",
                boxShadow: "0 0 12px #7AFFB8",
              }}
            />
            CONNECTED · MAIN
          </span>
        </header>

        {children}
      </main>
    </div>
  );
}
