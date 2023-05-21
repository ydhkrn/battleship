import { playerData } from "../../../app/constants"
import { AttackResult } from "../../../app/types"
import {
  getAttackResult,
  getPlayerBoardData,
  getPlayerGameData,
  getPlayerShipsStatus,
} from "../utils"
import {
  cellDataWithShipMock,
  cellDataWithoutShipMock,
  initialStateMock,
} from "./mock"

const playerBoardDataMock = initialStateMock.player1

describe("game utils", () => {
  test("getPlayerShipsStatus", () => {
    expect(getPlayerShipsStatus(playerData.shipTypes)).toEqual(
      playerBoardDataMock.shipsStatus,
    )
  })

  test("getPlayerBoardData", () => {
    expect(getPlayerBoardData(playerData.layout, 10, 10)).toEqual(
      playerBoardDataMock.boardData,
    )
  })

  test("getPlayerGameData", () => {
    const playerBoardData = initialStateMock.player1
    expect(getPlayerGameData(playerData, 10, 10)).toEqual(playerBoardData)
  })

  describe("getAttackResult", () => {
    test("should return 'hit' if the attacked cell position has a ship", () => {
      expect(getAttackResult(cellDataWithShipMock)).toEqual(AttackResult.hit)
    })
    test("should return 'miss' if the attacked cell position doesn't have a ship", () => {
      expect(getAttackResult(cellDataWithoutShipMock)).toEqual(
        AttackResult.miss,
      )
    })
  })
})
