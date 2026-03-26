'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Lock, LogIn } from 'lucide-react'
import DoeitLogo from '@/components/ui/DoeitLogo'

function BlobShape() {
  return (
    <svg
      viewBox="0 0 900 1117"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <g filter="url(#blob-shadow)">
        <path
          d="M712.756 33C508.512 -158 121.366 -100 112.362 -107.5L-235.933 -248C-269.578 64.3333 -339.711 698 -351.084 734C-362.456 770 -320.44 1052.67 -298.01 1189.5L441.228 1364C614.033 1289.67 935 1074.5 840 918C745 761.5 456.825 1056.09 369 834C273.27 591.916 347.451 261.709 596.5 343.5C845.549 425.291 917 224 712.756 33Z"
          fill="#1177FF"
        />
      </g>
      <defs>
        <filter
          id="blob-shadow"
          x="-386.9" y="-281.9"
          width="1286.03" height="1687.8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="4" dy="4" />
          <feGaussianBlur stdDeviation="18.95" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.30 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const inputClass =
    "w-full bg-white rounded-3xl pl-10 pr-4 py-3 text-sm text-slate-700 placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"

  const handleChange = (field: 'username' | 'password', value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { username, password } = form
    if (!username || !password) return setError('Please fill in all fields.')
    if (username === 'RyanSmith' && password === 'password') {
      router.push('/dashboard')
    } else {
      setError('Invalid username or password.')
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel: white bg, blue blob, logo centred inside blob ── */}
      <div className="hidden md:flex flex-1 relative bg-slate-50 items-center justify-center overflow-hidden">

        <BlobShape />

        <div className="relative z-10rounded-3xl px-10 py-6 translate-x-40">
          <DoeitLogo width={480} variant="color" />
          {/*               ↑ CHANGE THIS NUMBER to resize the logo */}
        </div>

      </div>

      {/* ── Right panel: login card ── */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-8">
        <div className="w-full max-w-xl">
          <div className="card-blue-login rounded-2xl p-8 shadow-xl">
            <h1 className="text-2xl font-bold">Hello!</h1>
            <p className="text-blue-100 text-sm mb-7">Sign In to your DOEIT Account</p>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400" />
                <input type="text" placeholder="Username" value={form.username}
                  onChange={e => handleChange('username', e.target.value)} className={inputClass} />
              </div>

              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400" />
                <input type="password" placeholder="Password" value={form.password}
                  onChange={e => handleChange('password', e.target.value)} className={inputClass} />
              </div>

              {error && (
                <p className="text-red-200 text-xs bg-red-500/20 rounded-lg px-3 py-2">{error}</p>
              )}

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-white hover:bg-blue-50 text-blue-500 font-semibold px-8 py-3 rounded-3xl flex items-center justify-center gap-2 shadow-md"
                >
                  <LogIn size={16} />
                  Sign In
                </button>
              </div>
            </form>

            <p className="text-center text-xs text-blue-200 mt-5">
              Don't have account?{' '}
              <a href="/signup" className="text-white underline font-medium">sign up here</a>
            </p>
          </div>

          <p className="text-center text-slate-400 text-xs mt-4">
            Demo: <span className="font-mono bg-slate-200 px-1 rounded">RyanSmith</span>
            {' / '}
            <span className="font-mono bg-slate-200 px-1 rounded">password</span>
          </p>
        </div>
      </div>
    </div>
  )
}