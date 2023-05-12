import { ReactNode } from "react"

import styles from "./GameBoard.module.css"
import Cell, { CellData, CellPosition } from "./cell/Cell"

function generateCells(
  boardData: BoardData,
  onCellFire: GameBoardProps["onCellFire"],
) {
  return boardData.reduce(
    (cellsMarkup, currentRowData, currentRow) => [
      ...cellsMarkup,
      ...currentRowData.map((cellData, currentCol) => (
        <Cell
          key={`${currentRow}-${currentCol}`}
          status={cellData.status}
          onClick={() => onCellFire([currentRow, currentCol])}
        />
      )),
    ],
    [] as ReactNode[],
  )
}

function GameBoard(props: GameBoardProps) {
  return (
    <div
      className={styles.gameBoard}
      style={{
        gridTemplateColumns: `repeat(${props.cols}, 64px)`,
      }}
    >
      {generateCells(props.boardData, props.onCellFire)}
    </div>
  )
}

export default GameBoard

export type BoardData = CellData[][]

export type GameBoardProps = {
  rows: number
  cols: number
  boardData: BoardData
  onCellFire: (position: CellPosition) => void
}
