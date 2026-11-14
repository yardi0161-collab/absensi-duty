import type { DutyReport, Personnel } from '../types'
import { seedPersonnel, seedReports } from './seed'

const KEY_PERSONNEL = 'apt:personnel:v1'
const KEY_REPORTS = 'apt:reports:v1'

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function loadPersonnel(): Personnel {
  const raw = localStorage.getItem(KEY_PERSONNEL)
  return safeParse<Personnel>(raw, seedPersonnel)
}

export function savePersonnel(p: Personnel): void {
  localStorage.setItem(KEY_PERSONNEL, JSON.stringify(p))
}

export function loadReports(): DutyReport[] {
  const raw = localStorage.getItem(KEY_REPORTS)
  const list = safeParse<DutyReport[]>(raw, [])
  if (list.length === 0) {
    localStorage.setItem(KEY_REPORTS, JSON.stringify(seedReports))
    return seedReports
  }
  return list
}

export function saveReports(list: DutyReport[]): void {
  localStorage.setItem(KEY_REPORTS, JSON.stringify(list))
}

export function initStorage(): void {
  if (!localStorage.getItem(KEY_PERSONNEL)) {
    localStorage.setItem(KEY_PERSONNEL, JSON.stringify(seedPersonnel))
  }
  if (!localStorage.getItem(KEY_REPORTS)) {
    localStorage.setItem(KEY_REPORTS, JSON.stringify(seedReports))
  }
}
