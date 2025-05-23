import type { CascaderOption } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProCascaderSlots } from '../slots'
import { get, isArray } from 'lodash-es'
import { cascaderProps, NCascader, NFlex } from 'naive-ui'
import { eachTree } from 'pro-composables'
import { computed, defineComponent } from 'vue'
import { useFieldUtils } from '../../field'
import { useInjectCascaderInstStore } from '../inst'

export default defineComponent({
  name: 'Cascader',
  inheritAttrs: false,
  // 这个 props 类型复杂会导致构建类型声明文件失败，先用 any 解决
  props: cascaderProps as any,
  slots: Object as SlotsType<ProCascaderSlots>,
  setup(props) {
    const {
      instRef,
      registerInst,
    } = useInjectCascaderInstStore()!

    const {
      empty,
      value,
      readonly,
      emptyDom,
    } = useFieldUtils()

    const nNCascaderProps = computed(() => {
      return {
        ...props,
        value: props.value ?? null,
      }
    })

    const selectedLabels = computed(() => {
      const {
        renderLabel,
        options = [],
        labelField = 'label',
        valueField = 'value',
        childrenField = 'children',
        showPath = true,
        separator = ' / ',
      } = props as any

      const labels: VNodeChild[] = []
      const selectedValue = isArray(value.value) ? value.value : [value.value]

      if (showPath) {
        // 查找完整路径
        const findPathForValue = (value: any) => {
          const path: VNodeChild[] = []

          const findPath = (options: CascaderOption[], parentPath: VNodeChild[] = []) => {
            for (const option of options) {
              const optionValue = get(option, valueField)
              let optionLabel = get(option, labelField) as VNodeChild
              if (renderLabel) {
                optionLabel = renderLabel(option as any, true)
              }

              const currentPath = [...parentPath, optionLabel]

              if (optionValue === value) {
                path.push(...currentPath)
                return true
              }

              const children = get(option, childrenField) as CascaderOption[] | undefined
              if (children && children.length > 0) {
                if (findPath(children, currentPath)) {
                  return true
                }
              }
            }
            return false
          }

          findPath(options as CascaderOption[])
          return path
        }

        // 为每个选中的值找到路径并添加到labels中
        for (const val of selectedValue) {
          const path = findPathForValue(val)
          if (path.length > 0) {
            labels.push(
              <span>
                {path.map((item, index) => [
                  index > 0 ? separator : null,
                  <span>{item}</span>,
                ])}
              </span>,
            )
          }
        }
      }
      else {
        // 原来的逻辑：仅显示选中节点的标签
        eachTree(
          options as CascaderOption[],
          (item) => {
            const value = get(item, valueField)
            if (selectedValue.includes(value)) {
              let label = get(item, labelField) as VNodeChild
              if (renderLabel) {
                label = renderLabel(item as any, true)
              }
              if (label) {
                labels.push(<span>{label}</span>)
              }
            }
          },
          childrenField,
        )
      }

      return labels
    })

    registerInst({
      blur: () => instRef.value?.blur(),
      focus: () => instRef.value?.focus(),
      getCheckedData: () => instRef.value?.getCheckedData() as any,
      getIndeterminateData: () => instRef.value?.getIndeterminateData() as any,
    })

    return {
      empty,
      value,
      instRef,
      readonly,
      emptyDom,
      selectedLabels,
      nNCascaderProps,
    }
  },
  render() {
    let dom: VNodeChild
    if (this.readonly) {
      dom = this.empty
        ? this.emptyDom
        : (
            <NFlex size="small">
              {this.selectedLabels}
            </NFlex>
          )
    }
    else {
      dom = (
        <NCascader
          ref="instRef"
          {...this.$attrs}
          {...this.nNCascaderProps}
          v-slots={this.$slots}
        >
        </NCascader>
      )
    }
    return this.$slots.input
      ? this.$slots.input({
          inputDom: dom,
          readonly: this.readonly,
          inputProps: this.nNCascaderProps,
        })
      : dom
  },
})
