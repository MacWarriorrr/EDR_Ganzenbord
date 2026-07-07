import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Player } from "./types"
import { Trophy } from "lucide-react"
import { PlayerIcon } from "./PlayerIcon"
import { useNavigate } from '@tanstack/react-router'

import { triggerWinConfetti, playWinSound } from '@/lib/audio'
import { useEffect } from 'react'

interface WinnerModalProps {
  winner: Player | null
  onRestart: () => void
}

export function WinnerModal({ winner, onRestart }: WinnerModalProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (winner) {
      triggerWinConfetti()
      playWinSound()
    }
  }, [winner])

  if (!winner) return null

  return (
    <Dialog open={!!winner} onOpenChange={(open) => !open && onRestart()}>
      <DialogContent className="sm:max-w-lg text-center border-emerald-200">
        <DialogHeader>
          <div className="mx-auto w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mb-4 text-yellow-500 shadow-inner">
            <Trophy size={40} />
          </div>
          <DialogTitle className="text-3xl text-emerald-700 mb-2">
            Gefeliciteerd!
          </DialogTitle>
          <DialogDescription className="text-lg text-stone-700 py-2 font-medium">
            Je bent succesvol geïntegreerd!
          </DialogDescription>
          <div className="flex items-center justify-center gap-2 mt-2">
            <PlayerIcon playerId={winner.id} color={winner.color} size={20} />
            <p className="text-sm text-stone-500 font-medium">
              {winner.name} heeft als eerste vakje 64 bereikt.
            </p>
          </div>
        </DialogHeader>
        <div className="mt-6 flex flex-col gap-3 w-full sm:w-4/5 mx-auto">
          <Button
            onClick={onRestart}
            className="w-full px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg"
          >
            Speel Opnieuw
          </Button>
          <Button
            onClick={() => navigate({ to: '/evaluatie' })}
            variant="outline"
            className="w-full px-6 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold text-lg"
          >
            Naar Evaluatieformulier
          </Button>
          <Button
            onClick={() => navigate({ to: '/factoren' })}
            variant="ghost"
            className="w-full px-6 text-emerald-700 hover:bg-emerald-50 font-bold text-lg"
          >
            Bekijk alle factoren
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
