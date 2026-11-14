import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { DutyReport } from '../types'

interface DutyCalendarProps {
  reports: DutyReport[]
}

const DAY_LABELS = ['S', 'S', 'R', 'K', 'J', 'S', 'M']
const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

function toISO(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export default function DutyCalendar({ reports }: DutyCalendarProps) {
  const today = new Date()
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selected, setSelected] = useState<string | null>(null)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const reportByDate = useMemo(() => {
    const map = new Map<string, DutyReport>()
    reports.forEach((r) => map.set(r.date, r))
    return map
  }, [reports])

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstWeekday = new Date(year, month, 1).getDay() // 0=Sun

  const cells: (number | null)[] = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const goPrev = () => setViewDate(new Date(year, month - 1, 1))
  const goNext = () => setViewDate(new Date(year, month + 1, 1))

  const selectedReport = selected ? reportByDate.get(selected) : undefined

  return (
    <section className="mx-3 mt-4 mb-4 animate-slideIn">
      <div className="comic-panel hud-corner p-3 sm:p-4">
        {/* Header nav */}
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Bulan sebelumnya"
            className="w-9 h-9 grid place-items-center rounded-md border border-neon/40 bg-army-dark/70 hover:bg-neon/20 hover:shadow-glow transition-all"
          >
            <ChevronLeft className="w-4 h-4 text-neon" />
          </button>
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.25em] text-neon/60 font-mono">
              Tactical Calendar
            </p>
            <p className="text-sm font-bold text-white tracking-wide">
              {MONTH_NAMES[month]} {year}
            </p>
          </div>
          <button
            type="button"
            onClick={goNext}
            aria-label="Bulan berikutnya"
            className="w-9 h-9 grid place-items-center rounded-md border border-neon/40 bg-army-dark/70 hover:bg-neon/20 hover:shadow-glow transition-all"
          >
            <ChevronRight className="w-4 h-4 text-neon" />
          </button>
        </div>

        {/* Day labels */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAY_LABELS.map((l, i) => (
            <div
              key={i}
              className="text-center text-[10px] font-mono uppercase tracking-widest text-neon/60 py-1"
            >
              {l}
            </div>
          ))}
        </div>

        {/* Cells */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, idx) => {
            if (day === null) {
              return <div key={idx} className="aspect-square" />
            }
            const dateObj = new Date(year, month, day)
            const iso = toISO(dateObj)
            const hasDuty = reportByDate.has(iso)
            const isToday = iso === toISO(today)
            const isSelected = selected === iso

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelected(isSelected ? null : iso)}
                className={[
                  'relative aspect-square rounded-md text-[11px] sm:text-xs font-mono flex items-center justify-center transition-all border',
                  hasDuty
                    ? 'bg-neon/15 border-neon/70 text-neon shadow-glow hover:bg-neon/25'
                    : 'bg-red-900/25 border-red-500/40 text-red-300 hover:bg-red-900/40',
                  isToday ? 'ring-1 ring-mill-yellow' : '',
                  isSelected ? 'scale-105 ring-2 ring-neon shadow-glow-strong' : '',
                ].join(' ')}
              >
                {day}
                {hasDuty && (
                  <span className="absolute bottom-0.5 right-0.5 w-1 h-1 rounded-full bg-neon" />
                )}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center gap-3 text-[10px] font-mono text-army-light">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-neon/30 border border-neon" />
            Sudah Duty
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-red-900/40 border border-red-500/60" />
            Belum Duty
          </span>
          <span className="flex items-center gap-1 ml-auto">
            <span className="w-2.5 h-2.5 rounded-sm border border-mill-yellow" />
            Hari Ini
          </span>
        </div>

        {/* Detail tanggal terpilih */}
        {selected && (
          <div className="mt-3 rounded-md border border-neon/40 bg-army-dark/70 p-3 animate-slideIn">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-neon/60 font-mono">
                  Detail Aktivitas
                </p>
                <p className="text-xs font-bold text-white font-mono">{selected}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Tutup"
                className="w-7 h-7 grid place-items-center rounded border border-neon/30 text-neon hover:bg-neon/15"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            {selectedReport ? (
              <div className="text-[11px] space-y-1">
                <p className="text-neon font-bold">{selectedReport.activity}</p>
                <p className="text-army-light">
                  🕒 {selectedReport.startTime} – {selectedReport.endTime} (
                  {selectedReport.durationHours} jam)
                </p>
                <p className="text-army-light">📍 {selectedReport.location}</p>
                <p className="text-mill-yellow">
                  Status:{' '}
                  {selectedReport.status === 'verified'
                    ? '✓ Terverifikasi'
                    : selectedReport.status === 'pending'
                    ? '⏳ Menunggu'
                    : '✕ Ditolak'}
                </p>
              </div>
            ) : (
              <p className="text-[11px] text-red-300">
                Tidak ada laporan duty pada tanggal ini.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
