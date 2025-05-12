import type { ExtractPublicPropTypes, MaybeRef, PropType, VNodeChild } from 'vue'
import { configProviderProps } from 'naive-ui'

type EmptyRender = string | (() => VNodeChild)

export interface EmptyConfig {
  form?: EmptyRender
  tags?: EmptyRender
  table?: EmptyRender
  images?: EmptyRender
  dateText?: EmptyRender
  copyableText?: EmptyRender
}

export const proConfigProviderExtendProps = {
  /**
   * 覆盖组件 props
   */
  propOverrides: Object as PropType<MaybeRef<Record<string, object>>>,
  /**
   * 全局配置空内容下的占位符
   */
  empty: Object as PropType<EmptyConfig>,
} as const

export const proConfigProviderProps = {
  ...configProviderProps,
  ...proConfigProviderExtendProps,
} as const

export type ProConfigProviderProps = ExtractPublicPropTypes<typeof proConfigProviderProps>
export type ProConfigProviderExtendProps = ExtractPublicPropTypes<typeof proConfigProviderExtendProps>
