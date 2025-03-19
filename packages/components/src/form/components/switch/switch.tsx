import type { SlotsType } from 'vue'
import type { ProSwitchProps } from './props'
import type { ProSwitchSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import Switch from './components/switch'
import { proSwitchProps } from './props'

const name = 'ProSwitch'
export default defineComponent({
  name,
  props: proSwitchProps,
  slots: Object as SlotsType<ProSwitchSlots>,
  setup(props) {
    const overridedProps = useOverrideProps<ProSwitchProps>(
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
        valueType={InternalValueTypeEnum.SWITCH}
        initialValue={this.overridedProps.initialValue ?? false}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <Switch {...pureProps} v-slots={this.$slots}></Switch>
          },
        }}
      </ProField>
    )
  },
})
