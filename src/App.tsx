import styles from "./styles.module.less"
import Game from "./components/game/Game"
import GameNotification from "./components/gameNotification/GameNotification"

function App() {
  return (
    <div className={styles.app}>
      <Game />
      <GameNotification />
    </div>
  )
}

export default App
