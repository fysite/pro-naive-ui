<markdown>
# 手动更新值
使用 `on-update-value` 手动控制值的更新，比如以下例子：输入值进行二次确认处理
</markdown>

<script lang="tsx">
import { createProForm } from 'pro-naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const form = createProForm({
      initialValues: {
        name: 'zcf',
      },
      onSubmit: console.log,
    })
    function confirmUpdateValue(value: string) {
      // eslint-disable-next-line no-alert
      const success = confirm(`是否确认输入: ${value} ?`)
      if (success) {
        form.values.value.name = value
      }
    }

    return {
      form,
      confirmUpdateValue,
    }
  },
})
</script>

<template>
  <pro-form :form="form" label-width="auto" label-placement="left">
    <pro-input title="name" path="name" required @update-value="confirmUpdateValue" />
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
