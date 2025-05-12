import type { SlotsType } from 'vue'
import type { ProSliderSlots } from '../slots'
import { NSlider, sliderProps } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useFieldUtils } from '../../field'

export default defineComponent({
  name: 'Slider',
  props: sliderProps,
  slots: Object as SlotsType<ProSliderSlots>,
  inheritAttrs: false,
  setup(props) {
    const {
      readonly,
      readonlyText,
    } = useFieldUtils()

    const nSliderProps = computed(() => {
      return {
        ...props,
        value: props.value ?? null as any,
      }
    })

    return {
      readonly,
      readonlyText,
      nSliderProps,
    }
  },
  render() {
    const dom = this.readonly
      ? this.readonlyText
      : (
          <NSlider
            {...this.$attrs}
            {...this.nSliderProps}
            v-slots={this.$slots}
          >
          </NSlider>
        )
    return this.$slots.input
      ? this.$slots.input({
          inputDom: dom,
          readonly: this.readonly,
          inputProps: this.nSliderProps,
        })
      : dom
  },
})
