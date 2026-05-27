import { useState } from 'react'
import { GAME_EVENTS, PLAYER_COLORS, type Player, type GameEvent } from './types'

export function useGameState() {
  const [gameStarted, setGameStarted] = useState(false)
  const [players, setPlayers] = useState<Player[]>([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [lastRoll, setLastRoll] = useState<number | null>(null)
  const [activeEvent, setActiveEvent] = useState<GameEvent | null>(null)
  const [winner, setWinner] = useState<Player | null>(null)

  const startGame = (numPlayers: number) => {
    const newPlayers: Player[] = Array.from({ length: numPlayers }).map((_, i) => ({
      id: i + 1,
      color: PLAYER_COLORS[i].hex,
      colorName: PLAYER_COLORS[i].name,
      position: 1,
      skipNextTurn: false,
    }))
    setPlayers(newPlayers)
    setCurrentPlayerIndex(0)
    setGameStarted(true)
    setLastRoll(null)
    setActiveEvent(null)
    setWinner(null)
  }

  const nextTurn = () => {
    let nextIndex = (currentPlayerIndex + 1) % players.length
    
    // Check if next player should skip
    const checkSkip = (index: number) => {
      const p = players[index]
      if (p.skipNextTurn) {
        setPlayers(prev => prev.map((pl, i) => i === index ? { ...pl, skipNextTurn: false } : pl))
        return (index + 1) % players.length
      }
      return index
    }
    
    // Simplistic skip logic: assuming not ALL players are skipped at once
    let finalNextIndex = checkSkip(nextIndex)
    if (finalNextIndex !== nextIndex) {
      // Loop once more in case the next person is ALSO skipped
      finalNextIndex = checkSkip(finalNextIndex)
    }

    setCurrentPlayerIndex(finalNextIndex)
    setLastRoll(null)
  }

  const handleRoll = () => {
    if (activeEvent || winner) return

    const roll = Math.floor(Math.random() * 6) + 1
    setLastRoll(roll)

    const player = players[currentPlayerIndex]
    let newPosition = player.position + roll

    if (newPosition >= 30) {
      newPosition = 30
      // Update position before showing win
      setPlayers(prev => prev.map((p, i) => i === currentPlayerIndex ? { ...p, position: newPosition } : p))
      setWinner(player)
      return
    }

    // Move player
    setPlayers(prev => prev.map((p, i) => i === currentPlayerIndex ? { ...p, position: newPosition } : p))

    // Check for events
    if (GAME_EVENTS[newPosition]) {
      setActiveEvent(GAME_EVENTS[newPosition])
    } else {
      // Small delay before next turn just for UX
      setTimeout(() => {
        nextTurn()
      }, 1000)
    }
  }

  const applyEvent = () => {
    if (!activeEvent) return

    setPlayers(prev => prev.map((p, i) => {
      if (i === currentPlayerIndex) {
        return { ...p, ...activeEvent.action(p) }
      }
      return p
    }))

    setActiveEvent(null)
    
    // Check win condition again after event (e.g. tile 24 + 2 -> 26, but if event brings to 30)
    // For this game, max event brings from 24 to 26, so no immediate win from event, but good practice.
    setTimeout(() => {
      nextTurn()
    }, 500)
  }

  return {
    gameStarted,
    players,
    currentPlayerIndex,
    lastRoll,
    activeEvent,
    winner,
    startGame,
    handleRoll,
    applyEvent
  }
}
