import classNames from "classnames"
import { AttackResult, Nullable, ShipType } from "../../../app/types"
import styles from "./Cell.module.css"

function Cell(props: CellProps) {
  return (
    <div
      className={classNames(styles.cell, {
        [styles.hit]: props.status === AttackResult.hit,
        [styles.miss]: props.status === AttackResult.miss,
        [styles.notFired]: props.status === AttackResult.notFired,
      })}
      onClick={props.onClick}
    />
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