'use client'
import { TrendingUp, TrendingDown, PieChart } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'
import Avatar from '@/components/ui/Avatar'
import { useApp, calcStats, formatRupiah } from '@/lib/AppContext'

const USER = { fullName: 'Ryan Smith', email: 'ryansmith@doeit.com', avatar: 'R' }

export default function ProfilePage() {
  const { transactions } = useApp()
  const { income, expense, balance } = calcStats(transactions)

  // Show explicit negative sign when balance is negative (expenses > income)
  const balanceDisplay = (balance < 0 ? '- ' : '') + formatRupiah(balance)

  return (
    <div className="px-6 md:px-10 lg:px-14 py-6">
      <div className="card mb-6">
        <div className="flex items-center gap-4">
          <Avatar initial={USER.avatar} size="lg" />
          <div>
            <h2 className="text-xl font-bold text-slate-800">{USER.fullName}</h2>
            <p className="text-sm text-slate-400">{USER.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
        <StatCard label="Balance"  value={balanceDisplay}       icon={<PieChart size={12} />}   variant="blue" />
        <StatCard label="Income"   value={formatRupiah(income)} icon={<TrendingUp size={12} />} />
        <StatCard label="Expenses" value={formatRupiah(expense)}icon={<TrendingDown size={12} />} />
      </div>
    </div>
  )
}