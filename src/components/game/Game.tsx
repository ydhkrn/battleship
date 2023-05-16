import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectAttackedPlayerBoardData, fire } from "./gameSlice"
import styles from "./Game.module.less"
import GameBoard from "../gameBoard/GameBoard"
import { CellPosition } from "../gameBoard/cell/Cell"
import ScoreBoard from "../scoreBoard/ScoreBoard"

function Game(props: GameProps) {
  const attackedPlayerBoardData = useAppSelector(selectAttackedPlayerBoardData)
  const dispatch = useAppDispatch()

  return (
    <div className={styles.game}>
      <ScoreBoard className={styles.scoreBoard} />
      <GameBoard
        rows={10}
        cols={10}
        className={styles.gameBoard}
        boardData={attackedPlayerBoardData}
        onCellAttack={(position: CellPosition) =>
          dispatch(fire({ firedPosition: position }))
        }
      />
    </div>
  )
}

export default Game

export type GameProps = {}
