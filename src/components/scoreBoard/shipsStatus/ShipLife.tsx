import { FunctionComponent } from "react"
import { AttackResult } from "../../../app/types"
import missImg from "./images/miss.png"
import hitImg from "./images/hit.png"
import { isHit } from "../../game/utils"
import translations from "../../../app/translations"

const ShipLife: FunctionComponent<{
  status: AttackResult
}> = ({ status }) => {
  const isAttackResultHit = isHit(status)
  const ariaLabel = isAttackResultHit
    ? translations.textImageHit
    : translations.textImageMiss
  const imgProps = {
    src: isAttackResultHit ? hitImg : missImg,
    alt: ariaLabel,
    "aria-label": ariaLabel,
  }
  return <img {...imgProps} />
}

export default ShipLife
