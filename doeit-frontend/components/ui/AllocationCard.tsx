import { AllocationCategory, formatRupiah } from '@/lib/mockData'

interface AllocationCardProps {
  category: AllocationCategory
  showRemain?: boolean
  onClick?: () => void
}

export default function AllocationCard({ category, showRemain = false, onClick }: AllocationCardProps) {
  const isBlue = category.color === 'blue'

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md
                  ${isBlue
                    ? 'text-white shadow-blue-200/50 shadow-lg'
                    : 'bg-white border border-slate-100 shadow-sm'
                  }`}
      style={isBlue ? { background: 'linear-gradient(135deg, #2563eb, #3b82f6)' } : {}}
    >
      <div className={`text-xs font-semibold mb-3 flex items-center gap-1.5 uppercase tracking-wide
                       ${isBlue ? 'text-blue-100' : 'text-slate-500'}`}>
        <span>{category.icon}</span>
        <span>{category.name}</span>
      </div>
      <div className={`text-[10px] font-medium mb-0.5
                       ${isBlue ? 'text-blue-200' : 'text-slate-400'}`}>
        {showRemain ? 'Remain' : 'Amount'}
      </div>
      <div className={`text-lg font-bold
                       ${isBlue ? 'text-white' : 'text-blue-600'}`}>
        {formatRupiah(category.amount)}
      </div>
    </div>
  )
}
