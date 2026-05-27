export interface Player {
  id: number
  color: string
  colorName: string
  position: number
  skipNextTurn: boolean
}

export interface GameEvent {
  tile: number
  type: 'positive' | 'negative'
  text: string
  action: (player: Player) => Partial<Player>
}

export const GAME_EVENTS: Record<number, GameEvent> = {
  5: {
    tile: 5,
    type: 'positive',
    text: "Je deelt een toffe werkvorm uit je eigen cultuur. Collega's reageren super enthousiast en zien je achtergrond echt als een verrijking. Krijg energie en ga 2 stappen vooruit.",
    action: (p) => ({ position: Math.min(30, p.position + 2) })
  },
  9: {
    tile: 9,
    type: 'negative',
    text: "In de docentenkamer wordt alleen maar snel Nederlands gesproken. Je voelt je een beetje buitengesloten. Sla 1 beurt over.",
    action: () => ({ skipNextTurn: true })
  },
  14: {
    tile: 14,
    type: 'positive',
    text: "Je werkplekbegeleider neemt echt even de tijd voor je, waardoor je de Nederlandse onderwijscultuur ineens veel beter snapt. Ga 3 stappen vooruit.",
    action: (p) => ({ position: Math.min(30, p.position + 3) })
  },
  19: {
    tile: 19,
    type: 'negative',
    text: "Je merkt dat collega's je zien als 'extra werk' in plaats van een toevoeging. Dat is balen voor je professionele zelfvertrouwen. Ga 2 stappen terug.",
    action: (p) => ({ position: Math.max(1, p.position - 2) })
  },
  24: {
    tile: 24,
    type: 'positive',
    text: "Je krijgt een taak die perfect aansluit bij jouw academische STEM-niveau. Je voelt je echt gewaardeerd als professional! Ga 2 stappen vooruit.",
    action: (p) => ({ position: Math.min(30, p.position + 2) })
  }
}

export const PLAYER_COLORS = [
  { hex: '#10b981', name: 'Groen', bgClass: 'bg-emerald-500' },
  { hex: '#3b82f6', name: 'Blauw', bgClass: 'bg-blue-500' },
  { hex: '#f43f5e', name: 'Rood', bgClass: 'bg-rose-500' },
  { hex: '#eab308', name: 'Geel', bgClass: 'bg-yellow-500' },
  { hex: '#a855f7', name: 'Paars', bgClass: 'bg-purple-500' },
  { hex: '#f97316', name: 'Oranje', bgClass: 'bg-orange-500' },
]
