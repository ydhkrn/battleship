import { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { resetGame } from "../game/gameSlice"
import { selectIsGameOver } from "../game/gameSelectors"
import { playAudio } from "../../app/utils"
import gameOverSound from "./sounds/game-over.wav"
import appConfig from "../../app/config"

function useGameOver() {
  const [showGameOverNotification, setGameOverNotification] = useState(false)
  const dispatch = useAppDispatch()
  const isGameOver = useAppSelector(selectIsGameOver)

  useEffect(() => {
    if (isGameOver) {
      setGameOverNotification(true)
    }
  }, [isGameOver])

  // This useEffect deals with a different responsibility,
  // hence is intentionally separated from other effects
  // that may also watch `isGameOver`.
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    if (isGameOver) {
      timeoutId = setTimeout(() => {
        playAudio(gameOverSound)
      }, appConfig.inGameNotificationTimeout)
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [isGameOver])

  // Memoize: in case a consumer component/hook add this method to some dependency
  // watch list, we should not return a new function reference every time.
  const startNewGame = useCallback(() => {
    dispatch(resetGame())
    setGameOverNotification(false)
  }, [dispatch])

  return {
    showGameOverNotification,
    startNewGame,
  }
}

export default useGameOver
