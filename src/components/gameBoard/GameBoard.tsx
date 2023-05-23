import { ReactNode } from "react"

import styles from "./styles.module.less"
import Cell, { CellData, CellPosition } from "./cell/Cell"
import classNames from "classnames"
import { useAppSelector } from "../../app/hooks"
import { selectAttackingPlayerId } from "../game/gameSelectors"
import translations from "../../app/translations"
import appConfig from "../../app/config"

function generateCells(
  boardData: BoardData,
  onCellAttack: GameBoardProps["onCellAttack"],
) {
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
    <div
      className={classNames(
        props.className,
        styles.gameBoard,
        styles[attackingPlayerId],
      )}
      style={{
        gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
        gridTemplateRows: `repeat(${props.rows}, 1fr)`,
      }}
      role={appConfig.ariaRoles.grid}
      aria-label={translations.textLabelGameBoard}
    >
      {generateCells(props.boardData, props.onCellAttack)}
    </div>
  )
}

export default GameBoard

export type BoardData = CellData[][]

export type GameBoardProps = {
  rows: number
  cols: number
  boardData: BoardData
  className?: string
  onCellAttack: (position: CellPosition) => void
}
