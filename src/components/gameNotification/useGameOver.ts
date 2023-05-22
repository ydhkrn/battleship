import { useCallback, useContext, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { resetGame } from "../game/gameSlice"
import { selectIsGameOver } from "../game/gameSelectors"
import appConfig from "../../app/config"
import AudioContext from "../../app/audioContext"

function useGameOver() {
  const [showGameOverNotification, setGameOverNotification] = useState(false)
  const audioContext = useContext(AudioContext)
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
        audioContext.playAudio?.(appConfig.audioName.gameOver)
      }, appConfig.inGameNotificationTimeout)
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [isGameOver, audioContext])

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
