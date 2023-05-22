export function playAudio(audioSrc: string) {
  new Audio(audioSrc).play()
}

/**
 * Array difference
 * @param arrA
 * @param arrB
 * @returns A - B
 */
export function arrayDiff<T>(arrA: T[], arrB: T[]): (T | void)[] {
  return arrA.filter((elem) => !arrB.includes(elem))
}
