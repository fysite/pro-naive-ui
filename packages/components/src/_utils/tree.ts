import { get, isArray } from 'lodash-es'

export function findTree<T, R, F extends keyof T>(
  data: T[],
  callback: (item: T, index: number, array: T[]) => R,
  childrenField: F,
): T | null {
  childrenField = childrenField ?? 'children'
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    const children = get(item, childrenField, [])
    if (callback(item, i, data)) {
      return item
    }
    if (isArray(children)) {
      const found = findTree(children, callback, childrenField)
      if (found) {
        return found
      }
    }
  }
  return null
}
