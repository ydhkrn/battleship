import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"
import Cell, { CellPosition } from "../Cell"
import { AttackResult } from "../../../../app/types"
import translations from "../../../../app/translations"
import { getRenderer, getAppRenderer } from "../../../../app/testUtils"
import appConfig from "../../../../app/config"

const playAudioMock = vi.fn()
const onClickMock = vi.fn()
const basePropsMock = {
  ship: "cruiser",
  status: AttackResult.notFired,
  onClick: onClickMock,
  position: [0, 0] as CellPosition,
}

const render = getRenderer(Cell, { props: basePropsMock })
const renderApp = getAppRenderer(Cell, {
  props: basePropsMock,
  context: { playAudio: playAudioMock },
})

describe("Cell", () => {
  test("should render Cell component", () => {
    render()
    expect(
      screen.getByRole(appConfig.ariaRoles.button, {
        name: translations.textLabelGameBoardCell,
      }),
    ).toBeInTheDocument()
  })

  test("should render a attack 'hit' cell", () => {
    render({ props: { status: AttackResult.hit } })
    expect(
      screen.getByRole(appConfig.ariaRoles.img, {
        name: translations.textImageHit,
      }),
    ).toBeInTheDocument()
  })

  test("should render a attack 'miss' cell", () => {
    render({ props: { status: AttackResult.miss } })
    expect(
      screen.getByRole(appConfig.ariaRoles.img, {
        name: translations.textImageMiss,
      }),
    ).toBeInTheDocument()
  })

  test("should invoke onClick callback on clicking a 'notFired' cell", async () => {
    const user = userEvent.setup()
    render()
    await user.click(
      screen.getByRole(appConfig.ariaRoles.button, {
        name: translations.textLabelGameBoardCell,
      }),
    )
    expect(onClickMock).toHaveBeenCalledOnce()
  })

  test("should not invoke onClick callback on clicking a 'hit' cell", async () => {
    const user = userEvent.setup()
    render({ props: { status: AttackResult.hit } })
    await user.click(
      screen.getByRole(appConfig.ariaRoles.button, {
        name: translations.textLabelGameBoardCell,
      }),
    )
    expect(onClickMock).toBeCalledTimes(0)
  })

  test("should not invoke onClick callback on clicking a 'miss' cell", async () => {
    const user = userEvent.setup()
    render({ props: { status: AttackResult.miss } })
    await user.click(
      screen.getByRole(appConfig.ariaRoles.button, {
        name: translations.textLabelGameBoardCell,
      }),
    )
    expect(onClickMock).toBeCalledTimes(0)
  })

  test("should play audio 'hit' sound if cell has a ship", async () => {
    const user = userEvent.setup()
    renderApp({ props: { ship: "some ship" } })
    await user.click(
      screen.getByRole(appConfig.ariaRoles.button, {
        name: translations.textLabelGameBoardCell,
      }),
    )
    expect(playAudioMock).toBeCalledWith(appConfig.audioName.hit)
  })

  test("should play audio 'miss' sound if cell does not have a ship", async () => {
    const user = userEvent.setup()
    renderApp({ props: { ship: null } })
    await user.click(
      screen.getByRole(appConfig.ariaRoles.button, {
        name: translations.textLabelGameBoardCell,
      }),
    )
    expect(playAudioMock).toBeCalledWith(appConfig.audioName.miss)
  })
})
