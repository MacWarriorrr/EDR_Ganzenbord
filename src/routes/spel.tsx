import { createRoute } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'
import { useGameState } from '@/components/game/useGameState'
import { GameSetup } from '@/components/game/GameSetup'
import { GameBoard } from '@/components/game/GameBoard'
import { GameControls } from '@/components/game/GameControls'
import { EventHistory } from '@/components/game/EventHistory'
import { EventModal } from '@/components/game/EventModal'
import { WinnerModal } from '@/components/game/WinnerModal'
import { MentorIntroModal } from '@/components/game/MentorIntroModal'

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
    showMentorIntro,
    eventHistory,
    isShaking,
    startGame,
    closeMentorIntro,
    handleRoll,
    applyEvent
  } = useGameState()

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-stone-50 py-4 px-4 sm:px-8">
      <div className="mx-auto max-w-[1800px] w-full">
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-extrabold text-stone-800 tracking-tight mb-2">ISD Inclusie Reis - Het Spel</h1>
          <p className="text-stone-600">Gooi de dobbelsteen en ontdek hoe jouw inclusiepad verloopt.</p>
        </div>

        {!gameStarted ? (
          <GameSetup onStart={startGame} />
        ) : (
          <div className="animate-in fade-in duration-500 flex flex-col lg:flex-row gap-4 xl:gap-8 items-start justify-center">
            {/* Linker kolom: Kaartenbak */}
            <div className="w-full lg:w-80 shrink-0 lg:sticky lg:top-8 order-3 lg:order-1">
              <EventHistory history={eventHistory} />
            </div>

            {/* Midden kolom: Bord */}
            <div className={`flex-1 w-full order-1 lg:order-2 ${isShaking ? 'shake-screen' : ''}`}>
              <GameBoard players={players} />
            </div>

            {/* Rechter kolom: Controls */}
            <div className="w-full lg:w-80 shrink-0 lg:sticky lg:top-8 order-2 lg:order-3">
              <GameControls 
                players={players}
                currentPlayerIndex={currentPlayerIndex}
                lastRoll={lastRoll}
                isRolling={isRolling}
                onRoll={handleRoll}
                disabled={!!activeEvent || !!winner || isMoving || isRolling}
              />
            </div>
          </div>
        )}

        <EventModal 
          event={activeEvent} 
          onClose={applyEvent} 
        />

        <WinnerModal 
          winner={winner} 
          onRestart={() => startGame(players.map(p => p.name))} 
        />

        {gameStarted && (
          <MentorIntroModal
            players={players}
            open={showMentorIntro}
            onClose={closeMentorIntro}
          />
        )}
      </div>
    </div>
  )
}
