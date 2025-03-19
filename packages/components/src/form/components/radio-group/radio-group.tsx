import type { SlotsType } from 'vue'
import type { ProRadioGroupProps } from './props'
import type { ProRadioGroupSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import RadioGroup from './components/radio-group'
import { proRadioGroupProps } from './props'

const name = 'ProRadioGroup'
export default defineComponent({
  name,
  props: proRadioGroupProps,
  slots: Object as SlotsType<ProRadioGroupSlots>,
  setup(props) {
    const overridedProps = useOverrideProps<ProRadioGroupProps>(
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
        valueType={InternalValueTypeEnum.RADIO_GROUP}
        initialValue={this.overridedProps.initialValue ?? null}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <RadioGroup {...pureProps} v-slots={this.$slots}></RadioGroup>
          },
        }}
      </ProField>
    )
  },
})
