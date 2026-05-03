// Admin UI — shared components & per-route content
const { useEffect, useState, useMemo } = React;

// Mock data store (in real app this is server-side)
const ADMIN_DATA = {
  user: {
    name: "Hoang Anh Luong",
    email: "hello@hal.studio",
    avatar: "HAL",
  },
  posts: [
    { id: "1", slug: "rendering-modes-in-nextjs", title: "A field guide to rendering modes in Next.js", excerpt: "Static, dynamic, streaming, and PPR — when each one earns its keep.", category: "Engineering", cover: "loom", tags: ["Next.js", "RSC", "Performance"], published: true, created_at: "2026-04-12", updated_at: "2026-04-13", readTime: "9 min" },
    { id: "2", slug: "design-tokens-as-an-api", title: "Treating design tokens like a public API", excerpt: "Tokens are not a stylesheet. They're a contract between design and engineering.", category: "Design", cover: "helix", tags: ["Tokens", "Design Systems", "Process"], published: true, created_at: "2026-03-28", updated_at: "2026-03-28", readTime: "7 min" },
    { id: "3", slug: "shaders-on-a-budget", title: "Shaders on a budget: hero scenes that hold up on a $300 laptop", excerpt: "How to ship a WebGL hero that doesn't melt low-end devices.", category: "Engineering", cover: "tessera", tags: ["WebGL", "Performance", "GLSL"], published: true, created_at: "2026-03-02", updated_at: "2026-03-04", readTime: "12 min" },
    { id: "4", slug: "the-quiet-power-of-htmx", title: "The quiet power of HTMX in a React-first career", excerpt: "I'm a React engineer. I also shipped a side project in HTMX in a weekend.", category: "Engineering", cover: "pulse", tags: ["HTMX", "Side Projects"], published: true, created_at: "2026-02-15", updated_at: "2026-02-15", readTime: "6 min" },
    { id: "5", slug: "maps-are-the-most-interesting-design-problem", title: "Why maps are the most interesting design problem", excerpt: "A reading list, a thesis, and a slow argument that map UX has been frozen for 15 years.", category: "Design", cover: "atlas", tags: ["Maps", "Cartography", "UX"], published: false, created_at: "2026-01-22", updated_at: "2026-04-30", readTime: "11 min" },
    { id: "6", slug: "ship-the-second-version", title: "Ship the second version", excerpt: "First versions are negotiations with the unknown.", category: "Process", cover: "loom", tags: ["Process", "Career"], published: true, created_at: "2026-01-04", updated_at: "2026-01-04", readTime: "4 min" },
    { id: "7", slug: "draft-state-machines", title: "(Draft) State machines for forms that don't lie", excerpt: "Working notes on XState for the post-form-libraries era.", category: "Engineering", cover: "helix", tags: ["XState", "Forms"], published: false, created_at: "2026-04-28", updated_at: "2026-05-01", readTime: "—" },
  ],
  categories: ["Engineering", "Design", "Career", "Process", "OSS"],
  covers: ["loom", "helix", "tessera", "pulse", "atlas"],
  projects: [
    { id: "p1", slug: "loom", title: "Loom", year: "2025", role: "Lead Engineer", company: "Loom Inc.", art: "loom", stack: ["Next.js", "tRPC", "Postgres"], summary: "Async-video collaboration tools for distributed teams.", featured: true },
    { id: "p2", slug: "helix", title: "Helix Studio", year: "2024", role: "Design Engineer", company: "Helix", art: "helix", stack: ["Next.js", "Three.js", "GLSL"], summary: "Generative tool for biotech research storytelling.", featured: true },
    { id: "p3", slug: "tessera", title: "Tessera", year: "2024", role: "Front-end", company: "Tessera Labs", art: "tessera", stack: ["React", "WebGL", "Zustand"], summary: "Mosaic-based editorial CMS for magazines.", featured: false },
    { id: "p4", slug: "pulse", title: "Pulse", year: "2023", role: "Founding Engineer", company: "Pulse Health", art: "pulse", stack: ["Next.js", "Supabase"], summary: "Cardiac monitoring dashboard for clinicians.", featured: false },
    { id: "p5", slug: "atlas", title: "Atlas", year: "2023", role: "Engineer", company: "Atlas Maps", art: "atlas", stack: ["MapLibre", "TypeScript"], summary: "Cartographic toolkit for indie publishers.", featured: false },
  ],
  experiences: [
    { id: "e1", year: "2025 — Now", role: "Design Engineer", company: "Independent", note: "Studios, founders, & weekend tools", current: true },
    { id: "e2", year: "2023 — 2025", role: "Senior Front-end", company: "Loom", note: "Editor & playback systems" },
    { id: "e3", year: "2022 — 2023", role: "Front-end Engineer", company: "Helix Studio", note: "Generative web experiences" },
    { id: "e4", year: "2021 — 2022", role: "Freelance", company: "Self", note: "Studios & startups" },
  ],
};

