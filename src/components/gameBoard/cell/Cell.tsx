import { useContext } from "react"
import { AttackResult, Nullable, ShipType } from "../../../app/types"
import { isHit, isMiss, isNotFired } from "../../game/utils"
import { images } from "./constants"
import styles from "./styles.module.less"
import appConfig from "../../../app/config"
import AudioContext from "../../../app/audioContext"
import translations from "../../../app/translations"

function Cell(props: CellProps) {
  const audioContext = useContext(AudioContext)
  const isNeverFired = isNotFired(props.status)
  const isAHit = isHit(props.status)
  const isAMiss = isMiss(props.status)

  return (
    <div
      role={appConfig.ariaRoles.gridCell}
      aria-label={translations.labelGameBoardCell}
      className={styles.cell}
      onClick={() => {
        if (isNeverFired) {
          props.onClick()
          audioContext.playAudio?.(
            props.ship ? appConfig.audioName.hit : appConfig.audioName.miss,
          )
        }
      }}
    >
      {isAHit && (
        <img
          src={images.hit}
          alt={translations.imageHit}
          aria-label={translations.imageHit}
        />
      )}
      {isAMiss && (
        <img
          src={images.miss}
          alt={translations.imageMiss}
          aria-label={translations.imageMiss}
        />
      )}
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
