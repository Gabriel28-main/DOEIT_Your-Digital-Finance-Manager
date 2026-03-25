'use client'
import { useState } from 'react'
import { RefreshCw, Plus, X, Check } from 'lucide-react'
import TransactionTable from '@/components/ui/TransactionTable'
import { TRANSACTIONS, Transaction } from '@/lib/mockData'

const CATEGORIES = [
  'Income', 'Food', 'Snack', 'Groceries', 'Food and Drink',
  'School', 'Biaya Sewa Kost', 'Electric Bill', 'Life Style',
  'Jajan', 'Medical Attention',
]

const emptyForm = {
  date: '',
  amount: '',
  category: '',
  type: 'income' as 'income' | 'expense',
  description: '',
}

export default function CashflowPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(TRANSACTIONS)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleAdd = () => {
    if (!form.date || !form.amount || !form.category) {
      setError('Please fill in Date, Amount, and Category.')
      return
    }
    const amount = parseFloat(form.amount)
    if (isNaN(amount) || amount <= 0) {
      setError('Amount must be a positive number.')
      return
    }

    const newTx: Transaction = {
      id: Date.now().toString(),
      date: form.date,
      amount: form.type === 'expense' ? -amount : amount,
      category: form.category,
      type: form.type,
      description: form.description,
    }

    setTransactions(prev => [...prev, newTx])
    setForm(emptyForm)
    setError('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2500)
  }

  const handleCancel = () => {
    setForm(emptyForm)
    setError('')
  }

  // Format date for display: YYYY-MM-DD → DD/MM/YYYY
  const displayTx = transactions.map(t => {
    if (t.date.includes('-')) {
      const [y, m, d] = t.date.split('-')
      return { ...t, date: `${d}/${m}/${y}` }
    }
    return t
  }).reverse()

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-8">ARUS KAS</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction list */}
        <div className="card">
          <h2 className="font-semibold text-slate-700 flex items-center gap-2 mb-4">
            <RefreshCw size={15} className="text-blue-500" />
            Arus Kas
          </h2>
          <TransactionTable transactions={displayTx} />
        </div>

        {/* Add form */}
        <div className="card">
          <h2 className="font-semibold text-slate-700 flex items-center gap-2 mb-5">
            <Plus size={15} className="text-blue-500" />
            Tambahkan Catatan
          </h2>

          <div className="space-y-4">
            {/* Date */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-slate-600 w-40 shrink-0">
                Tanggal Transaksi
              </label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className="input-field"
              />
            </div>

            {/* Amount */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-slate-600 w-40 shrink-0">
                Jumlah
              </label>
              <input
                type="number"
                placeholder="e.g. 100000"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
                className="input-field"
              />
            </div>

            {/* Category */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-slate-600 w-40 shrink-0">
                Kategori Pengeluaran
              </label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="input-field"
              >
                <option value="">Pilih Kategori Pengeluaran</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-slate-600 w-40 shrink-0">
                Tipe Transaksi
              </label>
              <div className="flex gap-5">
                {(['income', 'expense'] as const).map(t => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer text-sm text-slate-600">
                    <input
                      type="radio"
                      name="type"
                      value={t}
                      checked={form.type === t}
                      onChange={() => setForm({ ...form, type: t })}
                      className="accent-blue-600"
                    />
                    {t === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="flex gap-4">
              <label className="text-sm font-medium text-slate-600 w-40 shrink-0 pt-2">
                Description
              </label>
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={4}
                className="input-field resize-none"
              />
            </div>

            {/* Error / success */}
            {error && (
              <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            {success && (
              <p className="text-emerald-600 text-xs bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 flex items-center gap-1">
                <Check size={12} /> Transaction added successfully!
              </p>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-1">
              <button onClick={handleCancel} className="btn-secondary">
                <X size={14} /> Cancel
              </button>
              <button onClick={handleAdd} className="btn-primary">
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
