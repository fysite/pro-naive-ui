# 简约组件 PlainComponent
<!--single-column-->

足够简单、但也比较实用，可以被你用在任意的位置

## 演示

```demo
functional.vue
```

## API
### renderProCopyableText 参数
引用到的类型声明介绍如下
```typescript
import { ProCopyableTextConfig } from 'pro-naive-ui'
```

| 名称   | 类型                    | 默认值 | 说明         | 版本 |
| ------ | ----------------------- | ------ | ------------ | ---- |
| value  | `any`                   | `-`    | 要复制的文本 |      |
| config | `ProCopyableTextConfig` | `-`    | 配置选项     |      |

### renderProDateText 参数
引用到的类型声明介绍如下
```typescript
interface ProDateTextConfig {
  /**
   * @see https://date-fns.org/v3.6.0/docs/format
   * 格式化模式，默认支持几种常用格式
   * month = MMM
   * time = HH:mm:ss
   * date = yyyy-MM-dd
   * quarter = yyyy-qqq
   * year = yyyy年(支持国际化)
   * week = YYYY-w周(支持国际化)
   * datetime = yyyy-MM-dd HH:mm:ss
   * 默认值为 datetime，你可以写 date-fns 支持的所有格式
   */
  pattern?: 'date' | 'time' | 'datetime' | 'year' | 'month' | 'quarter' | 'week' | ({} & string)
}
```

| 名称   | 类型                | 默认值 | 说明             | 版本 |
| ------ | ------------------- | ------ | ---------------- | ---- |
| value  | `any`               | `-`    | 要被格式化的文本 |      |
| config | `ProDateTextConfig` | `-`    | 配置选项         |      |

### renderProImages 参数
支持字符串、字符串组成的数组，引用到的类型声明介绍如下
```typescript
import type { ProImagesConfig } from 'pro-naive-ui'
```

| 名称   | 类型              | 默认值 | 说明     | 版本 |
| ------ | ----------------- | ------ | -------- | ---- |
| value  | `any`             | `-`    | 图片地址 |      |
| config | `ProImagesConfig` | `-`    | 配置选项 |      |

### renderProTags 参数
支持字符串、字符串数组、对象、对象数组、对象和字符串混合的数组，引用到的类型声明介绍如下
```typescript
import type { ProTagsConfig } from 'pro-naive-ui'
```

| 名称   | 类型            | 默认值 | 说明     | 版本 |
| ------ | --------------- | ------ | -------- | ---- |
| value  | `any`           | `-`    | 标签文本 |      |
| config | `ProTagsConfig` | `-`    | 配置选项 |      |
