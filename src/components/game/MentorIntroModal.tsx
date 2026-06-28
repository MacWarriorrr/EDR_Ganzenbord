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
import { Handshake } from "lucide-react"
import { PlayerIcon } from "./PlayerIcon"
import { useState, useEffect } from "react"

interface MentorIntroModalProps {
  players: Player[]
  open: boolean
  onClose: () => void
}

export function MentorIntroModal({ players, open, onClose }: MentorIntroModalProps) {
  const [internalOpen, setInternalOpen] = useState(open)

  useEffect(() => {
    setInternalOpen(open)
  }, [open])

  const handleClose = () => {
    setInternalOpen(false)
    onClose()
  }

  const playersWithMentor = players.filter(p => p.hasGoodMentor)

  return (
    <Dialog open={internalOpen} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-md text-center border-emerald-200">
        <DialogHeader>
          <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-4 text-emerald-600 shadow-inner">
            <Handshake size={40} />
          </div>
          <DialogTitle className="text-3xl text-emerald-700 mb-2">
            Werkplekbegeleider
          </DialogTitle>
          <DialogDescription className="text-lg text-stone-700 py-2 font-medium">
            Sommige spelers hebben een extra goede start dankzij een behulpzame werkplekbegeleider!
          </DialogDescription>

          <div className="bg-stone-50 rounded-xl p-4 mt-4 border border-stone-200 text-left">
            <h4 className="font-bold text-stone-800 mb-3 border-b border-stone-200 pb-2">Wie krijgt de bonus?</h4>
            {playersWithMentor.length > 0 ? (
              <div className="flex flex-col gap-2">
                {playersWithMentor.map(p => (
                  <div key={p.id} className="flex items-center gap-2">
                    <PlayerIcon playerId={p.id} color={p.color} size={24} />
                    <span className="font-semibold" style={{ color: p.color }}>{p.name}</span>
                    <span className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                      +1 op eerste 3 worpen
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-stone-500 italic text-sm text-center py-2">
                Helaas, niemand heeft deze keer een begeleider gekregen.
              </p>
            )}
          </div>
        </DialogHeader>
        <DialogFooter className="sm:justify-center mt-6">
          <Button
            onClick={handleClose}
            className="w-full sm:w-auto px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg"
          >
            START HET SPEL
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
