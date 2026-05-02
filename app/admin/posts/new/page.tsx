import { createPostAction } from '@/src/lib/actions/posts'
import PostEditorClient from '../../components/PostEditorClient'

export const metadata = { title: 'New Post · Admin' }

export default function NewPostPage() {
  return <PostEditorClient action={createPostAction} mode="new" />
}
