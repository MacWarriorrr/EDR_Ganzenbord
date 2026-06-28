import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, AlertTriangle, ChevronDown, ChevronUp, History } from 'lucide-react'
import type { HistoryEvent } from './types'
import { PlayerIcon } from './PlayerIcon'

interface EventHistoryProps {
  history: HistoryEvent[]
}

export function EventHistory({ history }: EventHistoryProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <Card id="kaartenbak" className="max-w-md mx-auto shadow-lg border-stone-200 w-full overflow-hidden flex flex-col max-h-[500px]">
      <CardHeader className="bg-stone-50 border-b border-stone-200 py-4 z-10 shrink-0">
        <div className="flex items-center gap-2 text-stone-700">
          <History className="w-5 h-5" />
          <CardTitle className="text-lg">Kaartenbak</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 overflow-y-auto flex-1 bg-stone-50/50">
        {history.length === 0 ? (
          <div className="p-8 text-center text-stone-500 italic text-sm">
            Nog geen kaarten getrokken.
          </div>
        ) : (
          <div className="flex flex-col">
            {history.map((item) => {
              const isPositive = item.event.factor.type === 'positive'
              const isExpanded = expandedId === item.id
  
              return (
              <div 
                key={item.id} 
                className="border-b border-stone-200 last:border-0 bg-white cursor-pointer hover:bg-stone-50 transition-colors"
                onClick={() => toggleExpand(item.id)}
              >
                <div className="p-4 flex items-start gap-3">
                  {/* Speler icoon */}
                  <div className="shrink-0 pt-1" title={`Getrokken door ${item.player.name}`}>
                    <PlayerIcon playerId={item.player.id} color={item.player.color} size={24} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="font-bold text-stone-800 text-sm leading-tight flex items-center gap-1.5">
                        <span className={isPositive ? 'text-emerald-500' : 'text-rose-500'}>
                          {isPositive ? <Sparkles size={14} /> : <AlertTriangle size={14} />}
                        </span>
                        {item.event.factor.title}
                      </h4>
                      <span className="text-xs font-medium text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full shrink-0">
                        Vak {item.event.tile}
                      </span>
                    </div>
                    
                    <p className="text-xs text-stone-500 truncate">
                      {item.player.name} trok deze kaart.
                    </p>
                  </div>

                  <div className="text-stone-400 shrink-0 mt-1">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 ml-5 border-l-2 border-stone-100 pl-4 animate-in slide-in-from-top-2 duration-200">
                    <p className="text-sm text-stone-600 mb-2">
                      {item.event.factor.description}
                    </p>
                    <p className="text-xs font-bold text-stone-800 bg-stone-100 inline-block px-2 py-1 rounded">
                      {item.event.factor.actionText}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
