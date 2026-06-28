import { Settings, FlaskConical, Terminal, Calculator, Coffee, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PlayerIconProps {
  playerId: number
  color: string
  className?: string
  size?: number | string
}

export function PlayerIcon({ playerId, color, className, size = 24 }: PlayerIconProps) {
  const getIcon = () => {
    switch (playerId) {
      case 1:
        return Settings
      case 2:
        return FlaskConical
      case 3:
        return Terminal
      case 4:
        return Calculator
      case 5:
        return Coffee
      case 6:
        return Globe
      default:
        return Settings
    }
  }

  const Icon = getIcon()

  return (
    <Icon
      size={size}
      color={color}
      strokeWidth={3}
      className={cn(
        "filter transition-transform",
        className
      )}
      style={{
        // A much stronger, thicker white glow to simulate a stroke, plus a deeper dark shadow
        filter: `
          drop-shadow(1px 1px 0px white) 
          drop-shadow(-1px -1px 0px white) 
          drop-shadow(1px -1px 0px white) 
          drop-shadow(-1px 1px 0px white) 
          drop-shadow(0px 0px 4px white) 
          drop-shadow(0px 4px 6px rgba(0,0,0,0.5))
        `
      }}
    />
  )
}
