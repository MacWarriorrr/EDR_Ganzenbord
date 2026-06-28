import { POSITIVE_TILES, NEGATIVE_TILES, PLAYER_COLORS } from './types'
import type { Player } from './types'
import { cn } from '@/lib/utils'
import { INITIAL_COORDINATES } from './boardCoordinates'
import BordAchtergrond from '@/assets/BordAchtergrond.png'
import { PlayerIcon } from './PlayerIcon'
import { Sparkles, TriangleAlert } from 'lucide-react'

interface GameBoardProps {
  players: Player[]
}

export function GameBoard({ players }: GameBoardProps) {
  const tiles = Array.from({ length: 64 }, (_, i) => i + 1)
  const coords = INITIAL_COORDINATES

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-stone-100 w-full flex justify-center items-center">
      <div 
        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-inner border-2 border-stone-200 bg-stone-100 touch-none select-none mx-auto"
        style={{
          maxHeight: 'calc(100vh - 16rem)',
          maxWidth: 'calc((100vh - 16rem) * 4 / 3)'
        }}
      >
        <img 
          src={BordAchtergrond} 
          alt="Ganzenbord Achtergrond" 
          className="w-full h-full object-contain object-center absolute inset-0 pointer-events-none"
        />
        
        {tiles.map((tile) => {
          const isPositive = POSITIVE_TILES.includes(tile)
          const isNegative = NEGATIVE_TILES.includes(tile)
          const isEvent = isPositive || isNegative
          const playersOnTile = players.filter(p => p.position === tile)
          const pos = coords[tile] || { x: 50, y: 50 }

          return (
            <div 
              key={tile}
              className={cn(
                "absolute flex flex-col items-center justify-center p-1 transition-all",
                "w-[5.25%] aspect-square -translate-x-1/2 -translate-y-1/2 z-10 hover:z-20 hover:scale-110 duration-200"
              )}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
            >
              <div className="relative w-full h-full flex flex-wrap justify-center items-center gap-0.5">
                {isEvent && playersOnTile.length === 0 && (
                  <div className={cn(
                    "flex items-center justify-center w-[85%] h-[85%] rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.6)] animate-pulse border-2",
                    isPositive ? "border-emerald-500 text-emerald-500" : "border-rose-500 text-rose-500"
                  )}>
                    {isPositive ? (
                      <Sparkles className="w-[60%] h-[60%]" strokeWidth={2.5} />
                    ) : (
                      <TriangleAlert className="w-[60%] h-[60%]" strokeWidth={2.5} />
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* Render Players */}
        {players.map((p) => {
          const playersOnSameTile = players.filter(pl => pl.position === p.position);
          const indexOnTile = playersOnSameTile.findIndex(pl => pl.id === p.id);
          
          const pos = coords[p.position] || { x: 50, y: 50 };
          const offsetRadius = playersOnSameTile.length > 1 ? 1.5 : 0;
          const angle = (indexOnTile / playersOnSameTile.length) * Math.PI * 2;
          
          const finalX = pos.x + (Math.cos(angle) * offsetRadius);
          const finalY = pos.y + (Math.sin(angle) * offsetRadius);

          return (
            <div 
              key={p.id}
              className={cn(
                "absolute z-50 transition-all duration-300 ease-linear flex items-center justify-center -translate-x-1/2 -translate-y-1/2 hover:scale-110 w-[3.5%] aspect-square"
              )}
              style={{
                left: `${finalX}%`,
                top: `${finalY}%`,
              }}
              title={p.name}
            >
              <PlayerIcon playerId={p.id} color={p.color} className="w-full h-full" size="100%" />
            </div>
          );
        })}
      </div>
    </div>
  )
}
