import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { GameEvent } from "./types"
import { Sparkles, AlertTriangle } from "lucide-react"

interface EventModalProps {
  event: GameEvent | null
  onClose: () => void
}

export function EventModal({ event, onClose }: EventModalProps) {
  if (!event) return null

  const isPositive = event.type === 'positive'

  return (
    <Dialog open={!!event} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isPositive ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
            {isPositive ? <Sparkles size={32} /> : <AlertTriangle size={32} />}
          </div>
          <DialogTitle className="text-2xl mb-2">
            Vakje {event.tile}
          </DialogTitle>
          <DialogDescription className="text-base text-slate-700 leading-relaxed py-4">
            {event.text}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button 
            onClick={onClose}
            className={`w-full sm:w-auto px-8 ${isPositive ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-800 hover:bg-slate-900'} text-white font-bold`}
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
