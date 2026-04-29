import { About, Contact, Domains, FAQ, Hero, HomeClient, Marquee, Nav, Projects, Testimonials } from './components';

export default function Home() {
  return (
    <>
      <Nav />
      <HomeClient />
      <main>
        <Hero />
        <Marquee />
        <Domains />
        <Projects />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
    </>
  );
}
