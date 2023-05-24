import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"
import { getAppRenderer } from "../../../app/testUtils"
import { playerInitialStateMock } from "../../game/tests/mock"
import GameBoard from "../GameBoard"
import translations from "../../../app/translations"
import appConfig from "../../../app/config"

const onCellAttackMock = vi.fn()
const basePropsMock = {
  rows: 10,
  cols: 10,
  boardData: playerInitialStateMock.boardData,
  onCellAttack: onCellAttackMock,
}

const render = getAppRenderer(GameBoard, { props: basePropsMock })

describe("GameBoard", () => {
  test("should render GameBoard component", () => {
    render()
    expect(
      screen.getByRole(appConfig.ariaRoles.section, {
        name: translations.textLabelGameBoard,
      }),
    ).toBeInTheDocument()
  })
  test("should render GameBoard cells according to give 'rows' and cols'", () => {
    render()
    expect(
      screen.getAllByRole(appConfig.ariaRoles.button, {
        name: translations.textLabelGameBoardCell,
      }).length,
    ).toEqual(100)
  })
  test("should invoke cell onClick callback function with cell position", async () => {
    const user = userEvent.setup()
    render()
    const cells = screen.getAllByRole(appConfig.ariaRoles.button, {
      name: translations.textLabelGameBoardCell,
    })
    const cellRow0Col0 = cells[0]
    const cellRow1Col0 = cells[10]
    const cellRow1Col1 = cells[11]
    await user.click(cellRow0Col0)
    expect(onCellAttackMock).toHaveBeenNthCalledWith(1, [0, 0])
    await user.click(cellRow1Col0)
    expect(onCellAttackMock).toHaveBeenNthCalledWith(2, [1, 0])
    await user.click(cellRow1Col1)
    expect(onCellAttackMock).toHaveBeenNthCalledWith(3, [1, 1])
  })
})
