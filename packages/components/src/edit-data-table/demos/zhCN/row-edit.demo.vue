<markdown>
  # 行编辑
  </markdown>

<script lang="tsx">
import type { RowKey } from 'naive-ui/es/data-table/src/interface'
import type { ProEditDataTableColumns } from 'pro-naive-ui'
import { createProForm } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

interface DataSourceType {
  id: RowKey
  no?: string
  now?: number
  rate?: number
  title?: string
  children?: DataSourceType[]
}

export default defineComponent({
  setup() {
    const data = ref<DataSourceType[]>([
      {
        id: '1',
        no: '',
        now: Date.now(),
        rate: 4,
        title: '父级标题',
        children: [
          {
            id: '1-1',
            no: '11',
            now: Date.now(),
            rate: 3,
            title: '子标题1',
          },
          {
            id: '1-2',
            no: '12',
            now: Date.now(),
            rate: 5,
            title: '子标题2',
          },
        ],
      },
    ])

    const editableKeys = ref<RowKey[]>([])

    const form = createProForm({
      initialValues: {
        list: data,
      },
      onSubmit: console.log,
    })

    const columns: ProEditDataTableColumns<DataSourceType> = [
      {
        title: 'no',
        path: 'no',
      },
      {
        title: 'Title',
        path: 'title',
        field: 'input',
        width: 200,
        proFieldProps: {
          required: true,
          showFeedback: false,
        },
      },
      {
        title: '时间',
        path: 'now',
        field: 'date-time',
        width: 200,
        proFieldProps: {
          required: true,
          showFeedback: false,
        },
      },
      {
        title: '评分',
        path: 'rate',
        field: 'rate',
        proFieldProps: {
          required: true,
          showFeedback: false,
        },
      },
      {
        title: '',
        width: 120,
        fixed: 'right',
        render: (row, _, action) => {
          const { editable } = action
          return (
            <n-flex>
              {editable
              && (
                <n-button
                  text={true}
                  type="primary"
                  onClick={() => {
                    form.validate()!.then(() => {
                      editableKeys.value = editableKeys.value.filter(key => key !== row.id)
                      console.log('保存成功')
                    }).catch(() => {
                      console.log('保存失败')
                    })
                  }}
                >
                  保存
                </n-button>
              )}
            </n-flex>
          )
        },
      },
    ]

    const rowProps = (row: DataSourceType) => {
      return {
        style: 'cursor: pointer;',
        ondblclick: () => {
          form.validate()!.then(() => {
            editableKeys.value = [row.id]
            console.log('保存成功')
          }).catch(() => {
            console.log('保存失败')
          })
        },
      }
    }

    return {
      form,
      data,
      columns,
      rowProps,
      editableKeys,
      values: form.values,
    }
  },
})
</script>

<template>
  <pro-form :form="form" label-placement="left">
    <div class="flex flex-col">
      <pro-edit-data-table
        v-model:editable-keys="editableKeys"
        title="爱好"
        path="list"
        :columns="columns"
        :record-creator-props="{
          record: () => ({ id: Date.now() }),
          parentRowKey: '1',
        }"
        :row-props="rowProps"
        row-key="id"
      />
    </div>
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
