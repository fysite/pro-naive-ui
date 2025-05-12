import type { SlotsType } from 'vue'
import type { ProCheckboxSlots } from '../slots'
import { checkboxProps, NCheckbox } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useFieldUtils } from '../../field'
import { useInjectCheckboxInstStore } from '../inst'

export default defineComponent({
  name: 'Checkbox',
  inheritAttrs: false,
  props: checkboxProps,
  slots: Object as SlotsType<ProCheckboxSlots>,
  setup(props) {
    const {
      instRef,
      registerInst,
    } = useInjectCheckboxInstStore()!

    const {
      readonly,
    } = useFieldUtils()

    const nCheckboxProps = computed(() => {
      return {
        ...props,
        checked: props.checked ?? false,
        disabled: readonly.value || props.disabled,
      }
    })

    registerInst({
      blur: () => instRef.value?.blur(),
      focus: () => instRef.value?.focus(),
    })
    return {
      instRef,
      readonly,
      nCheckboxProps,
    }
  },
  render() {
    const dom = (
      <NCheckbox
        ref="instRef"
        {...this.$attrs}
        {...this.nCheckboxProps}
        v-slots={this.$slots}
      >
      </NCheckbox>
    )
    return this.$slots.input
      ? this.$slots.input({
          inputDom: dom,
          readonly: this.readonly,
          inputProps: this.nCheckboxProps,
        })
      : dom
  },
})
