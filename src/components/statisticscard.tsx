import type { LucideIcon } from 'lucide-react'

interface StatisticsCardProps {
  title: string
  value: number | string
  subtitle?: string
  icon: LucideIcon
  accent?: 'neon' | 'yellow'
}

export default function StatisticsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent = 'neon',
}: StatisticsCardProps) {
  const accentText = accent === 'neon' ? 'text-neon' : 'text-mill-yellow'
  const accentBorder = accent === 'neon' ? 'border-neon/50' : 'border-mill-yellow/50'
  const accentBg = accent === 'neon' ? 'bg-neon/10' : 'bg-mill-yellow/10'

  return (
    <div
      className={`comic-panel hud-corner relative p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-glow ${accentBorder}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-neon/70 uppercase">
            {title}
          </p>
          <p className={`mt-1 text-3xl sm:text-4xl font-black ${accentText} neon-text leading-none`}>
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-[10px] text-army-light font-mono truncate">{subtitle}</p>
          )}
        </div>
        <div className={`shrink-0 w-11 h-11 grid place-items-center rounded-md border ${accentBorder} ${accentBg}`}>
          <Icon className={`w-5 h-5 ${accentText}`} strokeWidth={2.5} />
        </div>
      </div>
      <div className="mt-3 h-1 w-full bg-army-dark/70 rounded-full overflow-hidden">
        <div className={`h-full w-2/3 ${accent === 'neon' ? 'bg-neon' : 'bg-mill-yellow'}`} />
      </div>
    </div>
  )
}
