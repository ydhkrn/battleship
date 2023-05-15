import { PayloadAction, createSlice, createSelector } from "@reduxjs/toolkit"
import { CellPosition } from "../gameBoard/cell/Cell"
import { BoardData } from "../gameBoard/GameBoard"
import {
  PlayerShipsStatus,
  getAttackResult,
  getAttackedPlayerId,
  getPlayerInitialBoardData,
} from "./utils"
import { playerData } from "../../app/constants"
import appConfig from "../../app/config"
import { RootState } from "../../app/store"
import { AttackResult, PlayerId } from "../../app/types"

export type GameState = {
  attackingPlayer: PlayerId
} & {
  [x in PlayerId]: {
    boardData: BoardData
    shipsStatus: PlayerShipsStatus
  }
}

const initialState: GameState = {
  attackingPlayer: appConfig.playerId.player1,
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
      const { firedPosition } = action.payload
      const attackingPlayer = state.attackingPlayer
      const attackedPlayer = getAttackedPlayerId(attackingPlayer)
      const [firedRow, firedCol] = firedPosition
      let attackedPlayerState = state[attackedPlayer]
      let attackedPlayerCellState =
        attackedPlayerState.boardData[firedRow][firedCol]
      const shipType = attackedPlayerCellState.ship
      const isAlreadyHit = attackedPlayerCellState.status === AttackResult.hit
      // If player clicked an already attacked position, keep the player turn
      // and all other states intact until player clicks a new position
      if (!isAlreadyHit) {
        // Update fire status of the cell fired at
        const attackResult = getAttackResult(attackedPlayerCellState)
        attackedPlayerCellState.status = attackResult
        // If a ship was hit, reduce that ship's life
        if (shipType && attackResult === AttackResult.hit) {
          const shipBeingAttacked = attackedPlayerState.shipsStatus.find(
            (shipStatus) => shipStatus.shipType === shipType,
          )
          if (shipBeingAttacked && shipBeingAttacked.lives > 0) {
            shipBeingAttacked.lives -= 1
          }
        }
        // Change player turn
        state.attackingPlayer = attackedPlayer
      }
    },
  },
})

export const selectGame = (state: RootState) => state.game

export const selectAttackingPlayerId = (state: RootState) =>
  state.game.attackingPlayer

export const selectAttackedPlayerId = createSelector(
  selectAttackingPlayerId,
  (playerId) => getAttackedPlayerId(playerId),
)

export const selectAttackingPlayerBoard = createSelector(
  selectAttackingPlayerId,
  selectGame,
  (playerId, game) => game[playerId],
)

export const selectAttackedPlayerBoard = createSelector(
  selectAttackedPlayerId,
  selectGame,
  (playerId, game) => game[playerId],
)

export const selectAttackedPlayerBoardData = createSelector(
  selectAttackedPlayerBoard,
  (playerBoard) => playerBoard.boardData,
)

export const selectAttackedPlayerShipsStatus = createSelector(
  selectAttackedPlayerBoard,
  (playerBoard) => playerBoard.shipsStatus,
)

export const { fire } = gameSlice.actions

export default gameSlice.reducer