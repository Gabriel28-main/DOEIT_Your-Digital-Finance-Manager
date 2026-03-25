// lib/mockData.ts
// Central mock data — swap these out when connecting a real backend

export const USER = {
  name: 'Ryan',
  fullName: 'Ryan Smith',
  email: 'RyanSmith@gmail.com',
  avatar: 'R',
}

export interface Transaction {
  id: string
  date: string
  amount: number
  category: string
  type: 'income' | 'expense'
  description?: string
}

export const TRANSACTIONS: Transaction[] = [
  { id: '1', date: '19/03/2026', amount: 100000,  category: 'Income',    type: 'income' },
  { id: '2', date: '20/03/2026', amount: 100000,  category: 'Income',    type: 'income' },
  { id: '3', date: '21/03/2026', amount: -50000,  category: 'Food',      type: 'expense' },
  { id: '4', date: '22/03/2026', amount: 100000,  category: 'Income',    type: 'income' },
  { id: '5', date: '23/03/2026', amount: 100000,  category: 'Income',    type: 'income' },
  { id: '6', date: '24/03/2026', amount: -50000,  category: 'Food',      type: 'expense' },
  { id: '7', date: '25/03/2026', amount: -50000,  category: 'Snack',     type: 'expense' },
  { id: '8', date: '26/03/2026', amount: 100000,  category: 'Income',    type: 'income' },
  { id: '9', date: '27/03/2026', amount: 100000,  category: 'Income',    type: 'income' },
  { id: '10',date: '28/03/2026', amount: -500000, category: 'Life Style', type: 'expense' },
]

export interface AllocationCategory {
  id: string
  name: string
  amount: number
  icon: string
  color: 'blue' | 'white'
}

export const ALLOCATION_CATEGORIES: AllocationCategory[] = [
  { id: '1', name: 'Groceries',       amount: 500000,  icon: '🛒', color: 'blue' },
  { id: '2', name: 'Food and Drink',  amount: 500000,  icon: '🍔', color: 'white' },
  { id: '3', name: 'School',          amount: 1000000, icon: '🎓', color: 'white' },
  { id: '4', name: 'Biaya Sewa Kost', amount: 900000,  icon: '🏠', color: 'white' },
  { id: '5', name: 'Electric Bill',   amount: 500000,  icon: '⚡', color: 'white' },
  { id: '6', name: 'Life Style',      amount: 200000,  icon: '💅', color: 'blue' },
  { id: '7', name: 'Jajan',           amount: 200000,  icon: '🧃', color: 'white' },
  { id: '8', name: 'Medical Attention',amount: 500000, icon: '💊', color: 'blue' },
]

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(Math.abs(amount))
    .replace('IDR', 'Rp')
    .replace(/\s/, '\u00a0')
}

export function calcStats(transactions: Transaction[]) {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((s, t) => s + Math.abs(t.amount), 0)
  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((s, t) => s + Math.abs(t.amount), 0)
  return { income, expense, balance: income - expense }
}
