import type { TreeSelectInst, TreeSelectOption } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProTreeSelectSlots } from '../slots'
import { get, isArray, noop } from 'lodash-es'
import { NFlex, NTreeSelect, treeSelectProps } from 'naive-ui'
import { eachTree } from 'pro-composables'
import { computed, defineComponent, ref } from 'vue'
import { useFieldUtils } from '../../field'
import { useInjectTreeSelectInstStore } from '../inst'

export default defineComponent({
  name: 'TreeSelect',
  // 这个 props 类型复杂会导致构建类型声明文件失败，先用 any 解决
  props: treeSelectProps as any,
  slots: Object as SlotsType<ProTreeSelectSlots>,
  inheritAttrs: false,
  setup(props) {
    const instRef = ref<TreeSelectInst>()

    const {
      registerInst,
    } = useInjectTreeSelectInstStore()!

    const {
      empty,
      value,
      readonly,
      emptyDom,
    } = useFieldUtils()

    const selectedLabels = computed(() => {
      const {
        renderTag,
        renderLabel,
        options = [],
        keyField = 'key',
        labelField = 'label',
        childrenField = 'children',
        showPath = false,
        separator = ' / ',
      } = props as any

      const labels: VNodeChild[] = []
      const selectedValue = isArray(value.value) ? value.value : [value.value]

      if (showPath) {
        // 查找完整路径
        const findPathForValue = (val: any) => {
          const path: VNodeChild[] = []
          const findPath = (opts: TreeSelectOption[], parentPath: VNodeChild[] = []) => {
            for (const option of opts) {
              const optionValue = get(option, keyField)
              let optionLabel = get(option, labelField) as VNodeChild
              if (renderTag) {
                optionLabel = renderTag({ option: option as any, handleClose: noop })
              }
              if (renderLabel) {
                optionLabel = renderLabel({ option, checked: true, selected: true })
              }
              const currentPath = [...parentPath, optionLabel]
              if (optionValue === val) {
                path.push(...currentPath)
                return true
              }
              const children = get(option, childrenField) as TreeSelectOption[] | undefined
              if (children && children.length > 0) {
                if (findPath(children, currentPath)) {
                  return true
                }
              }
            }
            return false
          }
          findPath(options as TreeSelectOption[])
          return path
        }
        for (const val of selectedValue) {
          const path = findPathForValue(val)
          if (path.length > 0) {
            labels.push(
              <span>
                {path.map((item, index) => [index > 0 ? separator : null, <span>{item}</span>])}
              </span>,
            )
          }
        }
      }
      else {
        eachTree(
          options as TreeSelectOption[],
          (item) => {
            const value = get(item, keyField)
            if (selectedValue.includes(value)) {
              let label = get(item, labelField) as VNodeChild
              if (renderTag) {
                label = renderTag({ option: item as any, handleClose: noop })
              }
              if (renderLabel) {
                label = renderLabel({ option: item, checked: true, selected: true })
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

    const nTreeSelectProps = computed(() => {
      return {
        ...props,
        value: props.value ?? null,
      }
    })

    registerInst({
      blur: () => instRef.value?.blur(),
      focus: () => instRef.value?.focus(),
      blurInput: () => instRef.value?.blurInput(),
      focusInput: () => instRef.value?.focusInput(),
      getCheckedData: () => instRef.value!.getCheckedData(),
      getIndeterminateData: () => instRef.value!.getIndeterminateData(),
    })
    return {
      empty,
      instRef,
      readonly,
      emptyDom,
      selectedLabels,
      nTreeSelectProps,
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
        <NTreeSelect
          ref="instRef"
          {...this.$attrs}
          {...this.nTreeSelectProps}
          v-slots={this.$slots}
        >
        </NTreeSelect>
      )
    }
    return this.$slots.input
      ? this.$slots.input({
          inputDom: dom,
          readonly: this.readonly,
          inputProps: this.nTreeSelectProps,
        })
      : dom
  },
})
