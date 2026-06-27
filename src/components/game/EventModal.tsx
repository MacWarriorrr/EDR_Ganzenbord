import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { GameEvent } from "./types"
import { Sparkles, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

const CardDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-[90vw] max-w-sm gap-4 border-4 bg-background p-8 shadow-2xl sm:rounded-2xl outline-none",
        "data-[state=open]:animate-card-enter data-[state=closed]:animate-card-exit",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
CardDialogContent.displayName = "CardDialogContent"

interface EventModalProps {
  event: GameEvent | null
  onClose: () => void
}

export function EventModal({ event, onClose }: EventModalProps) {
  const [targetStyle, setTargetStyle] = React.useState<React.CSSProperties>({})
  const [cachedEvent, setCachedEvent] = React.useState<GameEvent | null>(event)

  React.useEffect(() => {
    if (event) {
      setCachedEvent(event)
      const kaartenbak = document.getElementById('kaartenbak')
      if (kaartenbak) {
        const rect = kaartenbak.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const deltaX = centerX - window.innerWidth / 2
        const deltaY = centerY - window.innerHeight / 2
        
        setTargetStyle({
          '--target-x': `${deltaX}px`,
          '--target-y': `${deltaY}px`
        } as React.CSSProperties)
      } else {
        // Fallback als de kaartenbak niet gevonden wordt
        setTargetStyle({
          '--target-x': `50vw`,
          '--target-y': `100vh`
        } as React.CSSProperties)
      }
    }
  }, [event])

  const currentEvent = event || cachedEvent

  if (!currentEvent) return null

  const isPositive = currentEvent.factor.type === 'positive'

  return (
    <Dialog open={!!event} onOpenChange={(open) => !open && onClose()}>
      <CardDialogContent 
        style={targetStyle}
        className={cn(
          "text-center aspect-[3/4] flex flex-col justify-between",
          isPositive ? "border-emerald-500/30 bg-emerald-50/50" : "border-rose-500/30 bg-rose-50/50"
        )}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none rounded-xl" />
        <DialogHeader className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div className={cn(
            "mx-auto w-24 h-24 rounded-full flex items-center justify-center shadow-inner",
            isPositive ? 'bg-emerald-100 text-emerald-600 shadow-emerald-200' : 'bg-rose-100 text-rose-600 shadow-rose-200'
          )}>
            {isPositive ? <Sparkles size={48} className="animate-pulse" /> : <AlertTriangle size={48} />}
          </div>
          <DialogTitle className={cn(
            "text-3xl font-black uppercase tracking-wider",
            isPositive ? "text-emerald-900" : "text-rose-900"
          )}>
            Vakje {currentEvent.tile}
          </DialogTitle>
          <div className={cn(
            "text-xl font-bold italic",
            isPositive ? "text-emerald-700" : "text-rose-700"
          )}>
            {currentEvent.factor.title}
          </div>
          <DialogDescription className="text-lg text-stone-700 leading-relaxed py-4 font-medium flex-1 flex items-center">
            {currentEvent.factor.description}
          </DialogDescription>
          <div className={cn(
            "w-full py-4 px-6 rounded-xl font-black text-xl mb-4 border-2 shadow-sm",
            isPositive 
              ? "bg-emerald-100 border-emerald-200 text-emerald-900" 
              : "bg-rose-100 border-rose-200 text-rose-900"
          )}>
            {currentEvent.factor.actionText}
          </div>
        </DialogHeader>
        <DialogFooter className="sm:justify-center mt-4">
          <Button 
            onClick={onClose}
            size="lg"
            className={cn(
              "w-full text-lg h-14 rounded-xl shadow-lg hover:-translate-y-1 transition-transform",
              isPositive 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                : 'bg-rose-600 hover:bg-rose-700 text-white'
            )}
          >
            BEGREPEN
          </Button>
        </DialogFooter>
      </CardDialogContent>
    </Dialog>
  )
}
