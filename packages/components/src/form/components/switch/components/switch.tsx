import type { SlotsType, VNodeChild } from 'vue'
import type { ProSwitchSlots } from '../slots'
import { NSwitch, switchProps } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useLocale } from '../../../../locales'
import { useFieldUtils } from '../../field'

export default defineComponent({
  name: 'Switch',
  props: switchProps,
  slots: Object as SlotsType<ProSwitchSlots>,
  inheritAttrs: false,
  setup(props) {
    const {
      value,
      readonly,
    } = useFieldUtils()

    const {
      getMessage,
    } = useLocale('ProSwitch')

    const nSwitchProps = computed(() => {
      return {
        ...props,
        value: props.value ?? false,
      }
    })

    return {
      value,
      readonly,
      getMessage,
      nSwitchProps,
    }
  },
  render() {
    let dom: VNodeChild
    if (this.readonly) {
      dom = this.value
        ? this.$slots.checked?.() ?? this.getMessage('checked')
        : this.$slots.unchecked?.() ?? this.getMessage('unchecked')
    }
    else {
      dom = (
        <NSwitch
          {...this.$attrs}
          {...this.nSwitchProps}
          v-slots={this.$slots}
        >
        </NSwitch>
      )
    }
    return this.$slots.input
      ? this.$slots.input({
          inputDom: dom,
          readonly: this.readonly,
          inputProps: this.nSwitchProps,
        })
      : dom
  },
})
