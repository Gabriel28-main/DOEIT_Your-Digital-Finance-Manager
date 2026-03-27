'use client'
import {
  RefreshCw, TrendingUp, TrendingDown, ShoppingCart, Coffee, BookOpen, Home, Zap, Sparkles,
  ShoppingBag, HeartPulse, Music, Navigation, Monitor,
  Target, Camera, Gift, Truck, Umbrella, Feather, Package, LayoutGrid, PieChart
} from 'lucide-react'
import { useApp, calcStats, formatRupiah } from '@/lib/AppContext'
import StatCard from '@/components/ui/StatCard'

// ── Icon map — must stay in sync with budgeting-page.tsx PRESET_ICONS ────────
const ICON_MAP: Record<string, React.ElementType> = {
  cart:     ShoppingCart,
  coffee:   Coffee,
  book:     BookOpen,
  home:     Home,
  zap:      Zap,
  sparkles: Sparkles,
  bag:      ShoppingBag,
  heart:    HeartPulse,
  music:    Music,
  nav:      Navigation,
  monitor:  Monitor,
  target:   Target,
  camera:   Camera,
  gift:     Gift,
  truck:    Truck,
  umbrella: Umbrella,
  feather:  Feather,
  package:  Package,
}

function CategoryIcon({ iconKey, size = 14 }: { iconKey: string; size?: number }) {
  const Icon = ICON_MAP[iconKey]
  if (Icon) return <Icon size={size} strokeWidth={1.75} />
  // Legacy emoji / unknown key — render as text
  return <span style={{ fontSize: size, lineHeight: 1 }}>{iconKey}</span>
}

// Static color pattern for Alokasi cards: white → blue → blue → white (repeating)
function isAllocBlue(i: number) {
  const pos = i % 4
  return pos === 1 || pos === 2
}

export default function DashboardPage() {
  const { transactions, categories } = useApp()

  const { income, expense, balance } = calcStats(transactions)

  const topAlloc = [...categories]
    .sort((a, b) => b.budget - a.budget)
    .slice(0, 4)

  const catName = (id: string) => categories.find(c => c.id === id)?.name ?? '—'

  const displayDate = (d: string) => {
    if (!d.includes('-')) return d
    const [y, m, day] = d.split('-')
    return `${day}/${m}/${y}`
  }

  // Show explicit negative sign when balance is negative
  const balanceDisplay = (balance < 0 ? '- ' : '') + formatRupiah(balance)

  return (
    <div className="px-6 md:px-10 lg:px-14 py-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Hello, Ryan</h1>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-8">
        <StatCard label="Balance"       value={balanceDisplay}      icon={<PieChart size={12} />}  variant="blue" />
        <StatCard label="Pemasukan"   value={formatRupiah(income)} icon={<TrendingUp size={12} />} />
        <StatCard label="Pengeluaran" value={formatRupiah(expense)}icon={<TrendingDown size={12} />} />
      </div>

      {/* ── Bottom row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* Recent transactions */}
        <div className="card">
          <h2 className="font-semibold text-slate-700 flex items-center gap-2 mb-4">
            <RefreshCw size={15} className="text-blue-500" />
            Arus Kas
          </h2>
          {transactions.length === 0 ? (
            <p className="text-slate-400 text-sm py-4 text-center">
              No transactions yet — add some in Cash Flow.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 text-xs">
                    <th className="text-left pb-3 font-medium">Date</th>
                    <th className="text-left pb-3 font-medium">Amount</th>
                    <th className="text-left pb-3 font-medium">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {transactions.slice(0, 8).map(t => (
                    <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-2 pr-4 text-slate-600 whitespace-nowrap">{displayDate(t.date)}</td>
                      <td className={`py-2 pr-4 font-medium whitespace-nowrap
                                      ${t.type === 'income' ? 'text-emerald-500' : 'text-red-400'}`}>
                        {t.type === 'income' ? '+' : '-'}{Math.abs(t.amount).toLocaleString('id-ID')}
                      </td>
                      <td className="py-2 text-slate-600 whitespace-nowrap">{catName(t.categoryId)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Budgets */}
        <div className="card">
          <h2 className="font-semibold text-slate-700 flex items-center gap-2 mb-4">
            <LayoutGrid />
            Budgets
          </h2>

          {categories.length === 0 ? (
            <p className="text-slate-400 text-sm py-4 text-center">
              No categories yet — add some in Budgeting.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {topAlloc.map((cat, i) => {
                const blue = isAllocBlue(i)
                return (
                  <div
                    key={cat.id}
                    className="rounded-2xl p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                    style={blue
                      ? { background: 'linear-gradient(135deg, #1177FF, #3b82f6)', color: 'white' }
                      : { background: 'white', border: '1px solid #f1f5f9' }
                    }
                  >
                    <div className={`text-xs font-semibold mb-3 flex items-center gap-1.5 uppercase tracking-wide
                                     ${blue ? 'text-blue-100' : 'text-slate-500'}`}>
                      <span className={blue ? 'text-white' : 'text-blue-500'}>
                        <CategoryIcon iconKey={cat.icon} size={14} />
                      </span>
                      <span className="truncate">{cat.name}</span>
                    </div>
                    <div className={`text-[10px] font-medium mb-0.5 ${blue ? 'text-blue-200' : 'text-slate-400'}`}>
                      Budget
                    </div>
                    <div className={`text-lg font-bold ${blue ? 'text-white' : 'text-blue-600'}`}>
                      {formatRupiah(cat.budget)}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}