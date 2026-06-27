import type { Player } from './types'
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dices, User } from 'lucide-react'

interface GameControlsProps {
  players: Player[]
  currentPlayerIndex: number
  lastRoll: number | null
  isRolling: boolean
  onRoll: () => void
  disabled: boolean
}

const DiceFace = ({ value }: { value: number }) => {
  const dots = Array.from({ length: 9 }).map((_, i) => i);
  // grid indices:
  // 0 1 2
  // 3 4 5
  // 6 7 8
  const activeDots: Record<number, number[]> = {
    1: [4],
    2: [2, 6],
    3: [2, 4, 6],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8]
  };
  const active = activeDots[value] || [];
  
  return (
    <div className="w-16 h-16 bg-white border-2 border-stone-200 rounded-xl shadow-sm p-2 grid grid-cols-3 grid-rows-3 gap-1">
      {dots.map(dot => (
        <div key={dot} className={`rounded-full ${active.includes(dot) ? 'bg-stone-800' : 'bg-transparent'}`} />
      ))}
    </div>
  )
}

export function GameControls({ players, currentPlayerIndex, lastRoll, isRolling, onRoll, disabled }: GameControlsProps) {
  const currentPlayer = players[currentPlayerIndex]
  const [visualRoll, setVisualRoll] = useState<number>(1)
  const [displayRoll, setDisplayRoll] = useState<number>(1)

  useEffect(() => {
    if (lastRoll !== null) {
      setDisplayRoll(lastRoll)
    }
  }, [lastRoll])

  useEffect(() => {
    if (isRolling) {
      const interval = setInterval(() => {
        setVisualRoll(Math.floor(Math.random() * 6) + 1)
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isRolling])

  return (
    <Card className="max-w-md mx-auto shadow-lg border-stone-200 w-full">
      <CardContent className="p-6 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-6 bg-stone-50 px-6 py-3 rounded-full border border-stone-100">
          <User className="h-5 w-5 text-stone-500" />
          <span className="text-lg font-medium text-stone-700">
            Beurt: <span className="font-bold" style={{ color: currentPlayer?.color }}>Speler {currentPlayer?.colorName}</span>
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          <div className="text-center animate-in zoom-in duration-300">
            <p className="text-sm text-stone-500 mb-2">
              {isRolling ? "Dobbelsteen rolt..." : lastRoll !== null ? "Je gooide:" : "Klaar om te gooien!"}
            </p>
            <div className={`inline-block transition-transform ${isRolling ? "animate-dice-roll shadow-xl ring-4 ring-amber-200 rounded-xl" : ""}`}>
              <DiceFace value={isRolling ? visualRoll : displayRoll} />
            </div>
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
        </div>
      </CardContent>
    </Card>
  )
}
