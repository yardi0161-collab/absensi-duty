import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import BottomNavigation from './components/BottomNavigation'
import Home from './pages/Home'
import Log from './pages/Log'
import Buku from './pages/Buku'
import type { DutyReport, PageKey, Personnel } from './types'
import { initStorage, loadPersonnel, loadReports } from './lib/storage'

export default function App() {
  const [booting, setBooting] = useState(true)
  const [page, setPage] = useState<PageKey>('home')
  const [personnel, setPersonnel] = useState<Personnel | null>(null)
  const [reports, setReports] = useState<DutyReport[]>([])

  useEffect(() => {
    initStorage()
    setPersonnel(loadPersonnel())
    setReports(loadReports())
    const t = setTimeout(() => setBooting(false), 1100)
    return () => clearTimeout(t)
  }, [])

  const sortedReports = useMemo(() => reports, [reports])

  if (booting || !personnel) return <BootScreen />

  return (
    <div className="relative min-h-screen">
      {/* Scanline overlay */}
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
        <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-neon/[0.06] to-transparent animate-scanline" />
      </div>

      <Header personnel={personnel} />

      <main className="relative z-10">
        {page === 'home' && <Home personnel={personnel} reports={sortedReports} />}
        {page === 'log' && <Log reports={sortedReports} />}
        {page === 'buku' && <Buku personnel={personnel} />}
      </main>

      <BottomNavigation current={page} onNavigate={setPage} />
    </div>
  )
}

function BootScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-[#0a0f08] grid place-items-center">
      <div className="text-center px-6">
        <div className="w-20 h-20 mx-auto rounded-full border-2 border-neon/40 border-t-neon animate-spin shadow-glow" />
        <p className="mt-6 text-neon font-bold tracking-[0.3em] text-xs">INITIALIZING</p>
        <p className="mt-1 text-[10px] font-mono text-army-light">
          ARMY PERSONNEL TERMINAL · SECURE BOOT
        </p>
        <div className="mt-4 w-48 h-1 bg-army-dark rounded-full overflow-hidden mx-auto">
          <div className="h-full w-full bg-neon shadow-glow-strong animate-pulseGlow" />
        </div>
      </div>
    </div>
  )
}
