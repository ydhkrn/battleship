import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { CellPosition } from "../gameBoard/cell/Cell"
import { BoardData } from "../gameBoard/GameBoard"
import {
  PlayerShipsStatus,
  getFireStatus,
  getOtherPlayerId,
  getPlayerInitialBoardData,
} from "./utils"
import { playerData } from "../../app/constants"
import appConfig from "../../app/config"
import { RootState } from "../../app/store"
import { FireStatus, PlayerId } from "../../app/types"

export type GameState = {
  currentPlayerId: PlayerId
} & {
  [x in PlayerId]: {
    boardData: BoardData
    shipsStatus: PlayerShipsStatus
  }
}

const initialState: GameState = {
  currentPlayerId: appConfig.playerId.player1,
  player1: getPlayerInitialBoardData(
    playerData,
    appConfig.rows,
    appConfig.columns,
  ),
  player2: getPlayerInitialBoardData(
    playerData,
    appConfig.rows,
    appConfig.columns,
  ),
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    fire: (
      state,
      action: PayloadAction<{
        firedPosition: CellPosition
      }>,
    ) => {
      // prettier-ignore
      // eslint-disable-next-line no-console
      console.log("\n==>⏩src/components/game/gameSlice.ts:48⏩cell fired⏩", action.payload, "\n");
      const { firedPosition } = action.payload
      const firedBy = state.currentPlayerId
      const firedAt = getOtherPlayerId(firedBy)
      const [firedRow, firedCol] = firedPosition
      let firedAtPlayerState = state[firedAt]
      let firedAtPlayerCellState =
        firedAtPlayerState.boardData[firedRow][firedCol]
      const ship = firedAtPlayerCellState.ship
      // Update fire status of the cell fired at
      const fireStatus = getFireStatus(firedAtPlayerCellState)
      // prettier-ignore
      // eslint-disable-next-line no-console
      console.log("\n==>⏩src/components/game/gameSlice.ts:61⏩fireStatus⏩", firedAtPlayerCellState.status, fireStatus, "\n");
      firedAtPlayerCellState.status = fireStatus
      // If a ship was hit, reduce that ship's life
      if (ship && fireStatus === FireStatus.hit) {
        firedAtPlayerState.shipsStatus[ship].lives -= 1
      }
      // Change player turn
      state.currentPlayerId = firedAt
    },
  },
})

export const selectPlayer1 = (state: RootState) => state.game.player1

export const selectPlayer2 = (state: RootState) => state.game.player2

export const selectPlayerBoard = (state: RootState) => {
  // prettier-ignore
  // eslint-disable-next-line no-console
  console.log("\n==>⏩src/components/game/gameSlice.ts:83⏩selectPlayerBoard⏩", state, "\n");
  const { currentPlayerId } = state.game
  const otherPlayerId = getOtherPlayerId(currentPlayerId)
  return state.game[otherPlayerId]
}

export const { fire } = gameSlice.actions

export default gameSlice.reducer
