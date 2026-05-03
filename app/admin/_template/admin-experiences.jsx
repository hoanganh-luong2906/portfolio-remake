// Admin: Experiences manager
const ExperiencesAdmin = () => {
  const D = window.ADMIN_DATA;
  const Field = window.AdminField;
  const [items, setItems] = useState(D.experiences);
  const [editing, setEditing] = useState(null);
  const [showNew, setShowNew] = useState(false);

  const blank = { id: "", year: "", role: "", company: "", note: "", current: false };

  const startNew = () => { setEditing({ ...blank, id: "e" + Date.now() }); setShowNew(true); };
  const startEdit = (i) => { setEditing({ ...i }); setShowNew(false); };
  const cancel = () => { setEditing(null); setShowNew(false); };

  const save = () => {
    if (!editing.role.trim() || !editing.company.trim()) return;
    if (showNew) setItems([editing, ...items]);
    else setItems(items.map(i => i.id === editing.id ? editing : i));
    setEditing(null); setShowNew(false);
  };

  const remove = (id) => {
    if (!confirm("Remove this experience?")) return;
    setItems(items.filter(i => i.id !== id));
    if (editing?.id === id) cancel();
  };

  const moveUp = (idx) => {
    if (idx === 0) return;
    const next = [...items];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    setItems(next);
  };
  const moveDown = (idx) => {
    if (idx === items.length - 1) return;
    const next = [...items];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    setItems(next);
  };

  return (
    <AdminShell active="experiences" breadcrumb={[{ label: "Admin", href: "Admin.html" }, { label: "Experiences" }]}>
      <div style={{ padding: "44px 36px 80px", maxWidth: 980 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>◍ EXPERIENCES</div>
            <h1 className="h-section" style={{ margin: 0, fontSize: "clamp(36px, 4.5vw, 56px)" }}>
              Career timeline<span style={{ color: "var(--accent)" }}>.</span>
            </h1>
            <p className="body" style={{ marginTop: 12, maxWidth: 540 }}>
              {items.length} role{items.length === 1 ? "" : "s"} on the experiences page.
              Order matters — drag handles re-order rows.
            </p>
          </div>
          <button onClick={startNew} className="btn btn-primary" style={{ height: 44, padding: "0 20px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            New experience
          </button>
        </div>

        {editing && (
          <div className="glass" style={{ padding: 28, borderRadius: 20, marginBottom: 32, border: "1px solid var(--accent)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>— {showNew ? "NEW EXPERIENCE" : "EDITING"}</div>
              <button onClick={cancel} style={{ background: "transparent", border: "none", color: "var(--fg-muted)", fontSize: 13, cursor: "pointer" }}>Cancel</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              <Field label="YEAR(S)" value={editing.year} onChange={(v) => setEditing({ ...editing, year: v })} mono />
              <Field label="ROLE" value={editing.role} onChange={(v) => setEditing({ ...editing, role: v })} />
              <Field label="COMPANY" value={editing.company} onChange={(v) => setEditing({ ...editing, company: v })} />
              <Field label="NOTE" value={editing.note} onChange={(v) => setEditing({ ...editing, note: v })} />
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 18, cursor: "pointer" }}>
              <input type="checkbox" checked={editing.current} onChange={(e) => setEditing({ ...editing, current: e.target.checked })} />
              <span style={{ fontSize: 13 }}>Current role</span>
            </label>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button onClick={save} className="btn btn-primary" style={{ height: 40, padding: "0 18px" }}>
                {showNew ? "Create" : "Save changes"}
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

        <div className="glass" style={{ borderRadius: 20, overflow: "hidden" }}>
          {items.map((it, idx) => (
            <div key={it.id} style={{
              display: "grid", gridTemplateColumns: "44px 160px 1fr 100px",
              padding: "20px 24px",
              borderBottom: idx === items.length - 1 ? "none" : "1px solid var(--line)",
              alignItems: "center", gap: 18,
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <button onClick={() => moveUp(idx)} disabled={idx === 0} style={iconBtnStyle()}>↑</button>
                <button onClick={() => moveDown(idx)} disabled={idx === items.length - 1} style={iconBtnStyle()}>↓</button>
              </div>
              <div className="mono" style={{ fontSize: 12, color: "var(--fg-muted)" }}>{it.year}</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, display: "flex", alignItems: "center", gap: 10 }}>
                  {it.role}
                  {it.current && <span className="chip chip-accent" style={{ height: 22, fontSize: 10, padding: "0 8px" }}>CURRENT</span>}
                </div>
                <div style={{ fontSize: 13, color: "var(--fg-muted)", marginTop: 4 }}>{it.company} · {it.note}</div>
              </div>
              <button onClick={() => startEdit(it)} style={{
                height: 32, padding: "0 12px", borderRadius: 6,
                background: "var(--surface-2)", border: "1px solid var(--line)",
                color: "var(--fg)", fontSize: 12, fontWeight: 600, cursor: "pointer",
              }}>Edit</button>
            </div>
          ))}
          {items.length === 0 && (
            <div style={{ padding: 60, textAlign: "center", color: "var(--fg-muted)" }}>
              No experiences yet. Add your first role above.
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
};

const iconBtnStyle = () => ({
  width: 22, height: 18, padding: 0,
  borderRadius: 4, border: "1px solid var(--line)",
  background: "var(--surface-2)", color: "var(--fg-muted)",
  fontSize: 11, lineHeight: 1, cursor: "pointer",
});

window.ExperiencesAdmin = ExperiencesAdmin;
