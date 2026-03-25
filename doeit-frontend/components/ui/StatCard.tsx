interface StatCardProps {
  label: string
  value: string
  icon: React.ReactNode
  variant?: 'blue' | 'white'
}

export default function StatCard({ label, value, icon, variant = 'white' }: StatCardProps) {
  if (variant === 'blue') {
    return (
      <div className="card-blue">
        <div className="stat-label text-blue-200 mb-2 flex items-center gap-1.5">
          {icon}
          <span>{label}</span>
        </div>
        <div className="stat-value-white text-2xl">{value}</div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="stat-label text-slate-500 mb-2 flex items-center gap-1.5">
        {icon}
        <span>{label}</span>
      </div>
      <div className="stat-value text-2xl">{value}</div>
    </div>
  )
}
