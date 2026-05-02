import type { NewPost } from "../schema";
import { desc, eq } from "drizzle-orm";
import { verifySession } from "../../dal";
import { getDb } from "../index";
import { posts } from "../schema";

export async function getAllPosts() {
  await verifySession();
  return getDb().select().from(posts).orderBy(desc(posts.createdAt));
}

export function getPublishedPosts() {
  return getDb()
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt));
}

export function getPostBySlug(slug: string) {
  return getDb()
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .then((rows) => rows[0] ?? null);
}

export async function getPostById(id: number) {
  await verifySession();
  return getDb()
    .select()
    .from(posts)
    .where(eq(posts.id, id))
    .then((rows) => rows[0] ?? null);
}

export function createPost(data: NewPost) {
  return getDb()
    .insert(posts)
    .values(data)
    .returning()
    .then((rows) => rows[0]);
}

export function updatePost(id: number, data: Partial<NewPost>) {
  return getDb()
    .update(posts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(posts.id, id))
    .returning()
    .then((rows) => rows[0]);
}

export function deletePost(id: number) {
  return getDb().delete(posts).where(eq(posts.id, id));
}
