import { ReactNode, useState } from "react"

import { useAppSelector, useAppDispatch } from "../../app/hooks"
// import {
//   decrement,
//   increment,
//   incrementByAmount,
//   incrementAsync,
//   incrementIfOdd,
//   selectCount,
// } from "./gameSlice"
import styles from "./GameBoard.module.css"
import GameBoard, { BoardData } from "../gameBoard/GameBoard"
import { FireStatus } from "../../app/types"
import { CellData } from "../gameBoard/cell/Cell"

function getInitialBoardData(rows: number, cols: number) {
  const boardData = [] as BoardData;
  for (let row = 0; row < rows; row = row + 1)  {
    if (!boardData[row]) {
      boardData[row] = []
    }
    for (let col = 0; col < cols; col = col + 1)  {
      boardData[row][col] = { status: FireStatus.notFired };
    }
  }
  return boardData;
}

const initialBoardData = getInitialBoardData(10, 10)

function Game(props: GameProps) {
  // const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()

  return (
    <div>
      <GameBoard
        rows={10}
        cols={10}
        boardData={initialBoardData}
      />
    </div>
  )
}

export default Game

export type GameProps = {}
