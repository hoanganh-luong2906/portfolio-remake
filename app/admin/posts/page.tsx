import Link from "next/link";
import { getAllPosts } from "@/src/lib/db/queries/posts";
import PostsListClient from "../components/PostsListClient";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const allPosts = await getAllPosts();

  return (
    <div style={{ padding: "44px 36px 80px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 36,
          gap: 24,
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            ◍ POSTS
          </div>
          <h1
            className="h-section"
            style={{ margin: 0, fontSize: "clamp(36px, 4.5vw, 56px)" }}
          >
            Blog post
            <br />
            management<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
        </div>
        <Link
          href="/admin/posts/new"
          className="btn btn-primary"
          style={{ height: 48 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
          </svg>
          New post
        </Link>
      </div>

      <PostsListClient posts={allPosts} />
    </div>
  );
}
