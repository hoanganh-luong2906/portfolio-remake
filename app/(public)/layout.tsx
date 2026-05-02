import { redirect } from "next/navigation";
import Navbar from "@/app/(public)/components/Navbar";
import { auth } from "@/auth";

export const metadata = { title: "Portfolio" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <section suppressHydrationWarning>
      <Navbar />
      {children}
    </section>
  );
}
