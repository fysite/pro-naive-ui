import type { SlotsType } from 'vue'
import type { ProCascaderProps } from './props'
import type { ProCascaderSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import Cascader from './components/cascader'
import { provideCascaderInstStore } from './inst'
import { proCascaderProps } from './props'

const name = 'ProCascader'
export default defineComponent({
  name,
  props: proCascaderProps,
  slots: Object as SlotsType<ProCascaderSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideCascaderInstStore()

    const overridedProps = useOverrideProps<ProCascaderProps>(
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
        valueType={InternalValueTypeEnum.CASCADER}
        initialValue={this.overridedProps.initialValue ?? null}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <Cascader {...pureProps} v-slots={this.$slots}></Cascader>
          },
        }}
      </ProField>
    )
  },
})
