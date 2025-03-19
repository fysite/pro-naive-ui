import type { SlotsType } from 'vue'
import type { ProMentionProps } from './props'
import type { ProMentionSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import Mention from './components/mention'
import { provideMentionInstStore } from './inst'
import { proMentionProps } from './props'

const name = 'ProMention'
export default defineComponent({
  name,
  props: proMentionProps,
  slots: Object as SlotsType<ProMentionSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideMentionInstStore()

    const overridedProps = useOverrideProps<ProMentionProps>(
      name,
      props,
    )

    expose(exposed)
    return {
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        valueType={InternalValueTypeEnum.MENTION}
        initialValue={this.overridedProps.initialValue ?? null}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <Mention {...pureProps} v-slots={this.$slots}></Mention>
          },
        }}
      </ProField>
    )
  },
})
