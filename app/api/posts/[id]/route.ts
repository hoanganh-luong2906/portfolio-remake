import type { NewPost } from "@/src/lib/db/schema";
import { auth } from "@/auth";
import {
  deletePost,
  getPostById,
  updatePost,
} from "@/src/lib/db/queries/posts";

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/posts/[id]">,
) {
  const session = await auth();
  if (!session?.user) return unauthorized();

  const { id } = await ctx.params;
  const post = await getPostById(Number(id));
  if (!post) return Response.json({ error: "Not found" }, { status: 404 });

  return Response.json(post);
}

export async function PUT(
  request: Request,
  ctx: RouteContext<"/api/posts/[id]">,
) {
  const session = await auth();
  if (!session?.user) return unauthorized();

  let body: Partial<NewPost>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { id } = await ctx.params;
  const post = await updatePost(Number(id), body);
  if (!post) return Response.json({ error: "Not found" }, { status: 404 });

  return Response.json(post);
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/posts/[id]">,
) {
  const session = await auth();
  if (!session?.user) return unauthorized();

  const { id } = await ctx.params;
  await deletePost(Number(id));

  return new Response(null, { status: 204 });
}
