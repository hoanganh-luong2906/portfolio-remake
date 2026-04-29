import Nav from "../(landing)/components/Nav";
import ExperienceFooter from "./components/ExperienceFooter";
import ExperienceHero from "./components/ExperienceHero";
import ExperiencesList from "./components/ExperiencesList";

export default function ExperiencesPage() {
  return (
    <>
      <Nav />
      <main>
        <ExperienceHero />
        <ExperiencesList />
        <ExperienceFooter />
      </main>
    </>
  );
}
