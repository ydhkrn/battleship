import { createSelector } from "@reduxjs/toolkit"
import appConfig from "../../app/config"
import { RootState } from "../../app/store"
import { getAttackedPlayerId, getPlayerScore } from "./utils"
import { ShipType } from "../../app/types"

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

export const selectPlayerShips = createSelector(
  selectAttackedPlayerShipsStatus,
  (shipsStatus) => shipsStatus.map((shipStatus) => shipStatus.shipType),
)

export const selectPlayerUnsunkShips = createSelector(
  selectAttackedPlayerShipsStatus,
  (shipsStatus) =>
    shipsStatus.reduce(
      (unsunkShips, shipStatus) =>
        shipStatus.lives > 0
          ? [...unsunkShips, shipStatus.shipType]
          : unsunkShips,
      [] as ShipType[],
    ),
)

export const selectIsGameOver = createSelector(
  selectPlayerUnsunkShips,
  (unsunkShips) => unsunkShips.length === 0,
)
