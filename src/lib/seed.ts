import type { DutyReport, Personnel } from '../types'

export const seedPersonnel: Personnel = {
  id: 'TNI-AD-001',
  name: 'Sersan Andika Pratama',
  rank: 'Sersan Kepala',
  unit: 'Yonif Mekanis 413 / Kostrad',
  serviceNumber: '4132-7719-0045',
  avatarInitials: 'AP',
  currentPoints: 640,
  requiredPoints: 900,
  currentDutyHours: 178,
  requiredDutyHours: 240,
  nextRank: 'Bintara Tinggi',
}

// Helper untuk membentuk seed laporan dalam bulan berjalan
function fmt(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function buildSeedReports(): DutyReport[] {
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth()
  const daysInMonth = new Date(y, m + 1, 0).getDate()
  const activities = [
    'Patroli Perbatasan',
    'Piket Komando',
    'Latihan Taktis',
    'Pengamanan Objek Vital',
    'Apel Kesiapan',
    'Latihan Menembak',
    'Siaga Tempur',
  ]
  const locations = [
    'Pos Alpha - Sektor 1',
    'Markas Batalyon',
    'Zona Latihan C',
    'Pos Bravo - Sektor 3',
    'Lapangan Tembak Karang',
  ]

  const reports: DutyReport[] = []
  // Data contoh: isi tanggal 1-18 (variasi)
  for (let day = 1; day <= daysInMonth; day++) {
    // Simulasikan: hanya tanggal <= 18 & bukan kelipatan 5 yang terisi
    if (day > 18) continue
    if (day % 5 === 0) continue

    const d = new Date(y, m, day)
    const startH = 6 + ((day * 3) % 6)
    const dur = 6 + (day % 4) * 2
    const endH = Math.min(startH + dur, 23)
    const report: DutyReport = {
      id: `seed-${y}${String(m + 1).padStart(2, '0')}${String(day).padStart(2, '0')}`,
      date: fmt(d),
      startTime: `${String(startH).padStart(2, '0')}:00`,
      endTime: `${String(endH).padStart(2, '0')}:00`,
      durationHours: endH - startH,
      location: locations[day % locations.length],
      activity: activities[day % activities.length],
      status: day % 7 === 0 ? 'pending' : 'verified',
      notes: day % 3 === 0 ? 'Laporan lengkap. Tidak ada insiden.' : undefined,
    }
    reports.push(report)
  }
  return reports
}

export const seedReports: DutyReport[] = buildSeedReports()
