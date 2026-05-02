"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../(landing)/components/Logo";
import ThemeToggle from "../../../src/components/ThemeToggle";
import { PORTFOLIO_DATA } from "../../../src/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isExperiences = pathname.startsWith("/experiences");
  const isBlog = pathname.startsWith("/blog");

  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    if (!isHome) return;
    const ids = ["top", "domains", "work", "about", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [isHome]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (id === "contact" && isHome) {
      e.preventDefault();
      const el = document.getElementById("contact");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else if (id === "home" && isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      className="shell"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        paddingTop: 28,
        paddingBottom: 28,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: "var(--nav-bg)",
      }}
    >
      <Logo />

      <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
        {PORTFOLIO_DATA.nav.map((n) => {
          const isActive =
            (n.id === "home" && isHome && activeSection !== "contact") ||
            (n.id === "experiences" && isExperiences) ||
            (n.id === "blog" && isBlog) ||
            (n.id === "contact" && isHome && activeSection === "contact");

          return (
            <Link
              key={n.id}
              href={n.href}
              onClick={(e) => handleNavClick(e, n.id)}
              className={`nav-link ${isActive ? "active" : ""}`}
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: isActive ? "var(--fg)" : "var(--fg-muted)",
              }}
            >
              {n.label}
            </Link>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <span className="mono" style={{ color: "var(--fg-dim)", fontSize: 11 }}>
          {PORTFOLIO_DATA.identity.location}
        </span>
        <ThemeToggle />
      </div>
    </nav>
  );
}
