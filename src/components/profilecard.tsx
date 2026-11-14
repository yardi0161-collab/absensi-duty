import { BadgeCheck, Fingerprint, Shield } from 'lucide-react'
import type { Personnel } from '../types'

interface ProfileCardProps {
  personnel: Personnel
}

export default function ProfileCard({ personnel }: ProfileCardProps) {
  return (
    <section className="relative z-10 animate-slideIn">
      <div className="comic-panel hud-corner mx-3 mt-4 overflow-hidden">
        {/* Ilustrasi tentara dekorasi */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.14]">
          <SoldierIllustration />
        </div>

        {/* Glow lines */}
        <div className="absolute top-0 left-0 h-px w-24 bg-gradient-to-r from-transparent via-neon to-transparent" />
        <div className="absolute bottom-0 right-0 h-px w-24 bg-gradient-to-l from-transparent via-neon to-transparent" />

        <div className="relative p-4 sm:p-5">
          {/* Status verifikasi */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-neon/15 border border-neon/60 text-neon text-[10px] font-bold tracking-widest">
              <BadgeCheck className="w-3.5 h-3.5" />
              AKSES TERVERIFIKASI
            </span>
            <span className="text-[10px] font-mono text-neon/60 ml-auto animate-blink">
              ● LIVE
            </span>
          </div>

          {/* Nama */}
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide leading-tight">
            {personnel.name}
          </h2>

          {/* Pangkat & Satuan */}
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <span className="text-neon font-semibold tracking-wide">
              {personnel.rank}
            </span>
            <span className="text-army-light">•</span>
            <span className="text-[#c8d6bc]">{personnel.unit}</span>
          </div>

          {/* Divider */}
          <div className="my-3 h-px bg-gradient-to-r from-neon/40 via-neon/10 to-transparent" />

          {/* NRP + Fingerprint */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Fingerprint className="w-5 h-5 text-mill-yellow" />
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-neon/60 font-mono">
                  Nomor Identitas
                </p>
                <p className="text-sm font-mono text-mill-yellow tracking-wider">
                  {personnel.serviceNumber}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-neon/70">
              <Shield className="w-3.5 h-3.5" />
              SECURE
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Ilustrasi tentara futuristik (SVG inline) */
function SoldierIllustration() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="absolute -right-6 -bottom-8 w-56 h-56 text-neon"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      {/* Helm masa depan */}
      <path d="M70 60 Q100 30 130 60 L136 90 Q100 110 64 90 Z" />
      <path d="M78 78 Q100 68 122 78" />
      {/* Visor */}
      <rect x="78" y="82" width="44" height="10" rx="3" fill="currentColor" opacity="0.6" />
      {/* Bahu */}
      <path d="M55 130 Q75 105 100 108 Q125 105 145 130 L152 170 L48 170 Z" />
      {/* Badan */}
      <path d="M70 170 L70 140 L130 140 L130 170" />
      {/* Detail armor */}
      <path d="M85 150 L115 150" />
      <circle cx="100" cy="140" r="4" fill="currentColor" />
      {/* Senjata futuristik */}
      <path d="M140 118 L175 112 L178 122 L144 128 Z" />
      <path d="M160 108 L168 108 L168 116" />
    </svg>
  )
}
