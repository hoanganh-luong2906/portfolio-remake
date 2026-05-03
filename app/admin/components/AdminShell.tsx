"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

interface Props {
  children: React.ReactNode;
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
  const pathname = usePathname();

  const breadcrumb = getBreadcrumb(pathname);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "260px 1fr",
      }}
    >
      {/* Sidebar */}
      <AdminSidebar />

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
