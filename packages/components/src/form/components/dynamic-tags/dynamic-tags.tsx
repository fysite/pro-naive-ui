import type { SlotsType } from 'vue'
import type { ProDynamicTagsProps } from './props'
import type { ProDynamicTagsSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import DynamicTags from './components/dynamic-tags'
import { proDynamicTagsProps } from './props'

const name = 'ProDynamicTags'
export default defineComponent({
  name,
  props: proDynamicTagsProps,
  slots: Object as SlotsType<ProDynamicTagsSlots>,
  setup(props) {
    const overridedProps = useOverrideProps<ProDynamicTagsProps>(
      name,
      props,
    )

    return {
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        valueType={InternalValueTypeEnum.DYNAMIC_TAGS}
        initialValue={this.overridedProps.initialValue ?? []}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <DynamicTags {...pureProps} v-slots={this.$slots}></DynamicTags>
          },
        }}
      </ProField>
    )
  },
})
