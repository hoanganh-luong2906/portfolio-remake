import type { NewPost } from "@/src/lib/db/schema";
import { auth } from "@/auth";
import { createPost, getAllPosts } from "@/src/lib/db/queries/posts";

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  const session = await auth();
  if (!session?.user) return unauthorized();

  const allPosts = await getAllPosts();
  return Response.json(allPosts);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return unauthorized();

  let body: Partial<NewPost>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { slug, title } = body;
  if (!slug || !title) {
    return Response.json(
      { error: "Missing required fields: slug, title" },
      { status: 422 },
    );
  }

  const post = await createPost(body as NewPost);
  return Response.json(post, { status: 201 });
}
