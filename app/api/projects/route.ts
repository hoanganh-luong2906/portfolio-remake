import type { NewProject } from "@/src/lib/db/schema";
import { auth } from "@/auth";
import { createProject, getAllProjects } from "@/src/lib/db/queries/projects";

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  const session = await auth();
  if (!session?.user) return unauthorized();

  const all = await getAllProjects();
  return Response.json(all);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return unauthorized();

  let body: Partial<NewProject>;
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

  const project = await createProject(body as NewProject);
  return Response.json(project, { status: 201 });
}