window.ADMIN_DATA = ADMIN_DATA;

// --- Theme hook (same as portfolio) ---
function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute("data-theme") || "dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    try { localStorage.setItem("hal-theme", theme); } catch {}
  }, [theme]);
  return [theme, setTheme];
}

// --- Admin Shell (sidebar + topbar) ---
const AdminShell = ({ active, children, breadcrumb }) => {
  const [theme, setTheme] = useTheme();
  const D = window.ADMIN_DATA;

  const navItems = [
    { id: "dashboard", label: "Dashboard", href: "Admin.html", icon: (<path d="M3 13h7V3H3v10zm0 8h7v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor"/>) },
    { id: "posts", label: "Posts", href: "AdminPosts.html", icon: (<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 18H6V4h7v5h5v11z" fill="currentColor"/>) },
    { id: "projects", label: "Projects", href: "AdminProjects.html", icon: (<path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor"/>) },
    { id: "experiences", label: "Experiences", href: "AdminExperiences.html", icon: (<path d="M20 6h-4V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-6 0h-4V4h4v2z" fill="currentColor"/>) },
    { id: "new", label: "New post", href: "AdminPostNew.html", icon: (<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>) },
    { id: "view", label: "View site", href: "Portfolio.html", icon: (<path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7z" fill="currentColor"/>) },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "260px 1fr" }}>
      {/* Sidebar */}
      <aside style={{
        position: "sticky", top: 0, height: "100vh",
        borderRight: "1px solid var(--line)",
        background: "var(--bg-2)",
        display: "flex", flexDirection: "column",
        padding: "28px 22px",
      }}>
        <a href="Portfolio.html" style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
          <svg width="34" height="34" viewBox="0 0 38 38" fill="none">
            <circle cx="19" cy="19" r="18.5" stroke="var(--line-2)" />
            <path d="M11 13 L11 25 M11 19 L19 19 M19 13 L19 25 M23 13 L27 19 L23 25 M27 13 L23 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "0.02em" }}>HAL</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--fg-dim)", marginTop: 4 }}>ADMIN · v1.0</span>
          </div>
        </a>

        <div className="mono" style={{ fontSize: 10, color: "var(--fg-dim)", marginBottom: 12, paddingLeft: 8 }}>WORKSPACE</div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map((n) => {
            const isActive = n.id === active;
            return (
              <a key={n.id} href={n.href} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 12px",
                borderRadius: 10,
                fontSize: 14, fontWeight: 500,
                background: isActive ? "var(--surface-2)" : "transparent",
                color: isActive ? "var(--fg)" : "var(--fg-muted)",
                border: isActive ? "1px solid var(--line)" : "1px solid transparent",
                position: "relative",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24">{n.icon}</svg>
                {n.label}
                {isActive && <span style={{ position: "absolute", right: 12, width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />}
              </a>
            );
          })}
        </nav>

        <div style={{ marginTop: "auto", paddingTop: 20, borderTop: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 4px", marginBottom: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: `linear-gradient(135deg, var(--accent), var(--accent-2))`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--accent-ink)", fontWeight: 700, fontSize: 12,
            }}>{D.user.avatar}</div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{D.user.name}</div>
              <div style={{ fontSize: 11, color: "var(--fg-dim)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{D.user.email}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
              style={{
                flex: 1, height: 36, borderRadius: 8, fontSize: 12, fontWeight: 600,
                background: "var(--surface-2)", border: "1px solid var(--line)", color: "var(--fg-muted)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}>
              {theme === "dark" ? "☾  Dark" : "☀  Light"}
            </button>
            <a href="Login.html" title="Sign out" style={{
              width: 36, height: 36, borderRadius: 8,
              background: "var(--surface-2)", border: "1px solid var(--line)", color: "var(--fg-muted)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
            </a>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Topbar */}
        <header style={{
          position: "sticky", top: 0, zIndex: 10,
          height: 64, padding: "0 36px",
          borderBottom: "1px solid var(--line)",
          background: "var(--bg)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="mono">
            {breadcrumb.map((b, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span style={{ color: "var(--fg-dim)" }}>/</span>}
                {b.href ? (
                  <a href={b.href} style={{ color: i === breadcrumb.length - 1 ? "var(--fg)" : "var(--fg-muted)", fontSize: 12 }}>{b.label}</a>
                ) : (
                  <span style={{ color: i === breadcrumb.length - 1 ? "var(--fg)" : "var(--fg-muted)", fontSize: 12 }}>{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--fg-dim)", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7AFFB8", boxShadow: "0 0 12px #7AFFB8" }} />
              CONNECTED · MAIN
            </span>
            <span className="mono" style={{ fontSize: 11, color: "var(--fg-dim)" }}>⌘K</span>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};

// --- Stat card ---
const StatCard = ({ label, value, delta, hint, accent }) => (
  <div className="glass" style={{ padding: 28, borderRadius: 20 }}>
    <div className="mono" style={{ color: "var(--fg-muted)", fontSize: 11, marginBottom: 18 }}>{label}</div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
      <div style={{ fontSize: 56, fontWeight: 300, lineHeight: 1, letterSpacing: "-0.03em", color: accent ? "var(--accent)" : "var(--fg)" }}>{value}</div>
      {delta && <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>{delta}</div>}
    </div>
    <div style={{ fontSize: 13, color: "var(--fg-muted)", marginTop: 14, lineHeight: 1.55 }}>{hint}</div>
  </div>
);

// --- Dashboard ---
const Dashboard = () => {
  const D = window.ADMIN_DATA;
  const published = D.posts.filter((p) => p.published).length;
  const drafts = D.posts.filter((p) => !p.published).length;
  const total = D.posts.length;
  const recent = [...D.posts].sort((a, b) => (b.updated_at > a.updated_at ? 1 : -1)).slice(0, 5);

  return (
    <AdminShell active="dashboard" breadcrumb={[{ label: "Admin", href: "Admin.html" }, { label: "Dashboard" }]}>
      <div style={{ padding: "44px 36px 80px", maxWidth: 1280 }}>
        {/* Greeting */}
        <div style={{ marginBottom: 44 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>◍ DASHBOARD</div>
          <h1 className="h-section" style={{ margin: 0, fontSize: "clamp(40px, 5vw, 64px)" }}>
            Good morning, Hoang<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <p className="body" style={{ marginTop: 14, maxWidth: 540 }}>
            Quiet day — {drafts} drafts waiting, last published 5 days ago.
            Worth shipping <em>"Ship the second version"</em> later this week.
          </p>
        </div>

        {/* Stat row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginBottom: 44 }}>
          <StatCard label="— PUBLISHED" value={published} delta="↑ 1 this month" hint="Posts visible at /blog right now." accent />
          <StatCard label="— DRAFTS" value={drafts} delta={drafts > 0 ? "in progress" : "—"} hint="Saved but not yet live. Resume any of these from the editor." />
          <StatCard label="— TOTAL" value={total} delta="all-time" hint="Everything you've written, including unpublished work." />
        </div>

        {/* Quick actions + recent */}
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 24 }}>
          {/* Recent activity */}
          <div className="glass" style={{ padding: 28, borderRadius: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--fg-muted)" }}>— RECENT ACTIVITY</div>
              <a href="AdminPosts.html" style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600 }}>View all →</a>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {recent.map((p, i) => (
                <a key={p.id} href={`AdminPostEdit.html?id=${p.id}`} style={{
                  display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 16,
                  alignItems: "center",
                  padding: "16px 0",
                  borderTop: i === 0 ? "none" : "1px solid var(--line)",
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, overflow: "hidden",
                    background: "var(--bg-3)", flexShrink: 0,
                  }}>
                    {window.ProjectArt && <window.ProjectArt kind={p.cover} animated={false} />}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                    <div style={{ fontSize: 11, color: "var(--fg-dim)", marginTop: 4 }} className="mono">
                      {p.published ? "PUBLISHED" : "DRAFT"} · UPDATED {p.updated_at}
                    </div>
                  </div>
                  <span className={`chip ${p.published ? "chip-accent" : ""}`} style={{ height: 24, fontSize: 10 }}>
                    {p.published ? "LIVE" : "DRAFT"}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: "var(--fg-dim)" }}>
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <a href="AdminPostNew.html" className="glass" style={{
              padding: 28, borderRadius: 20,
              display: "flex", flexDirection: "column", gap: 18,
              minHeight: 200,
            }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--fg-muted)" }}>— NEW POST</div>
              <div style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.01em" }}>
                Start a fresh<br />draft<span style={{ color: "var(--accent)" }}>.</span>
              </div>
              <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="mono" style={{ fontSize: 11, color: "var(--fg-muted)" }}>MARKDOWN · LIVE PREVIEW</span>
                <span style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: "var(--accent)", color: "var(--accent-ink)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
                  </svg>
                </span>
              </div>
            </a>

            <a href="AdminPosts.html" className="glass" style={{
              padding: 28, borderRadius: 20,
              display: "flex", flexDirection: "column", gap: 18,
              minHeight: 200,
            }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--fg-muted)" }}>— MANAGE</div>
              <div style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.01em" }}>
                Edit, publish,<br />or unpublish.
              </div>
              <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="mono" style={{ fontSize: 11, color: "var(--fg-muted)" }}>{total} POSTS · {drafts} DRAFTS</span>
                <span style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: "var(--surface-2)", border: "1px solid var(--line)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Secondary stat row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18, marginTop: 24 }}>
          <a href="AdminProjects.html" className="glass" style={{ padding: 28, borderRadius: 20, display: "block" }}>
            <div className="mono" style={{ color: "var(--fg-muted)", fontSize: 11, marginBottom: 18 }}>— PROJECTS</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <div style={{ fontSize: 56, fontWeight: 300, lineHeight: 1, letterSpacing: "-0.03em" }}>{D.projects.length}</div>
              <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>{D.projects.filter(p => p.featured).length} featured</div>
            </div>
            <div style={{ fontSize: 13, color: "var(--fg-muted)", marginTop: 14 }}>Case studies on the home page → manage →</div>
          </a>
          <a href="AdminExperiences.html" className="glass" style={{ padding: 28, borderRadius: 20, display: "block" }}>
            <div className="mono" style={{ color: "var(--fg-muted)", fontSize: 11, marginBottom: 18 }}>— EXPERIENCES</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <div style={{ fontSize: 56, fontWeight: 300, lineHeight: 1, letterSpacing: "-0.03em" }}>{D.experiences.length}</div>
              <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>career timeline</div>
            </div>
            <div style={{ fontSize: 13, color: "var(--fg-muted)", marginTop: 14 }}>Roles & companies on the experiences page → manage →</div>
          </a>
        </div>
      </div>
    </AdminShell>
  );
};

window.AdminShell = AdminShell;
window.Dashboard = Dashboard;
