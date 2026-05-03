import { getAllExperiences } from "@/src/lib/db/queries/experiences";
import { getFeaturedProjects } from "@/src/lib/db/queries/projects";
import {
  About,
  Contact,
  Domains,
  FAQ,
  Hero,
  HomeClient,
  Marquee,
  Projects,
  Testimonials,
} from "./components";

export default async function Home() {
  const [projects, experiences] = await Promise.all([
    getFeaturedProjects(),
    getAllExperiences(),
  ]);

  return (
    <>
      <HomeClient />
      <main>
        <Hero />
        <Marquee />
        <Domains />
        <Projects projects={projects} />
        <About experiences={experiences} />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
    </>
  );
}
