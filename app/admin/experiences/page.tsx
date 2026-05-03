import ExperiencesListClient from "../components/ExperiencesListClient";

export default function AdminExperiencesPage() {
  return (
    <div style={{ padding: "44px 36px 80px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 36,
          gap: 24,
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            ◍ EXPERIENCES
          </div>
          <h1
            className="h-section"
            style={{ margin: 0, fontSize: "clamp(36px, 4.5vw, 56px)" }}
          >
            Career timeline
            <br />
            management<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
        </div>
      </div>

      <ExperiencesListClient />
    </div>
  );
}
