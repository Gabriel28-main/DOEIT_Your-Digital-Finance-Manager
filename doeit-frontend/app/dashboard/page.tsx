'use client'
import { RefreshCw, TrendingUp, TrendingDown } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'
import TransactionTable from '@/components/ui/TransactionTable'
import AllocationCard from '@/components/ui/AllocationCard'
import Avatar from '@/components/ui/Avatar'
import {
  USER,
  TRANSACTIONS,
  ALLOCATION_CATEGORIES,
  calcStats,
  formatRupiah,
} from '@/lib/mockData'

export default function DashboardPage() {
  const { income, expense, balance } = calcStats(TRANSACTIONS)
  const recentTx = TRANSACTIONS.slice(-10).reverse()
  const topAlloc = ALLOCATION_CATEGORIES.filter(c =>
    ['Groceries', 'Food and Drink', 'Electric Bill', 'Life Style'].includes(c.name)
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Hello, {USER.name} 👋</h1>
        <Avatar initial={USER.avatar} />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Saldo"
          value={formatRupiah(balance)}
          icon={<RefreshCw size={12} />}
          variant="blue"
        />
        <StatCard
          label="Pemasukan"
          value={formatRupiah(income)}
          icon={<TrendingUp size={12} />}
        />
        <StatCard
          label="Pengeluaran"
          value={formatRupiah(expense)}
          icon={<TrendingDown size={12} />}
        />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Arus Kas table */}
        <div className="card">
          <h2 className="font-semibold text-slate-700 flex items-center gap-2 mb-4">
            <RefreshCw size={15} className="text-blue-500" />
            Arus Kas
          </h2>
          <TransactionTable transactions={recentTx} />
        </div>

        {/* Alokasi Pengeluaran */}
        <div className="card">
          <h2 className="font-semibold text-slate-700 flex items-center gap-2 mb-4">
            <span className="text-blue-500">⊞</span>
            Alokasi Pengeluaran
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {topAlloc.map(cat => (
              <AllocationCard key={cat.id} category={cat} showRemain />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
