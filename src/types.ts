export type Rank = string

export interface Personnel {
  id: string
  name: string
  rank: Rank
  unit: string
  serviceNumber: string
  avatarInitials: string
  currentPoints: number
  requiredPoints: number
  currentDutyHours: number
  requiredDutyHours: number
  nextRank: Rank
}

export interface DutyReport {
  id: string
  date: string // ISO: YYYY-MM-DD
  startTime: string // HH:mm
  endTime: string // HH:mm
  durationHours: number
  location: string
  activity: string
  status: 'verified' | 'pending' | 'rejected'
  notes?: string
}

export type PageKey = 'home' | 'log' | 'buku'
