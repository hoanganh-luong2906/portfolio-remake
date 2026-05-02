"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useCallback } from "react";

export function useAuth() {
  const { data: session, status } = useSession();

  const user = session?.user ?? null;
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const firstName = user?.name?.split(" ")[0] ?? null;

  const handleSignIn = useCallback(
    (redirectTo = "/admin") => signIn("google", { redirectTo }),
    [],
  );

  const handleSignOut = useCallback(
    (callbackUrl = "/") => signOut({ callbackUrl }),
    [],
  );

  return {
    user,
    firstName,
    isLoading,
    isAuthenticated,
    signIn: handleSignIn,
    signOut: handleSignOut,
  };
}
