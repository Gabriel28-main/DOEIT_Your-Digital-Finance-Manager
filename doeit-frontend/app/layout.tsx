import type { Metadata } from 'next'
import '../styles/globals.css'
import { AppProvider } from '@/lib/AppContext'

export const metadata: Metadata = {
  title: 'DOEIT - Personal Finance',
  description: 'Manage your personal finances with DOEIT',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* AppProvider makes categories + transactions available to ALL pages */}
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}