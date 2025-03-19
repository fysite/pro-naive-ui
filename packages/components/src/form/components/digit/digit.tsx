import type { SlotsType } from 'vue'
import type { ProDigitProps } from './props'
import type { ProDigitSlots } from './slots'
import { defineComponent } from 'vue'
import { nilOrEmptyStringToNull } from '../../../_utils/nilOrEmptyStringToNull'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import Digit from './components/digit'
import { provideDigitInstStore } from './inst'
import { proDigitProps } from './props'

const name = 'ProDigit'
export default defineComponent({
  name,
  props: proDigitProps,
  slots: Object as SlotsType<ProDigitSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideDigitInstStore()

    const overridedProps = useOverrideProps<ProDigitProps>(
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
        valueType={InternalValueTypeEnum.DIGIT}
        initialValue={nilOrEmptyStringToNull(this.overridedProps.initialValue)}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <Digit {...pureProps} v-slots={this.$slots}></Digit>
          },
        }}
      </ProField>
    )
  },
})
