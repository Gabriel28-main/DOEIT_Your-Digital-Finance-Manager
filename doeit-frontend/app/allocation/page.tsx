'use client'
import { useState, useRef, useEffect } from 'react'
import {
  Plus, X, MoreVertical, Pencil, Trash2,
  ShoppingCart, Coffee, BookOpen, Home, Zap, Sparkles,
  ShoppingBag, HeartPulse, Music, Navigation, Monitor,
  Target, Camera, Gift, Truck, Umbrella, Feather, Package, LayoutGrid
} from 'lucide-react'
import { useApp, Category, formatRupiah } from '@/lib/AppContext'

// ── Preset icons (lucide-react) ───────────────────────────────────────────────
const PRESET_ICONS: { key: string; Icon: React.ElementType; label: string }[] = [
  { key: 'cart',      Icon: ShoppingCart, label: 'Groceries'  },
  { key: 'coffee',    Icon: Coffee,       label: 'Food'       },
  { key: 'book',      Icon: BookOpen,     label: 'School'     },
  { key: 'home',      Icon: Home,         label: 'Housing'    },
  { key: 'zap',       Icon: Zap,          label: 'Electric'   },
  { key: 'sparkles',  Icon: Sparkles,     label: 'Life Style' },
  { key: 'bag',       Icon: ShoppingBag,  label: 'Shopping'   },
  { key: 'heart',     Icon: HeartPulse,   label: 'Medical'    },
  { key: 'music',     Icon: Music,        label: 'Music'      },
  { key: 'nav',       Icon: Navigation,   label: 'Travel'     },
  { key: 'monitor',   Icon: Monitor,      label: 'Tech'       },
  { key: 'target',    Icon: Target,       label: 'Goals'      },
  { key: 'camera',    Icon: Camera,       label: 'Photo'      },
  { key: 'gift',      Icon: Gift,         label: 'Gifts'      },
  { key: 'truck',     Icon: Truck,        label: 'Delivery'   },
  { key: 'umbrella',  Icon: Umbrella,     label: 'Insurance'  },
  { key: 'feather',   Icon: Feather,      label: 'Misc'       },
  { key: 'package',   Icon: Package,      label: 'Storage'    },
]

// Render icon by key; fall back to text/emoji for any legacy data
function RenderIcon({ iconKey, size = 16 }: { iconKey: string; size?: number }) {
  const found = PRESET_ICONS.find(p => p.key === iconKey)
  if (found) {
    const { Icon } = found
    return <Icon size={size} strokeWidth={1.75} />
  }
  return <span style={{ fontSize: size, lineHeight: 1 }}>{iconKey}</span>
}

