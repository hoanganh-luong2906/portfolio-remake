import { getPublishedProjects } from "@/src/lib/db/queries/projects";

export const dynamic = "force-dynamic";

export async function GET() {
  const projects = await getPublishedProjects();
  return Response.json(projects);
}
