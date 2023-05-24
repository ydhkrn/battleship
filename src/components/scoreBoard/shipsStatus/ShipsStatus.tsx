import { useAppSelector } from "../../../app/hooks"
import { selectAttackedPlayerShipsStatus } from "../../game/gameSelectors"

import styles from "./styles.module.less"
import { shipTypesImgSrcMap } from "./constants"
import ShipLife from "./ShipLife"
import { AttackResult } from "../../../app/types"
import { getNElements } from "./utils"
import classNames from "classnames"
import translations from "../../../app/translations"

function ShipsStatus(props: ShipsStatusProps) {
  const shipsStatus = useAppSelector(selectAttackedPlayerShipsStatus)

  return (
    <section
      aria-label={translations.textShipsStatusSection}
      className={classNames(props.className, styles.shipsStatus)}
    >
      {shipsStatus.map(({ shipType, lives, size }) => {
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
    </section>
  )
}

export type ShipsStatusProps = {
  className?: string
}

export default ShipsStatus
