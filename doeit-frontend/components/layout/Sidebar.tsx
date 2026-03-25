'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  RefreshCw,
  Grid2X2,
  User,
  LogOut,
} from 'lucide-react'
import DoeitLogo from '@/components/ui/DoeitLogo'

const navItems = [
  { label: 'DASHBOARD', href: '/dashboard',  icon: LayoutDashboard },
  { label: 'CASH FLOW', href: '/cashflow',   icon: RefreshCw },
  { label: 'BUDGETING', href: '/allocation', icon: Grid2X2 },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside className="fixed left-0 top-0 h-full bg-white border-r border-slate-100
                      flex flex-col py-6 px-4 z-20 shadow-sm"
           style={{ width: 160 }}>
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center mb-10 px-1">
        <DoeitLogo width={100} variant="color" />
      </Link>

      {/* Main nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link key={href} href={href}
                className={`nav-item ${pathname === href ? 'active' : ''}`}>
            <Icon size={16} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="flex flex-col gap-1">
        <Link href="/profile"
              className={`nav-item ${pathname === '/profile' ? 'active' : ''}`}>
          <User size={16} />
          <span>PROFILE</span>
        </Link>
        <button onClick={() => router.push('/login')}
                className="nav-item text-left">
          <LogOut size={16} />
          <span>SIGN OUT</span>
        </button>
      </div>
    </aside>
  )
}
