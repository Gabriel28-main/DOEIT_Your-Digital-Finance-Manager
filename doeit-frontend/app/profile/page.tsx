'use client'
import { UserPlus, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react'
import Avatar from '@/components/ui/Avatar'
import StatCard from '@/components/ui/StatCard'
import { USER, TRANSACTIONS, calcStats, formatRupiah } from '@/lib/mockData'

export default function ProfilePage() {
  const { income, expense, balance } = calcStats(TRANSACTIONS)

  return (
    <div>
      {/* Profile card */}
      <div className="card mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar initial={USER.avatar} size="lg" />
            <div>
              <h2 className="text-xl font-bold text-slate-800">{USER.fullName}</h2>
              <p className="text-sm text-slate-400">{USER.email}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-slate-400 hover:text-blue-600
                             transition-colors border border-slate-200 hover:border-blue-200
                             rounded-xl px-4 py-2 text-sm font-medium">
            <UserPlus size={16} />
            Edit Profil
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Balance"
          value={formatRupiah(balance)}
          icon={<RefreshCw size={12} />}
          variant="blue"
        />
        <StatCard
          label="Income"
          value={formatRupiah(income)}
          icon={<TrendingUp size={12} />}
        />
        <StatCard
          label="Expences"
          value={formatRupiah(expense)}
          icon={<TrendingDown size={12} />}
        />
      </div>
    </div>
  )
}
