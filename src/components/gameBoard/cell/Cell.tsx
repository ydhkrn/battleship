import { AttackResult, Nullable, ShipType } from "../../../app/types"
import { isHit, isMiss } from "../../game/utils"
import hitImg from "./images/hit.png"
import missImg from "./images/miss.png"
import styles from "./styles.module.less"

function Cell(props: CellProps) {
  return (
    <div className={styles.cell} onClick={props.onClick}>
      {isHit(props.status) && <img src={hitImg} alt="hit" />}
      {isMiss(props.status) && <img src={missImg} alt="hit" />}
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
