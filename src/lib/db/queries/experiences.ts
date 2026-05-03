import type { NewExperience } from "../schema";
import { asc, eq } from "drizzle-orm";
import { verifySession } from "../../dal";
import { getDb } from "../index";
import { experiences } from "../schema";

export function getAllExperiences() {
  return getDb().select().from(experiences).orderBy(asc(experiences.sortOrder));
}

export function getPublishedExperiences() {
  return getDb()
    .select()
    .from(experiences)
    .where(eq(experiences.status, "published"))
    .orderBy(asc(experiences.sortOrder));
}

export async function getExperienceById(id: number) {
  await verifySession();
  return getDb()
    .select()
    .from(experiences)
    .where(eq(experiences.id, id))
    .then((rows) => rows[0] ?? null);
}

export function createExperience(data: NewExperience) {
  return getDb()
    .insert(experiences)
    .values(data)
    .returning()
    .then((rows) => rows[0]);
}

export function updateExperience(id: number, data: Partial<NewExperience>) {
  return getDb()
    .update(experiences)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(experiences.id, id))
    .returning()
    .then((rows) => rows[0]);
}

export function deleteExperience(id: number) {
  return getDb().delete(experiences).where(eq(experiences.id, id));
}
