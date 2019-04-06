export function last(array) {
  if (array === undefined) return undefined
  return array.slice(-1).pop()
}
