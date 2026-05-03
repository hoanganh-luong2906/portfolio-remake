import { getPublishedExperiences } from "@/src/lib/db/queries/experiences";

export const dynamic = "force-dynamic";

export async function GET() {
  const exps = await getPublishedExperiences();
  return Response.json(exps);
}
