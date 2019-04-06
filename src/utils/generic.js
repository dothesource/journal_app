export function last(array) {
  if (array && array.length > 0) {
    return array.slice(-1).pop()
  }
  return
}

export function matchingLists(listA = [], listB = []) {
  const required = new Set(listA)
  for (var elem of listB) {
    required.delete(elem)
  }
  return required.size === 0
}
