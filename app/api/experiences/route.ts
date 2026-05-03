import type { NewExperience } from "@/src/lib/db/schema";
import { auth } from "@/auth";
import {
  createExperience,
  getAllExperiences,
} from "@/src/lib/db/queries/experiences";

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  const session = await auth();
  if (!session?.user) return unauthorized();

  const all = await getAllExperiences();
  return Response.json(all);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return unauthorized();

  let body: Partial<NewExperience>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { role, company } = body;
  if (!role || !company) {
    return Response.json(
      { error: "Missing required fields: role, company" },
      { status: 422 },
    );
  }

  const experience = await createExperience(body as NewExperience);
  return Response.json(experience, { status: 201 });
}
