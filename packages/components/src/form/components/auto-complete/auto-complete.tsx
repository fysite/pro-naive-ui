import type { SlotsType } from 'vue'
import type { ProAutoCompleteProps } from './props'
import type { ProAutoCompleteSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import AutoComplete from './components/auto-complete'
import { provideAutoCompleteInstStore } from './inst'
import { proAutoCompleteProps } from './props'

const name = 'ProAutoComplete'
export default defineComponent({
  name,
  props: proAutoCompleteProps,
  slots: Object as SlotsType<ProAutoCompleteSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideAutoCompleteInstStore()

    const overridedProps = useOverrideProps<ProAutoCompleteProps>(
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
        valueType={InternalValueTypeEnum.AUTO_COMPLETE}
        initialValue={this.overridedProps.initialValue ?? null}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <AutoComplete {...pureProps} v-slots={this.$slots}></AutoComplete>
          },
        }}
      </ProField>
    )
  },
})
