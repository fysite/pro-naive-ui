import type { SlotsType } from 'vue'
import type { ProTransferProps } from './props'
import type { ProTransferSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import Transfer from './components/transfer'
import { proTransferProps } from './props'

const name = 'ProTransfer'
export default defineComponent({
  name,
  props: proTransferProps,
  slots: Object as SlotsType<ProTransferSlots>,
  setup(props) {
    const overridedProps = useOverrideProps<ProTransferProps>(
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
        valueType={InternalValueTypeEnum.TRANSFER}
        initialValue={this.overridedProps.initialValue ?? []}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <Transfer {...pureProps} v-slots={this.$slots}></Transfer>
          },
        }}
      </ProField>
    )
  },
})
