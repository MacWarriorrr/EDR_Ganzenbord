import { POSITIVE_TILES, NEGATIVE_TILES, PLAYER_COLORS } from './types'
import type { Player } from './types'
import { cn } from '@/lib/utils'
import { INITIAL_COORDINATES, type Coordinate } from './boardCoordinates'
import BordAchtergrond from '@/assets/BordAchtergrond.png'
import { PlayerIcon } from './PlayerIcon'

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
                "w-12 h-12 -ml-6 -mt-6 z-10 hover:z-20 hover:scale-110 duration-200"
              )}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
            >
              <div className="relative w-full h-full flex flex-wrap justify-center items-center gap-0.5">
                {isEvent && playersOnTile.length === 0 && (
                   <div className={cn(
                     "w-4 h-4 rounded-full opacity-60 shadow-inner animate-pulse",
                     isPositive ? "bg-emerald-400" : "bg-rose-400"
                   )} />
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

          const colorObj = PLAYER_COLORS.find(c => c.hex === p.color);

          return (
            <div 
              key={p.id}
              className={cn(
                "absolute z-50 transition-all duration-300 ease-linear flex items-center justify-center -ml-4 -mt-4 hover:scale-110"
              )}
              style={{
                left: `${finalX}%`,
                top: `${finalY}%`,
              }}
              title={p.name}
            >
              <PlayerIcon playerId={p.id} color={p.color} size={36} />
            </div>
          );
        })}
      </div>
    </div>
  )
}
