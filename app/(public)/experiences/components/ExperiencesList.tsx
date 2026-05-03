"use client";

import type { Project } from "../../../../src/lib/db/schema";
import { useState } from "react";
import ExperienceItem from "./ExperienceItem";

export default function ExperiencesList({
  projects,
}: {
  projects: Project[];
}) {
  const [openId, setOpenId] = useState<number | null>(
    projects[0]?.id ?? null,
  );

  return (
    <section className="shell" style={{ paddingBottom: 120 }}>
      <div
        className="reveal"
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        {projects.map((p) => (
          <ExperienceItem
            key={p.id}
            p={p}
            open={openId === p.id}
            onToggle={() => setOpenId(openId === p.id ? null : p.id)}
          />
        ))}
      </div>
    </section>
  );
}
