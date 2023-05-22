import { useEffect, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import { selectPlayerUnsunkShips } from "../game/gameSelectors"
import { ShipType } from "../../app/types"
import { Nullable } from "vitest"
import appConfig from "../../app/config"

/**
 * Array difference
 * @param arrA
 * @param arrB
 * @returns A - B
 */
function arrayDiff<T>(arrA: T[], arrB: T[]): (T | void)[] {
  return arrA.filter((elem) => !arrB.includes(elem))
}

function useShipSunk() {
  const unsunkShips = useAppSelector(selectPlayerUnsunkShips)
  const [prevUnsunkShips, setPrevUnsunkShips] = useState(unsunkShips)
  const [sunkShip, setSunkShip] = useState<Nullable<ShipType>>(null)

  if (prevUnsunkShips !== unsunkShips) {
    const [newlySunkShip] = arrayDiff(prevUnsunkShips, unsunkShips)
    setPrevUnsunkShips(unsunkShips)
    if (newlySunkShip) {
      setSunkShip(newlySunkShip)
    }
  }

  useEffect(() => {
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
