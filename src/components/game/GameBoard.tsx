import { GAME_EVENTS, PLAYER_COLORS } from './types'
import type { Player } from './types'
import { cn } from '@/lib/utils'

interface GameBoardProps {
  players: Player[]
}

export function GameBoard({ players }: GameBoardProps) {
  const tiles = Array.from({ length: 30 }, (_, i) => i + 1)

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-4xl mx-auto mb-8">
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-3 sm:gap-4">
        {tiles.map((tile) => {
          const isEvent = GAME_EVENTS[tile]
          const isStart = tile === 1
          const isFinish = tile === 30
          
          // Find players on this tile
          const playersOnTile = players.filter(p => p.position === tile)

          return (
            <div 
              key={tile}
              className={cn(
                "aspect-square rounded-xl flex flex-col items-center justify-between p-2 relative transition-all duration-300",
                isStart ? "bg-blue-100 border-2 border-blue-300 shadow-inner" : 
                isFinish ? "bg-emerald-100 border-2 border-emerald-300 shadow-inner" :
                isEvent?.type === 'positive' ? "bg-emerald-50 border border-emerald-200" :
                isEvent?.type === 'negative' ? "bg-rose-50 border border-rose-200" :
                "bg-slate-50 border border-slate-200"
              )}
            >
              <span className={cn(
                "text-sm font-bold opacity-50",
                isStart && "text-blue-600 opacity-100",
                isFinish && "text-emerald-600 opacity-100",
                isEvent?.type === 'positive' && "text-emerald-600 opacity-80",
                isEvent?.type === 'negative' && "text-rose-600 opacity-80"
              )}>
                {isStart ? 'Start' : isFinish ? 'Finish' : tile}
              </span>
              
              {/* Player tokens container */}
              <div className="flex flex-wrap justify-center gap-1 mt-1 w-full h-full items-end pb-1">
                {playersOnTile.map(p => {
                  const colorObj = PLAYER_COLORS.find(c => c.hex === p.color)
                  return (
                    <div 
                      key={p.id}
                      className={cn(
                        "w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-sm ring-1 ring-white/50",
                        colorObj?.bgClass || "bg-slate-800"
                      )}
                      title={`Speler ${p.id} (${p.colorName})`}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
