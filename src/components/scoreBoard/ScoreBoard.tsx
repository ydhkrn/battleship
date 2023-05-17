import classNames from "classnames"
import appConfig from "../../app/config"
import ShipsStatus from "../shipsStatus/ShipsStatus"
import styles from "./styles.module.less"

const { player1, player2 } = appConfig.playerId

function ScoreBoard(props: ScopeBoardProps) {
  return (
    <div className={classNames(props.className, styles.scoreBoard)}>
      <div className={styles.playerInfo}>
        {[player1, player2].map((playerId, index) => {
          return (
            <div
              className={classNames(styles.player, styles[playerId])}
              key={playerId}
            >
              <span className={styles.score}>00</span>
              <hr />
              <span className={styles.playerName}>player {index + 1}</span>
            </div>
          )
        })}
      </div>
      <ShipsStatus className={styles.shipsStatus} />
    </div>
  )
}

export type ScopeBoardProps = {
  className?: string
}

export default ScoreBoard
