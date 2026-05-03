import ProjectsListClient from "../components/ProjectsListClient";

export default function AdminProjectsPage() {
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
            ◍ PROJECTS
          </div>
          <h1
            className="h-section"
            style={{ margin: 0, fontSize: "clamp(36px, 4.5vw, 56px)" }}
          >
            Case study
            <br />
            management<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
        </div>
      </div>

      <ProjectsListClient />
    </div>
  );
}
