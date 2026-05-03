import type { NewProject } from "../schema";
import { and, asc, eq } from "drizzle-orm";
import { verifySession } from "../../dal";
import { getDb } from "../index";
import { projects } from "../schema";

export function getAllProjects() {
  return getDb().select().from(projects).orderBy(asc(projects.sortOrder));
}

export function getPublishedProjects() {
  return getDb()
    .select()
    .from(projects)
    .where(eq(projects.status, "published"))
    .orderBy(asc(projects.sortOrder));
}

export function getFeaturedProjects() {
  return getDb()
    .select()
    .from(projects)
    .where(and(eq(projects.featured, true), eq(projects.status, "published")))
    .orderBy(asc(projects.sortOrder));
}

export async function getProjectById(id: number) {
  await verifySession();
  return getDb()
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .then((rows) => rows[0] ?? null);
}

export function createProject(data: NewProject) {
  return getDb()
    .insert(projects)
    .values(data)
    .returning()
    .then((rows) => rows[0]);
}

export function updateProject(id: number, data: Partial<NewProject>) {
  return getDb()
    .update(projects)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(projects.id, id))
    .returning()
    .then((rows) => rows[0]);
}

export function deleteProject(id: number) {
  return getDb().delete(projects).where(eq(projects.id, id));
}
