import type { SlotsType } from 'vue'
import type { ProInputProps } from './props'
import type { ProInputSlots } from './slots'
import { defineComponent } from 'vue'
import { nilOrEmptyStringToNull } from '../../../_utils/nilOrEmptyStringToNull'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import Password from './components/password'
import { provideTextInstStore } from './inst'
import { proInputProps } from './props'

const name = 'ProPassword'
export default defineComponent({
  name,
  props: proInputProps,
  slots: Object as SlotsType<ProInputSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideTextInstStore()

    const overridedProps = useOverrideProps<ProInputProps>(
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
        fieldProps={{
          ...this.overridedProps.fieldProps,
          type: 'password',
        }}
        valueType={InternalValueTypeEnum.PASSWORD}
        initialValue={nilOrEmptyStringToNull(this.overridedProps.initialValue)}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <Password {...pureProps} v-slots={this.$slots}></Password>
          },
        }}
      </ProField>
    )
  },
})
