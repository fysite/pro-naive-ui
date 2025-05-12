import type { SlotsType } from 'vue'
import type { ProColorPickerSlots } from '../slots'
import { colorPickerProps, NColorPicker } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useFieldUtils } from '../../field'

export default defineComponent({
  name: 'ColorPicker',
  inheritAttrs: false,
  props: colorPickerProps,
  slots: Object as SlotsType<ProColorPickerSlots>,
  setup(props) {
    const {
      empty,
      readonly,
      emptyDom,
    } = useFieldUtils()

    const nColorPickerProps = computed(() => {
      return {
        ...props,
        value: props.value ?? null,
        disabled: readonly.value || props.disabled,
      }
    })

    return {
      empty,
      readonly,
      emptyDom,
      nColorPickerProps,
    }
  },
  render() {
    const slots = {
      ...this.$slots,
      label: this.$slots['picker-label'],
    }
    const dom = this.readonly && this.empty
      ? this.emptyDom
      : (
          <NColorPicker
            {...this.$attrs}
            {...this.nColorPickerProps}
          >
            {slots}
          </NColorPicker>
        )
    return this.$slots.input
      ? this.$slots.input({
          inputDom: dom,
          readonly: this.readonly,
          inputProps: this.nColorPickerProps,
        })
      : dom
  },
})
