import type { SlotsType, VNodeChild } from 'vue'
import type { ProAutoCompleteSlots } from '../slots'
import { autoCompleteProps, NAutoComplete, NFlex } from 'naive-ui'
import { defineComponent } from 'vue'
import { useFieldUtils } from '../../field'
import { useInjectAutoCompleteInstStore } from '../inst'

export default defineComponent({
  name: 'AutoComplete',
  inheritAttrs: false,
  props: autoCompleteProps,
  slots: Object as SlotsType<ProAutoCompleteSlots>,
  setup() {
    const {
      instRef,
      registerInst,
    } = useInjectAutoCompleteInstStore()!

    const {
      value,
      empty,
      readonly,
      emptyDom,
    } = useFieldUtils()

    registerInst({
      blur: () => instRef.value?.blur(),
      focus: () => instRef.value?.blur(),
    })
    return {
      empty,
      value,
      instRef,
      readonly,
      emptyDom,
    }
  },
  render() {
    let dom: VNodeChild
    if (this.readonly) {
      dom = this.empty
        ? this.emptyDom
        : (
            <NFlex size="small">
              {this.$slots.prefix && <span>{this.$slots.prefix()}</span>}
              <span>{this.value}</span>
              {this.$slots.suffix && <span>{this.$slots.suffix()}</span>}
            </NFlex>
          )
    }
    else {
      dom = (
        <NAutoComplete
          ref="instRef"
          {...this.$attrs}
          {...this.$props}
          v-slots={this.$slots}
        >
        </NAutoComplete>
      )
    }
    return this.$slots.input
      ? this.$slots.input({
          inputDom: dom,
          readonly: this.readonly,
          inputProps: this.$props,
        })
      : dom
  },
})
