# Webpack - 前端自动化导入

## 一、require.context

在阅读 vue-element-admin 项目过程中,作者采用如下操作,引入了全局使用到的 svg 矢量图

```javascript
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
```

心中不免有些疑惑,短短两行即可实现上百文件的导入,其作用原理是什么呢?

不难看出关键在于 require.context 这个对象

查阅[官方文档](https://webpack.js.org/guides/dependency-management/#require-context)可知,这个对象必须使用了 webpack 构建项目 (或在内部使用了 webpack 的  Vue CLI 3+)，那么就可以使用  `require.context`

分析一下 require.context 这个函数

```javascript
require.context(
  directory: String,
  includeSubdirs: Boolean /* 可选的，默认值是 true */,
  filter: RegExp /* 可选的，默认值是 /^\.\/.*$/，所有文件 */,
  mode: String  /* 可选的， 'sync' | 'eager' | 'weak' | 'lazy' | 'lazy-once'，默认值是 'sync' */
)
```

这个函数一共接受四个参数

1. directory 导入文件路径 string 类型
2. includeSubdirs 是否递归子文件夹 boolean 类型
3. filter filter 过滤 传 正则表达式
4. mode 模式 有以下四种模式 'sync' | 'eager' | 'weak' | 'lazy' | 'lazy-once'

代码中 require.context 返回一个 req,将其在 console 输出 

![webpackContext.png](/images/articles/webpack-context.webp)

返回值是一个名为 webpackContext 的函数

那么它的作用原理是什么呢?那必须通过查阅源码才可得知.

```javascript
__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)

var map = {
  './404.svg': './src/icons/svg/404.svg',
  './account.svg': './src/icons/svg/account.svg',
  './admin.svg': './src/icons/svg/admin.svg',
  './bug.svg': './src/icons/svg/bug.svg'
}

function webpackContext(req) {
  var id = webpackContextResolve(req)
  return __webpack_require__(id)
}
function webpackContextResolve(req) {
  if (!__webpack_require__.o(map, req)) {
    var e = new Error("Cannot find module '" + req + "'")
    e.code = 'MODULE_NOT_FOUND'
    throw e
  }
  return map[req]
}
webpackContext.keys = function webpackContextKeys() {
  return Object.keys(map)
}
webpackContext.resolve = webpackContextResolve
module.exports = webpackContext
webpackContext.id = 1
```

这是 webpack 源码中 md 的例子,一目了然.

当调用 require.context 函数时,webpack 模块内部会生成一个 map 对象,

返回值 webpackContext 对象上有一个属性 keys,对应一个返回模块内部对象 map 键数组的函数

内部还做了 key 是否在 map 对象本身身上的错误处理 Object.prototype.hasOwnProperty.call(obj, prop)

在通过 \_\_webpack_require\_\_(原始 require 函数。这个表达式不会被解析器解析为依赖)导入

到此习得通过 require.context 寥寥几行代码即可实现了过去数百行的导入

## 二 、Vue 全局注册组件

既然 require.context 可用于批量导入模块,那么是否可用于批量注册全局模块呢?

答案是肯定的

Vue 官方已经给出了一个很好的例子

```javascript
// Globally register all base components for convenience, because they
// will be used very frequently. Components are registered using the
// PascalCased version of their file name.

import Vue from 'vue'

// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context(
  // Look for files in the current directory
  '.',
  // Do not look in subdirectories
  false,
  // Only include "_base-" prefixed .vue files
  /_base-[\w-]+\.vue$/
)

// For each matching file name...
requireComponent.keys().forEach(fileName => {
  // Get the component config
  const componentConfig = requireComponent(fileName)
  // Get the PascalCase version of the component name
  const componentName = fileName
    // Remove the "./_" from the beginning
    .replace(/^\.\/_/, '')
    // Remove the file extension from the end
    .replace(/\.\w+$/, '')
    // Split up kebabs
    .split('-')
    // Upper case
    .map(kebab => kebab.charAt(0).toUpperCase() + kebab.slice(1))
    // Concatenated
    .join('')

  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig)
})
```

只需在 forEach 迭代过程中,过滤 map 的 key,得到注册组件名调用 Vue.component 注册即可

这里需要注意, .vue 文件通常是通过 `export default` 导出的，那么就会优先使用 `componentConfig.default`，否则回退到使用模块的根。

并且注册组件需在 Vue 实例化以前.
