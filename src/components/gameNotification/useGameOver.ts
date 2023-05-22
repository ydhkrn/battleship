import { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { resetGame } from "../game/gameSlice"
import { selectIsGameOver } from "../game/gameSelectors"

function useGameOver() {
  const [showGameOverNotification, setGameOverNotification] = useState(false)
  const dispatch = useAppDispatch()
  const isGameOver = useAppSelector(selectIsGameOver)

  useEffect(() => {
    if (isGameOver) {
      setGameOverNotification(true)
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
