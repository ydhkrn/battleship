import gameReducer, { GameState, attack, resetGame } from "../gameSlice"
import appConfig from "../../../app/config"
import { initialStateMock } from "./mock"
import { CellPosition } from "../../gameBoard/cell/Cell"
import { AttackResult } from "../../../app/types"

describe("game reducer", () => {
  const playerBeingAttacked = appConfig.playerId.player2
  test("should handle initial state", async () => {
    expect(gameReducer(undefined, { type: "unknown" })).toEqual(
      initialStateMock,
    )
  })
  describe("attack hit", () => {
    let gameStateAfterHit: GameState
    const hitPosition: CellPosition = [0, 0]
    beforeAll(() => {
      gameStateAfterHit = gameReducer(
        initialStateMock,
        attack({ attackedPosition: hitPosition }),
      )
    })
    test("should change board cell status after hit", () => {
      const [row, col] = hitPosition
      expect(
        gameStateAfterHit[playerBeingAttacked].boardData[row][col].status,
      ).toEqual(AttackResult.hit)
    })
    test("should reduce ship lives after hit", () => {
      const [row, col] = hitPosition
      const shipType =
        gameStateAfterHit[playerBeingAttacked].boardData[row][col].ship
      const shipStatusBeforeAttack = initialStateMock[
        playerBeingAttacked
      ].shipsStatus.find((shipStatus) => shipStatus.shipType === shipType)
      const shipStatusAfterAttack = gameStateAfterHit[
        playerBeingAttacked
      ].shipsStatus.find((shipStatus) => shipStatus.shipType === shipType)
      // Since this is a mock data setup, it is safe to use
      // non-null assertion here.
      expect(shipStatusAfterAttack!.lives).toEqual(
        shipStatusBeforeAttack!.lives - 1,
      )
    })
  })
  describe("attack miss", () => {
    let gameStateAfterMiss: GameState
    const missPosition: CellPosition = [1, 1]
    beforeAll(() => {
      gameStateAfterMiss = gameReducer(
        initialStateMock,
        attack({ attackedPosition: missPosition }),
      )
    })
    test("should change board cell status after miss", () => {
      let gameStateAfterMiss: GameState
      const missPosition: CellPosition = [1, 1]
      gameStateAfterMiss = gameReducer(
        initialStateMock,
        attack({ attackedPosition: missPosition }),
      )
      const [row, col] = missPosition
      expect(
        gameStateAfterMiss[playerBeingAttacked].boardData[row][col].status,
      ).toEqual(AttackResult.miss)
    })
  })
  test("reset game", () => {
    const hitPosition: CellPosition = [0, 0]
    const gameStateAfterHit = gameReducer(
      initialStateMock,
      attack({ attackedPosition: hitPosition }),
    )
    expect(gameStateAfterHit).not.toEqual(initialStateMock)
    const gameStateAfterReset = gameReducer(initialStateMock, resetGame())
    expect(gameStateAfterReset).toEqual(initialStateMock)
  })
})
