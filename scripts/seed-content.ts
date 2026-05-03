import { sql } from "drizzle-orm";
import { PORTFOLIO_DATA } from "../src/lib/data";
import { getDb } from "../src/lib/db";
import { experiences, posts, projects } from "../src/lib/db/schema";

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
    status: "published" as const,
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
    status: "published" as const,
    sortOrder: i,
  }));

  await db.insert(experiences).values(experienceRows).onConflictDoNothing();
  console.log(`  Inserted ${experienceRows.length} experiences.`);

  console.log("Seeding posts…");
  const postRows = PORTFOLIO_DATA.blog.map((b) => ({
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt,
    category: b.category,
    tags: [...b.tags],
    cover: b.cover,
    body: `# ${b.title}\n\n${b.excerpt}\n`,
    status: "published" as const,
  }));

  await db
    .insert(posts)
    .values(postRows)
    .onConflictDoUpdate({
      target: posts.slug,
      set: { updatedAt: sql`now()` },
    });
  console.log(`  Inserted ${postRows.length} posts.`);

  console.log("Done.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
