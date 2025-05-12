import type { SlotsType } from 'vue'
import type { ProDynamicTagsSlots } from '../slots'
import { dynamicTagsProps, NDynamicTags } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useFieldUtils } from '../../field'

export default defineComponent({
  name: 'DynamicTags',
  props: dynamicTagsProps,
  slots: Object as SlotsType<ProDynamicTagsSlots>,
  inheritAttrs: false,
  setup(props) {
    const {
      empty,
      readonly,
      emptyDom,
    } = useFieldUtils()

    const nDynamicTagsProps = computed(() => {
      return {
        ...props,
        value: props.value ?? [],
        disabled: readonly.value || props.disabled,
        closable: readonly.value ? false : props.closable,
      }
    })

    return {
      empty,
      readonly,
      emptyDom,
      nDynamicTagsProps,
    }
  },
  render() {
    const slots = {
      ...this.$slots,
      input: this.$slots['tags-input'],
    }
    const dom = this.readonly && this.empty
      ? this.emptyDom
      : (
          <NDynamicTags
            {...this.$attrs}
            {...this.nDynamicTagsProps}
          >
            {slots}
          </NDynamicTags>
        )
    return this.$slots.input
      ? this.$slots.input({
          inputDom: dom,
          readonly: this.readonly,
          inputProps: this.nDynamicTagsProps,
        })
      : dom
  },
})
