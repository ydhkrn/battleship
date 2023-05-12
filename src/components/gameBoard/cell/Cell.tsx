import classNames from "classnames"
import { FireStatus, Nullable, ShipType } from "../../../app/types"
import styles from "./Cell.module.css"

function Cell(props: CellProps) {
  return (
    <div
      className={classNames(styles.cell, {
        [styles.hit]: props.status === FireStatus.hit,
        [styles.miss]: props.status === FireStatus.miss,
        [styles.notFired]: props.status === FireStatus.notFired,
      })}
      onClick={props.onClick}
    />
  )
}

export default Cell

export type CellProps = {
  status: FireStatus;
  onClick:  () => void;
}

export type CellPosition = [row: number, col: number]

export type CellData = {
  // position: CellPosition;
  status: FireStatus;
  ship: Nullable<ShipType>;
}