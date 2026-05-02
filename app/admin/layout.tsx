import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AdminShell from "./components/AdminShell";

export const metadata = { title: "Admin · HAL" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <AdminShell user={{ name: session.user.name, email: session.user.email }}>
      {children}
    </AdminShell>
  );
}
