import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Player } from "./types"
import { Trophy } from "lucide-react"
import { PlayerIcon } from "./PlayerIcon"

interface WinnerModalProps {
  winner: Player | null
  onRestart: () => void
}

export function WinnerModal({ winner, onRestart }: WinnerModalProps) {
  if (!winner) return null

  return (
    <Dialog open={!!winner} onOpenChange={(open) => !open && onRestart()}>
      <DialogContent className="sm:max-w-md text-center border-emerald-200">
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
        <DialogFooter className="sm:justify-center mt-6">
          <Button 
            onClick={onRestart}
            className="w-full sm:w-auto px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg"
          >
            Speel Opnieuw
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
