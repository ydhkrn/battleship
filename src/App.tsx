import styles from "./styles.module.less"
import Game from "./components/game/Game"
import GameNotification from "./components/gameNotification/GameNotification"
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary"
import ErrorFallback from "./components/errorBoundary/ErrorFallback"
import { useAudio } from "./app/useAudio"
import AudioContext from "./app/audioContext"

function App() {
  const playAudio = useAudio()
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <AudioContext.Provider value={{ playAudio }}>
        <div className={styles.app}>
          <Game />
          <GameNotification />
        </div>
      </AudioContext.Provider>
    </ErrorBoundary>
  )
}

export default App
