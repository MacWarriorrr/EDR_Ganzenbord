import { createRoute } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'
import { POSITIVE_FACTORS, NEGATIVE_FACTORS } from '@/data/factors'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/factoren',
  component: FactorenComponent,
})

function FactorCard({ factor }: { factor: any }) {
  const isPositive = factor.type === 'positive';
  return (
    <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col">
      <CardHeader className="pb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${isPositive ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
          {isPositive ? <Sparkles size={20} /> : <AlertTriangle size={20} />}
        </div>
        <CardTitle className="text-xl text-slate-800 leading-tight">{factor.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <p className="text-slate-600 text-sm flex-1">{factor.description}</p>
        <div className={`p-3 rounded-md font-semibold text-sm mt-auto ${isPositive ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
          Actie: {factor.actionText}
        </div>
      </CardContent>
    </Card>
  )
}

function FactorenComponent() {
  const [activeTab, setActiveTab] = useState<'positive' | 'negative'>('positive')

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">Factoren Databank</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Hier vind je een overzicht van alle positieve en negatieve factoren die de inclusie van Internationale Student Docenten (ISD) beïnvloeden. Deze factoren komen willekeurig voor als je op speciale vakjes komt tijdens het spelen van het Ganzenbord.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center p-1 bg-slate-200/50 rounded-lg max-w-md w-full">
            <button
              onClick={() => setActiveTab('positive')}
              className={cn(
                "flex-1 py-2.5 px-4 rounded-md font-semibold text-sm transition-all duration-200",
                activeTab === 'positive'
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              )}
            >
              Positief ({POSITIVE_FACTORS.length})
            </button>
            <button
              onClick={() => setActiveTab('negative')}
              className={cn(
                "flex-1 py-2.5 px-4 rounded-md font-semibold text-sm transition-all duration-200",
                activeTab === 'negative'
                  ? "bg-rose-500 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              )}
            >
              Negatief ({NEGATIVE_FACTORS.length})
            </button>
          </div>
        </div>

        <div className="animate-in fade-in duration-500 slide-in-from-bottom-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'positive'
              ? POSITIVE_FACTORS.map(factor => <FactorCard key={factor.id} factor={factor} />)
              : NEGATIVE_FACTORS.map(factor => <FactorCard key={factor.id} factor={factor} />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}
