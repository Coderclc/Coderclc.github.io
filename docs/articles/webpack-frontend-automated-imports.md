# Webpack - Front-end automated imports

## 1. require.context

In the process of reading the vue-element-admin project, the author adopts the following operations to introduce the svg vector graphics used globally

```javascript
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
```

I can't help but have some doubts in my heart. What is the working principle of importing hundreds of files in just two lines?

It is not difficult to see that the key lies in the require.context object

According to the [official documentation](https://webpack.js.org/guides/dependency-management/#require-context), this object must use webpack to build the project (or Vue CLI 3+ that uses webpack internally) , then you can use `require.context`

Analyze the require.context function

```javascript
require.context(
  directory: String,
  includeSubdirs: Boolean /* optional, default is true */,
  filter: RegExp /* optional, default is /^\.\/.*$/, all files */,
  mode: String /* optional, 'sync' | 'eager' | 'weak' | 'lazy' | 'lazy-once', default value is 'sync' */
)
```

This function accepts a total of four parameters

1. directory import file path string type
2. Whether includeSubdirs recursively subfolders boolean type
3. filter filter filter by regular expression
4. mode There are four modes: 'sync' | 'eager' | 'weak' | 'lazy' | 'lazy-once'

In the code, require.context returns a req and outputs it in the console

![webpackContext.png](/images/articles/webpack-context.webp)

The return value is a function called webpackContext

So what is its working principle? It must be known by consulting the source code.

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

This is an example of md in the webpack source code, which is clear at a glance.

When the require.context function is called, a map object is generated inside the webpack module,

The return value webpackContext object has a property keys, which corresponds to a function that returns an array of map keys of the internal object of the module

Internally, the error handling of whether the key is in the map object itself is also done. Object.prototype.hasOwnProperty.call(obj, prop)

After importing via \_\_webpack_require\_\_ (the original require function. This expression will not be resolved as a dependency by the parser)

At this point, I have learned that the import of the past hundreds of lines can be achieved with a few lines of code through require.context

## Second, Vue global registration components

Since require.context can be used to batch import modules, can it be used to batch register global modules?

The answer is yes

Vue official has given a good example

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

Just in the forEach iteration process, filter the key of the map, get the registered component name and call Vue.component to register

It should be noted here that .vue files are usually exported through `export default`, then `componentConfig.default` will be used first, otherwise it will fall back to using the root of the module.

And registering components needs to be done before Vue is instantiated.
