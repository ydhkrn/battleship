import { render } from "@testing-library/react"
import AudioContext from "./audioContext"
import { AnyFunction, Nullable } from "./types"
import { store } from "./store"
import { Provider } from "react-redux"

export function getRenderer<P extends object>(
  Comp: React.ComponentType<P>,
  baseOptions?: Partial<{ props: P }>,
) {
  return function renderer(overrideOptions?: Partial<{ props: Partial<P> }>) {
    const props = {
      ...baseOptions?.props,
      ...overrideOptions?.props,
    } as P
    return render(<Comp {...props} />)
  }
}

export function getAppRenderer<
  P extends object,
  C extends { playAudio: Nullable<AnyFunction> },
>(
  Comp: React.ComponentType<P>,
  baseOptions?: Partial<{ props: P; context: C }>,
) {
  return function renderer(
    overrideOptions?: Partial<{ props: Partial<P>; context: C }>,
  ) {
    const props = {
      ...baseOptions?.props,
      ...overrideOptions?.props,
    } as P
    const context = {
      ...baseOptions?.context,
      ...overrideOptions?.context,
    } as C
    return render(
      <Provider store={store}>
        <AudioContext.Provider value={context}>
          <Comp {...props} />
        </AudioContext.Provider>
      </Provider>,
    )
  }
}
