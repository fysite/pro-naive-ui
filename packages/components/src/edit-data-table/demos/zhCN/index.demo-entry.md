# 编辑表格 ProEditDataTable
<!--single-column-->
可编辑表格 `ProEditDataTable` 与 `ProDataTable` 的功能基本相同，为了更方便的集成在表单中，数据源被 `ProForm` 接管

`NEXT_VERSION` 版本开始提供该组件
## 演示

```demo
basic.vue
row-dblclick-edit.vue
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

| 名称                                                                                                                              | 类型                                   | 默认值 | 说明                                                          | 版本 |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------ | ------------------------------------------------------------- | ---- |
| editableKeys                                                                                                                      | `number[] \| string[]`                 | `-`    | 展示编辑模式行的 `key` 值                                     |      |
| recordCreatorProps                                                                                                                | `ProEditDataTableRecordCreatorProps`   | `-`    | 添加一行数据功能的配置                                        |      |
| max                                                                                                                               | `number`                               | `-`    | 最多行数，多于该数则无法继续新增                              |      |
| actionGuard                                                                                                                       | `ProEditDataTableActionGuard`          | `-`    | 操作拦截器                                                    |      |
| columns                                                                                                                           | `ProEditDataTableColumns`              | `[]`   | 需要展示的列                                                  |      |
| fieldProps                                                                                                                        | `ProDataTableProps`                    | `-`    | 有冲突的属性可以写在 `fieldProps` 中，会透传给 `ProDataTable` |      |
| onUpdateEditableKeys                                                                                                              | `(keys: string[] \| number[]) => void` | `-`    | 编辑模式行的 `key` 值 `change` 时触发                         |      |
| [参考 ProDataTable](https://naive-ui.pro-components.cn/zh-CN/os-theme/components/data-table#ProDataTable-%E5%B1%9E%E6%80%A7)      |                                        |        |                                                               |
| [参考 ProField](https://naive-ui.pro-components.cn/zh-CN/os-theme/components/field#%E9%80%9A%E7%94%A8%E7%9A%84%E5%B1%9E%E6%80%A7) |                                        |        |                                                               |

### ProEditDataTable 插槽

| 名称                                                                                                                              | 参数 | 说明                | 版本 |
| --------------------------------------------------------------------------------------------------------------------------------- | ---- | ------------------- | ---- |
| [参考 ProDataTable](https://naive-ui.pro-components.cn/zh-CN/os-theme/components/data-table#ProDataTable-%E6%8F%92%E6%A7%BD)      |      |                     |      |
| [参考 ProField](https://naive-ui.pro-components.cn/zh-CN/os-theme/components/field#%E9%80%9A%E7%94%A8%E7%9A%84%E6%8F%92%E6%A7%BD) |      | 不支持 `input` 插槽 |      |