// ── Three-dot dropdown ────────────────────────────────────────────────────────
function CardMenu({ onEdit, onDelete, isBlue }: { onEdit: () => void; onDelete: () => void; isBlue: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="absolute top-2 right-2 z-20">
      <button
        onClick={e => { e.stopPropagation(); setOpen(v => !v) }}
        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all
                    ${isBlue
                      ? 'text-white/60 hover:text-white hover:bg-white/20'
                      : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'}`}
      >
        <MoreVertical size={15} />
      </button>

      {open && (
        <div className="absolute right-0 top-8 w-36 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-30">
          <button
            onClick={e => { e.stopPropagation(); setOpen(false); onEdit() }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            <Pencil size={13} /> Edit
          </button>
          <div className="h-px bg-slate-100" />
          <button
            onClick={e => { e.stopPropagation(); setOpen(false); onDelete() }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      )}
    </div>
  )
}

// ── Single category card ──────────────────────────────────────────────────────
function BudgetCard({ category, index, onEdit, onDelete }: {
  category: Category
  index: number
  onEdit: () => void
  onDelete: () => void
}) {
  const blue = index % 2 === 0   // alternating: 1st blue, 2nd white, 3rd blue…

  return (
    <div
      className="relative rounded-2xl p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-md min-h-[110px]"
      style={blue
        ? { background: 'linear-gradient(135deg, #1177FF, #3b82f6)', color: 'white' }
        : { background: 'white', border: '1px solid #f1f5f9' }
      }
    >
      <CardMenu onEdit={onEdit} onDelete={onDelete} isBlue={blue} />

      {/* Icon badge */}
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2
                       ${blue ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-500'}`}>
        <RenderIcon iconKey={category.icon} size={16} />
      </div>

      <div className={`text-xs font-semibold mb-3 uppercase tracking-wide pr-6 truncate
                       ${blue ? 'text-blue-100' : 'text-slate-500'}`}>
        {category.name}
      </div>
      <div className={`text-[10px] font-medium mb-0.5 ${blue ? 'text-blue-200' : 'text-slate-400'}`}>
        Amount
      </div>
      <div className={`text-lg font-bold ${blue ? 'text-white' : 'text-blue-600'}`}>
        {formatRupiah(category.budget)}
      </div>
    </div>
  )
}

// ── Modal ─────────────────────────────────────────────────────────────────────
const emptyForm = { name: '', budget: '', icon: 'cart', customEmoji: '' }

function CategoryModal({ title, form, useCustom, error, onChange, onToggleCustom, onCancel, onConfirm, confirmLabel }: {
  title: string
  form: typeof emptyForm
  useCustom: boolean
  error: string
  onChange: (f: typeof emptyForm) => void
  onToggleCustom: () => void
  onCancel: () => void
  onConfirm: () => void
  confirmLabel: string
}) {
  const activeIconKey = useCustom ? (form.customEmoji || 'cart') : form.icon

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
           style={{ background: 'linear-gradient(145deg, #1177FF 0%, #3b82f6 100%)' }}>

        <div className="flex items-center justify-between pt-5 px-7">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <RenderIcon iconKey={activeIconKey} size={20} />
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
              <input type="text" placeholder="e.g. Transport" value={form.name}
                onChange={e => onChange({ ...form, name: e.target.value })}
                className="w-full bg-transparent text-white placeholder:text-white/30 text-sm focus:outline-none" />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="text-white/60 text-xs font-medium block mb-1.5">Budget Amount</label>
            <div className="border-b border-white/30 pb-1 flex items-center gap-2">
              <span className="text-white/50 text-sm">Rp</span>
              <input type="number" placeholder="0" value={form.budget}
                onChange={e => onChange({ ...form, budget: e.target.value })}
                className="w-full bg-transparent text-white placeholder:text-white/30 text-sm focus:outline-none" />
            </div>
            {form.budget && !isNaN(parseFloat(form.budget)) && (
              <p className="text-white/40 text-xs mt-1">{formatRupiah(parseFloat(form.budget))}</p>
            )}
          </div>

          {/* Icon picker */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-white/60 text-xs font-medium">Icon</label>
              <button onClick={onToggleCustom}
                className="text-white/50 hover:text-white text-xs underline transition-colors">
                {useCustom ? 'Use preset' : 'Custom emoji'}
              </button>
            </div>

            {useCustom ? (
              <input type="text" placeholder="Paste any emoji, e.g. 🌟" value={form.customEmoji}
                onChange={e => onChange({ ...form, customEmoji: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-white/30" />
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {PRESET_ICONS.map(({ key, Icon, label }) => (
                  <button
                    key={key}
                    title={label}
                    onClick={() => onChange({ ...form, icon: key })}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all
                                ${form.icon === key
                                  ? 'bg-white/30 ring-2 ring-white scale-110 text-white'
                                  : 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'}`}
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-red-200 text-xs bg-red-500/20 rounded-lg px-3 py-2">{error}</p>}

          <div className="flex gap-3 justify-end pt-1">
            <button onClick={onCancel}
              className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all">
              CANCEL
            </button>
            <button onClick={onConfirm}
              className="px-5 py-2 rounded-xl bg-white hover:bg-blue-50 text-blue-600 text-sm font-semibold transition-all shadow-md">
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BudgetingPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useApp()

  const [showAdd,    setShowAdd]    = useState(false)
  const [addForm,    setAddForm]    = useState(emptyForm)
  const [addCustom,  setAddCustom]  = useState(false)
  const [addError,   setAddError]   = useState('')

  const [editId,     setEditId]     = useState<string | null>(null)
  const [editForm,   setEditForm]   = useState(emptyForm)
  const [editCustom, setEditCustom] = useState(false)
  const [editError,  setEditError]  = useState('')

  const [deleteId,   setDeleteId]   = useState<string | null>(null)

  const validate = (f: typeof emptyForm) => {
    if (!f.name.trim() || !f.budget) return 'Please fill in name and budget.'
    if (isNaN(parseFloat(f.budget)) || parseFloat(f.budget) <= 0) return 'Budget must be a positive number.'
    return ''
  }
  const resolveIcon = (f: typeof emptyForm, custom: boolean) =>
    custom ? (f.customEmoji || 'cart') : f.icon

  const handleAdd = () => {
    const err = validate(addForm)
    if (err) { setAddError(err); return }
    addCategory({ name: addForm.name, budget: parseFloat(addForm.budget), icon: resolveIcon(addForm, addCustom) })
    setShowAdd(false); setAddForm(emptyForm); setAddCustom(false); setAddError('')
  }

  const openEdit = (cat: Category) => {
    setEditId(cat.id)
    setEditForm({ name: cat.name, budget: String(cat.budget), icon: cat.icon, customEmoji: '' })
    setEditCustom(false); setEditError('')
  }
  const handleEdit = () => {
    const err = validate(editForm)
    if (err) { setEditError(err); return }
    updateCategory(editId!, { name: editForm.name, budget: parseFloat(editForm.budget), icon: resolveIcon(editForm, editCustom) })
    setEditId(null); setEditError('')
  }

  return (
    <div className="px-6 md:px-10 lg:px-14 py-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-8">Budgeting</h1>

      <div className="card">
        <h2 className="font-semibold text-slate-700 flex items-center gap-2 mb-6">
          <LayoutGrid />
          Budgeting
        </h2>

        {categories.length === 0 && (
          <p className="text-slate-400 text-sm mb-6">No categories yet. Add one to get started!</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <BudgetCard key={cat.id} category={cat} index={i}
              onEdit={() => openEdit(cat)}
              onDelete={() => setDeleteId(cat.id)} />
          ))}

          <button
            onClick={() => { setAddForm(emptyForm); setAddCustom(false); setAddError(''); setShowAdd(true) }}
            className="rounded-2xl border-2 border-dashed border-blue-200 p-4 flex flex-col items-center justify-center gap-2 min-h-[110px] text-blue-400 hover:border-blue-400 hover:bg-blue-50/50 transition-all"
          >
            <Plus size={20} />
            <span className="text-xs font-medium">Add Category</span>
          </button>
        </div>
      </div>

      {showAdd && (
        <CategoryModal title="New Category" form={addForm} useCustom={addCustom} error={addError}
          onChange={setAddForm} onToggleCustom={() => setAddCustom(v => !v)}
          onCancel={() => { setShowAdd(false); setAddError('') }}
          onConfirm={handleAdd} confirmLabel="CREATE" />
      )}

      {editId && (
        <CategoryModal title="Edit Category" form={editForm} useCustom={editCustom} error={editError}
          onChange={setEditForm} onToggleCustom={() => setEditCustom(v => !v)}
          onCancel={() => { setEditId(null); setEditError('') }}
          onConfirm={handleEdit} confirmLabel="SAVE" />
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xs shadow-xl text-center">
            <div className="text-3xl mb-3">🗑️</div>
            <h3 className="font-semibold text-slate-800 mb-1">Delete category?</h3>
            <p className="text-slate-400 text-sm mb-5">
              <strong>{categories.find(c => c.id === deleteId)?.name}</strong> will be removed permanently.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all">
                Cancel
              </button>
              <button onClick={() => { deleteCategory(deleteId); setDeleteId(null) }}
                className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}