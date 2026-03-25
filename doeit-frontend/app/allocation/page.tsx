'use client'
import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import AllocationCard from '@/components/ui/AllocationCard'
import { ALLOCATION_CATEGORIES, AllocationCategory, formatRupiah } from '@/lib/mockData'

const PRESET_ICONS = ['🛒','🍔','🎓','🏠','⚡','💅','🧃','💊','🎮','✈️','📚','🚗','🏋️','🎵','💻','🎯','🛍️','☕']

export default function AllocationPage() {
  const [categories, setCategories] = useState<AllocationCategory[]>(ALLOCATION_CATEGORIES)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', amount: '', icon: '🛒', customEmoji: '' })
  const [useCustom, setUseCustom] = useState(false)
  const [error, setError] = useState('')

  const activeIcon = useCustom ? (form.customEmoji || '❓') : form.icon

  const handleAdd = () => {
    if (!form.name || !form.amount) {
      setError('Please fill in name and amount.')
      return
    }
    const amount = parseFloat(form.amount)
    if (isNaN(amount) || amount <= 0) {
      setError('Amount must be a positive number.')
      return
    }
    const newCat: AllocationCategory = {
      id: Date.now().toString(),
      name: form.name,
      amount,
      icon: activeIcon,
      color: 'white',
    }
    setCategories(prev => [...prev, newCat])
    setForm({ name: '', amount: '', icon: '🛒', customEmoji: '' })
    setUseCustom(false)
    setError('')
    setShowModal(false)
  }

  const closeModal = () => {
    setShowModal(false)
    setError('')
    setForm({ name: '', amount: '', icon: '🛒', customEmoji: '' })
    setUseCustom(false)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-8">Budgeting</h1>

      <div className="card">
        <h2 className="font-semibold text-slate-700 flex items-center gap-2 mb-6">
          <span className="text-blue-500">⊞</span>
          Budgeting
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map(cat => (
            <AllocationCard key={cat.id} category={cat} showRemain />
          ))}

          {/* Add new category card */}
          <button
            onClick={() => setShowModal(true)}
            className="rounded-2xl border-2 border-dashed border-blue-200 p-4
                       flex flex-col items-center justify-center gap-2 min-h-[110px]
                       text-blue-400 hover:border-blue-400 hover:bg-blue-50/50
                       transition-all duration-200 cursor-pointer"
          >
            <Plus size={20} />
            <span className="text-xs font-medium">Add More Category</span>
          </button>
        </div>
      </div>

      {/* Modal — blue card style matching reference */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50
                        flex items-center justify-center p-4">
          <div className="rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
               style={{ background: 'linear-gradient(145deg, #1177FF 0%, #3b82f6 100%)' }}>
            {/* Close button */}
            <div className="flex justify-end pt-4 pr-4">
              <button onClick={closeModal}
                      className="text-white/60 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="px-7 pb-7 pt-1 space-y-5">
              {/* Preview icon */}
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">
                  {activeIcon}
                </div>
                <span className="text-white/70 text-sm font-medium">New Category</span>
              </div>

              {/* Category name */}
              <div>
                <label className="text-white/60 text-xs font-medium block mb-1.5">
                  New Category Name
                </label>
                <div className="border-b border-white/30 pb-1">
                  <input
                    type="text"
                    placeholder="e.g. Transport"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent text-white placeholder:text-white/30
                               text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="text-white/60 text-xs font-medium block mb-1.5">
                  Amount
                </label>
                <div className="border-b border-white/30 pb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white/50 text-sm">Rp</span>
                    <input
                      type="number"
                      placeholder="0"
                      value={form.amount}
                      onChange={e => setForm({ ...form, amount: e.target.value })}
                      className="w-full bg-transparent text-white placeholder:text-white/30
                                 text-sm focus:outline-none"
                    />
                  </div>
                </div>
                {form.amount && !isNaN(parseFloat(form.amount)) && (
                  <p className="text-white/50 text-xs mt-1">
                    {formatRupiah(parseFloat(form.amount))}
                  </p>
                )}
              </div>

              {/* Icon picker */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-white/60 text-xs font-medium">Icon</label>
                  <button
                    onClick={() => setUseCustom(v => !v)}
                    className="text-white/50 hover:text-white text-xs underline transition-colors"
                  >
                    {useCustom ? 'Use preset' : 'Custom emoji'}
                  </button>
                </div>

                {useCustom ? (
                  <input
                    type="text"
                    placeholder="Paste or type an emoji, e.g. 🌟"
                    value={form.customEmoji}
                    onChange={e => setForm({ ...form, customEmoji: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2
                               text-white placeholder:text-white/30 text-sm focus:outline-none
                               focus:ring-2 focus:ring-white/30"
                  />
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_ICONS.map(ic => (
                      <button
                        key={ic}
                        onClick={() => setForm({ ...form, icon: ic })}
                        className={`w-8 h-8 rounded-lg text-base flex items-center justify-center
                                    transition-all duration-150
                                    ${form.icon === ic
                                      ? 'bg-white/30 ring-2 ring-white scale-110'
                                      : 'bg-white/10 hover:bg-white/20'}`}
                      >
                        {ic}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {error && (
                <p className="text-red-200 text-xs bg-red-500/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-3 justify-end pt-1">
                <button
                  onClick={closeModal}
                  className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20
                             text-white text-sm font-medium transition-all"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleAdd}
                  className="px-5 py-2 rounded-xl bg-white hover:bg-blue-50
                             text-blue-600 text-sm font-semibold transition-all shadow-md"
                >
                  CREATE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
