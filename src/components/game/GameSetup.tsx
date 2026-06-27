import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users } from 'lucide-react'

interface GameSetupProps {
  onStart: (numPlayers: number) => void
}

export function GameSetup({ onStart }: GameSetupProps) {
  const [num, setNum] = useState(2)

  return (
    <Card className="max-w-md mx-auto shadow-lg border-amber-100">
      <CardHeader className="text-center">
        <div className="mx-auto bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-amber-600">
          <Users size={32} />
        </div>
        <CardTitle className="text-3xl text-stone-800">Klaar voor de start?</CardTitle>
        <CardDescription className="text-base mt-2">
          Kies met hoeveel collega's je de ISD Integratie Reis wilt spelen (2 tot 6 spelers).
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4 bg-stone-50 p-4 rounded-xl">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setNum(Math.max(2, num - 1))}
            disabled={num <= 2}
            className="rounded-full w-12 h-12 text-xl"
          >
            -
          </Button>
          <span className="text-3xl font-bold w-8 text-center text-stone-800">{num}</span>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setNum(Math.min(6, num + 1))}
            disabled={num >= 6}
            className="rounded-full w-12 h-12 text-xl"
          >
            +
          </Button>
        </div>
        
        <Button 
          size="lg" 
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 text-lg rounded-xl transition-all shadow-md hover:shadow-amber-600/30 font-bold"
          onClick={() => onStart(num)}
        >
          Start het Spel!
        </Button>
      </CardContent>
    </Card>
  )
}
