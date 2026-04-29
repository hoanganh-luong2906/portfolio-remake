import Nav from '../../(landing)/components/Nav';
import BlogPostDetail from '../components/BlogPostDetail';
import { PORTFOLIO_DATA } from '../../../src/lib/data';

export function generateStaticParams() {
  return PORTFOLIO_DATA.blog.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params;
  return (
    <>
      <Nav />
      <main>
        <BlogPostDetail slug={slug} />
      </main>
    </>
  );
}
