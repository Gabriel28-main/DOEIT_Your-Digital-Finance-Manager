'use client'
import { useState } from 'react'
import { RefreshCw, Plus, X, Check, MoreHorizontal } from 'lucide-react'
import { useApp, formatRupiah } from '@/lib/AppContext'

export default function CashflowPage() {
  const { categories, transactions, addTransaction } = useApp()

  const [form, setForm] = useState({
    date: '',
    amount: '',
    categoryId: '',
    type: 'income' as 'income' | 'expense',
    description: '',
  })
  const [error,      setError]      = useState('')
  const [success,    setSuccess]    = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleAdd = () => {
    if (!form.date || !form.amount) { setError('Please fill in Date and Amount.'); return }
    const amount = parseFloat(form.amount)
    if (isNaN(amount) || amount <= 0) { setError('Amount must be a positive number.'); return }
    addTransaction({
      date: form.date,
      amount: form.type === 'expense' ? -amount : amount,
      type: form.type,
      categoryId: form.categoryId,
      description: form.description,
    })
    setForm({ date: '', amount: '', categoryId: '', type: 'income', description: '' })
    setError('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2500)
  }

  const catName = (id: string) => {
    if (!id) return '—'
    return categories.find(c => c.id === id)?.name ?? '—'
  }

  const displayDate = (d: string) => {
    if (!d.includes('-')) return d
    const [y, m, day] = d.split('-')
    return `${day}/${m}/${y}`
  }

  const toggle = (id: string) =>
    setExpandedId(prev => (prev === id ? null : id))

  return (
    <div className="px-6 md:px-10 lg:px-14 py-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-8">Cash Flow</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* ── Arus Kas panel — matches Dashboard table style ── */}
        <div className="card">
          <h2 className="font-semibold text-slate-700 flex items-center gap-2 mb-4">
            <RefreshCw size={15} className="text-blue-500" />
            Arus Kas
          </h2>

          {transactions.length === 0 ? (
            <p className="text-slate-400 text-sm py-4 text-center">No transactions yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 text-xs">
                    <th className="text-left pb-3 font-medium">Date</th>
                    <th className="text-left pb-3 font-medium">Amount</th>
                    <th className="text-left pb-3 font-medium">Category</th>
                    <th className="pb-3" />
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(t => {
                    const isExpanded = expandedId === t.id
                    const hasNote    = !!t.description?.trim()

                    return (
                      <>
                        {/* ── Main row ── */}
                        <tr
                          key={t.id}
                          className="hover:bg-slate-50/50 transition-colors border-t border-slate-50 first:border-0"
                        >
                          <td className="py-2 pr-4 text-slate-600 whitespace-nowrap">
                            {displayDate(t.date)}
                          </td>
                          <td className={`py-2 pr-4 font-medium whitespace-nowrap
                                          ${t.type === 'income' ? 'text-emerald-500' : 'text-red-400'}`}>
                            {t.type === 'income' ? '+' : '-'}
                            {Math.abs(t.amount).toLocaleString('id-ID')}
                          </td>
                          <td className="py-2 pr-4 text-slate-600 whitespace-nowrap">
                            {catName(t.categoryId)}
                          </td>
                          {/* More button */}
                          <td className="py-2 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-1 group">
                              <span className="text-[10px] font-semibold text-blue-400 opacity-0 group-hover:opacity-100
                                               translate-x-1 group-hover:translate-x-0 transition-all duration-150 select-none">
                                More
                              </span>
                              <button
                                onClick={() => toggle(t.id)}
                                aria-label="Toggle note"
                                className={`p-1 rounded-lg transition-colors duration-150
                                            ${isExpanded
                                              ? 'text-blue-500 bg-blue-100'
                                              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                                style={{
                                  transform:  isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                                  transition: 'transform 0.2s ease, color 0.15s, background 0.15s',
                                }}
                              >
                                <MoreHorizontal size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* ── Expandable note row ── */}
                        {isExpanded && (
                          <tr key={`${t.id}-note`}>
                            <td colSpan={4} className="pb-3 pt-0 px-0">
                              <div className="flex items-start gap-2 bg-slate-50 rounded-xl px-3 py-2.5">
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 mt-0.5 shrink-0">
                                  Catatan
                                </span>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                  {hasNote ? t.description : <em>No note added.</em>}
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Add record form ── */}
        <div className="card">
          <h2 className="font-semibold text-slate-700 flex items-center gap-2 mb-5">
            <Plus size={15} className="text-blue-500" />
            Tambahkan Catatan
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-slate-600 w-40 shrink-0">Tanggal Transaksi</label>
              <input type="date" value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className="input-field" />
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-slate-600 w-40 shrink-0">Jumlah</label>
              <input type="number" placeholder="e.g. 100000" value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
                className="input-field" />
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-slate-600 w-40 shrink-0">Tipe Transaksi</label>
              <div className="flex gap-5">
                {(['income', 'expense'] as const).map(t => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer text-sm text-slate-600">
                    <input type="radio" name="type" value={t} checked={form.type === t}
                      onChange={() => setForm({ ...form, type: t })}
                      className="accent-blue-600" />
                    {t === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-slate-600 w-40 shrink-0">Kategori</label>
              <select value={form.categoryId}
                onChange={e => setForm({ ...form, categoryId: e.target.value })}
                className="input-field">
                <option value="">— Pilih Kategori —</option>
                {categories.length === 0 && (
                  <option disabled>Add categories in Budgeting tab first</option>
                )}
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <label className="text-sm font-medium text-slate-600 w-40 shrink-0 pt-2">Description</label>
              <textarea placeholder="Optional notes…" value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={3} className="input-field resize-none" />
            </div>

            {error && (
              <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
            )}
            {success && (
              <p className="text-emerald-600 text-xs bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 flex items-center gap-1">
                <Check size={12} /> Transaction added!
              </p>
            )}

            <div className="flex justify-end gap-3 pt-1">
              <button
                onClick={() => { setForm({ date: '', amount: '', categoryId: '', type: 'income', description: '' }); setError('') }}
                className="btn-secondary flex items-center gap-1.5"
              >
                <X size={14} /> Cancel
              </button>
              <button onClick={handleAdd} className="btn-primary flex items-center gap-1.5">
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}