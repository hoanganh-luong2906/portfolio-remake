"use client";

import { useState } from "react";
import { PORTFOLIO_DATA } from "../../../src/lib/data";
import ExperienceItem from "./ExperienceItem";

export default function ExperiencesList() {
  const D = PORTFOLIO_DATA;
  const [openId, setOpenId] = useState<string | null>(
    D.projects[0]?.id ?? null,
  );

  return (
    <section className="shell" style={{ paddingBottom: 120 }}>
      <div
        className="reveal"
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        {D.projects.map((p) => (
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
