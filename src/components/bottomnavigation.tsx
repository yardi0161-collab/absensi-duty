import { Home, ScrollText, BookOpen } from 'lucide-react'
import type { PageKey } from '../types'

interface BottomNavigationProps {
  current: PageKey
  onNavigate: (page: PageKey) => void
}

const items: { key: PageKey; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'HOME', icon: Home },
  { key: 'log', label: 'LOG', icon: ScrollText },
  { key: 'buku', label: 'BUKU', icon: BookOpen },
]

export default function BottomNavigation({ current, onNavigate }: BottomNavigationProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 border-t-2 border-neon/40 bg-[#0a0f08]/95 backdrop-blur-md"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-neon to-transparent" />
      <ul className="grid grid-cols-3">
        {items.map(({ key, label, icon: Icon }) => {
          const active = current === key
          return (
            <li key={key}>
              <button
                type="button"
                onClick={() => onNavigate(key)}
                aria-current={active ? 'page' : undefined}
                className={[
                  'w-full h-[64px] flex flex-col items-center justify-center gap-0.5 transition-all',
                  active ? 'text-neon' : 'text-army-light hover:text-neon/80',
                ].join(' ')}
              >
                <div
                  className={[
                    'relative w-9 h-9 grid place-items-center rounded-md transition-all',
                    active
                      ? 'bg-neon/15 border border-neon shadow-glow'
                      : 'border border-transparent',
                  ].join(' ')}
                >
                  <Icon className="w-5 h-5" strokeWidth={active ? 2.6 : 2} />
                  {active && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-neon animate-pulseGlow" />
                  )}
                </div>
                <span
                  className={[
                    'text-[10px] font-bold tracking-[0.2em]',
                    active ? 'neon-text' : '',
                  ].join(' ')}
                >
                  {label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
