import { ReactNode } from "react"

import styles from "./styles.module.less"
import Cell, { CellData, CellPosition } from "./cell/Cell"
import classNames from "classnames"
import { useAppSelector } from "../../app/hooks"
import { selectAttackingPlayerId } from "../game/gameSelectors"
import translations from "../../app/translations"

function generateCells(boardData: BoardData, onCellAttack: OnCellAttackFn) {
  return boardData.reduce(
    (cellsMarkup, currentRowData, currentRow) => [
      ...cellsMarkup,
      ...currentRowData.map((cellData, currentCol) => (
        <Cell
          key={`${currentRow}-${currentCol}`}
          ship={cellData.ship}
          status={cellData.status}
          onClick={() => onCellAttack([currentRow, currentCol])}
        />
      )),
    ],
    [] as ReactNode[],
  )
}

function GameBoard(props: GameBoardProps) {
  const attackingPlayerId = useAppSelector(selectAttackingPlayerId)
  return (
    <section
      className={classNames(
        props.className,
        styles.gameBoard,
        styles[attackingPlayerId],
      )}
      style={{
        gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
        gridTemplateRows: `repeat(${props.rows}, 1fr)`,
      }}
      aria-label={translations.textLabelGameBoard}
    >
      {generateCells(props.boardData, props.onCellAttack)}
    </section>
  )
}

export default GameBoard

export type BoardData = CellData[][]

type OnCellAttackFn = (position: CellPosition) => void

export type GameBoardProps = {
  rows: number
  cols: number
  boardData: BoardData
  className?: string
  onCellAttack: OnCellAttackFn
}
