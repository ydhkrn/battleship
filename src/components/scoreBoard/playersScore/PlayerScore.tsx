import classNames from "classnames"
import appConfig from "../../../app/config"
import styles from "./styles.module.less"
import { useAppSelector } from "../../../app/hooks"
import { selectPlayersScore } from "../../game/gameSelectors"

const { player1, player2 } = appConfig.playerId

function PlayersScore(props: PlayersScoreProps) {
  const playersScore = useAppSelector(selectPlayersScore)

  return (
    <div className={classNames(styles.playerInfo, props.className)}>
      {[player1, player2].map((playerId, index) => {
        const score = `${playersScore[playerId]}`.padStart(2, "0")
        return (
          <div
            className={classNames(styles.player, styles[playerId])}
            key={playerId}
          >
            <span className={styles.score}>{score}</span>
            <hr />
            <span className={styles.playerName}>player {index + 1}</span>
          </div>
        )
      })}
    </div>
  )
}

export type PlayersScoreProps = {
  className?: string
}

export default PlayersScore
