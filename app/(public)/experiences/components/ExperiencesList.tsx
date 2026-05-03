"use client";

import type { Project } from "../../../../src/lib/db/schema";
import { useState } from "react";
import { usePublicProjects } from "@/app/hooks/usePublicData";
import { Card } from "@/src/components/ui";
import ExperienceItem from "./ExperienceItem";

/* ---- Skeleton ---- */
function SkeletonRow() {
  return (
    <Card
      as="div"
      style={{
        overflow: "hidden",
        padding: 36,
        display: "grid",
        gridTemplateColumns: "60px 1fr 200px 200px auto",
        gap: 32,
        alignItems: "center",
      }}
    >
      <div className="skeleton h-4 w-10 rounded" />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div className="skeleton h-3 w-32 rounded" />
        <div className="skeleton h-8 w-48 rounded" />
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <div className="skeleton h-6 w-16 rounded-full" />
        <div className="skeleton h-6 w-20 rounded-full" />
      </div>
      <div className="skeleton h-4 w-20 rounded" />
      <div className="skeleton h-10 w-10 rounded-full" />
    </Card>
  );
}

export default function ExperiencesList() {
  const { data: projects = [], isLoading } = usePublicProjects();
  const [openId, setOpenId] = useState<number | null>(null);

  // open first project once loaded
  const resolvedOpenId = openId === null && projects.length > 0
    ? projects[0].id
    : openId;

  if (isLoading) {
    return (
      <section className="shell" style={{ paddingBottom: 120 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      </section>
    );
  }

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
            open={resolvedOpenId === p.id}
            onToggle={() => setOpenId(resolvedOpenId === p.id ? null : p.id)}
          />
        ))}
      </div>
    </section>
  );
}
