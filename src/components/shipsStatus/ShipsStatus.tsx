import { useAppSelector } from "../../app/hooks"
import { selectAttackedPlayerShipsStatus } from "../game/gameSlice"

import styles from "./ShipsStatus.module.less"
import { shipTypesImgSrcMap } from "./constants"
import ShipLife from "./ShipLife"
import { AttackResult } from "../../app/types"
import { getNElements } from "./utils"

function ShipsStatus() {
  const shipsStatus = useAppSelector(selectAttackedPlayerShipsStatus)

  return (
    <div className={styles.shipsStatus}>
      {shipsStatus.map(({ shipType, lives, size }, index) => {
        const shipImgSrc =
          shipTypesImgSrcMap[shipType as keyof typeof shipTypesImgSrcMap]

        return (
          <div key={shipType} className={styles.shipStatus}>
            <img src={shipImgSrc} alt={shipType} className={styles.shipImg} />
            <span className={styles.shipLives}>
              {getNElements(size - lives, ShipLife, {
                status: AttackResult.hit,
              })}
              {getNElements(lives, ShipLife, {
                status: AttackResult.miss,
              })}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default ShipsStatus
