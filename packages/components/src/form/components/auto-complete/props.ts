import type { AutoCompleteProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldSharedProps } from '../field'

export const proAutoCompleteProps = {
  ...proFieldSharedProps,
  fieldProps: Object as PropType<BaseFieldProps<AutoCompleteProps>>,
} as const

export type ProAutoCompleteProps = ExtractPublicPropTypes<typeof proAutoCompleteProps>
