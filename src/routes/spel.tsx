import { createRoute } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'
import { useGameState } from '@/components/game/useGameState'
import { GameSetup } from '@/components/game/GameSetup'
import { GameBoard } from '@/components/game/GameBoard'
import { GameControls } from '@/components/game/GameControls'
import { EventHistory } from '@/components/game/EventHistory'
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
    isRolling,
    isMoving,
    eventHistory,
    startGame,
    handleRoll,
    applyEvent
  } = useGameState()

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-stone-50 py-4 px-4 sm:px-8">
      <div className="mx-auto max-w-[1800px] w-full">
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-extrabold text-stone-800 tracking-tight mb-2">ISD Integratie Reis - Het Spel</h1>
          <p className="text-stone-600">Gooi de dobbelsteen en ontdek hoe jouw integratiepad verloopt.</p>
        </div>

        {!gameStarted ? (
          <GameSetup onStart={startGame} />
        ) : (
          <div className="animate-in fade-in duration-500 flex flex-col lg:flex-row gap-4 xl:gap-8 items-start justify-center">
            <div className="flex-1 w-full">
              <GameBoard players={players} />
            </div>
            <div className="w-full lg:w-80 shrink-0 sticky top-8">
              <GameControls 
                players={players}
                currentPlayerIndex={currentPlayerIndex}
                lastRoll={lastRoll}
                isRolling={isRolling}
                onRoll={handleRoll}
                disabled={!!activeEvent || !!winner || isMoving || isRolling}
              />
              <EventHistory history={eventHistory} />
            </div>
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
