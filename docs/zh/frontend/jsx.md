# Jsx

## [Vue2](https://github.com/vuejs/jsx-vue2#installation)

### Installation

安装插件:

```sh
npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props
```

然后将预设添加到 babel.config.js 中：

```js
module.exports = {
  presets: ['@vue/babel-preset-jsx']
}
```

### Syntax

#### 内容

```jsx
render() {
  return <p>hello</p>
}
```

##### 具有动态内容：

```jsx
render() {
  return <p>hello { this.message }</p>
}
```

##### 自闭合时：

```jsx
render() {
  return <input />
}
```

##### 使用组件：

```jsx
import MyComponent from './my-component'

export default {
  render() {
    return <MyComponent>hello</MyComponent>
  }
}
```

#### 属性/道具

```jsx
render() {
  return <input type="email" />
}
```

##### 具有动态绑定：

```jsx
render() {
  return <input
    type="email"
    placeholder={this.placeholderText}
  />
}
```

##### 使用扩展运算符（对象需要与 Vue 数据对象兼容）：

```jsx
render() {
  const inputAttrs = {
    type: 'email',
    placeholder: 'Enter your email'
  }

  return <input {...{ attrs: inputAttrs }} />

// or

  const attrs = {
    type: 'email',
    placeholder: 'Enter your email',
      [this.title]: 'Enter your email' // 自定义b
  }

  return <input {...attrs} />
}
```

#### 插槽

##### [$slots](https://cn.vuejs.org/v2/api/#vm-slots)

用来访问被插槽分发的内容。每个具名插槽有其相应的 property (例如：v-slot:foo 中的内容将会在 vm.$slots.foo 中被找到)。default property 包括了所有没有被包含在具名插槽中的节点，或 v-slot:default 的内容。

##### [$scopedSlots](https://cn.vuejs.org/v2/api/#vm-scopedSlots)

用来访问作用域插槽。对于包括 默认 slot 在内的每一个插槽，该对象都包含一个返回相应 VNode 的函数。

##### 命名插槽：

```jsx
render() {
  return (
    <MyComponent>
      <header slot="header">header</header>
      <footer slot="footer">footer</footer>
    </MyComponent>
  )
}
```

##### 作用域内插槽：

```jsx
render() {
  const scopedSlots = {
    header: () => <header>header</header>,
    footer: () => <footer>footer</footer>
  }

  return <MyComponent scopedSlots={scopedSlots} />
}
```

使用`<template>`标签 必须要写 `slot="default"`

#### 指令

> 在新版脚手架`vue-cli4`中，已经默认集成了对`v-model`的支持，直接使用，如果你的项目比较老，也可以安装插件`babel-plugin-jsx-v-model`来进行支持

```jsx
// 两种写法
<input vModel={this.newTodoText} />
<input v-model={this.newTodoText} />
```

##### 使用修饰符：

```jsx
<input vModel_trim={this.newTodoText} />
```

`.stop` ： 阻止事件冒泡，在`JSX`中使用`event.stopPropagation()`来代替

`.prevent`：阻止默认行为，在`JSX`中使用`event.preventDefault()` 来代替

`.self`：只当事件是从侦听器绑定的元素本身触发时才触发回调

```js
if (event.target !== event.currentTarget) {
  return
}
```

`.enter`与`keyCode`: 在特定键触发时才触发回调

```js
if (event.keyCode === 13) {
  // 执行逻辑
}
```

`.once, .capture, .passive`

```jsx
  render() {
   return (
     <div
       on={{
         // .capture
         '!click': this.$_handleClick,
         // .once
         '~input': this.$_handleInput,
         // .passive
         '&mousedown': this.$_handleMouseDown,
         // .capture.once
         '~!mouseup': this.$_handleMouseUp
       }}
     />
   )
 }
```

##### 带参数：

```jsx
<input vOn:click={this.newTodoText} />
```

##### 使用参数和修饰符：

```jsx
<input vOn:click_stop_prevent={this.newTodoText} />
```

##### v-on：

```jsx
// 以下写法皆可
<button vOn:click={this.onClick} />
<button v-on:click={this.onClick} />
<button onClick={this.onClick} />
<button on-click={this.onClick} />
<button on={{'click':this.onClick}} />

// 自定义event name
this.$emit('icon-click')
<button onIconClick={this.onClick} />

// native修饰符
<button nativeOnClick={this.onClick} />

// 传参
<button on-click={this.onClick.bind(this,argument)} />

// 动态事件名称
<button on={{[this.event]:this.onClick}} />

// event 会自动传入作为最后一个参数
<button on-click={$event => this.event(param, $event)} />

// 触发函数组
<button onClick={[onClick1,onClick2]} />
```

##### v-html：

```jsx
<p domPropsInnerHTML={html} />
```

##### v-text

```jsx
<p domPropsInnerText={text} />
```

##### v-show

```jsx
<p vShow={true} />
<p v-show={true} />
```

##### .sync

```jsx
<My-Component value={this.value} on={{ 'update:value': this.onInput }} />
```

##### v-if 与 v-for

使用 js 原生能力

```jsx
const thead = this.hideHeader ? null : (
  <thead>
    {this.weekDays.map(day => (
      <th key={day}>{day}</th>
    ))}
  </thead>
)
```

#### 功能组件

将返回 JSX 的箭头函数转译为功能组件，当它们是缺省导出时：

```jsx
export default ({ props }) => <p>hello {props.message}</p>
```

或 PascalCase 变量声明：

```jsx
const HelloWorld = ({ props }) => <p>hello {props.message}</p>
```

