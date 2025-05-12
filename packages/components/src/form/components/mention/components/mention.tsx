import type { SlotsType } from 'vue'
import type { ProMentionSlots } from '../slots'
import { mentionProps, NMention } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useFieldUtils } from '../../field'
import { useInjectMentionInstStore } from '../inst'

export default defineComponent({
  name: 'Mention',
  props: mentionProps,
  slots: Object as SlotsType<ProMentionSlots>,
  inheritAttrs: false,
  setup(props) {
    const {
      instRef,
      registerInst,
    } = useInjectMentionInstStore()!

    const {
      readonly,
      readonlyText,
    } = useFieldUtils()

    const nMentionProps = computed(() => {
      return {
        ...props,
        value: props.value ?? '',
      }
    })

    registerInst({
      blur: () => instRef.value?.blur(),
      focus: () => instRef.value?.focus(),
    })
    return {
      instRef,
      readonly,
      readonlyText,
      nMentionProps,
    }
  },
  render() {
    const dom = this.readonly
      ? this.readonlyText
      : (
          <NMention
            ref="instRef"
            {...this.$attrs}
            {...this.nMentionProps}
            v-slots={this.$slots}
          >
          </NMention>
        )
    return this.$slots.input
      ? this.$slots.input({
          inputDom: dom,
          readonly: this.readonly,
          inputProps: this.nMentionProps,
        })
      : dom
  },
})
