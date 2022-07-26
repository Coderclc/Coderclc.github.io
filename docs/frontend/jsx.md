# Jsx

## [Vue2](https://github.com/vuejs/jsx-vue2#installation)

### Installation

Install the plugin:

```sh
npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props
```

Then add the preset to babel.config.js:

```js
module.exports = {
  presets: ['@vue/babel-preset-jsx']
}
```

### Syntax

#### content

```jsx
render() {
  return <p>hello</p>
}
```

##### with dynamic content:

```jsx
render() {
  return <p>hello { this.message }</p>
}
```

##### When self-closing:

```jsx
render() {
  return <input />
}
```

##### Using components:

```jsx
import MyComponent from './my-component'

export default {
  render() {
    return <MyComponent>hello</MyComponent>
  }
}
```

#### Properties/Props

```jsx
render() {
  return <input type="email" />
}
```

##### with dynamic binding:

```jsx
render() {
  return <input
    type="email"
    placeholder={this.placeholderText}
  />
}
```

##### Use spread operator (object needs to be compatible with Vue data objects):

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
      [this.title]: 'Enter your email' // custom b
  }

  return <input {...attrs} />
}
```

#### slot

##### [$slots](https://cn.vuejs.org/v2/api/#vm-slots)

Used to access content distributed by the slot. Each named slot has its own property (eg: the contents of v-slot:foo will be found in vm.$slots.foo). The default property includes all nodes not contained in named slots, or v-slot:default .

##### [$scopedSlots](https://cn.vuejs.org/v2/api/#vm-scopedSlots)

Used to access scoped slots. For each slot, including the default slot, this object contains a function that returns the corresponding VNode.

##### Named slots:

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

##### Scoped slots:

```jsx
render() {
  const scopedSlots = {
    header: () => <header>header</header>,
    footer: () => <footer>footer</footer>
  }

  return <MyComponent scopedSlots={scopedSlots} />
}
```

To use the `<template>` tag, you must write `slot="default"`

#### directives

> In the new scaffolding `vue-cli4`, the support for `v-model` has been integrated by default and can be used directly. If your project is relatively old, you can also install the plugin `babel-plugin-jsx-v-model` to support

```jsx
// two ways to write
<input vModel={this.newTodoText} />
<input v-model={this.newTodoText} />
```

##### Using modifiers:

```jsx
<input vModel_trim={this.newTodoText} />
```

`.stop` : stop event bubbling, use `event.stopPropagation()` in `JSX` instead

`.prevent`: prevent default behavior, use `event.preventDefault()` instead in `JSX`

`.self`: The callback is only fired if the event was fired from the element itself to which the listener was bound

```js
if (event.target !== event.currentTarget) {
  return
}
```

`.enter` and `keyCode`: trigger callback only when a specific key is triggered

```js
if (event.keyCode === 13) {
  // execute logic
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

##### with parameters:

```jsx
<input vOn:click={this.newTodoText} />
```

##### Using parameters and modifiers:

```jsx
<input vOn:click_stop_prevent={this.newTodoText} />
```

##### v-on:

```jsx
// The following can be written
<button vOn:click={this.onClick} />
<button v-on:click={this.onClick} />
<button onClick={this.onClick} />
<button on-click={this.onClick} />
<button on={{'click':this.onClick}} />

// custom event name
this.$emit('icon-click')
<button onIconClick={this.onClick} />

// native modifier
<button nativeOnClick={this.onClick} />

// pass parameters
<button on-click={this.onClick.bind(this,argument)} />

// dynamic event name
<button on={{[this.event]:this.onClick}} />

// event is automatically passed in as the last parameter
<button on-click={$event => this.event(param, $event)} />

// trigger function group
<button onClick={[onClick1,onClick2]} />
```

##### v-html:

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

##### v-if and v-for

Use js native capabilities

```jsx
const thead = this.hideHeader ? null : (
  <thead>
    {this.weekDays.map(day => (
      <th key={day}>{day}</th>
    ))}
  </thead>
)
```

#### Functional components

Translate JSX-returning arrow functions into functional components, when they are the default exports:

```jsx
export default ({ props }) => <p>hello {props.message}</p>
```

or PascalCase variable declaration:

```jsx
const HelloWorld = ({ props }) => <p>hello {props.message}</p>
```

## Vue3

### Installation

Install the plugin

```sh
npm install @vue/babel-plugin-jsx -D
```

Configure Babel

```json
{
  "plugins": ["@vue/babel-plugin-jsx"]
}
```

The following configurations are available

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

Convert on: { click: xx } to onClick: xxx

#### optimize Type: boolean

Default: false

Whether to enable optimization. If you are not familiar with Vue 3, it is not recommended to enable

#### isCustomElement

Type: (tag: string) => boolean

Default: undefined

custom element

#### mergeProps Type: boolean

Default: true

Merged class / style / onXXX handlers

#### enableObjectSlots

Use enableObjectSlots (mentioned later in the documentation). Although it is easier to use in JSX, it will add some runtime conditional judgments of \_isSlot, which will increase the size of your project. v-slots can still be used even if you turn off enableObjectSlots

#### pragmas

Type: string

Default: createVNode

Replace the function used when compiling JSX expressions

### Syntax

#### content

functional components

```jsx
const App = () => <div></div>
```

use in render

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

#### Properties/Props

```jsx
const App = () => <input type="email" />
```

Dynamic binding:

```jsx
const placeholderText = 'email'
const App = () => <input type="email" placeholder={placeholderText} />
```

#### directives

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

> Note: if you want to use arg, the second parameter needs to be a string

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

will compile to:

```jsx
h(A, {
  argument: val,
  argumentModifiers: {
    modifier: true
  },
  'onUpdate:argument': $event => (val = $event)
})
```

##### v-models (deprecated since 1.1.0)

> Note: You should pass a 2D array to v-models.

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

will compile to:

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

##### Custom Instructions

It is recommended to use only argument

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

#### slot

> Note: In jsx, v-slots should be used instead of v-slot

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

// Alternatively, you can use object slots when `enableObjectSlots` is not `false`
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

#### Using in TypeScript

`tsconfig.json:`

```json
{
  "compilerOptions": {
    "jsx": "preserve"
  }
}
```

## Review

- The jsx syntax part of Vue3 continues Vue2

- jsx is to render xml in render, object is displayed as undefined

- JSX is a format that combines Javascript and XML. React invented JSX, which uses HTML syntax to create a virtual DOM. When the `<` symbol is encountered, JSX is parsed as HTML, and when the `{` symbol is encountered, it is parsed as JavaScript.

- Vue recommends using templates to create your HTML in most cases. However, in some scenarios, you really need the full programming capabilities of JavaScript. Then you can use render functions, which are closer to the compiler than templates.

- Because jsx is the rendering layer, you can directly use some new features, such as optional chain `?.`, and use in templates requires additional dependencies
