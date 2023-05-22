import { FunctionComponent } from "react"
import { AttackResult } from "../../../app/types"
import missImg from "./images/miss.png"
import hitImg from "./images/hit.png"
import { isHit } from "../../game/utils"

const ShipLife: FunctionComponent<{
  status: AttackResult
}> = ({ status }) => {
  const isAttackResultHit = isHit(status)
  const imgProps = {
    src: isAttackResultHit ? hitImg : missImg,
    alt: isAttackResultHit ? "hit" : "miss",
  }
  // Image `alt` props is included in `imgProps`
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...imgProps} />
}

export default ShipLife
