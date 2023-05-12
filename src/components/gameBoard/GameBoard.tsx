import { ReactNode } from "react"

import styles from "./GameBoard.module.css"
import Cell, { CellData, CellPosition } from "./cell/Cell"

function onCellFire(position: CellPosition) {
  // prettier-ignore
  // eslint-disable-next-line no-console
  console.log("\n==>⏩src/components/gameBoard/GameBoard.tsx:23⏩position⏩", position, "\n");
}

function generateCells(boardData: Array<CellData[]>) {
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
      {generateCells(props.boardData)}
    </div>
  )
}

export default GameBoard

export type BoardData = Array<CellData[]>

export type GameBoardProps = {
  rows: number
  cols: number
  boardData: BoardData
}
