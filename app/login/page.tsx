import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import ThemeToggle from "@/src/components/ThemeToggle";

export const metadata = { title: "Sign In" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const session = await auth();
  if (session?.user) redirect("/admin");

  const { error, callbackUrl } = await searchParams;

  return (
    <div className="min-h-screen grid grid-cols-[1.05fr_1fr]">
      {/* Left: brand panel */}
      <div className="relative overflow-hidden bg-bg-2 border-r border-line py-15 px-20 flex flex-col justify-between">
        <Link href="/" className="inline-flex items-center gap-3">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <circle cx="19" cy="19" r="18.5" stroke="var(--line-2)" />
            <path
              d="M11 13 L11 25 M11 19 L19 19 M19 13 L19 25 M23 13 L27 19 L23 25 M27 13 L23 19"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-bold text-lg tracking-[0.02em]">HAL</span>
        </Link>

        <div>
          <div className="eyebrow mb-5.5">◍ ADMIN AREA · INTERNAL</div>
          <h1
            className="h-display m-0"
            style={{ fontSize: "clamp(56px, 6vw, 96px)" }}
          >
            <span className="block">Quiet</span>
            <span className="block text-fg-muted italic font-light">
              back office
            </span>
            <span className="block">
              for the writing
              <span className="text-accent">.</span>
            </span>
          </h1>
          <p className="body max-w-115 mt-7">
            URL-only access. No public link from the site. Sign in with the
            Google account on file, write something honest, hit publish.
          </p>
        </div>

        <div className="mono text-[11px] text-fg-dim flex justify-between">
          <span>NEXTAUTH · GOOGLE PROVIDER</span>
          <span>SESSION · COOKIE</span>
        </div>

        {/* Decorative orbs */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            right: -120,
            top: 200,
            width: 320,
            height: 320,
            background: "color-mix(in oklab, var(--accent) 18%, transparent)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: -80,
            bottom: 80,
            width: 200,
            height: 200,
            background: "color-mix(in oklab, var(--accent-2) 22%, transparent)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Right: sign-in card */}
      <div className="relative flex items-center justify-center p-15">
        <div className="absolute top-15 right-15">
          <ThemeToggle />
        </div>

        <div className="glass w-full max-w-110 p-10 rounded-[20px]">
          <div className="mono text-[11px] text-fg-muted mb-4.5">— SIGN IN</div>
          <h2 className="m-0 text-[32px] font-medium tracking-[-0.02em] leading-[1.1]">
            Welcome back<span className="text-accent">.</span>
          </h2>
          <p className="text-sm text-fg-muted mt-3 leading-relaxed">
            Continue with Google to manage posts. Any account that signs in gets
            full access — no role system yet.
          </p>

          {error && (
            <div
              className="mt-5.5 py-3 px-3.5 rounded-[10px] text-[13px] text-fg flex gap-2.5 items-start border"
              style={{
                background: "color-mix(in oklab, #ff4d4d 14%, transparent)",
                borderColor: "color-mix(in oklab, #ff4d4d 40%, transparent)",
              }}
            >
              <span className="text-sm">⚠</span>
              <div>
                <div className="font-semibold">Sign-in failed</div>
                <div className="text-fg-muted mt-0.5 text-xs">
                  {error === "AccessDenied"
                    ? "Access denied — that account isn't on the allow-list."
                    : `Auth error: ${error}`}
                </div>
              </div>
            </div>
          )}

          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: callbackUrl ?? "/admin" });
            }}
          >
            <button
              type="submit"
              className="mt-7 w-full h-13 rounded-xl text-sm font-bold bg-fg text-bg border border-fg inline-flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </form>

          <div className="mono mt-5.5 text-[11px] text-fg-dim text-center leading-relaxed">
            REDIRECTS TO {(callbackUrl ?? "/admin").toUpperCase()} ON SUCCESS
          </div>

          <div className="mono mt-8 pt-5.5 border-t border-line text-xs text-fg-muted flex justify-between">
            <Link href="/" className="text-fg-muted">
              ← Back to site
            </Link>
            <span className="text-fg-dim">v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
