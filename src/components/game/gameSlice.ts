import { PayloadAction, createSlice, createSelector } from "@reduxjs/toolkit"
import { CellPosition } from "../gameBoard/cell/Cell"
import { BoardData } from "../gameBoard/GameBoard"
import {
  PlayerShipsStatus,
  getAttackResult,
  getAttackedPlayerId,
  getPlayerGameData,
  isOnceAttacked,
  isHit,
  getPlayerScore,
} from "./utils"
import { playerData } from "../../app/constants"
import appConfig from "../../app/config"
import { RootState } from "../../app/store"
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

export const selectPlayersScore = createSelector(selectGame, (game) => {
  const { player1, player2 } = appConfig.playerId

  return {
    [player1]: getPlayerScore(game[player2].shipsStatus),
    [player2]: getPlayerScore(game[player1].shipsStatus),
  }
})

export const selectIsGameOver = createSelector(
  selectAttackedPlayerShipsStatus,
  (shipsStatus) => shipsStatus.every((shipStatus) => shipStatus.lives === 0),
)

export const { attack, resetGame } = gameSlice.actions

export default gameSlice.reducer
