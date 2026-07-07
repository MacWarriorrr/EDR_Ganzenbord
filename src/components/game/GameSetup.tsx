import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Plus, Minus } from 'lucide-react'

interface GameSetupProps {
  onStart: (playerNames: string[]) => void
}

export function GameSetup({ onStart }: GameSetupProps) {
  const [names, setNames] = useState<string[]>(['', ''])

  const addPlayer = () => {
    if (names.length < 6) {
      setNames([...names, ''])
    }
  }

  const removePlayer = () => {
    if (names.length > 2) {
      setNames(names.slice(0, -1))
    }
  }

  const updateName = (index: number, name: string) => {
    const newNames = [...names]
    newNames[index] = name
    setNames(newNames)
  }

  return (
    <Card className="max-w-md mx-auto shadow-lg border-amber-100">
      <CardHeader className="text-center">
        <div className="mx-auto bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-amber-600">
          <Users size={32} />
        </div>
        <CardTitle className="text-3xl text-stone-800">Klaar voor de start?</CardTitle>
        <CardDescription className="text-base mt-2">
          Vul de namen in van je collega's om de ISD Inclusie Reis te spelen (2 tot 6 spelers).
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="space-y-3">
          {names.map((name, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-6 text-sm font-semibold text-stone-400">{i + 1}.</span>
              <input 
                value={name}
                onChange={(e) => updateName(i, e.target.value)}
                placeholder={`Naam speler ${i + 1}`}
                className="flex h-10 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                maxLength={20}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-4">
          <Button 
            variant="outline" 
            onClick={removePlayer}
            disabled={names.length <= 2}
            className="flex-1 border-stone-200 text-stone-600"
          >
            <Minus className="mr-2 h-4 w-4" /> Speler eraf
          </Button>
          <Button 
            variant="outline" 
            onClick={addPlayer}
            disabled={names.length >= 6}
            className="flex-1 border-stone-200 text-stone-600"
          >
            <Plus className="mr-2 h-4 w-4" /> Speler erbij
          </Button>
        </div>
        
        <Button 
          size="lg" 
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 text-lg rounded-xl transition-all shadow-md hover:shadow-amber-600/30 font-bold"
          onClick={() => onStart(names.map((n, i) => n.trim() || `Speler ${i + 1}`))}
        >
          Start het Spel!
        </Button>
      </CardContent>
    </Card>
  )
}
