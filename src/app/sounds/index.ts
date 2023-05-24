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

let audioInstance: HTMLAudioElement

/**
 * An audio play helper that ensures all invocations to this methods are played
 * consistently across different browsers.
 * 
 * For example, Safari doesn't allow loading audio files without user interaction.
 * There is also a few-seconds delay when initializing a new audio stream due to iOS
 * instantiating a new audio object.
 *
 * The solution uses a single audio stream. The audio object is created on very
 * first invocation caused by user interaction. The audio object is reused by
 * replacing `src` attribute with source of new sound to be played.
 * Furthermore, autoplay is set to `true` on the audio object from instantiation
 * time so that future invocations can still be played without user interaction.
 * @param audioName
 */
export default function playAudio(
  audioName: ValueOf<typeof appConfig.audioName>,
) {
  if (!audioInstance) {
    audioInstance = new Audio()
    audioInstance.autoplay = true
    // onClick of first interaction on page
    // This is a tiny MP3 file that is silent and extremely short.
    audioInstance.src =
      "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"
  }

  // Later on when you actually want to play a sound at any point without user interaction
  // For very frequent multiple invocation, sounds will be played in a pre-emptive fashion.
  audioInstance.src = sounds[audioName]
}

export type PlayAudioFn = typeof playAudio
