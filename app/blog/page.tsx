import { getPublishedPosts } from '@/src/lib/db/queries/posts'
import BlogFooter from './components/BlogFooter'
import BlogHero from './components/BlogHero'
import BlogList from './components/BlogList'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const posts = await getPublishedPosts()
  return (
    <main>
      <BlogHero />
      <BlogList posts={posts} />
      <BlogFooter />
    </main>
  )
}
