import type { Player } from './types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dices, User } from 'lucide-react'

interface GameControlsProps {
  players: Player[]
  currentPlayerIndex: number
  lastRoll: number | null
  onRoll: () => void
  disabled: boolean
}

export function GameControls({ players, currentPlayerIndex, lastRoll, onRoll, disabled }: GameControlsProps) {
  const currentPlayer = players[currentPlayerIndex]

  return (
    <Card className="max-w-md mx-auto shadow-lg border-slate-200">
      <CardContent className="p-6 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-6 bg-slate-50 px-6 py-3 rounded-full border border-slate-100">
          <User className="h-5 w-5 text-slate-500" />
          <span className="text-lg font-medium text-slate-700">
            Beurt: <span className="font-bold" style={{ color: currentPlayer?.color }}>Speler {currentPlayer?.colorName}</span>
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          {lastRoll !== null && (
            <div className="text-center animate-in zoom-in duration-300">
              <p className="text-sm text-slate-500 mb-1">Je gooide:</p>
              <div className="w-16 h-16 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center text-3xl font-bold text-slate-800 shadow-sm">
                {lastRoll}
              </div>
            </div>
          )}

          <Button 
            onClick={onRoll} 
            disabled={disabled}
            size="lg"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg rounded-xl transition-all shadow-md hover:shadow-indigo-600/30 font-bold"
          >
            <Dices className="mr-2 h-6 w-6" />
            Gooi Dobbelsteen
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
