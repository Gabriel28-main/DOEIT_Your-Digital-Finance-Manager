'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Lock, LogIn } from 'lucide-react'
import DoeitLogo from '@/components/ui/DoeitLogo'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.username || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    if (form.username === 'RyanSmith' && form.password === 'password') {
      router.push('/dashboard')
    } else {
      setError('Invalid username or password.')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden md:flex flex-1 relative overflow-hidden"
           style={{ background: 'linear-gradient(135deg, #1177FF 0%, #3b82f6 100%)' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute" style={{
            width: '55%', height: '80%', background: 'white',
            borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
            opacity: 0.1, top: '10%', left: '10%',
          }} />
          <div className="absolute" style={{
            width: '62%', height: '75%', background: 'white',
            borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%',
            opacity: 0.08, top: '15%', left: '5%',
          }} />
          <div className="relative z-10 flex items-center justify-center" style={{
            width: '52%', height: '72%', background: 'white',
            borderRadius: '55% 45% 65% 35% / 45% 55% 45% 55%',
          }}>
            <DoeitLogo width={150} variant="color" />
          </div>
        </div>
      </div>

      {/* Right login panel */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center mb-8 md:hidden">
            <DoeitLogo width={120} variant="color" />
          </div>

          <div className="card-blue rounded-2xl p-8 shadow-xl">
            <h1 className="text-2xl font-bold mb-1">Hello!</h1>
            <p className="text-blue-100 text-sm mb-7">Sign In to your DOEIT Account</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400" />
                <input
                  type="text"
                  placeholder="Username"
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                  className="w-full bg-white/90 border-0 rounded-xl pl-10 pr-4 py-3
                             text-sm text-slate-700 placeholder:text-blue-300
                             focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-white/90 border-0 rounded-xl pl-10 pr-4 py-3
                             text-sm text-slate-700 placeholder:text-blue-300
                             focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
              </div>

              {error && (
                <p className="text-red-200 text-xs bg-red-500/20 rounded-lg px-3 py-2">{error}</p>
              )}

              <button type="submit"
                      className="w-full bg-white hover:bg-blue-50 text-blue-600 font-semibold
                                 py-3 rounded-xl flex items-center justify-center gap-2
                                 transition-all duration-200 shadow-md mt-2">
                <LogIn size={16} />
                Sign In
              </button>
            </form>

            <p className="text-center text-xs text-blue-200 mt-5">
              don&apos;t have account?{' '}
              <a href="#" className="text-white underline font-medium">sign up here</a>
            </p>
          </div>

          <p className="text-center text-slate-400 text-xs mt-4">
            Demo: username{' '}
            <span className="font-mono bg-slate-200 px-1 rounded">RyanSmith</span>
            {' '}/ password{' '}
            <span className="font-mono bg-slate-200 px-1 rounded">password</span>
          </p>
        </div>
      </div>
    </div>
  )
}
