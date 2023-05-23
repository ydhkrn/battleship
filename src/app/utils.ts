/**
 * Array difference
 * @param arrA
 * @param arrB
 * @returns A - B
 */
export function arrayDiff<T>(arrA: T[], arrB: T[]): (T | void)[] {
  return arrA.filter((elem) => !arrB.includes(elem))
}

export function getURLQueryParams() {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return urlParams
}

export function isAudioEnabled() {
  const audioQueryString = getURLQueryParams().get("audio")
  if (audioQueryString) {
    return /yes/.test(audioQueryString)
  }
  return false
}

export function replace(
  str: string,
  mapObj: Record<string, any>,
  delimiterRegex: `${string}*${string}` = "{*}",
) {
  let value = str
  Object.entries(mapObj).forEach(([placeholderKey, placeholderValue]) => {
    const placeholderRegex = delimiterRegex.replace("*", placeholderKey)
    value = value.replace(placeholderRegex, String(placeholderValue))
  })
  return value
}
