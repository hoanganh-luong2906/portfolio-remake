import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { eq } from "drizzle-orm";
import { getDb } from "@/src/lib/db";
import { users } from "@/src/lib/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      const email = user.email;
      if (!email) return false;
      const db = getDb();
      const [row] = await db.select().from(users).where(eq(users.email, email)).limit(1);
      return !!row;
    },
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      if (isAdminRoute) return isLoggedIn;
      return true;
    },
  },
});
