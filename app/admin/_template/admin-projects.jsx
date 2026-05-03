// Admin: Projects manager
const ProjectsAdmin = () => {
  const D = window.ADMIN_DATA;
  const [projects, setProjects] = useState(D.projects);
  const [editing, setEditing] = useState(null); // project being edited (or null)
  const [showNew, setShowNew] = useState(false);

  const blank = { id: "", slug: "", title: "", year: "", role: "", company: "", art: "loom", stack: [], summary: "", featured: false };

  const startNew = () => { setEditing({ ...blank, id: "p" + Date.now() }); setShowNew(true); };
  const startEdit = (p) => { setEditing({ ...p }); setShowNew(false); };
  const cancel = () => { setEditing(null); setShowNew(false); };

  const save = () => {
    if (!editing.title.trim()) return;
    if (showNew) {
      setProjects([editing, ...projects]);
    } else {
      setProjects(projects.map(p => p.id === editing.id ? editing : p));
    }
    setEditing(null); setShowNew(false);
  };

  const remove = (id) => {
    if (!confirm("Delete this project?")) return;
    setProjects(projects.filter(p => p.id !== id));
    if (editing?.id === id) cancel();
  };

  const toggleFeatured = (id) => {
    setProjects(projects.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
  };

  return (
    <AdminShell active="projects" breadcrumb={[{ label: "Admin", href: "Admin.html" }, { label: "Projects" }]}>
      <div style={{ padding: "44px 36px 80px", maxWidth: 1280 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>◍ PROJECTS</div>
            <h1 className="h-section" style={{ margin: 0, fontSize: "clamp(36px, 4.5vw, 56px)" }}>
              Case studies<span style={{ color: "var(--accent)" }}>.</span>
            </h1>
            <p className="body" style={{ marginTop: 12, maxWidth: 540 }}>
              {projects.length} project{projects.length === 1 ? "" : "s"} · {projects.filter(p => p.featured).length} featured on home.
            </p>
          </div>
          <button onClick={startNew} className="btn btn-primary" style={{ height: 44, padding: "0 20px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            New project
          </button>
        </div>

        {/* Editor drawer */}
        {editing && (
          <div className="glass" style={{ padding: 28, borderRadius: 20, marginBottom: 32, border: "1px solid var(--accent)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>— {showNew ? "NEW PROJECT" : "EDITING"}</div>
              <button onClick={cancel} style={{ background: "transparent", border: "none", color: "var(--fg-muted)", fontSize: 13, cursor: "pointer" }}>Cancel</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              <Field label="TITLE" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
              <Field label="SLUG" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} mono />
              <Field label="YEAR" value={editing.year} onChange={(v) => setEditing({ ...editing, year: v })} mono />
              <Field label="ROLE" value={editing.role} onChange={(v) => setEditing({ ...editing, role: v })} />
              <Field label="COMPANY" value={editing.company} onChange={(v) => setEditing({ ...editing, company: v })} />
              <SelectField label="COVER ART" value={editing.art} options={D.covers} onChange={(v) => setEditing({ ...editing, art: v })} />
              <Field label="STACK (comma-separated)" value={editing.stack.join(", ")} onChange={(v) => setEditing({ ...editing, stack: v.split(",").map(s => s.trim()).filter(Boolean) })} full />
              <Field label="SUMMARY" value={editing.summary} onChange={(v) => setEditing({ ...editing, summary: v })} multiline full />
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 18, cursor: "pointer" }}>
              <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} />
              <span style={{ fontSize: 13 }}>Featured on home page</span>
            </label>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button onClick={save} className="btn btn-primary" style={{ height: 40, padding: "0 18px" }}>
                {showNew ? "Create project" : "Save changes"}
              </button>
              {!showNew && (
                <button onClick={() => remove(editing.id)} style={{
                  height: 40, padding: "0 18px", borderRadius: 8,
                  background: "transparent", border: "1px solid var(--line)",
                  color: "#ff6b6b", fontSize: 13, fontWeight: 600, cursor: "pointer",
                }}>Delete</button>
              )}
            </div>
          </div>
        )}

        {/* Project list */}
        <div className="glass" style={{ borderRadius: 20, overflow: "hidden" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "60px 1fr 1fr 120px 100px 80px",
            padding: "14px 24px",
            borderBottom: "1px solid var(--line)",
            background: "var(--surface)",
            fontSize: 11, fontWeight: 600, color: "var(--fg-muted)", letterSpacing: "0.08em",
          }} className="mono">
            <span></span><span>PROJECT</span><span>STACK</span><span>YEAR</span><span>FEATURED</span><span></span>
          </div>
          {projects.map((p) => (
            <div key={p.id} style={{
              display: "grid", gridTemplateColumns: "60px 1fr 1fr 120px 100px 80px",
              padding: "16px 24px",
              borderBottom: "1px solid var(--line)",
              alignItems: "center",
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, overflow: "hidden", background: "var(--bg-3)" }}>
                {window.ProjectArt && <window.ProjectArt kind={p.art} animated={false} />}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{p.title}</div>
                <div style={{ fontSize: 11, color: "var(--fg-dim)", marginTop: 2 }}>{p.role} · {p.company}</div>
              </div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {p.stack.slice(0, 3).map((s) => (
                  <span key={s} className="chip" style={{ height: 22, fontSize: 10, padding: "0 8px" }}>{s}</span>
                ))}
              </div>
              <div className="mono" style={{ fontSize: 12, color: "var(--fg-muted)" }}>{p.year}</div>
              <button onClick={() => toggleFeatured(p.id)} style={{
                width: 36, height: 22, borderRadius: 999, position: "relative",
                background: p.featured ? "var(--accent)" : "var(--surface-2)",
                border: "1px solid var(--line)", cursor: "pointer", padding: 0,
              }}>
                <span style={{
                  position: "absolute", top: 2, left: p.featured ? 16 : 2,
                  width: 16, height: 16, borderRadius: "50%",
                  background: p.featured ? "var(--accent-ink)" : "var(--fg-muted)",
                  transition: "left .25s ease",
                }} />
              </button>
              <button onClick={() => startEdit(p)} style={{
                height: 32, padding: "0 12px", borderRadius: 6,
                background: "var(--surface-2)", border: "1px solid var(--line)",
                color: "var(--fg)", fontSize: 12, fontWeight: 600, cursor: "pointer",
              }}>Edit</button>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
};

const Field = ({ label, value, onChange, mono, multiline, full }) => (
  <label style={{ display: "flex", flexDirection: "column", gap: 8, gridColumn: full ? "1 / -1" : "auto" }}>
    <span className="mono" style={{ fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.1em" }}>{label}</span>
    {multiline ? (
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} style={inputStyle(mono)} />
    ) : (
      <input value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle(mono)} />
    )}
  </label>
);

const SelectField = ({ label, value, options, onChange }) => (
  <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <span className="mono" style={{ fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.1em" }}>{label}</span>
    <select value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle(true)}>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  </label>
);

const inputStyle = (mono) => ({
  height: 40, padding: "0 12px",
  borderRadius: 8, border: "1px solid var(--line)",
  background: "var(--input-bg)", color: "var(--fg)",
  fontSize: 13, outline: "none",
  fontFamily: mono ? "'JetBrains Mono', monospace" : "inherit",
});

window.ProjectsAdmin = ProjectsAdmin;
window.AdminField = Field;
window.AdminSelectField = SelectField;
window.adminInputStyle = inputStyle;
