import { sql } from "drizzle-orm";
import { getDb } from "../src/lib/db";
import { experiences, projects } from "../src/lib/db/schema";
import { PORTFOLIO_DATA } from "../src/lib/data";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function seed() {
  const db = getDb();

  console.log("Seeding projects…");
  const projectRows = PORTFOLIO_DATA.projects.map((p, i) => ({
    slug: slugify(p.name),
    title: p.name,
    year: p.year,
    role: p.role,
    company: "",
    art: p.art,
    tone: p.tone,
    stack: [...p.stack],
    summary: p.blurb,
    metrics: [...p.metrics],
    featured: true,
    sortOrder: i,
  }));

  await db
    .insert(projects)
    .values(projectRows)
    .onConflictDoUpdate({
      target: projects.slug,
      set: {
        updatedAt: sql`now()`,
      },
    });
  console.log(`  Inserted ${projectRows.length} projects.`);

  console.log("Seeding experiences…");
  const experienceRows = PORTFOLIO_DATA.experiences.map((e, i) => ({
    year: e.year,
    role: e.role,
    company: e.company,
    note: e.note,
    current: e.year.toLowerCase().includes("now"),
    sortOrder: i,
  }));

  await db
    .insert(experiences)
    .values(experienceRows)
    .onConflictDoNothing();
  console.log(`  Inserted ${experienceRows.length} experiences.`);

  console.log("Done.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
