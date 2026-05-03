import { getAllProjects } from "@/src/lib/db/queries/projects";
import ExperienceFooter from "./components/ExperienceFooter";
import ExperienceHero from "./components/ExperienceHero";
import ExperiencesList from "./components/ExperiencesList";

export default async function ExperiencesPage() {
  const projects = await getAllProjects();

  return (
    <main>
      <ExperienceHero count={projects.length} />
      <ExperiencesList projects={projects} />
      <ExperienceFooter />
    </main>
  );
}
