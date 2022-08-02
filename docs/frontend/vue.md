# Vue

1. Passive is used for mobile terminal operations to perform the default behavior first, not all behaviors, a few

2. Get e.key, e.keyCode and convert key(name) to .kebab-case

3. System modifier keys .ctrl .alt .shift .meta keyup must modify other cases, and trigger after releasing other keys, and keydown triggers directly

4. Vue.config.keyCodes custom keycodes

5. If the page has not changed, the vuedevtools view will not refresh even if the data changes

6. The template will only look for the vm, and the prototype will not look for the global scope, but in js you can put the window on the data body,

7. Compare the diff algorithm between the old virtual dom and the new virtual dom, compare the same keys, keep the same, not redraw the same, the value of the input input box is on the real dom, because the index is used to compare, and the The order is out of order, so there will be errors, and the default "in-place update" strategy is used. It will not move the order of the dom, but update it in place, that is, reuse it for reuse. Or deliberately rely on the default behavior to improve performance (sometimes the default behavior is better).

> The special attribute of `key` is mainly used in Vue's virtual DOM algorithm to identify VNodes when comparing old and new nodes. Without keys, Vue uses an algorithm that minimizes dynamic elements and tries to modify/reuse elements of the same type in-place as much as possible. When using the key, it will rearrange the order of elements based on the change of the key, and will remove/destroy the element whose key does not exist.

8. After Vue.set(vm,key,value), the data in observe vm.\_data has been copied to vm (array can also be manipulated)

> ​ But avoid appending a responsive property to the Vue instance or $data of the root node, it must be used to add new props to the responsive object

9. It is impossible to modify the array directly by modifying the index value of the array because there is no get, set, but the objects in the array have get, set, and the methods of the array can be detected by vue because these methods are hooked and wrapped (objects). , array, etc. any data type initialization definition has getter and setter, only the index in the array, and newly added, deleted without getter, setter)

10. This explains why if it is a getter, the displayed data is the data after the result, because it is only obtained when clicking..., but if the console.log is to a specific key, it will be different, and it also explains why If I don't declare form.src it will cause src to not respond

11. The `**Object.defineProperty()**` method will directly define a new property on an object, or modify an existing property of an object, and return the object. Cannot hijack the index value of adding or deleting arrays, the first parameter can only be an object, p'roxy is invincible, proxy deleteProperty monitors deletion

12. > Vue executes asynchronously when updating the DOM. As soon as it hears a data change, Vue will open a queue and buffer all data changes that happen in the same event loop. If the same watcher is fired multiple times, it will only be pushed to the queue once.

The watch monitor has a getter and a setter to trigger the watch, but triggering the watch will not necessarily refresh the DOM. If the prop is not in the dependency list after the first rendering, the DOM will not be updated even if the watch is triggered, because it is not in the dependency list (ie The property) message queue that is accessed during the rendering process, the job queue opens another watch, and the same queue triggers multiple watches, which will only be pushed into the queue once. But different queues will push multiple times.

13. If v-model checkbox is an array, it means adding or deleting value. If it is a string, Boolean means collecting the checked value.

14. .numer is converted to number value type=''number' can only input number

15. Custom instruction `update`: called when the component's VNode is updated, **but may occur before its child VNode is updated**. The value of the instruction may or may not have changed. But you can ignore unnecessary template updates by comparing the values before and after the update, the value of the custom directive should happen in the dom tree update instead of a single bind value change

16. Execute similar foucus in bind, parentnode is invalid, at this time dom has not been successfully mounted, it needs to be in insert

17. The input type change vdom refresh is caused by switching the eye. At this time, the refreshed input and focus must be executed at the same time as nexttick, and mousedown is focus and mouseup is click.

18. BeforeCreated data proxy data monitoring, debugger has no coder custom content, data, method

19. The template option will replace the entire div#app, while el,mouted just mounts

20. BeforeUpdate data is new page is old, next Virtual DOM re-render and patch

21. The getter in vm.$destory() beforeDestroy() destroyed() will not update the view, one is to remove the destroy, and the other is to call the method to destroy, both of which are unbinding instructions, remove event monitoring, and Not really destroy

> In most scenarios you should not call this method. It is best to use the `v-if` and `v-for` directives to control the lifecycle of child components in a data-driven way.

22. Before this.$forceUpdate() I thought that the logic of adjusting update() was wrong. It should be forced to refresh the DOM, update some DOMs that are not triggered by getters, and the virtual DOM patch will trigger the update

