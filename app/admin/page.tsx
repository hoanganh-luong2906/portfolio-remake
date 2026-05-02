import { auth } from '@/auth'

export default async function AdminPage() {
  const session = await auth()

  return (
    <div className="flex flex-col gap-8 max-w-[900px]">
      <div>
        <div className="mono text-fg-muted mb-4 text-[11px]">◍ DASHBOARD</div>
        <h1 className="m-0 text-[40px] font-medium tracking-[-0.02em]">
          Welcome back
          {session?.user?.name ? `, ${session.user.name.split(' ')[0]}` : ''}.
        </h1>
        <p className="body mt-3 m-0">Administrator area. Content coming soon.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {(['Blog Posts', 'Projects', 'Messages'] as const).map((label) => (
          <div key={label} className="glass p-6 flex flex-col gap-2">
            <div className="mono text-fg-muted text-[11px]">{label.toUpperCase()}</div>
            <div className="text-[36px] font-medium tracking-[-0.02em] text-fg-dim">—</div>
            <div className="text-sm text-fg-muted">No data yet</div>
          </div>
        ))}
      </div>
    </div>
  )
}
