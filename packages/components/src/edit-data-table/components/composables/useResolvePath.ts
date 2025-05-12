import { isNil } from 'lodash-es'
import { provideFieldIndex } from 'pro-composables'
import { computed } from 'vue'
import { PARENT } from '../const'

interface UseProvidePathOptions {
  rowIndex: number
  childrenKey: string
  parentRowIndex: number
  row: Record<string, any>
  columnKey?: string | number
}
export function useResolvePath(options: UseProvidePathOptions) {
  const path = computed(() => {
    const {
      row,
      rowIndex,
      columnKey,
      childrenKey,
    } = options

    if (isNil(columnKey)) {
      return undefined
    }
    if (row[PARENT]) {
      // 树形表格
      return `${childrenKey}[${rowIndex}].${columnKey}`
    }
    return `${columnKey}`
  })

  const currentIndex = computed(() => {
    return options.parentRowIndex
  })

  provideFieldIndex(currentIndex)

  return {
    path,
  }
}
