'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, CalendarDays, Users, Trophy, Menu, X, Shirt } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface ItemNav {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const ITENS_NAV: ItemNav[] = [
  { href: '/',          label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/partidas',  label: 'Partidas',   icon: CalendarDays },
  { href: '/jogadores', label: 'Jogadores',  icon: Users },
  { href: '/rankings',  label: 'Rankings',   icon: Trophy },
]

function Logo() {
  return (
    <div className="flex items-center gap-3 px-4 py-5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-acento-gradient">
        <Shirt className="h-4 w-4 text-campo-950" />
      </div>
      <div>
        <p className="font-display text-sm font-black uppercase tracking-widest text-slate-100">Society</p>
        <p className="text-xs font-medium text-acento">Stats Hub</p>
      </div>
    </div>
  )
}

function NavItem({ item, ativo }: { item: ItemNav; ativo: boolean }) {
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      className={cn(
        'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
        ativo
          ? 'bg-acento/10 text-acento'
          : 'text-slate-400 hover:bg-campo-700/50 hover:text-slate-100',
      )}
    >
      <Icon
        className={cn(
          'h-4 w-4 transition-colors',
          ativo ? 'text-acento' : 'text-slate-600 group-hover:text-slate-400',
        )}
      />
      {item.label}
    </Link>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const [mobileAberto, setMobileAberto] = useState(false)

  const ehAtivo = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileAberto(!mobileAberto)}
        className="fixed left-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-lg border border-campo-600/50 bg-campo-800 text-slate-400 hover:text-slate-100 lg:hidden"
      >
        {mobileAberto ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* Overlay mobile */}
      {mobileAberto && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileAberto(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-campo-600/40 bg-campo-900 transition-transform duration-300',
          mobileAberto ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <Logo />

        <div className="h-px bg-campo-600/40 mx-4" />

        <nav className="flex-1 space-y-0.5 px-3 py-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
            Menu
          </p>
          {ITENS_NAV.map((item) => (
            <NavItem key={item.href} item={item} ativo={ehAtivo(item.href)} />
          ))}
        </nav>

        <div className="border-t border-campo-600/40 px-4 py-4">
          <p className="text-xs text-slate-600">Temporada 2025</p>
          <p className="text-xs font-semibold text-slate-400">Os Crias Society FC</p>
        </div>
      </aside>
    </>
  )
}
