import { Zap, Database } from 'lucide-react'
import ProfileCard from '../components/ProfileCard'
import StatisticsCard from '../components/StatisticsCard'
import RankProgress from '../components/RankProgress'
import DutyCalendar from '../components/DutyCalendar'
import type { DutyReport, Personnel } from '../types'

interface HomeProps {
  personnel: Personnel
  reports: DutyReport[]
}

export default function Home({ personnel, reports }: HomeProps) {
  const todayISO = new Date().toISOString().slice(0, 10)
  const dutyToday = reports.filter((r) => r.date === todayISO).length
  const total = reports.length

  return (
    <div className="pb-safe">
      <ProfileCard personnel={personnel} />

      {/* Statistik */}
      <section className="mx-3 mt-4 grid grid-cols-2 gap-2 animate-slideIn">
        <StatisticsCard
          title="Laporan Duty"
          value={dutyToday}
          subtitle={`Hari ini • ${todayISO}`}
          icon={Zap}
          accent="neon"
        />
        <StatisticsCard
          title="Total Laporan"
          value={total}
          subtitle="Database terlapor"
          icon={Database}
          accent="yellow"
        />
      </section>

      <RankProgress personnel={personnel} />
      <DutyCalendar reports={reports} />
    </div>
  )
}
