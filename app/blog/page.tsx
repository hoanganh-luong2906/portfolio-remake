import Nav from '../(landing)/components/Nav';
import BlogHero from './components/BlogHero';
import BlogList from './components/BlogList';
import BlogFooter from './components/BlogFooter';

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main>
        <BlogHero />
        <BlogList />
        <BlogFooter />
      </main>
    </>
  );
}
