'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  createPost,
  deletePost,
  updatePost,
} from '../db/queries/posts'

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function estimateReadTime(body: string) {
  const words = body.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

export async function createPostAction(formData: FormData) {
  const title = formData.get('title') as string
  const body = formData.get('body') as string
  const rawSlug = (formData.get('slug') as string)?.trim()

  await createPost({
    slug: rawSlug || slugify(title),
    title,
    excerpt: formData.get('excerpt') as string,
    category: (formData.get('category') as string) || 'Engineering',
    tags: ((formData.get('tags') as string) || '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    cover: (formData.get('cover') as string) || 'loom',
    body,
    published: formData.get('published') === 'on',
  })

  revalidatePath('/blog')
  revalidatePath('/admin/posts')
  redirect('/admin/posts')
}

export async function updatePostAction(id: number, formData: FormData) {
  const title = formData.get('title') as string
  const body = formData.get('body') as string
  const rawSlug = (formData.get('slug') as string)?.trim()

  await updatePost(id, {
    title,
    slug: rawSlug || slugify(title),
    excerpt: formData.get('excerpt') as string,
    category: (formData.get('category') as string) || 'Engineering',
    tags: ((formData.get('tags') as string) || '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    cover: (formData.get('cover') as string) || 'loom',
    body,
    published: formData.get('published') === 'on',
  })

  revalidatePath('/blog')
  revalidatePath(`/blog/${slugify(title)}`)
  revalidatePath('/admin/posts')
  redirect('/admin/posts')
}

export async function deletePostAction(id: number) {
  await deletePost(id)
  revalidatePath('/blog')
  revalidatePath('/admin/posts')
}

export async function togglePublishAction(id: number, published: boolean) {
  await updatePost(id, { published })
  revalidatePath('/blog')
  revalidatePath('/admin/posts')
}
