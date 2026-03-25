import { Transaction } from '@/lib/mockData'

interface TransactionTableProps {
  transactions: Transaction[]
  showAmount?: boolean
}

export default function TransactionTable({ transactions, showAmount = true }: TransactionTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-slate-500 text-xs">
            <th className="text-left pb-3 font-medium">
              {showAmount ? 'Tanggal' : 'Date'}
            </th>
            <th className="text-left pb-3 font-medium">
              {showAmount ? 'Jumlah' : 'Amount'}
            </th>
            <th className="text-left pb-3 font-medium">Kategori</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {transactions.map(t => (
            <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-2 pr-4 text-slate-600 whitespace-nowrap">{t.date}</td>
              <td className={`py-2 pr-4 font-medium whitespace-nowrap
                              ${t.type === 'income' ? 'text-emerald-500' : 'text-red-400'}`}>
                {t.type === 'income' ? '+' : ''}{t.amount.toLocaleString('id-ID')}
              </td>
              <td className="py-2 text-slate-600 whitespace-nowrap">{t.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
