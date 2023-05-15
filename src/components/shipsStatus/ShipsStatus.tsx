import { useAppSelector } from "../../app/hooks"
import { selectAttackedPlayerShipsStatus } from "../game/gameSlice"

import styles from "./ShipsStatus.module.less"
import { shipTypesImgSrcMap } from "./constants"

function ShipsStatus() {
  const shipsStatus = useAppSelector(selectAttackedPlayerShipsStatus)

  return (
    <div className={styles.shipsStatus}>
      {shipsStatus.map(({ shipType, lives, size }, index) => {
        const shipImgSrc =
          shipTypesImgSrcMap[shipType as keyof typeof shipTypesImgSrcMap]
        return (
          <div key={shipType}>
            <img src={shipImgSrc} alt={shipType} />
            <div>
              {lives}/{size}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ShipsStatus
