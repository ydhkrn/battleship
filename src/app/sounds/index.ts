import hit from "./hit.mp3"
import miss from "./miss.mp3"
import gameOver from "./game-over.mp3"
import { ValueOf } from "../types"
import appConfig from "../config"

const sounds = {
  hit,
  miss,
  gameOver,
}

export default function playAudio(
  audioName: ValueOf<typeof appConfig.audioName>,
) {
  new Audio(sounds[audioName]).play()
}

export type PlayAudioFn = typeof playAudio
