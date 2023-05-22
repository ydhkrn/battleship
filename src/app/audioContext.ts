import { createContext } from "react"
import { Nullable } from "vitest"
import type { PlayAudioFn } from "./sounds"

const AudioContext = createContext<{
  playAudio: Nullable<PlayAudioFn>
}>({ playAudio: null })

export default AudioContext
