import { createRoute } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'
import { useGameState } from '@/components/game/useGameState'
import { GameSetup } from '@/components/game/GameSetup'
import { GameBoard } from '@/components/game/GameBoard'
import { GameControls } from '@/components/game/GameControls'
import { EventModal } from '@/components/game/EventModal'
import { WinnerModal } from '@/components/game/WinnerModal'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/spel',
  component: SpelComponent,
})

function SpelComponent() {
  const {
    gameStarted,
    players,
    currentPlayerIndex,
    lastRoll,
    activeEvent,
    winner,
    startGame,
    handleRoll,
    applyEvent
  } = useGameState()

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">ISD Integratie Reis - Het Spel</h1>
          <p className="text-slate-600">Gooi de dobbelsteen en ontdek hoe jouw integratiepad verloopt.</p>
        </div>

        {!gameStarted ? (
          <GameSetup onStart={startGame} />
        ) : (
          <div className="animate-in fade-in duration-500">
            <GameBoard players={players} />
            <GameControls 
              players={players}
              currentPlayerIndex={currentPlayerIndex}
              lastRoll={lastRoll}
              onRoll={handleRoll}
              disabled={!!activeEvent || !!winner}
            />
          </div>
        )}

        <EventModal 
          event={activeEvent} 
          onClose={applyEvent} 
        />

        <WinnerModal 
          winner={winner} 
          onRestart={() => startGame(players.length)} 
        />
      </div>
    </div>
  )
}
