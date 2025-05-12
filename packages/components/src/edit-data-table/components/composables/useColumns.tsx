import type { RowKey } from 'naive-ui/es/data-table/src/interface'
import type { ProDataTableColumn } from '../../../data-table'
import type { InternalEditDataTableProps } from '../../props'
import type { ProEditDataTableColumns } from '../../types'
import { eachTree, mapTree, useInjectField } from 'pro-composables'
import { computed } from 'vue'
import { resolveRowKey } from '../../../data-table/utils/resolveRowKey'
import { INDEX, PARENT } from '../const'
import EditDataTableCell from '../edit-data-table-cell'
import { isProEditDataTableBaseColumn } from '../utils/column'

export function useColumns(props: InternalEditDataTableProps) {
  const {
    value: list,
  } = useInjectField(true)!

  const childrenKey = computed(() => {
    return props.childrenKey ?? 'children'
  })

  const rowKeyToRowMap = computed(() => {
    const map = new Map<RowKey, Record<string, any>>()

    eachTree(list.value, (row, index, info) => {
      const rowKey = resolveRowKey(row, props.rowKey)
      map.set(rowKey, {
        ...row,
        [INDEX]: index,
        [PARENT]: info.parent,
      })
    }, childrenKey.value)

    return map
  })

  const finalColumns = computed(() => {
    return convertProEditColumnsToProColumns(props.columns ?? [])
  })

  function convertProEditColumnsToProColumns(columns: ProEditDataTableColumns): ProDataTableColumn[] {
    const dragSortColumnPath = props.dragSortOptions?.columnPath
    return mapTree(columns, (column) => {
      if (!isProEditDataTableBaseColumn(column, childrenKey.value, dragSortColumnPath)) {
        return column
      }
      const columnKey = column.path ?? column.key
      return {
        ...column,
        render: (row: any, parentRowIndex) => {
          /**
           *  展开行不计入 render 的 rowIndex 内，这里自己处理索引
           */
          const rowKey = resolveRowKey(row, props.rowKey)
          const currentRow = rowKeyToRowMap.value.get(rowKey)!
          const rowIndex = currentRow[INDEX]
          return (
            <EditDataTableCell
              row={currentRow}
              column={column}
              rowKey={rowKey}
              rowIndex={rowIndex}
              columnKey={columnKey}
              parentRowIndex={parentRowIndex}
              childrenKey={childrenKey.value}
            />
          )
        },
      }
    }, childrenKey.value as any)
  }

  return {
    columns: finalColumns,
  }
}
