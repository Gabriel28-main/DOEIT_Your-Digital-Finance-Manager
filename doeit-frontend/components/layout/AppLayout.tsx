import Sidebar from './Sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      {/* margin matches new sidebar width of 190px */}
      <main className="min-h-screen" style={{ marginLeft: 190 }}>
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}