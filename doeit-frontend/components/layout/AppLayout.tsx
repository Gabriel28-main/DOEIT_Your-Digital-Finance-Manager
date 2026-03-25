import Sidebar from './Sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <main className="min-h-screen" style={{ marginLeft: 160 }}>
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