## Vue3

### Installation

安装插件

```sh
npm install @vue/babel-plugin-jsx -D
```

配置 Babel

```json
{
  "plugins": ["@vue/babel-plugin-jsx"]
}
```

有以下配置可选

```json
{
  "plugins": [
    "@vue/babel-plugin-jsx",
    {
      // ...
    }
  ]
}
```

#### transformOn Type: boolean

Default: false

把 on: { click: xx } 转成 onClick: xxx

#### optimize Type: boolean

Default: false

是否开启优化. 如果你对 Vue 3 不太熟悉，不建议打开

#### isCustomElement

Type: (tag: string) => boolean

Default: undefined

自定义元素

#### mergeProps Type: boolean

Default: true

合并 class / style / onXXX handlers

#### enableObjectSlots

使用 enableObjectSlots (文档下面会提到)。虽然在 JSX 中比较好使，但是会增加一些 \_isSlot 的运行时条件判断，这会增加你的项目体积。即使你关闭了 enableObjectSlots，v-slots 还是可以使用

#### pragma

Type: string

Default: createVNode

替换编译 JSX 表达式的时候使用的函数

### Syntax

#### 内容

函数式组件

```jsx
const App = () => <div></div>
```

在 render 中使用

```jsx
const App = {
  render() {
    return <div>Vue 3.0</div>
  }
}
```

```jsx
import { withModifiers, defineComponent } from 'vue'

const App = defineComponent({
  setup() {
    const count = ref(0)

    const inc = () => {
      count.value++
    }

    return () => <div onClick={withModifiers(inc, ['self'])}>{count.value}</div>
  }
})
```

Fragment

```jsx
const App = () => (
  <>
    <span>I'm</span>
    <span>Fragment</span>
  </>
)
```

#### 属性/道具

```jsx
const App = () => <input type="email" />
```

动态绑定:

```jsx
const placeholderText = 'email'
const App = () => <input type="email" placeholder={placeholderText} />
```

#### 指令

##### v-show

```jsx
const App = {
  data() {
    return { visible: true }
  },
  render() {
    return <input v-show={this.visible} />
  }
}
```

##### v-model

> 注意：如果想要使用 arg, 第二个参数需要为字符串

```jsx
<input v-model={val} />
```

```jsx
<input v-model:argument={val} />
```

```jsx
<input v-model={[val, ['modifier']]} />
```

```jsx
<A v-model={[val, 'argument', ['modifier']]} />
```

会编译成：

```jsx
h(A, {
  argument: val,
  argumentModifiers: {
    modifier: true
  },
  'onUpdate:argument': $event => (val = $event)
})
```

##### v-models (从 1.1.0 开始不推荐使用)

> 注意: 你应该传递一个二维数组给 v-models。

```jsx
<A v-models={[[foo], [bar, 'bar']]} />
```

```jsx
<A
  v-models={[
    [foo, 'foo'],
    [bar, 'bar']
  ]}
/>
```

```jsx
<A
  v-models={[
    [foo, ['modifier']],
    [bar, 'bar', ['modifier']]
  ]}
/>
```

会编译成：

```jsx
h(A, {
  modelValue: foo,
  modelModifiers: {
    modifier: true
  },
  'onUpdate:modelValue': $event => (foo = $event),
  bar: bar,
  barModifiers: {
    modifier: true
  },
  'onUpdate:bar': $event => (bar = $event)
})
```

##### 自定义指令

只有 argument 的时候推荐使用

```jsx
const App = {
  directives: { custom: customDirective },
  setup() {
    return () => <a v-custom:arg={val} />
  }
}
```

```jsx
const App = {
  directives: { custom: customDirective },
  setup() {
    return () => <a v-custom={[val, 'arg', ['a', 'b']]} />
  }
}
```

#### 插槽

> 注意: 在 jsx 中，应该使用 v-slots 代替 v-slot

```jsx
const A = (props, { slots }) => (
  <>
    <h1>{slots.default ? slots.default() : 'foo'}</h1>
    <h2>{slots.bar?.()}</h2>
  </>
)

const App = {
  setup() {
    const slots = {
      bar: () => <span>B</span>
    }
    return () => (
      <A v-slots={slots}>
        <div>A</div>
      </A>
    )
  }
}

// or

const App = {
  setup() {
    const slots = {
      default: () => <div>A</div>,
      bar: () => <span>B</span>
    }
    return () => <A v-slots={slots} />
  }
}

// 或者，当 `enableObjectSlots` 不是 `false` 时，您可以使用对象插槽
const App = {
  setup() {
    return () => (
      <>
        <A>
          {{
            default: () => <div>A</div>,
            bar: () => <span>B</span>
          }}
        </A>
        <B>{() => 'foo'}</B>
      </>
    )
  }
}
```

#### 在 TypeScript 中使用

`tsconfig.json:`

```json
{
  "compilerOptions": {
    "jsx": "preserve"
  }
}
```

## Review

- Vue3 中 jsx 语法部分延续了 Vue2

- jsx 就是在 render 中渲染 xml ,object 显示为 undefined

- JSX 就是 Javascript 和 XML 结合的一种格式。React 发明了 JSX，利用 HTML 语法来创建虚拟 DOM。当遇到`<`符号，JSX 就当 HTML 解析，遇到`{`符号就当 JavaScript 解析.

- Vue 推荐在绝大多数情况下使用模板来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力。这时你可以用渲染函数，它比模板更接近编译器。

- 因为 jsx 即为渲染层,可以直接用一些新的特性,例如可选链`?.`,而模板中使用需要额外的依赖