23. Vue.extend creates a component constructor template from the template option or template tag. When using it, register and mount it locally, or create an instance of new $mounted

24. The name of vue devtools depends on the option name, which can be set to pascalcase or kebabcase

25. In non-.vue, the first letter of the tag will be converted to lowercase by html, the rest will not be converted, and the html template cannot recognize uppercase

26. Vue.extend produces component constructors, component constructors 1. Manual new construction() 2. Writing </> Vue will help us register an instance object to execute Vue.extend, an instance label and a new

27. The prototype of the component constructor is an instance of Vue. The implicit prototype of the display prototype of the component constructor points to the display prototype of Vue, using Object.create

28. index.html

- noscript does not support js

- `<meta http-equiv="X-UA-Compatible" content="IE=edge">` for IE to use the highest rendering level to render the page

- `<meta name="viewport" content="width=device-width,initial-scale=1.0">` to enable ideal viewport on mobile

29. vue-template-compiler parses .vue template

30. View all configuration items of vue vue inspect > output.js

31. Prop can be a function, then sub-components can pass data through the prop function, prop will report an error only if the basic data type and reference data type address are changed, and the rest will not report an error

32. v-model does not need to write @change for a computed property such as checkbox

33. vm.$refs.cpn.$on('test', function (msg) { console.log(msg) }) Manually monitor custom events

34. Because destroy() will teardown watchers child components and event listeners, custom events will be dismantled, whether it is @ or $on bound events will be dismantled, $off can teardown at a specified time, and can be dismantled

35. $emit and $on must be the same instance and the function callback this of $on is not the window but the triggered instance

36. $bus can be added before vue.beforeCreate

37. $set can add some data such as isEdit = false without initialization. It is perfect to use hasOwnProperty'' to prevent repeated $set

38. Animation in active transition in to leave

39. The devServer proxy executes the backend, and the local request points to the local proxy. 1. If it already exists locally, it will not be forwarded. 2. More than one cannot be configured. 1. If the string public already exists, it will not be forwarded.

