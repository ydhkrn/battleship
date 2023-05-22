import { playAudio } from "../../../app/utils"
import { AttackResult, Nullable, ShipType } from "../../../app/types"
import { isHit, isMiss, isNotFired } from "../../game/utils"
import { images, sounds } from "./constants"
import styles from "./styles.module.less"

function Cell(props: CellProps) {
  const isNeverFired = isNotFired(props.status)
  const isAHit = isHit(props.status)
  const isAMiss = isMiss(props.status)
  return (
    <div
      className={styles.cell}
      onClick={() => {
        if (isNeverFired) {
          playAudio(props.ship ? sounds.hit : sounds.miss)
          props.onClick()
        }
      }}
    >
      {isAHit && <img src={images.hit} alt="hit" />}
      {isAMiss && <img src={images.miss} alt="miss" />}
    </div>
  )
}

export default Cell

export type CellProps = CellData & {
  onClick: () => void
}

export type CellPosition = [row: number, col: number]

export type CellData = {
  // position: CellPosition;
  status: AttackResult
  ship: Nullable<ShipType>
}
