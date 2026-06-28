import { useState, useRef } from 'react'
import { POSITIVE_TILES, NEGATIVE_TILES, PLAYER_COLORS, type Player, type GameEvent, type HistoryEvent, type RollResult } from './types'
import { POSITIVE_FACTORS, NEGATIVE_FACTORS } from '@/data/factors'
import confetti from 'canvas-confetti'

export function useGameState() {
  const [gameStarted, setGameStarted] = useState(false)
  const [players, setPlayers] = useState<Player[]>([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [lastRoll, setLastRoll] = useState<RollResult | null>(null)
  const [activeEvent, setActiveEvent] = useState<GameEvent | null>(null)
  const [winner, setWinner] = useState<Player | null>(null)
  const [usedFactors, setUsedFactors] = useState<string[]>([])
  const [isRolling, setIsRolling] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const [showMentorIntro, setShowMentorIntro] = useState(false)
  const [eventHistory, setEventHistory] = useState<HistoryEvent[]>([])
  const [isShaking, setIsShaking] = useState(false)
  const isApplyingEventRef = useRef(false)

  const startGame = (playerNames: string[]) => {
    const newPlayers: Player[] = playerNames.map((name, i) => {
      const hasGoodMentor = Math.random() > 0.5
      return {
        id: i + 1,
        name: name || `Speler ${i + 1}`,
        color: PLAYER_COLORS[i].hex,
        colorName: PLAYER_COLORS[i].name,
        position: 1,
        skipNextTurn: false,
        hasGoodMentor,
        mentorBonusTurnsLeft: hasGoodMentor ? 3 : 0
      }
    })
    setPlayers(newPlayers)
    setCurrentPlayerIndex(0)
    setGameStarted(true)
    setLastRoll(null)
    setActiveEvent(null)
    setWinner(null)
    setUsedFactors([])
    setIsRolling(false)
    setIsMoving(false)
    setEventHistory([])
    setShowMentorIntro(true)
    setIsShaking(false)
  }

  const closeMentorIntro = () => {
    setShowMentorIntro(false)
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
    if (activeEvent || winner || isRolling || isMoving) return

    setIsRolling(true)
    setLastRoll(null)

    setTimeout(() => {
      const player = players[currentPlayerIndex]
      const hasBonus = player.mentorBonusTurnsLeft ? player.mentorBonusTurnsLeft > 0 : false
      
      const baseRoll = Math.floor(Math.random() * 6) + 1
      const bonus = hasBonus ? 1 : 0
      const totalRoll = baseRoll + bonus

      setLastRoll({ base: baseRoll, bonus, total: totalRoll })
      setIsRolling(false)
      setIsMoving(true)

      if (hasBonus) {
        setPlayers(prev => prev.map((p, i) => 
          i === currentPlayerIndex 
            ? { ...p, mentorBonusTurnsLeft: (p.mentorBonusTurnsLeft || 0) - 1 } 
            : p
        ))
      }

      const targetPosition = Math.min(64, player.position + totalRoll)
      let currentPos = player.position

      const step = () => {
        currentPos += 1
        setPlayers(prev => prev.map((p, i) => i === currentPlayerIndex ? { ...p, position: currentPos } : p))

        if (currentPos < targetPosition) {
          setTimeout(step, 400)
        } else {
          // Reached target

          if (currentPos >= 64) {
            setIsMoving(false)
            setPlayers(prev => {
              const winnerPlayer = prev[currentPlayerIndex]
              setWinner(winnerPlayer)
              return prev
            })
            return
          }

          // Check for events
          const isPositive = POSITIVE_TILES.includes(currentPos)
          const isNegative = NEGATIVE_TILES.includes(currentPos)

          if (isPositive || isNegative) {
            const type = isPositive ? 'positive' : 'negative'
            setUsedFactors(prevUsed => {
              let availableFactors = (type === 'positive' ? POSITIVE_FACTORS : NEGATIVE_FACTORS)
                .filter(f => !prevUsed.includes(f.id))
              
              if (availableFactors.length === 0) {
                availableFactors = type === 'positive' ? POSITIVE_FACTORS : NEGATIVE_FACTORS
              }

              const randomFactor = availableFactors[Math.floor(Math.random() * availableFactors.length)]
              
              setTimeout(() => {
                 if (type === 'positive') {
                   setActiveEvent({ tile: currentPos, factor: randomFactor })
                   confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
                   setIsMoving(false)
                 } else {
                   setIsShaking(true)
                   setTimeout(() => {
                     setIsShaking(false)
                     setActiveEvent({ tile: currentPos, factor: randomFactor })
                     setIsMoving(false)
                   }, 500)
                 }
              }, 1000)
              
              return [...prevUsed, randomFactor.id]
            })
          } else {
            setTimeout(() => {
              nextTurn()
              setIsMoving(false)
            }, 1000)
          }
        }
      }

      if (currentPos < targetPosition) {
        setTimeout(step, 400)
      } else {
        setTimeout(() => {
          nextTurn()
          setIsMoving(false)
        }, 1000)
      }
    }, 1000)
  }

  const applyEvent = () => {
    if (!activeEvent || isApplyingEventRef.current) return
    isApplyingEventRef.current = true

    const currentPlayer = players[currentPlayerIndex]
    const actionResult = activeEvent.factor.action(currentPlayer)

    setEventHistory(prev => [
      { id: Math.random().toString(36).substr(2, 9), player: currentPlayer, event: activeEvent },
      ...prev
    ])

    setPlayers(prev => prev.map((p, i) => {
      if (i === currentPlayerIndex) {
        return { ...p, ...actionResult }
      }
      return p
    }))

    setActiveEvent(null)
    setIsMoving(true) // Prevent rolling before turn changes
    
    // Check win condition again after event (e.g. tile 24 + 2 -> 26, but if event brings to 30)
    // For this game, max event brings from 24 to 26, so no immediate win from event, but good practice.
    setTimeout(() => {
      if (actionResult.extraTurn) {
        setPlayers(prev => prev.map((p, i) => i === currentPlayerIndex ? { ...p, extraTurn: false } : p))
        setLastRoll(null)
      } else {
        nextTurn()
      }
      setIsMoving(false)
      isApplyingEventRef.current = false
    }, 500)
  }

  return {
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
  }
}
