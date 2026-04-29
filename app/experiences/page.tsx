import Nav from '../(landing)/components/Nav';
import ExperienceHero from './components/ExperienceHero';
import ExperiencesList from './components/ExperiencesList';
import ExperienceFooter from './components/ExperienceFooter';

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
