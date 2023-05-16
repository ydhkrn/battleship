import { AttackResult, Nullable, ShipType } from "../../../app/types"
import hitImg from "./images/hit.png"
import missImg from "./images/miss.png"
import styles from "./Cell.module.less"

function Cell(props: CellProps) {
  const isHit = props.status === AttackResult.hit
  const isMiss = props.status === AttackResult.miss
  return (
    <div className={styles.cell} onClick={props.onClick}>
      {isHit && <img src={hitImg} alt="hit" />}
      {isMiss && <img src={missImg} alt="hit" />}
    </div>
  )
}

export default Cell

export type CellProps = {
  status: AttackResult
  onClick: () => void
}

export type CellPosition = [row: number, col: number]

export type CellData = {
  // position: CellPosition;
  status: AttackResult
  ship: Nullable<ShipType>
}
