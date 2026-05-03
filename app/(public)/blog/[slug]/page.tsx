import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@/src/lib/db/queries/posts";
import BlogPostDetail from "../components/BlogPostDetail";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      tags: post.tags,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const posts = await getPublishedPosts();
  const post = await getPostBySlug(slug);
  if (!post || post.status !== "published") notFound();

  const idx = posts.findIndex((p) => p.slug === slug);
  const prev = posts[idx + 1] ?? null;
  const next = posts[idx - 1] ?? null;

  return (
    <main>
      <BlogPostDetail post={post} prev={prev} next={next} />
    </main>
  );
}