40. To avoid the above situation, use [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#proxycontext-config) . , configure the prefix for forwarding, otherwise it will not be forwarded, and forwarding will put the prefix Also bring it, you need to configure it not on the official website pathRewrite: {'^/api': '' }, ws proxy websockets , changeOrigin: false, disguise true disguised as server port

41. Slots are scoped to parent, but styles are scoped to parent-child

42. Slots with the same name are accumulated instead of overwritten.

43. After installing Vuex, the option store configured in vue will hang $store on the instance

44. Vue.use(Vuex) must be before new Vuex.Store, it cannot be adjusted by adjusting the import order, (it will be advanced) can be adjusted by asynchronous import('')

45. The early native of import is like this type='module' instead of webpack

46. In the module scope, you will receive local dispatch and commit, but instead to use the global one, you need to add { root: true } to the third parameter

47. Register global action or mutation in module scope using handler and root: true,

48. First-level routing plus / remaining level no /

49. /path/:id placeholder pass parameter path/123 params :{id:123}, params must be name, query can be

50. The object mode of routes (dead value) Boolean mode -> params function mode query props: true can make params a props

51. props: route => ({ name: route.query.name }) can make name a props

52. If you use the object method to jump, the query will be added after the url, and the params must have a statement to be added after it, otherwise the params will be lost after the refresh

53. keep alive is the component name, so don’t worry about the routing name

54. The part after hash /#/ will not be sent to the server as a path. If the hash mode is equivalent to accessing the server's index.html file all the time, then the path after the hash value is used by sfc itself and Jump, if you use the history mode, you must forward the unreachable path (because you go back and request the file of the corresponding path) to index.html in the backend

55. monorepo management

- mono single, repo repository
- Multiple packages are independent of each other, have their own functional logic, unit testing, and are easy to manage under the same warehouse
- The modules are clearly divided, maintainable, and expandable

56. Vue3 uses es6's Proxy to implement hijacking

- Object.defineProperty used by Vue2.x to hijack the getter and setter of obj. The defect is that setting and deletion cannot be hijacked, so use the corresponding hack methods api$delete, $set,

57. Removed some unnecessary APIs

- Removed $on, $off, $once,
- Removed filter, inline template inline-template (both the data declared in the parent component and the data declared in the child component can be rendered, which is a disadvantage), etc.

58. Compiler optimizations

- Generate block tree, optimize slot compilation, optimize diff algorithm, reduce package size by 41%, initial rendering is 55% faster, update rendering is 133% faster, and memory is reduced by 54%
- Rewrite virtual DOM implementation and achieve better tree-shaking

59. From Options API to Composition Api

- In Vue2.x, the Options API is used to describe component objects, including options such as data, props, methods, computed, life cycle, etc. The problem is that multiple logics may be in different places, jumping around?
- The composition API can put related code on the same line for processing without having to search between multiple Options

60. Hooks function to increase code reusability

- Vue2.x uses mixins to share component logic. The defect is that mixins are also composed of Options. Multiple mixins will have naming conflicts.
- 3.x can extract part of the independent logic through the hook function, and it can also be responsive!

61. Hugs ts

62. When vite comes up, the server is ready and then requests to analyze the dependencies

63. const app = createApp(App) is lighter

64. setup

- the new configuration item is a function before all lifecycles (so no this)
- The returned object is used in templates, or directly returns the render function()=>(\<section>\</section>)
- Try not to mix these, vue2.x can access the properties and methods in setup, but not vice versa, there is no this
- If the name is the same, setup takes precedence over object.assign
- If you don't want to write the root, use <></> to write

65. refImpl reference implement The reference implementation is automatically expanded in the template. value, render will not automatically expand the instance of the return reference implementation

66. object.define for ref proxy basic data type, proxy for reference, proxy for reactive proxy, ref proxy object actually uses ref(reactive())

67. Ordinary objects in ref will be converted into proxy, accessed through .value,

68. Reading the refImpl in the proxy key will automatically expand the value, but the index value will not automatically expand

69. ref(ref()) reactive(reactive()) returns itself ref(reactive()) reactive(ref()) returns ref

70. The delete keyword has a return value. For example, deleting the key value of an object without configuration and non-enumerable will return false.

71. Object,defineProperty can't redefine Reflect.defineProperty can

72. Reflect.defineProperty has a return boolean value indicating the success of the proxy

73. this.$slots.default is a vnode so it is used for render instead of template

74. setup has two parameters, the first is the parameter declared by the props option. The second is ctx contains {attrs (props not declared), emit, slots, expose}

75. It seems to only support onSubmit small camel case to listen to events

76. vue3ref The variable generated by ref() is bound to the ref in the template or rendering function, and then the Proxy object of the cpn.value of the component instance can be obtained in the onMounted life cycle, and the parameter expose in the setup can be obtained by ref The instance object is changed to the object exposed by expose

77. The computed return is also a reference implementation instance object, and computed, and watch can only capture changes in responsive data

78. watch listens to multiple calls or passes in an array, and the new value and the old value received are also arrays

79. - refer to the same address as the old and new value of the data type (vue2 has this problem),

- It seems that you can listen deeply without deep: true, (the proxy object does not need to force the deep function to return the object to need deep, and the function returns the basic data type does not need to be deep.
- The key of the object cannot be monitored in this way. State.count uses the callback function ()=>state.count
- Unable to monitor changes in proxy in ref, as well as changes in objects returned by getter, you need to monitor proxy directly through .value, or enable deep

80. Vue3 life cycle app is more lightweight than vm, unmounted, beforeUnmount rename, must be mounted to perform initialization init, (vue2 can be mounted after created)

81. hooks folder useXXX.js

82. Directly return the responsive object or return{...toRefs(responsive object)}, object destructuring to interrupt the responsiveness is the proxy's pot

83. Direct ref generation of refImp breaks the association and generates a new ref

84. ShallowReactive The first layer of responsiveness, how is it implemented internally??? (The multi-level set of proxy itself will not trigger set, but trigger get

85. ) shallowRef does not deal with objects, that is, it does not call reactive internally, the first layer is replaced, or it is a basic type or reactive

86. toRaw returns the source object, there is still the association of the object, but there is no response, two concepts, the address of the object is the same, whether there is a response

87. ...toRefs() The template directly accesses the key, but if the key does not exist, an error will be reported, but if the key in the access object is undefined, and the direct template of vue2 accesses data that does not exist in data and the object on data does not exist The data principle is the same

88. markRaw returns an object itself so that it will not be converted into a proxy, lock this object, such as adding a very complex and unchanged object to a proxy object, you can reduce overhead through markRaw

89. The readonly object cannot be changed, but the change of the source object will still cause the change of the readonly object, that is, the proxy and the address are still there, toRaw returns the source object, loses the response, and the address is still the same, markRaw is forcibly unable to proxy.

90. ```javascript
    const useDebouncedRef = () => {
      // value can also be a parameter
      let value
      return customRef((track, trigger) => {
        return {
          get() {
            console.log('get')
            track()
            return value
          },
          set(newVal) {
            console.log('set')
          }
        }
      })
    }
    // The difference from computed is the lack of track, trigger
    // Use a variable to receive, display that variable, and customRef only needs one variable
    ```

````

91. Synchronous components, wait for all components to be loaded before rendering, asynchronous components, which are loaded first and rendered first, but this leads to a new problem, that is, the page blank period

```html
<!-- use suspense -->
<suspense>
<template v-slot:default> </template>
<template v-slot:fallback> </template>
</suspense>
````

92. Top level await

```vue
<script setup>
  await new Promise(resolve => {
    setTimeout(() => {
      resolve('')
    }, 3000)
  })
</script>
<template>
  <h1> demo </h1>
</template>
```

Using await code at the top level of setup will be compiled into async setup(): with suspense and defineAsyncComponent

```vue
<script setup>
  import { defineAsyncComponent } from 'vue'
  const Demo = defineAsyncComponent(() => import('./Demo.vue'))
</script>

<template>
  <suspense>
    <template #default>
      <Demo />
    </template>
    <template #fallback>
      <h1> loading...Loading</h1>
    </template>
  </suspense>
</template>
```

93. The file:/// protocol needs to set the publicPath to ./ and the hash mode. The cookie cannot be used. The cookie is the product of http

94. hook

Replace destroyed api: `$on('hook:xxx')`

@hook:mounted='doSomething' monitors the life cycle of child components

95. Performance Optimization Tips

The JS engine is a single-threaded operation mechanism. The JS thread will block the UI thread, so when the script execution time is too long, the rendering will be blocked, causing the page to freeze. `script` has a short execution time, so it performs better.

[vue-9-perf-secrets ](https://slides.com/akryum/vueconfus-2019#/) [Nuggets](https://juejin.cn/post/6922641008106668045#heading-2)

1. Function components

A large number of reused sub-components without responsive data use functional components. Unlike ordinary object-type components, functional components will not be regarded as a real component. We know that in the `patch` process, if you encounter A node is the component `vnode`, which recursively executes the initialization process of subcomponents; while the `render` of functional components generates a normal `vnode`, and there is no recursive subcomponent process, so the rendering overhead will be much lower. So functional components don't have state, they don't have reactive data, they don't have lifecycle hooks. You can think of it as stripping out a part of the DOM in the normal component template and rendering it through a function, which is a kind of reuse at the DOM level

2. child component splitting

The execution logic of this time-consuming task `heavy` function is encapsulated with the child component `ChildComp`. Since the update of Vue is component granularity, although the data modification of each frame leads to the re-rendering of the parent component, the `ChildComp` But it won't re-render because it doesn't have any responsive data changes inside it either. Therefore, the optimized component will not perform time-consuming tasks on each rendering, and the natural execution time of JavaScript will be reduced. Reduced re-rendered components

3. local variables

When a large number of repeated operations of this are performed, the cache is localized first, and computed passes this in by default.

4. reuse dom with v-show

Use v-show instead of v-if

5. keep-alive

Space for time, occupying memory cache

6. Deferred features

Rendering in batches using the `Defer` mixin

7. time slicing

When the script execution time is too long, it may be stuck

8. Non-reactive data

```javascript
const data = items.map(item => ({
  id: uid++,
  data: item,
  vote: 0
}))
// The object key is responsive, which increases the overhead. When the amount of data is large, the script overhead is delayed
```

```javascript
const data = items.map(item => optimizeItem(item))

function optimizeItem(item) {
  const itemData = {
    id: uid++,
    vote: 0
  }
  Object.defineProperty(itemData, 'data', {
    // Mark as non-reactive
    configurable: false,
    value: item
  })
  return itemData
}
```

Similarly, if you want to share a piece of data in the context, it does not necessarily have to be bound to the data

9. virtual scrolling

The reason for this difference is that virtual scrolling is implemented by rendering only the DOM in the viewport, so that the total number of rendered DOMs is very small, and the natural performance will be much better.

The virtual scrolling component is also written by [Guillaume Chau](https://github.com/Akryum), and interested students can study its [source code implementation](https://github.com/Akryum/vue-virtual- scroller). Its basic principle is to listen to scroll events, dynamically update the DOM elements that need to be displayed, and calculate their displacement in the view.

The virtual scroll component is not without cost, because it needs to be calculated in real time during the scrolling process, so there will be a certain `script` execution cost. So if the amount of data in the list is not very large, we can use normal scrolling.
