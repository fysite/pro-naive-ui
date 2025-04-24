import type { SlotsType } from 'vue'
import type { ProDynamicTagsSlots } from '../slots'
import { dynamicTagsProps, NDynamicTags } from 'naive-ui'
import { defineComponent } from 'vue'
import { useFieldUtils } from '../../field'

export default defineComponent({
  name: 'DynamicTags',
  props: dynamicTagsProps,
  slots: Object as SlotsType<ProDynamicTagsSlots>,
  inheritAttrs: false,
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
    const slots = {
      ...this.$slots,
      input: this.$slots['tags-input'],
    }
    const dom = this.readonly && this.empty
      ? this.emptyDom
      : (
          <NDynamicTags
            {...this.$props}
            {...this.$attrs}
            disabled={this.readonly || this.$props.disabled}
            closable={this.readonly ? false : this.$props.closable}
          >
            {slots}
          </NDynamicTags>
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
