import classNames from "classnames"
import ShipsStatus from "./shipsStatus/ShipsStatus"
import styles from "./styles.module.less"
import PlayersScore from "./playersScore/PlayerScore"

function ScoreBoard(props: ScopeBoardProps) {
  return (
    <div className={classNames(props.className, styles.scoreBoard)}>
      <PlayersScore className={styles.playerInfo} />
      <ShipsStatus className={styles.shipsStatus} />
    </div>
  )
}

export type ScopeBoardProps = {
  className?: string
}

export default ScoreBoard
