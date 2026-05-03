import type { NewExperience } from "@/src/lib/db/schema";
import { auth } from "@/auth";
import {
  deleteExperience,
  getExperienceById,
  updateExperience,
} from "@/src/lib/db/queries/experiences";

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/experiences/[id]">,
) {
  const session = await auth();
  if (!session?.user) return unauthorized();

  const { id } = await ctx.params;
  const experience = await getExperienceById(Number(id));
  if (!experience)
    return Response.json({ error: "Not found" }, { status: 404 });

  return Response.json(experience);
}

export async function PUT(
  request: Request,
  ctx: RouteContext<"/api/experiences/[id]">,
) {
  const session = await auth();
  if (!session?.user) return unauthorized();

  let body: Partial<NewExperience>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { id } = await ctx.params;
  const experience = await updateExperience(Number(id), body);
  if (!experience)
    return Response.json({ error: "Not found" }, { status: 404 });

  return Response.json(experience);
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/experiences/[id]">,
) {
  const session = await auth();
  if (!session?.user) return unauthorized();

  const { id } = await ctx.params;
  await deleteExperience(Number(id));

  return new Response(null, { status: 204 });
}
