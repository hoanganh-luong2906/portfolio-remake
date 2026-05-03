import BlogFooter from "./components/BlogFooter";
import BlogHero from "./components/BlogHero";
import BlogList from "./components/BlogList";

export default function BlogPage() {
  return (
    <main>
      <BlogHero />
      <BlogList />
      <BlogFooter />
    </main>
  );
}
