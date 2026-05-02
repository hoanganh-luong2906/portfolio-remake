import { redirect } from "next/navigation";

import { cache } from "react";
import { auth } from "@/auth";
import "server-only";

/**
 * Verifies the current request has a valid authenticated session.
 * Redirects to /login if not authenticated.
 *
 * Memoized with React cache() so it only runs once per render pass
 * even when called from multiple Server Components / Server Actions.
 */
export const verifySession = cache(async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
});
