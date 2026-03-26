'use client'
/**
 * AppContext
 * ---------
 * Shared frontend state that lives for the duration of a browser session.
 * - categories: list of budget categories (managed in Budgeting tab)
 * - transactions: list of cash flow records (managed in Cash Flow tab)
 *
 * When you add a real backend, replace the useState calls here with
 * API fetch hooks (SWR / React Query) and the setters with mutation calls.
 */
import { createContext, useContext, useState, ReactNode } from 'react'

// ── Types ────────────────────────────────────────────────────────────────────

export interface Category {
  id: string
  name: string
  budget: number   // allocated budget amount in IDR
  icon: string
}

export interface Transaction {
  id: string
  date: string          // stored as YYYY-MM-DD
  amount: number        // positive = income, negative = expense
  type: 'income' | 'expense'
  categoryId: string    // references Category.id  ('' = uncategorised)
  description: string
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function formatRupiah(n: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
    .format(Math.abs(n))
    .replace('IDR', 'Rp')
    .replace(/\s/, '\u00a0')
}

export function calcStats(transactions: Transaction[]) {
  const income  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + Math.abs(t.amount), 0)
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0)
  return { income, expense, balance: income - expense }
}

// ── Context ──────────────────────────────────────────────────────────────────

interface AppContextValue {
  categories: Category[]
  addCategory:    (c: Omit<Category, 'id'>) => void
  updateCategory: (id: string, c: Omit<Category, 'id'>) => void
  deleteCategory: (id: string) => void

  transactions: Transaction[]
  addTransaction: (t: Omit<Transaction, 'id'>) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const addCategory = (c: Omit<Category, 'id'>) =>
    setCategories(prev => [...prev, { ...c, id: Date.now().toString() }])

  const updateCategory = (id: string, c: Omit<Category, 'id'>) =>
    setCategories(prev => prev.map(cat => cat.id === id ? { id, ...c } : cat))

  const deleteCategory = (id: string) =>
    setCategories(prev => prev.filter(cat => cat.id !== id))

  const addTransaction = (t: Omit<Transaction, 'id'>) =>
    setTransactions(prev => [{ ...t, id: Date.now().toString() }, ...prev])

  return (
    <AppContext.Provider value={{
      categories, addCategory, updateCategory, deleteCategory,
      transactions, addTransaction,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}