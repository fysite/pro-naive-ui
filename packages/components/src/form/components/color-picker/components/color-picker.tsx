import type { SlotsType } from 'vue'
import type { ProColorPickerSlots } from '../slots'
import { colorPickerProps, NColorPicker } from 'naive-ui'
import { defineComponent } from 'vue'
import { useFieldUtils } from '../../field'

export default defineComponent({
  name: 'ColorPicker',
  inheritAttrs: false,
  props: colorPickerProps,
  slots: Object as SlotsType<ProColorPickerSlots>,
  setup() {
    const {
      empty,
      readonly,
      emptyDom,
    } = useFieldUtils()

    return {
      empty,
      readonly,
      emptyDom,
    }
  },
  render() {
    const disabled = this.readonly || this.$props.disabled
    const slots = {
      ...this.$slots,
      label: this.$slots['picker-label'],
    }
    const dom = this.readonly && this.empty
      ? this.emptyDom
      : (
          <NColorPicker
            {...this.$props}
            {...this.$attrs}
            disabled={disabled}
          >
            {slots}
          </NColorPicker>
        )
    return this.$slots.input
      ? this.$slots.input({
          inputDom: dom,
          readonly: this.readonly,
          inputProps: this.$props,
        })
      : dom
  },
})
