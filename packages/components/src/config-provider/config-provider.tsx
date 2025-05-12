import type { ConfigProviderProps } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { EmptyConfig, ProConfigProviderProps } from './props'
import { NConfigProvider } from 'naive-ui'
import { computed, defineComponent, unref } from 'vue'
import { useOmitProps } from '../composables'
import { provideGlobalConfig, useInjectGlobalConfig } from './context'
import { proConfigProviderExtendProps, proConfigProviderProps } from './props'
import { shallowMergePropOverrides } from './utils'

export default defineComponent({
  name: 'ProConfigProvider',
  props: proConfigProviderProps,
  setup(props) {
    const {
      mergedEmpty: inheritedEmpty,
      mergedPropOverrides: inheritedPropOverrides,
    } = useInjectGlobalConfig()

    const nConfigProviderProps = useOmitProps(
      props,
      proConfigProviderExtendProps,
    ) as ComputedRef<ProConfigProviderProps>

    const mergedPropOverrides = computed(() => {
      return shallowMergePropOverrides(
        unref(inheritedPropOverrides),
        (unref(props.propOverrides) ?? {}),
      )
    })

    const emptyConfig: EmptyConfig = {
      tags: '-',
      form: '-',
      table: '-',
      images: '-',
      dateText: '-',
      copyableText: '-',
    }

    const mergedEmpty = computed(() => {
      return {
        ...emptyConfig,
        ...unref(inheritedEmpty),
        ...(props.empty ?? {}),
      }
    })

    provideGlobalConfig({
      mergedEmpty,
      mergedPropOverrides,
    })
    return {
      nConfigProviderProps,
    }
  },
  render() {
    return (
      <NConfigProvider
        {...this.nConfigProviderProps as ConfigProviderProps}
        v-slots={this.$slots}
      >
      </NConfigProvider>
    )
  },
})
