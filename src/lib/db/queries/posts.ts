import { desc, eq } from 'drizzle-orm'
import { db } from '../index'
import { posts, type NewPost } from '../schema'

export function getAllPosts() {
  return db.select().from(posts).orderBy(desc(posts.createdAt))
}

export function getPublishedPosts() {
  return db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))
}

export function getPostBySlug(slug: string) {
  return db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .then((rows) => rows[0] ?? null)
}

export function getPostById(id: number) {
  return db
    .select()
    .from(posts)
    .where(eq(posts.id, id))
    .then((rows) => rows[0] ?? null)
}

export function createPost(data: NewPost) {
  return db.insert(posts).values(data).returning().then((rows) => rows[0])
}

export function updatePost(id: number, data: Partial<NewPost>) {
  return db
    .update(posts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(posts.id, id))
    .returning()
    .then((rows) => rows[0])
}

export function deletePost(id: number) {
  return db.delete(posts).where(eq(posts.id, id))
}
