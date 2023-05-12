import { ReactNode, useState } from "react"

import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectPlayerBoard, fire } from "./gameSlice"
import styles from "./GameBoard.module.css"
import GameBoard, { BoardData } from "../gameBoard/GameBoard"
import { FireStatus } from "../../app/types"
import { CellData, CellPosition } from "../gameBoard/cell/Cell"

function Game(props: GameProps) {
  const playerBoard = useAppSelector(selectPlayerBoard)
  const dispatch = useAppDispatch();
  // prettier-ignore
  // eslint-disable-next-line no-console
  console.log("\n==>⏩src/components/game/Game.tsx:13⏩playerBoard⏩", playerBoard, "\n");


  return (
    <div>
      <GameBoard
        rows={10}
        cols={10}
        boardData={playerBoard.boardData}
        onCellFire={(position: CellPosition) =>
          dispatch(fire({ firedPosition: position }))
        }
      />
    </div>
  )
}

export default Game

export type GameProps = {}
