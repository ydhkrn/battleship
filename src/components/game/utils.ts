import appConfig from "../../app/config"
import { PlayerId, PlayerShipTypesData, ShipData } from "../../app/types"
import { ShipType } from "../../app/types"
import {
  AttackResult,
  PlayerData,
  PlayerShipsLayoutData,
} from "../../app/types"
import { BoardData } from "../gameBoard/GameBoard"
import { CellData } from "../gameBoard/cell/Cell"

function deployPlayerShips(
  boardData: BoardData,
  playerShipsLayout: PlayerShipsLayoutData,
) {
  playerShipsLayout.forEach((shipLayout) => {
    shipLayout.positions.forEach(([row, col]) => {
      boardData[row][col].ship = shipLayout.ship
    })
  })
}

export type PlayerShipsStatus = (ShipData & {
  shipType: ShipType
  lives: number
})[]

function getPlayerShipsStatus(shipTypesData: PlayerShipTypesData) {
  return Object.entries(shipTypesData).reduce(
    (shipsStatus, [shipType, shipData]) => {
      return [...shipsStatus, { shipType, ...shipData, lives: shipData.size }]
    },
    [] as PlayerShipsStatus,
  )
}

export function getPlayerInitialBoardData(
  playerData: PlayerData,
  rows: number,
  cols: number,
) {
  const boardData = [] as BoardData
  for (let row = 0; row < rows; row = row + 1) {
    if (!boardData[row]) {
      boardData[row] = []
    }
    for (let col = 0; col < cols; col = col + 1) {
      boardData[row][col] = { status: AttackResult.notFired, ship: null }
    }
  }
  // Mutating function that modifies `boardData`
  deployPlayerShips(boardData, playerData.layout)
  return {
    boardData,
    shipsStatus: getPlayerShipsStatus(playerData.shipTypes),
  }
}

export function getAttackResult(cell: CellData) {
  return cell.ship ? AttackResult.hit : AttackResult.miss
}

export function getAttackedPlayerId(attackingPlayerId: PlayerId) {
  const { player1, player2 } = appConfig.playerId
  return player1
  // return attackingPlayerId === player1 ? player2 : player1;
}
