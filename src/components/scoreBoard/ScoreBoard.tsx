import classNames from "classnames"
import ShipsStatus from "./shipsStatus/ShipsStatus"
import styles from "./styles.module.less"
import PlayersScore from "./playersScore/PlayerScore"
import translations from "../../app/translations"

function ScoreBoard(props: ScopeBoardProps) {
  return (
    <section
      className={classNames(props.className, styles.scoreBoard)}
      aria-label={translations.textScoreBoardSection}
    >
      <PlayersScore className={styles.playerInfo} />
      <ShipsStatus className={styles.shipsStatus} />
    </section>
  )
}

export type ScopeBoardProps = {
  className?: string
}

export default ScoreBoard
