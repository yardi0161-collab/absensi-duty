import { BookOpen, ChevronRight, Shield, Award, ClipboardCheck, ScrollText } from 'lucide-react'
import type { Personnel } from '../types'

interface BukuProps {
  personnel: Personnel
}

interface Section {
  id: string
  title: string
  icon: typeof BookOpen
  body: string[]
}

export default function Buku({ personnel }: BukuProps) {
  const sections: Section[] = [
    {
      id: 'pangkat',
      title: 'Informasi Pangkat',
      icon: Award,
      body: [
        `Pangkat saat ini: ${personnel.rank}`,
        `Target berikutnya: ${personnel.nextRank}`,
        'Kenaikan pangkat memerlukan pemenuhan poin dan jam duty minimum.',
        'Poin dinilai dari kedisiplinan, prestasi latihan, dan dedikasi tugas.',
      ],
    },
    {
      id: 'satuan',
      title: 'Informasi Satuan',
      icon: Shield,
      body: [
        `Satuan: ${personnel.unit}`,
        `Nomor Identitas: ${personnel.serviceNumber}`,
        'Setiap personel wajib memahami rantai komando satuannya.',
        'Laporkan segera jika ada perubahan status personel.',
      ],
    },
    {
      id: 'aturan',
      title: 'Peraturan Umum',
      icon: ScrollText,
      body: [
        'Wajib mengisi laporan duty setiap hari minimal 1 laporan.',
        'Laporan yang sah harus memiliki waktu mulai, selesai, dan lokasi.',
        'Pelanggaran berulang dapat mengurangi poin kenaikan pangkat.',
        'Dilarang memalsukan laporan duty dalam bentuk apapun.',
      ],
    },
    {
      id: 'duty',
      title: 'Panduan Duty',
      icon: ClipboardCheck,
      body: [
        'Buka menu LOG untuk melihat seluruh riwayat duty.',
        'Klik setiap laporan untuk melihat detail lengkap.',
        'Laporan belum diverifikasi akan berstatus MENUNGGU.',
        'Pastikan waktu mulai < waktu selesai saat mengisi laporan.',
      ],
    },
    {
      id: 'kenaikan',
      title: 'Informasi Kenaikan Pangkat',
      icon: BookOpen,
      body: [
        `Poin saat ini: ${personnel.currentPoints}/${personnel.requiredPoints}`,
        `Jam duty saat ini: ${personnel.currentDutyHours}/${personnel.requiredDutyHours} jam`,
        'Kenaikan pangkat diproses setelah syarat poin dan jam duty terpenuhi.',
        'Progres terlihat di panel TARGET PANGKAT SELANJUTNYA pada Home.',
      ],
    },
  ]

  return (
    <div className="pb-safe px-3 pt-4">
      <div className="comic-panel hud-corner p-3 mb-3 animate-slideIn">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-neon" />
          <h2 className="text-sm font-bold tracking-[0.2em] text-neon uppercase">
            Buku Panduan Personel
          </h2>
        </div>
        <p className="text-[10px] text-army-light font-mono mt-1">
          ▸ Arsip SOP • {personnel.name}
        </p>
      </div>

      <ul className="space-y-2">
        {sections.map((s) => {
          const Icon = s.icon
          return (
            <li key={s.id} className="comic-panel p-3">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-mill-yellow" />
                <h3 className="text-xs font-bold tracking-widest text-white uppercase">
                  {s.title}
                </h3>
                <ChevronRight className="w-3.5 h-3.5 text-neon/60 ml-auto" />
              </div>
              <ul className="space-y-1">
                {s.body.map((line, i) => (
                  <li key={i} className="text-[11px] text-army-light leading-relaxed">
                    <span className="text-neon mr-1">›</span>
                    {line}
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
