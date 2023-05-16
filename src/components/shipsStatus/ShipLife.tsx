import { FunctionComponent } from "react"
import { AttackResult } from "../../app/types"
import missImg from "./images/miss.png"
import hitImg from "./images/hit.png"

const ShipLife: FunctionComponent<{
  status: AttackResult
}> = ({ status }) => {
  const imgProps = {
    src: status === AttackResult.hit ? hitImg : missImg,
    alt: status === AttackResult.hit ? "hit" : "miss",
  }
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...imgProps} />
}

export default ShipLife
