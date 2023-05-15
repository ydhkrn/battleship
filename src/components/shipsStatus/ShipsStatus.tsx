import { useAppSelector } from "../../app/hooks"
import { selectAttackedPlayerShipsStatus } from "../game/gameSlice"
import styles from "./ShipsStatus.module.less"

function ShipsStatus() {
  const shipsStatus = useAppSelector(selectAttackedPlayerShipsStatus)

  return (
    <div className={styles.shipsStatus}>
      {shipsStatus.map(({ shipType, lives, size }, index) => {
        return (
          <div key={shipType}>
            <div>
              {shipType} : {lives}/{size}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ShipsStatus
