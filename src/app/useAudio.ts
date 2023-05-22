import { useCallback, useEffect, useState } from "react"
import { isAudioEnabled } from "./utils"
import type { PlayAudioFn } from "./sounds"
import { Nullable } from "vitest"

export const useAudio = () => {
  const [playAudio, setAudioPlayer] = useState<Nullable<PlayAudioFn>>(null)
  const enableAudio = isAudioEnabled()

  const loadAudio = useCallback(async () => {
    if (enableAudio) {
      const playAudioMod = await import(`./sounds`)
      if (playAudioMod) {
        setAudioPlayer(() => playAudioMod.default)
      }
    }
  }, [enableAudio])

  useEffect(() => {
    loadAudio()
  }, [loadAudio])

  return playAudio
}
