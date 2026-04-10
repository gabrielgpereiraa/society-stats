import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'

export const metadata: Metadata = {
  title: 'Society Stats Hub',
  description: 'Hub de estatísticas pós-jogo para jogadores de society',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-campo-950 text-slate-100">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 lg:ml-60 min-w-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
