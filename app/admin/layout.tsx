import { auth, signOut } from '@/auth'
import { redirect } from 'next/navigation'

export const metadata = { title: 'Admin' }

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <header className="shell py-4 border-b border-line flex items-center justify-between">
        <div className="mono text-fg-muted text-[11px]">◍ ADMIN</div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-fg-muted">{session.user.email}</span>
          <form
            action={async () => {
              'use server'
              await signOut({ redirectTo: '/' })
            }}
          >
            <button type="submit" className="btn btn-ghost" style={{ height: 36, fontSize: 13 }}>
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="shell py-12 flex-1">{children}</main>
    </div>
  )
}
