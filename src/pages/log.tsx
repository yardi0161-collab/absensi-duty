import { useMemo, useState } from 'react'
import { ChevronDown, ChevronUp, FileText } from 'lucide-react'
import type { DutyReport } from '../types'

interface LogProps {
  reports: DutyReport[]
}

export default function Log({ reports }: LogProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const sorted = useMemo(
    () =>
      [...reports].sort((a, b) =>
        b.date === a.date ? b.startTime.localeCompare(a.startTime) : b.date.localeCompare(a.date)
      ),
    [reports]
  )

  return (
    <div className="pb-safe px-3 pt-4">
      <div className="comic-panel hud-corner p-3 mb-3 animate-slideIn">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-neon" />
          <h2 className="text-sm font-bold tracking-[0.2em] text-neon uppercase">
            Riwayat Laporan Duty
          </h2>
        </div>
        <p className="text-[10px] text-army-light font-mono mt-1">
          ▸ {sorted.length} laporan tercatat
        </p>
      </div>

      <ul className="space-y-2">
        {sorted.map((r) => {
          const open = openId === r.id
          const statusColor =
            r.status === 'verified'
              ? 'text-neon border-neon/60 bg-neon/10'
              : r.status === 'pending'
              ? 'text-mill-yellow border-mill-yellow/60 bg-mill-yellow/10'
              : 'text-red-400 border-red-500/60 bg-red-500/10'
          const statusLabel =
            r.status === 'verified' ? 'TERVERIFIKASI' : r.status === 'pending' ? 'MENUNGGU' : 'DITOLAK'
          return (
            <li key={r.id} className="comic-panel overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : r.id)}
                className="w-full text-left p-3 flex items-start gap-3 hover:bg-neon/5 transition-colors"
              >
                {/* Date block */}
                <div className="shrink-0 w-12 text-center rounded-md border border-neon/40 bg-army-dark/70 py-1">
                  <p className="text-[9px] font-mono text-neon/70 uppercase">
                    {new Date(r.date).toLocaleString('id-ID', { month: 'short' })}
                  </p>
                  <p className="text-base font-black text-neon leading-none">
                    {new Date(r.date).getDate()}
                  </p>
                </div>
                {/* Main */}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white truncate">{r.activity}</p>
                  <p className="text-[10px] font-mono text-army-light">
                    {r.startTime} – {r.endTime} • {r.durationHours} jam
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded border ${statusColor}`}
                    >
                      {statusLabel}
                    </span>
                    <span className="text-[9px] font-mono text-army-light truncate">
                      {r.location}
                    </span>
                  </div>
                </div>
                <div className="shrink-0 text-neon/70 pt-1">
                  {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {open && (
                <div className="px-3 pb-3 text-[11px] space-y-1 border-t border-neon/20 pt-2">
                  <p className="text-neon/80 font-mono">ID: {r.id}</p>
                  <p className="text-army-light">
                    <span className="text-white/80">Lokasi:</span> {r.location}
                  </p>
                  <p className="text-army-light">
                    <span className="text-white/80">Aktivitas:</span> {r.activity}
                  </p>
                  <p className="text-army-light">
                    <span className="text-white/80">Durasi:</span> {r.durationHours} jam
                  </p>
                  {r.notes && (
                    <p className="text-army-light">
                      <span className="text-white/80">Catatan:</span> {r.notes}
                    </p>
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
