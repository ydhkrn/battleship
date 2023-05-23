import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { CellPosition } from "../gameBoard/cell/Cell"
import { BoardData } from "../gameBoard/GameBoard"
import {
  PlayerShipsStatus,
  getAttackResult,
  getAttackedPlayerId,
  getPlayerGameData,
  isOnceAttacked,
  isHit,
} from "./utils"
import { playerData } from "../../app/mock"
import appConfig from "../../app/config"
import { PlayerId } from "../../app/types"

export type PlayerState = {
  boardData: BoardData
  shipsStatus: PlayerShipsStatus
}

export type GameState = {
  attackingPlayer: PlayerId
} & {
  [x in PlayerId]: PlayerState
}

const initialState: GameState = {
  attackingPlayer: appConfig.playerId.player1,
  player1: getPlayerGameData(playerData, appConfig.rows, appConfig.columns),
  player2: getPlayerGameData(playerData, appConfig.rows, appConfig.columns),
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    attack: (
      state,
      action: PayloadAction<{
        attackedPosition: CellPosition
      }>,
    ) => {
      const { attackedPosition } = action.payload
      const attackingPlayer = state.attackingPlayer
      const attackedPlayer = getAttackedPlayerId(attackingPlayer)
      const [firedRow, firedCol] = attackedPosition
      let attackedPlayerState = state[attackedPlayer]
      let attackedPlayerCellState =
        attackedPlayerState.boardData[firedRow][firedCol]
      const shipType = attackedPlayerCellState.ship
      const isAlreadyAttacked = isOnceAttacked(attackedPlayerCellState.status)
      // If player clicked an already attacked position, keep the player turn
      // and all other states intact until player clicks a new position
      if (!isAlreadyAttacked) {
        // Update fire status of the cell fired at
        const attackResult = getAttackResult(attackedPlayerCellState)
        attackedPlayerCellState.status = attackResult
        // If a ship was hit, reduce that ship's life
        if (shipType && isHit(attackResult)) {
          const shipBeingAttacked = attackedPlayerState.shipsStatus.find(
            (shipStatus) => shipStatus.shipType === shipType,
          )
          if (shipBeingAttacked && shipBeingAttacked.lives > 0) {
            shipBeingAttacked.lives -= 1
          }
        }
        // Change player turn
        // Hard-coded player1 to be always the attacking player
        state.attackingPlayer = appConfig.playerId.player1
      }
    },
    resetGame: () => {
      return initialState
    },
  },
})

export const { attack, resetGame } = gameSlice.actions

export default gameSlice.reducer
