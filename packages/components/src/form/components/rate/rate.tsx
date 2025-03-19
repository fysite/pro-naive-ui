import type { SlotsType } from 'vue'
import type { ProRateProps } from './props'
import type { ProRateSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import Rate from './components/rate'
import { proRateProps } from './props'

const name = 'ProRate'
export default defineComponent({
  name,
  props: proRateProps,
  slots: Object as SlotsType<ProRateSlots>,
  setup(props) {
    const overridedProps = useOverrideProps<ProRateProps>(
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
        valueType={InternalValueTypeEnum.RATE}
        initialValue={this.overridedProps.initialValue ?? null}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <Rate {...pureProps} v-slots={this.$slots}></Rate>
          },
        }}
      </ProField>
    )
  },
})
