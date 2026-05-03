import Navbar from "@/app/(public)/components/Navbar";
import Providers from "@/app/providers";

export const metadata = { title: "Portfolio" };

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <section suppressHydrationWarning>
        <Navbar />
        {children}
      </section>
    </Providers>
  );
}
