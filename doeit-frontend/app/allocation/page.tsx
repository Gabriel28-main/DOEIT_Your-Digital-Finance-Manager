'use client'
import { useState } from 'react'
import { Plus, X, Pencil, Trash2 } from 'lucide-react'
import { ALLOCATION_CATEGORIES, AllocationCategory, formatRupiah } from '@/lib/mockData'

const PRESET_ICONS = ['🛒','🍔','🎓','🏠','⚡','💅','🧃','💊','🎮','✈️','📚','🚗','🏋️','🎵','💻','🎯','🛍️','☕']

// ─── Shared modal form ───────────────────────────────────────────────────────
interface ModalProps {
  title: string
  form: { name: string; amount: string; icon: string; customEmoji: string }
  useCustom: boolean
  error: string
  onChangeForm: (f: ModalProps['form']) => void
  onToggleCustom: () => void
  onCancel: () => void
  onConfirm: () => void
  confirmLabel: string
}

function CategoryModal({
  title, form, useCustom, error,
  onChangeForm, onToggleCustom, onCancel, onConfirm, confirmLabel,
}: ModalProps) {
  const activeIcon = useCustom ? (form.customEmoji || '❓') : form.icon

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className="rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #1177FF 0%, #3b82f6 100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pt-5 px-7">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">
              {activeIcon}
            </div>
            <span className="text-white/80 text-sm font-medium">{title}</span>
          </div>
          <button onClick={onCancel} className="text-white/50 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="px-7 pb-7 pt-4 space-y-5">
          {/* Name */}
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">Category Name</label>
            <div className="border-b border-white/30 pb-1">
              <input
                type="text"
                placeholder="e.g. Transport"
                value={form.name}
                onChange={e => onChangeForm({ ...form, name: e.target.value })}
                className="w-full bg-transparent text-white placeholder:text-white/30 text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">Amount</label>
            <div className="border-b border-white/30 pb-1 flex items-center gap-2">
              <span className="text-white/50 text-sm">Rp</span>
              <input
                type="number"
                placeholder="0"
                value={form.amount}
                onChange={e => onChangeForm({ ...form, amount: e.target.value })}
                className="w-full bg-transparent text-white placeholder:text-white/30 text-sm focus:outline-none"
              />
            </div>
            {form.amount && !isNaN(parseFloat(form.amount)) && (
              <p className="text-white/40 text-xs mt-1">{formatRupiah(parseFloat(form.amount))}</p>
            )}
          </div>

          {/* Icon picker */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-white/60 text-xs font-medium">Icon</label>
              <button
                onClick={onToggleCustom}
                className="text-white/50 hover:text-white text-xs underline transition-colors"
              >
                {useCustom ? 'Use preset' : 'Custom emoji'}
              </button>
            </div>
            {useCustom ? (
              <input
                type="text"
                placeholder="Paste any emoji, e.g. 🌟"
                value={form.customEmoji}
                onChange={e => onChangeForm({ ...form, customEmoji: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2
                           text-white placeholder:text-white/30 text-sm focus:outline-none
                           focus:ring-2 focus:ring-white/30"
              />
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {PRESET_ICONS.map(ic => (
                  <button
                    key={ic}
                    onClick={() => onChangeForm({ ...form, icon: ic })}
                    className={`w-8 h-8 rounded-lg text-base flex items-center justify-center transition-all duration-150
                                ${form.icon === ic ? 'bg-white/30 ring-2 ring-white scale-110' : 'bg-white/10 hover:bg-white/20'}`}
                  >
                    {ic}
                  </button>
                ))}
              </div>
            )}
          </div>

          {error && (
            <p className="text-red-200 text-xs bg-red-500/20 rounded-lg px-3 py-2">{error}</p>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-1">
            <button
              onClick={onCancel}
              className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all"
            >
              CANCEL
            </button>
            <button
              onClick={onConfirm}
              className="px-5 py-2 rounded-xl bg-white hover:bg-blue-50 text-blue-600 text-sm font-semibold transition-all shadow-md"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Inline category card with edit/delete overlay ───────────────────────────
interface CardProps {
  category: AllocationCategory
  onEdit: () => void
  onDelete: () => void
}

function BudgetCard({ category, onEdit, onDelete }: CardProps) {
  const isBlue = category.color === 'blue'
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative rounded-2xl p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-md cursor-pointer"
      style={isBlue
        ? { background: 'linear-gradient(135deg, #1177FF, #3b82f6)', color: 'white' }
        : { background: 'white', border: '1px solid #f1f5f9' }
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Edit / delete buttons — shown on hover */}
      {hovered && (
        <div className="absolute top-2 right-2 flex gap-1 z-10">
          <button
            onClick={e => { e.stopPropagation(); onEdit() }}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all
                        ${isBlue ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-blue-50 hover:bg-blue-100 text-blue-600'}`}
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); onDelete() }}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all
                        ${isBlue ? 'bg-white/20 hover:bg-red-400/40 text-white' : 'bg-red-50 hover:bg-red-100 text-red-500'}`}
          >
            <Trash2 size={13} />
          </button>
        </div>
      )}

      <div className={`text-xs font-semibold mb-3 flex items-center gap-1.5 uppercase tracking-wide
                       ${isBlue ? 'text-blue-100' : 'text-slate-500'}`}>
        <span>{category.icon}</span>
        <span className="truncate">{category.name}</span>
      </div>
      <div className={`text-[10px] font-medium mb-0.5 ${isBlue ? 'text-blue-200' : 'text-slate-400'}`}>
        Amount
      </div>
      <div className={`text-lg font-bold ${isBlue ? 'text-white' : 'text-blue-600'}`}>
        {formatRupiah(category.amount)}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const emptyForm = { name: '', amount: '', icon: '🛒', customEmoji: '' }

export default function AllocationPage() {
  const [categories, setCategories] = useState<AllocationCategory[]>(ALLOCATION_CATEGORIES)

  // Add modal
  const [showAdd, setShowAdd]       = useState(false)
  const [addForm, setAddForm]       = useState(emptyForm)
  const [addCustom, setAddCustom]   = useState(false)
  const [addError, setAddError]     = useState('')

  // Edit modal
  const [editId, setEditId]         = useState<string | null>(null)
  const [editForm, setEditForm]     = useState(emptyForm)
  const [editCustom, setEditCustom] = useState(false)
  const [editError, setEditError]   = useState('')

  // Delete confirm
  const [deleteId, setDeleteId]     = useState<string | null>(null)

  // ── helpers ──
  const validate = (form: typeof emptyForm) => {
    if (!form.name.trim() || !form.amount) return 'Please fill in name and amount.'
    if (isNaN(parseFloat(form.amount)) || parseFloat(form.amount) <= 0)
      return 'Amount must be a positive number.'
    return ''
  }

  const resolveIcon = (form: typeof emptyForm, useCustom: boolean) =>
    useCustom ? (form.customEmoji || '❓') : form.icon

  // ── add ──
  const openAdd = () => { setAddForm(emptyForm); setAddCustom(false); setAddError(''); setShowAdd(true) }
  const closeAdd = () => { setShowAdd(false); setAddError('') }
  const handleAdd = () => {
    const err = validate(addForm)
    if (err) { setAddError(err); return }
    setCategories(prev => [...prev, {
      id: Date.now().toString(),
      name: addForm.name,
      amount: parseFloat(addForm.amount),
      icon: resolveIcon(addForm, addCustom),
      color: 'white',
    }])
    closeAdd()
  }

  // ── edit ──
  const openEdit = (cat: AllocationCategory) => {
    setEditId(cat.id)
    setEditForm({ name: cat.name, amount: String(cat.amount), icon: cat.icon, customEmoji: '' })
    setEditCustom(false)
    setEditError('')
  }
  const closeEdit = () => { setEditId(null); setEditError('') }
  const handleEdit = () => {
    const err = validate(editForm)
    if (err) { setEditError(err); return }
    setCategories(prev => prev.map(c =>
      c.id === editId
        ? { ...c, name: editForm.name, amount: parseFloat(editForm.amount), icon: resolveIcon(editForm, editCustom) }
        : c
    ))
    closeEdit()
  }

  // ── delete ──
  const handleDelete = () => {
    setCategories(prev => prev.filter(c => c.id !== deleteId))
    setDeleteId(null)
  }

  return (
    <div className="px-6 md:px-10 lg:px-14 py-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-8">Budgeting</h1>

      <div className="card">
        <h2 className="font-semibold text-slate-700 flex items-center gap-2 mb-6">
          <span className="text-blue-500">⊞</span>
          Budgeting
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map(cat => (
            <BudgetCard
              key={cat.id}
              category={cat}
              onEdit={() => openEdit(cat)}
              onDelete={() => setDeleteId(cat.id)}
            />
          ))}

          {/* Add card */}
          <button
            onClick={openAdd}
            className="rounded-2xl border-2 border-dashed border-blue-200 p-4
                       flex flex-col items-center justify-center gap-2 min-h-[110px]
                       text-blue-400 hover:border-blue-400 hover:bg-blue-50/50
                       transition-all duration-200"
          >
            <Plus size={20} />
            <span className="text-xs font-medium">Add More Category</span>
          </button>
        </div>
      </div>

      {/* Add modal */}
      {showAdd && (
        <CategoryModal
          title="New Category"
          form={addForm}
          useCustom={addCustom}
          error={addError}
          onChangeForm={setAddForm}
          onToggleCustom={() => setAddCustom(v => !v)}
          onCancel={closeAdd}
          onConfirm={handleAdd}
          confirmLabel="CREATE"
        />
      )}

      {/* Edit modal */}
      {editId && (
        <CategoryModal
          title="Edit Category"
          form={editForm}
          useCustom={editCustom}
          error={editError}
          onChangeForm={setEditForm}
          onToggleCustom={() => setEditCustom(v => !v)}
          onCancel={closeEdit}
          onConfirm={handleEdit}
          confirmLabel="SAVE"
        />
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xs shadow-xl text-center">
            <div className="text-3xl mb-3">🗑️</div>
            <h3 className="font-semibold text-slate-800 mb-1">Delete category?</h3>
            <p className="text-slate-400 text-sm mb-5">
              {categories.find(c => c.id === deleteId)?.name} will be removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}