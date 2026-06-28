import type { Player, RollResult } from './types'
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dices, Handshake } from 'lucide-react'
import { playRollSound } from '@/lib/audio'
import { PlayerIcon } from './PlayerIcon'

interface GameControlsProps {
  players: Player[]
  currentPlayerIndex: number
  lastRoll: RollResult | null
  isRolling: boolean
  onRoll: () => void
  disabled: boolean
}

const DiceFace = ({ value, isRolling }: { value: number, isRolling: boolean }) => {
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);

  useEffect(() => {
    if (isRolling) {
      setRotX(prev => prev + 720 + Math.floor(Math.random() * 360));
      setRotY(prev => prev + 720 + Math.floor(Math.random() * 360));
    } else {
      const baseRotations: Record<number, {x: number, y: number}> = {
        1: { x: 0, y: 0 },
        2: { x: 0, y: -90 },
        3: { x: 0, y: -180 },
        4: { x: 0, y: 90 },
        5: { x: -90, y: 0 },
        6: { x: 90, y: 0 }
      };
      const target = baseRotations[value] || baseRotations[1];
      
      setRotX(prev => {
        const snap = Math.round(prev / 360) * 360;
        return snap + target.x;
      });
      setRotY(prev => {
        const snap = Math.round(prev / 360) * 360;
        return snap + target.y;
      });
    }
  }, [isRolling, value]);

  const dots = Array.from({ length: 9 }).map((_, i) => i);
  const activeDots: Record<number, number[]> = {
    1: [4],
    2: [2, 6],
    3: [2, 4, 6],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8]
  };

  const renderFace = (faceValue: number, className: string) => {
    const active = activeDots[faceValue] || [];
    return (
      <div className={`cube-face ${className}`}>
        {dots.map(dot => (
          <div key={dot} className={`dot ${active.includes(dot) ? 'active' : ''}`} />
        ))}
      </div>
    )
  }

  return (
    <div className="dice-scene mx-auto mb-4">
      <div 
        className="dice-cube"
        style={{
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transitionTimingFunction: isRolling ? 'linear' : 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transitionDuration: isRolling ? '1200ms' : '600ms'
        }}
      >
        {renderFace(1, 'cube-face-front')}
        {renderFace(2, 'cube-face-right')}
        {renderFace(3, 'cube-face-back')}
        {renderFace(4, 'cube-face-left')}
        {renderFace(5, 'cube-face-top')}
        {renderFace(6, 'cube-face-bottom')}
      </div>
    </div>
  )
}

export function GameControls({ players, currentPlayerIndex, lastRoll, isRolling, onRoll, disabled }: GameControlsProps) {
  const currentPlayer = players[currentPlayerIndex]
  const [displayRoll, setDisplayRoll] = useState<RollResult | null>(null)

  useEffect(() => {
    if (lastRoll !== null) {
      setDisplayRoll(lastRoll)
    }
  }, [lastRoll])

  useEffect(() => {
    if (isRolling) {
      const interval = setInterval(() => {
        playRollSound()
      }, 150)
      return () => clearInterval(interval)
    }
  }, [isRolling])

  return (
    <Card className="max-w-md mx-auto shadow-lg border-stone-200 w-full">
      <CardContent className="p-6 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-6 bg-stone-50 px-6 py-3 rounded-full border border-stone-100">
          {currentPlayer && <PlayerIcon playerId={currentPlayer.id} color={currentPlayer.color} size={24} />}
          <span className="text-lg font-medium text-stone-700">
            Beurt: <span className="font-bold" style={{ color: currentPlayer?.color }}>{currentPlayer?.name}</span>
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          <div className="text-center animate-in zoom-in duration-300">
            <p className="text-sm text-stone-500 mb-2">
              {isRolling ? "Dobbelsteen rolt..." : lastRoll !== null ? "Je gooide:" : "Klaar om te gooien!"}
            </p>
            <div className={`inline-block relative transition-transform ${isRolling ? "shadow-xl ring-4 ring-amber-200 rounded-xl" : ""}`}>
              <DiceFace value={displayRoll?.base || 1} isRolling={isRolling} />
              {!isRolling && displayRoll && displayRoll.bonus > 0 && (
                <div className="absolute -top-3 -right-4 bg-emerald-500 text-white font-bold text-sm px-2 py-0.5 rounded-full shadow-md animate-in zoom-in slide-in-from-bottom-2">
                  +{displayRoll.bonus}
                </div>
              )}
            </div>
            {!isRolling && displayRoll && displayRoll.bonus > 0 && (
              <p className="text-xs font-semibold text-emerald-600 mt-2 animate-in fade-in">
                Totaal: {displayRoll.total} (inclusief buddy bonus)
              </p>
            )}
          </div>

          <Button 
            onClick={onRoll} 
            disabled={disabled}
            size="lg"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 text-lg rounded-xl transition-all shadow-md hover:shadow-amber-600/30 font-bold"
          >
            <Dices className="mr-2 h-6 w-6" />
            Gooi Dobbelsteen
          </Button>

          <div className="mt-6 w-full text-left pt-6 border-t border-stone-100">
            <h3 className="text-sm font-semibold text-stone-500 mb-3 uppercase tracking-wider">Spelers</h3>
            <div className="flex flex-col gap-2">
              {players.map(p => (
                <div key={p.id} className="flex items-center gap-2 text-sm bg-stone-50 p-2 rounded-lg border border-stone-100">
                   <PlayerIcon playerId={p.id} color={p.color} size={20} />
                   <span className="font-medium" style={{ color: p.color }}>{p.name}</span>
                   {p.hasGoodMentor && (p.mentorBonusTurnsLeft ?? 0) > 0 && (
                     <span className="flex items-center gap-1 text-emerald-600 bg-emerald-100/50 px-2.5 py-1 rounded-full text-xs font-semibold ml-auto border border-emerald-200">
                       <Handshake size={14} />
                       Buddy bonus: {p.mentorBonusTurnsLeft} over
                     </span>
                   )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
