import { auth, signIn } from '@/auth'
import { redirect } from 'next/navigation'

export const metadata = { title: 'Sign In' }

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>
}) {
  const session = await auth()
  if (session?.user) redirect('/admin')

  const { error, callbackUrl } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="glass p-10 w-full max-w-sm flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <div className="mono text-fg-muted text-[11px]">◍ ADMIN ACCESS</div>
          <h1 className="m-0 text-2xl font-medium tracking-[-0.02em]">Sign in</h1>
          <p className="body text-sm m-0">
            Restricted to authorized accounts only.
          </p>
        </div>

        {error && (
          <div className="text-sm px-4 py-3 rounded-[10px] bg-red-500/10 border border-red-500/20 text-red-400">
            {error === 'AccessDenied'
              ? 'Access denied. Use an authorized Google account.'
              : 'Authentication failed. Please try again.'}
          </div>
        )}

        <form
          action={async () => {
            'use server'
            await signIn('google', { redirectTo: callbackUrl ?? '/admin' })
          }}
        >
          <button
            type="submit"
            className="btn btn-primary w-full justify-center"
            style={{ height: 48 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  )
}
