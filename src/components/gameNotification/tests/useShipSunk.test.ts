import React from "react"
import { renderHook } from "@testing-library/react"
import * as appHooks from "../../../app/hooks"
import useShipSunk from "../useShipSunk"

const shipTypesMock = { cruiser: "cruiser", destroyer: "destroyer " }
const unsunkShipsInitialMock = [shipTypesMock.cruiser, shipTypesMock.destroyer]
const sunkShipInitialMock = null
const useAppSelectorSpy = vi.spyOn(appHooks, "useAppSelector")
const setPrevUnsunkShipsMock = vi.fn()
const setSunkShipMock = vi.fn()
const useStateSpy = vi.spyOn(React, "useState")

describe("useShipSunk hook", () => {
  let renderResult: ReturnType<typeof renderHook>

  beforeEach(() => {
    useAppSelectorSpy.mockReturnValue(unsunkShipsInitialMock)
    useStateSpy
      .mockReturnValueOnce([unsunkShipsInitialMock, setPrevUnsunkShipsMock])
      .mockReturnValueOnce([sunkShipInitialMock, setSunkShipMock])
    renderResult = renderHook(() => useShipSunk())
  })

  test("should return `sunkShip` as `null` initially", () => {
    expect(renderResult.result.current).toEqual(null)
  })

  test("should update internal `prevUnsunkShips` and `sunkShip` state when a new ship is sunk", () => {
    const newUnsunkShips = [shipTypesMock.cruiser]
    // Mock `unsunkShips`
    useAppSelectorSpy.mockReturnValue(newUnsunkShips)
    // Mock `prevUnsunkShips` and `sunkShip`
    useStateSpy
      .mockReturnValueOnce([unsunkShipsInitialMock, setPrevUnsunkShipsMock])
      .mockReturnValueOnce([sunkShipInitialMock, setSunkShipMock])
    renderResult.rerender()
    expect(setPrevUnsunkShipsMock).toBeCalledWith(newUnsunkShips)
    expect(setSunkShipMock).toBeCalledWith(shipTypesMock.destroyer)
  })
})
