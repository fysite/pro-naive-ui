import type { SlotsType } from 'vue'
import type { ProRateSlots } from '../slots'
import { NRate, rateProps } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useFieldUtils } from '../../field'

export default defineComponent({
  name: 'Rate',
  props: rateProps,
  slots: Object as SlotsType<ProRateSlots>,
  inheritAttrs: false,
  setup(props) {
    const {
      readonly,
    } = useFieldUtils()

    const nRateProps = computed(() => {
      return {
        ...props,
        value: props.value ?? null as any,
        readonly: readonly.value || props.readonly,
      }
    })

    return {
      readonly,
      nRateProps,
    }
  },
  render() {
    const dom = (
      <NRate
        {...this.$attrs}
        {...this.nRateProps}
        v-slots={this.$slots}
      >
      </NRate>
    )
    return this.$slots.input
      ? this.$slots.input({
          inputDom: dom,
          readonly: this.readonly,
          inputProps: this.nRateProps,
        })
      : dom
  },
})
