import Navbar from "@/app/(public)/components/Navbar";

export const metadata = { title: "Portfolio" };

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section suppressHydrationWarning>
      <Navbar />
      {children}
    </section>
  );
}
