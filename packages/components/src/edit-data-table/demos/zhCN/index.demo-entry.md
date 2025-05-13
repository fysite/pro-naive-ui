# 编辑表格 ProEditDataTable
<!--single-column-->

## 演示

```demo
basic.vue
row-edit.vue
guard.vue
sub-column-table-add.vue
custom-table.vue
link-async-loop.vue
async.vue
```

## API
### ProEditDataTable 属性
引用到的类型声明介绍如下
```typescript
import type { ProEditDataTableRecordCreatorProps, ProEditDataTableActionGuard, ProEditDataTableColumns, ProDataTableProps } from 'pro-naive-ui'
```

| 名称                                                                                                                              | 类型                                   | 默认值 | 说明                                                        | 版本 |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------ | ----------------------------------------------------------- | ---- |
| editableKeys                                                                                                                      | `number[] \| string[]`                 | `-`    | 展示编辑模式行的key值                                       |      |
| onUpdateEditableKeys                                                                                                              | `(keys: string[] \| number[]) => void` | `-`    | 当前编辑行列表发生change时触发                              |      |
| recordCreatorProps                                                                                                                | `ProEditDataTableRecordCreatorProps`   | `-`    | 新建功能的配置                                              |      |
| max                                                                                                                               | `number`                               | `-`    | 最多行数，多于该数则无法继续新增                            |      |
| actionGuard                                                                                                                       | `ProEditDataTableActionGuard`          | `-`    | 操作拦截器                                                  |      |
| columns                                                                                                                           | `ProEditDataTableColumns`              | `[]`   | 需要展示的列                                                |      |
| fieldProps                                                                                                                        | `ProDataTableProps`                    | `-`    | 有冲突的属性可以写在 fieldProps 中，会透传给 pro-data-table |      |
| [参考 ProDataTable](https://naive-ui.pro-components.cn/zh-CN/os-theme/components/data-table#ProDataTable-%E5%B1%9E%E6%80%A7)      |                                        |        |                                                             |
| [参考 ProField](https://naive-ui.pro-components.cn/zh-CN/os-theme/components/field#%E9%80%9A%E7%94%A8%E7%9A%84%E5%B1%9E%E6%80%A7) |                                        |        |                                                             |

### ProEditDataTable 插槽

| 名称                                                                                                                              | 参数 | 说明 | 版本 |
| --------------------------------------------------------------------------------------------------------------------------------- | ---- | ---- | ---- |
| [参考 ProDataTable](https://naive-ui.pro-components.cn/zh-CN/os-theme/components/data-table#ProDataTable-%E6%8F%92%E6%A7%BD)      |      |      |      |
| [参考 ProField](https://naive-ui.pro-components.cn/zh-CN/os-theme/components/field#%E9%80%9A%E7%94%A8%E7%9A%84%E6%8F%92%E6%A7%BD) |      |      |      |
