import type { MaybeRef } from 'vue'
import { createInjectionKey } from '../../../composables/createInjectionKey'

export const proFieldConfigInjectionKey = createInjectionKey<{
  readonly?: MaybeRef<boolean | undefined>
  showLabel?: MaybeRef<boolean | undefined>
}>('pro-field-config')
