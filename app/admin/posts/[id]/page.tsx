import { notFound } from 'next/navigation'
import { getPostById } from '@/src/lib/db/queries/posts'
import { updatePostAction } from '@/src/lib/actions/posts'
import PostEditorClient from '../../components/PostEditorClient'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Edit Post · Admin' }

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPostById(Number(id))
  if (!post) notFound()

  const action = updatePostAction.bind(null, post.id)

  return (
    <PostEditorClient
      action={action}
      mode="edit"
      defaultValues={{
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        category: post.category,
        cover: post.cover,
        tags: post.tags.join(', '),
        body: post.body,
      }}
    />
  )
}
