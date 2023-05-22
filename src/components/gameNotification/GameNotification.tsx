import Modal from "../modal/Modal"
import useGameOver from "./useGameOver"
import styles from "./styles.module.less"
import useShipSunk from "./useShipSunk"
import { shipTypesImgSrcMap } from "../scoreBoard/shipsStatus/constants"

function GameNotification() {
  const { showGameOverNotification, startNewGame } = useGameOver()
  const sunkShip = useShipSunk()
  const hasNotification = !!sunkShip || showGameOverNotification
  return (
    <Modal
      isVisible={hasNotification}
      contentClassName={styles.gameNotification}
    >
      {sunkShip && (
        <div className={styles.shipSunk}>
          <img
            className={styles.shipImg}
            src={
              shipTypesImgSrcMap[sunkShip as keyof typeof shipTypesImgSrcMap]
            }
            alt={sunkShip}
          />
          <div>{sunkShip.toUpperCase()} has been sunk</div>
        </div>
      )}
      {/* Game over message should wait till the last sunk ship
      notification is cleared off */}
      {!sunkShip && showGameOverNotification && (
        <>
          <div>Game Over!</div>
          <button className={styles.newGameButton} onClick={startNewGame}>
            Start new game
          </button>
        </>
      )}
    </Modal>
  )
}

export default GameNotification
