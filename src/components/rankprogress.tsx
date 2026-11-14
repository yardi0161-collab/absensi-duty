import { Target, TrendingUp, Clock, Award } from 'lucide-react'
import type { Personnel } from '../types'

interface RankProgressProps {
  personnel: Personnel
}

export default function RankProgress({ personnel }: RankProgressProps) {
  const pointGap = Math.max(personnel.requiredPoints - personnel.currentPoints, 0)
  const hourGap = Math.max(personnel.requiredDutyHours - personnel.currentDutyHours, 0)
  const percent = Math.min(
    100,
    Math.round(
      (personnel.currentPoints / personnel.requiredPoints) * 60 +
        (personnel.currentDutyHours / personnel.requiredDutyHours) * 40
    )
  )

  return (
    <section className="mx-3 mt-4 animate-slideIn">
      <div className="comic-panel hud-corner relative p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-neon" />
          <h3 className="text-sm font-bold tracking-[0.18em] text-neon uppercase">
            Target Pangkat Selanjutnya
          </h3>
        </div>

        {/* Pangkat saat ini -> target */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <p className="text-[9px] uppercase tracking-[0.2em] text-army-light font-mono">
              Saat Ini
            </p>
            <p className="text-sm sm:text-base font-bold text-white truncate">{personnel.rank}</p>
          </div>
          <TrendingUp className="w-5 h-5 text-mill-yellow shrink-0" />
          <div className="flex-1 min-w-0 text-right">
            <p className="text-[9px] uppercase tracking-[0.2em] text-army-light font-mono">
              Target
            </p>
            <p className="text-sm sm:text-base font-bold text-mill-yellow truncate">
              {personnel.nextRank}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-3 rounded-full bg-army-dark/80 border border-neon/25 overflow-hidden mb-1">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-army-light via-neon to-neon shadow-glow-strong"
            style={{ width: `${percent}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-end pr-2">
            <span className="text-[9px] font-mono font-bold text-black/80">
              {percent}%
            </span>
          </div>
        </div>
        <p className="text-[10px] font-mono text-neon/70 mb-3">
          ▸ PENCAPAIAN: {percent}% menuju {personnel.nextRank}
        </p>

        {/* Grid kekurangan */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-md border border-neon/25 bg-army-dark/50 p-2.5">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Award className="w-3.5 h-3.5 text-mill-yellow" />
              <p className="text-[9px] uppercase tracking-widest text-neon/70 font-mono">
                Poin Kurang
              </p>
            </div>
            <p className="text-base font-bold text-mill-yellow">
              {pointGap} <span className="text-[10px] text-army-light">poin</span>
            </p>
          </div>
          <div className="rounded-md border border-neon/25 bg-army-dark/50 p-2.5">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Clock className="w-3.5 h-3.5 text-mill-yellow" />
              <p className="text-[9px] uppercase tracking-widest text-neon/70 font-mono">
                Jam Kurang
              </p>
            </div>
            <p className="text-base font-bold text-mill-yellow">
              {hourGap} <span className="text-[10px] text-army-light">jam</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
