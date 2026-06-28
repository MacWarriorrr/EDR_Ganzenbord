import type { Factor } from '@/data/factors'

export interface Player {
  id: number
  name: string
  color: string
  colorName: string
  position: number
  skipNextTurn: boolean
  extraTurn?: boolean
  hasGoodMentor?: boolean
  mentorBonusTurnsLeft?: number
}

export interface RollResult {
  base: number
  bonus: number
  total: number
}

export interface GameEvent {
  tile: number
  factor: Factor
}

export interface HistoryEvent {
  id: string
  player: Player
  event: GameEvent
}

export const POSITIVE_TILES = [5, 12, 17, 24, 31, 38, 45, 53, 59]
export const NEGATIVE_TILES = [8, 15, 21, 28, 35, 42, 49, 56, 61]

export const PLAYER_COLORS = [
  { hex: '#10b981', name: 'Groen', bgClass: 'bg-emerald-500' },
  { hex: '#3b82f6', name: 'Blauw', bgClass: 'bg-blue-500' },
  { hex: '#f43f5e', name: 'Rood', bgClass: 'bg-rose-500' },
  { hex: '#eab308', name: 'Geel', bgClass: 'bg-yellow-500' },
  { hex: '#a855f7', name: 'Paars', bgClass: 'bg-purple-500' },
  { hex: '#f97316', name: 'Oranje', bgClass: 'bg-orange-500' },
]
