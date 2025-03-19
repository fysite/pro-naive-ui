import type { FormInst } from 'naive-ui'
import type { BaseForm, FormOptions, InternalPath } from 'pro-composables'
import type { Merge, Paths, Simplify } from 'type-fest'
import type { FieldExtraInfo } from '../components/field/field-extra-info'
import type { FormItemInternalValidationResult } from './useValidationResult'
import { isString } from 'lodash-es'
import { createForm, stringifyPath } from 'pro-composables'
import { inject, provide, ref } from 'vue'
import { createInjectionKey } from '../../composables/createInjectionKey'
import { fieldExtraKey } from '../components/field/field-extra-info'
import { useValidationResults } from './useValidationResult'

export interface ValidateError {
  field?: string
  fieldValue?: any
  message?: string
}

export const proFormInternalKey = '__proFormInternalKey__'

type StringKeyof<Values = any> = Exclude<Paths<Values>, symbol | number>

export type CreateProFormReturn<Values = any, FieldsValue = Values> = Simplify<Pick<
  BaseForm<Values, FieldsValue>,
  | 'values'
  | 'fieldsValue'
  | 'resetFieldValue'
  | 'resetFieldsValue'
  | 'setInitialValue'
  | 'setInitialValues'
> & {
  /**
   * 提交表单
   */
  submit: () => void
  /**
   * 还原所有字段值并清空校验
   */
  restoreFieldsValue: () => void
  /**
   * 还原指定字段值并清空校验
   */
  restoreFieldValue: <T extends InternalPath = StringKeyof<Values>>(path: T) => void
  /**
   * 清空校验
   */
  restoreValidation: <T extends InternalPath = StringKeyof<Values>>(paths?: T) => void
  /**
   * 校验
   */
  validate: <T extends InternalPath = StringKeyof<Values>>(paths?: T) => ReturnType<FormInst['validate']> | undefined
  /**
   * 获取字段值的校验结果
   * @param path 路径
   */
  getFieldValidationResult: (path: InternalPath) => FormItemInternalValidationResult | null
  /**
   * 内部使用
   */
  [proFormInternalKey]: {
    internalForm: BaseForm
    registerNFormInst: (nForm: FormInst) => void
    validationResults: ReturnType<typeof useValidationResults>
  }
}>

export interface CreateProFormOptions<Values = any, FieldsValue = Values> extends FormOptions<Values> {
  /**
   * 数据重置后的回调事件
   */
  onReset?: () => void
  /**
   * 数据验证成功后的回调事件
   */
  onSubmit?: (values: FieldsValue, warnings: ValidateError[][]) => void | Promise<void>
  /**
   * 数据验证失败后回调事件
   */
  onSubmitFailed?: (errors: ValidateError[][]) => void
}

export function createProForm<
  Values = any,
  FieldsValue = Values,
>(options: Simplify<CreateProFormOptions<Values, FieldsValue>> = {}): CreateProFormReturn<Values, FieldsValue> {
  const {
    omitNil,
    onReset,
    onSubmit,
    initialValues,
    onValueChange,
    onSubmitFailed,
  } = options

  const submiting = ref(false)

  const internalForm = createForm({
    omitNil,
    initialValues,
    onValueChange,
  })

  const {
    values,
    fieldsValue,
    setInitialValue,
    resetFieldValue,
    resetFieldsValue,
    setInitialValues,
    _: { fieldStore },
  } = internalForm

  const nFormInst = ref<FormInst>()
  const validationResults = useValidationResults()

  const {
    addValidationErrors,
    addValidationWarnings,
    clearValidationResults,
    getFieldValidationResult,
  } = validationResults

  function registerNFormInst(nForm: FormInst) {
    nFormInst.value = nForm
  }

  function validate(paths?: InternalPath) {
    if (!paths) {
      return nFormInst.value?.validate(addValidateResults, (rule) => {
        return !(rule as any).readonly
      })
    }
    paths = (isString(paths) ? [paths] : paths).map(stringifyPath)
    return nFormInst.value?.validate(
      (errors, extra) => addValidateResults(errors, extra, false),
      (rule) => {
        return paths.includes(rule.key!) && !(rule as any).readonly
      },
    )
  }

  function submit() {
    if (submiting.value) {
      return
    }
    validate()
      ?.then(({ warnings }) => {
        if (onSubmit) {
          const response = onSubmit(fieldsValue.value as any, warnings ?? [])
          return response
        }
      })
      ?.catch((errors) => {
        if (!onSubmitFailed) {
          throw errors
        }
        onSubmitFailed(errors)
      })
  }

  function restoreValidation(paths?: InternalPath) {
    if (!paths) {
      nFormInst.value?.restoreValidation()
      return
    }
    const field = fieldStore.getFieldByPath(paths)
    if (field && field[fieldExtraKey]) {
      const { proFormItemInst } = field[fieldExtraKey] as FieldExtraInfo
      const formItemInst = proFormItemInst.value
      formItemInst && formItemInst.restoreValidation()
    }
  }

  function restoreFieldValue(path: InternalPath) {
    resetFieldValue(path)
    restoreValidation(path)
    clearValidationResults(path)
    onReset && onReset()
  }

  function restoreFieldsValue() {
    resetFieldsValue()
    restoreValidation()
    clearValidationResults()
    onReset && onReset()
  }

  function addValidateResults(
    errors: ValidateError[][] | undefined,
    extra: {
      warnings: ValidateError[][] | undefined
    },
    clear = true,
  ) {
    const es = errors ?? []
    const ws = extra.warnings ?? []
    clear && clearValidationResults()

    es.forEach((e) => {
      const path = e[0].field
      addValidationErrors(path, e)
    })

    ws.forEach((e) => {
      const path = e[0].field
      addValidationWarnings(path, e)
    })
  }

  const returned: CreateProFormReturn = {
    values,
    fieldsValue,
    submit,
    validate,
    resetFieldValue,
    setInitialValue,
    setInitialValues,
    resetFieldsValue,
    restoreValidation,
    restoreFieldValue,
    restoreFieldsValue,
    getFieldValidationResult,
    [proFormInternalKey]: {
      internalForm,
      registerNFormInst,
      validationResults,
    },
  }
  return Object.freeze(returned)
}

const proFormContextKey = createInjectionKey<CreateProFormReturn>('pro-form')

export function provideProForm(form: CreateProFormReturn) {
  provide(proFormContextKey, form)
}

export function useInjectProForm<Values = any>(): Simplify<CreateProFormReturn<Values>> | null {
  return inject(proFormContextKey, null)
}

export type ExtendProForm<V = any, FV = V, PM extends object = object, PO extends object = object> = Merge<
  Merge<Omit<CreateProFormReturn<V, FV>, typeof proFormInternalKey>, PM>,
  {
    [proFormInternalKey]: Merge<CreateProFormReturn<V>[typeof proFormInternalKey], PO>
  }
>

export function extendProForm<
  Values = any,
  FieldsValue = Values,
  PublicMethods extends object = object,
  PrivateOptions extends object = object,
>(
  options: Simplify<CreateProFormOptions<Values, FieldsValue>>,
  publicMethods: PublicMethods,
  privateOptions: PrivateOptions,
): ExtendProForm<Values, FieldsValue, PublicMethods, PrivateOptions> {
  let returned = createProForm(options) as any

  if (publicMethods) {
    returned = {
      ...returned,
      ...publicMethods,
    }
  }

  if (privateOptions) {
    returned = {
      ...returned,
      [proFormInternalKey]: {
        ...returned[proFormInternalKey],
        ...privateOptions,
      },
    }
  }

  return Object.freeze(returned)
}
