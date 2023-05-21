import appConfig from "../../app/config"
import {
  PlayerId,
  PlayerShipTypesData,
  PlayerShipsLayoutData,
  ShipData,
} from "../../app/types"
import { ShipType } from "../../app/types"
import { AttackResult, PlayerData } from "../../app/types"
import { BoardData } from "../gameBoard/GameBoard"
import { CellData } from "../gameBoard/cell/Cell"

export type PlayerShipsStatus = (ShipData & {
  shipType: ShipType
  lives: number
})[]

export function getPlayerShipsStatus(shipTypesData: PlayerShipTypesData) {
  return Object.entries(shipTypesData).reduce(
    (shipsStatus, [shipType, shipData]) => {
      return [...shipsStatus, { shipType, ...shipData, lives: shipData.size }]
    },
    [] as PlayerShipsStatus,
  )
}

export function getPlayerBoardData(
  shipsLayoutData: PlayerShipsLayoutData,
  rows: number,
  cols: number,
) {
  const boardData = [] as BoardData
  // Create empty rows * cols board with `notFired` cells
  for (let row = 0; row < rows; row = row + 1) {
    if (!boardData[row]) {
      boardData[row] = []
    }
    for (let col = 0; col < cols; col = col + 1) {
      boardData[row][col] = { status: AttackResult.notFired, ship: null }
    }
  }
  // Deploy player ships onto board
  shipsLayoutData.forEach((shipLayout) => {
    shipLayout.positions.forEach(([row, col]) => {
      // Mutates boardData
      boardData[row][col].ship = shipLayout.ship
    })
  })
  return boardData
}

export function getPlayerGameData(
  playerData: PlayerData,
  rows: number,
  cols: number,
) {
  return {
    boardData: getPlayerBoardData(playerData.layout, rows, cols),
    shipsStatus: getPlayerShipsStatus(playerData.shipTypes),
  }
}

export function getAttackResult(cell: CellData) {
  return cell.ship ? AttackResult.hit : AttackResult.miss
}

export function getAttackedPlayerId(attackingPlayerId: PlayerId) {
  const { player1, player2 } = appConfig.playerId
  // return player2
  return attackingPlayerId === player1 ? player2 : player1
}

export function isHit(status: AttackResult): status is AttackResult.hit {
  return status === AttackResult.hit
}

export function isMiss(status: AttackResult): status is AttackResult.hit {
  return status === AttackResult.miss
}

export function isOnceAttacked(
  status: AttackResult,
): status is AttackResult.hit | AttackResult.miss {
  return isHit(status) || isMiss(status)
}

export function getPlayerScore(otherPlayerShipsStatus: PlayerShipsStatus) {
  return otherPlayerShipsStatus.reduce(
    (scoreSum, shipStatus) => scoreSum + (shipStatus.size - shipStatus.lives),
    0,
  )
}
