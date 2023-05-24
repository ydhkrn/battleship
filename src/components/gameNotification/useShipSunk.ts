import React from "react"
import { useAppSelector } from "../../app/hooks"
import { selectPlayerUnsunkShips } from "../game/gameSelectors"
import { ShipType } from "../../app/types"
import { Nullable } from "vitest"
import appConfig from "../../app/config"
import { arrayDiff } from "../../app/utils"

function useShipSunk() {
  const unsunkShips = useAppSelector(selectPlayerUnsunkShips)
  const [prevUnsunkShips, setPrevUnsunkShips] = React.useState(unsunkShips)
  const [sunkShip, setSunkShip] = React.useState<Nullable<ShipType>>(null)

  /**
   * @see https://react.dev/reference/react/useState#storing-information-from-previous-renders
   */
  if (prevUnsunkShips !== unsunkShips) {
    const [newlySunkShip] = arrayDiff(prevUnsunkShips, unsunkShips)
    setPrevUnsunkShips(unsunkShips)
    if (newlySunkShip) {
      setSunkShip(newlySunkShip)
    }
  }

  React.useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    if (sunkShip) {
      timeoutId = setTimeout(() => {
        setSunkShip(null)
      }, appConfig.inGameNotificationTimeout)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [sunkShip])

  return sunkShip
}

export default useShipSunk
