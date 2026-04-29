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

export default function Home() {
  return (
    <>
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
