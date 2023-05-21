import Modal from "../modal/Modal"
import useGameOver from "./useGameOver"
import styles from "./styles.module.less"

function GameNotification() {
  const { showGameOverNotification, startNewGame } = useGameOver()

  return (
    <Modal
      isVisible={showGameOverNotification}
      contentClassName={styles.gameNotification}
    >
      <div>Game Over!</div>
      <button className={styles.newGameButton} onClick={startNewGame}>
        Start new game
      </button>
    </Modal>
  )
}

export default GameNotification
