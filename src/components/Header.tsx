import { Bell, ShieldCheck, Wifi } from 'lucide-react'
import type { Personnel } from '../types'

interface HeaderProps {
  personnel: Personnel
  unreadCount?: number
}

export default function Header({ personnel, unreadCount = 3 }: HeaderProps) {
  return (
    <header className="relative z-20">
      <div className="comic-panel mx-3 mt-3 px-4 py-3 flex items-center gap-3">
        {/* Logo */}
        <div className="relative shrink-0">
          <div className="w-11 h-11 rounded-full border-2 border-neon bg-army-dark grid place-items-center shadow-glow">
            <ShieldCheck className="w-6 h-6 text-neon" strokeWidth={2.5} />
          </div>
          <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-neon animate-pulseGlow shadow-glow-strong" />
        </div>

        {/* Title + status */}
        <div className="min-w-0 flex-1">
          <h1 className="text-[13px] sm:text-sm font-bold tracking-[0.18em] text-neon neon-text truncate">
            ARMY PERSONNEL TERMINAL
          </h1>
          <div className="flex items-center gap-1.5 text-[10px] text-neon/70 font-mono">
            <Wifi className="w-3 h-3" />
            <span className="uppercase tracking-widest">Secure Link</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neon animate-blink" />
          </div>
        </div>

        {/* Notifikasi */}
        <button
          type="button"
          aria-label="Notifikasi"
          className="relative w-10 h-10 grid place-items-center rounded-md border border-neon/30 bg-army-dark/60 hover:border-neon hover:shadow-glow transition-all"
        >
          <Bell className="w-4.5 h-4.5 text-neon" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-mill-yellow text-black text-[10px] font-bold grid place-items-center border border-black">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-10 h-10 rounded-full border-2 border-neon/70 bg-army-dark grid place-items-center text-neon text-xs font-bold shadow-glow">
            {personnel.avatarInitials}
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-neon border border-black" />
        </div>
      </div>
    </header>
  )
}
