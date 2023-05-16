import { FunctionComponent } from "react"

export function getNElements<P>(
  n: number,
  Comp: FunctionComponent<P>,
  props: P,
) {
  return Array.from({ length: n }, (_, index) => {
    return <Comp {...props} key={index} />
  })
}
