import type { TupleToUnion } from 'type-fest'
import type { ExtractPublicPropTypes, PropType, Ref } from 'vue'
import type { InternalFieldValueType } from './enums'
import { simplyOmit } from '../../../_utils/simplyOmit'
import { proFormItemProps } from '../form-item'

export const proFieldProps = {
  ...proFormItemProps,
  /**
   * 初始值，优先级大于 Form 组件的 initialValues
   */
  initialValue: undefined as any as PropType<any>,
  /**
   * 透传给表单控件的 placeholder
   */
  placeholder: [String, Array] as PropType<string | [string, string]>,
  /**
   * 传递给表单控件的 props
   */
  fieldProps: Object as PropType<Record<string, any>>,
  /**
   * 字段被隐藏或删除时是否还保留值
   */
  preserve: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示
   */
  visible: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否隐藏
   */
  hidden: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 表单值发生变化后触发的回调函数
   * @param val 当前表单值
   */
  onChange: Function as PropType<(val: any) => void>,
  /**
   * 是否为列表，会根据此字段判断使用 createField 还是 createArrayField
   */
  isList: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 用于表示值的类型是属于哪个组件的
   */
  valueType: String as PropType<InternalFieldValueType>,
  /**
   * 用于 v-model:xxx 的名称，默认为 'value'，用于支持 'v-model:value'
   */
  valueModelName: {
    type: String,
    default: 'value',
  },
  /**
   * 精简模式，不包装 formItem
   */
  simple: Boolean,
  /**
   * 是否只读
   */
  readonly: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 手动更新值
   * @param fieldValue 表单值
   * @param inputValue 输入值
   */
  onInputValue: Function as PropType<(fieldValue: Ref<any>, inputValue: any, ...args: any[]) => void>,
} as const

/**
 * 所有的非列表表单项应该共享的，例如 pro-input 等
 */
const proFieldIgnoreKeys = [
  'isList',
  'valueType',
  'fieldProps',
  'valueModelName',
] as const

export const proFieldSharedProps = {
  ...simplyOmit(
    proFieldProps,
    proFieldIgnoreKeys as any,
  ) as Omit<typeof proFieldProps, TupleToUnion<typeof proFieldIgnoreKeys>>,
} as const

/**
 * 所有的列表表单项应该共享的，例如 pro-form-list 等
 */
const proListFieldIgnoreKeys = [
  'simple',
  'isList',
  'onChange',
  'valueType',
  'fieldProps',
  'placeholder',
  'onInputValue',
  'valueModelName',
] as const

export const proListFieldSharedProps = {
  ...simplyOmit(
    proFieldProps,
    proListFieldIgnoreKeys as any,
  ) as Omit<typeof proFieldProps, TupleToUnion<typeof proListFieldIgnoreKeys>>,
}

export type ProFieldProps = ExtractPublicPropTypes<typeof proFieldProps>
export type ProFieldSharedProps = ExtractPublicPropTypes<typeof proFieldSharedProps>
export type ProListFieldSharedProps = ExtractPublicPropTypes<typeof proListFieldSharedProps>
