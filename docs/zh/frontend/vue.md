# Vue

1. passive 用于移动端操作先执行默认行为 ,并不是所有的行为,少部分

2. 获取 e.key,e.keyCode 将 key(name) 转为.kebab-case

3. 系统修饰键 .ctrl .alt .shift .meta keyup 必须要修饰其他案件,且在释放其他按键后触发,keydown 直接触发

4. Vue.config.keyCodes 自定义 keycodes

5. 如果页面没有发生改变,即使数据改变 vuedevtools 视图不会刷新

6. template 只会找 vm 上的,和原型不会去找全局作用域 但在 js 上可以把 window 放在 data 身上,

7. 旧虚拟 dom 和新虚拟 dom 之间进行 diff 算法对比,key 相同的之间比较,相同保留,不相同重绘,input 输入框的值是在 real dom 上的 ,因为用 index 比较,又打乱了顺序,所以会出错,默认的使用“就地更新”的策略。不会移动 dom 的顺序,而是就地更新,即为能复用就复用. 或者是刻意依赖默认行为以获取性能上的提升(有时候默认行为性能反而更好)。

   > `key` 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除/销毁 key 不存在的元素。

8. Vue.set(vm,key,value) 后添加 observe vm.\_data 内的数据已被 copy 到了 vm 上(也可以操作数组)

   > ​ 但避免追加一个响应式的属性到 Vue 的实例或者根节点的$data 上,必须用于响应式对象上添加新的 prop

9. 直接通过数组的索引值修改是无法修改数组的因为无 get,set 但是数组内的对象有 get,set,而数组的方法能够被 vue 检测到是因为这些方法被 hook 了,被包装(对象,数组,等任何数据类型初始化定义都有 getter 和 setter,只有数组内的索引,和新添加的,删除的没有 getter,setter)

10. 这样解释了为什么如果是 getter 的话,展示的数据为结果后的数据,因为都是在点击...的时候才重新获取,但如果 console.log 到具体 key 就不同了,也解释了为什么我如果没有声明 form.src 就会导致 src 无法响应

11. `**Object.defineProperty()**` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。无法劫持新增,删除数组的索引值,第一个参数只能是对象,p'roxy 无敌,proxy deleteProperty 监听删除

12. > Vue 在更新 DOM 时是**异步**执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。

    watch 监听 有 getter 和 setter 才能触发 watch , 但触发了 watch 不一定会刷新 dom,如果首次渲染后的依赖列表里面没有该 prop,即使触发了 watch 也不会更新 dom,因为其不在依赖项列表(即在渲染过程中被访问的 property) 消息队列,作业队列的开启另外的 watch, 同一个队列触发多次 watch,，只会被推入到队列中一次。但是不同队列会推多次.

13. v-model checkbox 为数组即为添加删除 value 值, 为字符串,布尔即收集 checked 值

14. .numer 转为 number 值 type=''number' 只能输入 number

15. 自定义指令`update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 ,自定义指令的值该发生在 dom tree update 而非单一 bind value change

16. 在 bind 执行类似 foucus,parentnode is invalid ,此时 dom 还未成功挂载,需要在 insert 中

17. 因为切换 eye 导致 input type change vdom refresh,此时刷新后的 input 与 focus 同时,须在 nexttick 执行,且 mousedown 为 focus ,mouseup 为 click

18. beforeCreated 数据代理数据监测之前此时 debugger 无 coder 自定义内容,data,method

19. template 选项会整个替换 div#app,而 el,mouted 只是挂载

20. beforeUpdate 数据是新的页面是旧的,接下来 Virtual DOM re-render and patch

21. vm.$destory() beforeDestroy() destroyed() 里的 getter 不会才更新视图 ,一种是移除销毁,一直是调方法销毁,二者皆为解绑指令,移除事件监听,并不是真正意义上的销毁

    > 在大多数场景中你不应该调用这个方法。最好使用 `v-if` 和 `v-for` 指令以数据驱动的方式控制子组件的生命周期。

22. this.$forceUpdate() 之前我认为的是调 update() 逻辑错了,应该是强制刷新 dom,更新一些无 getter 触发的 dom,虚拟 dom patch 会触发 update

23. Vue.extend 创建组件构造器 模板来源于 template 选项 或者 template 标签,使用的时候,在局部注册挂载, 或者 new 一个实例$mounted

24. vue devtools 名字取决于选项名字,可设置为 pascalcase 或者 kebabcase

25. 在非.vue ,标签首字母会被 html 转换为小写,其余不会转换,html 模板无法识别大写

26. Vue.extend 生产的是组件构造函数,组件构造器 1.手动 new construction()2.写</> Vue 会帮我们 new 一个实例对象 注册执行 Vue.extend,一个实例标签一个 new

27. 组件构造器的原型是一个 Vue 的实例,组件构造器的显示原型的隐示原型指向 Vue 的显示原型,采用 Object.create

28. index.html

    - noscript 不支持 js

    - `<meta http-equiv="X-UA-Compatible" content="IE=edge">` 针对 ie 的配置,使其使用最高级别的渲染级别渲染页面

    - `<meta name="viewport" content="width=device-width,initial-scale=1.0">` 开启移动端的理想视口

29. vue-template-compiler 解析.vue 的 template

30. 查看 vue 的所有配置项目 vue inspect > output.js

31. prop 可以是一个函数,那么子组件可以通过 prop 函数传递数据,prop 只有改变基本数据类型和引用数据类型地址才会报错,其余不报错

32. v-model 一个计算属性就不用写@change 了例如 checkbox 上

33. vm.$refs.cpn.$on('test', function (msg) { console.log(msg) }) 手动监听自定义事件

34. 因为 destroy() 会 teardown watchers child components and event listeners 销毁会拆解自定义事件,无论是@还是 $on绑定的事件都会被拆解,$off 可以在指定的时候 teardown,且都能拆

35. $emit 和$on 必须是同一个实例 且$on 的 function 回调 this 不是 window 而是触发的实例

36. 可在 vue.beforeCreate 之前添加$bus

37. $set 就可以不用初始化添加一些例如isEdit = false 这种数据了 完美一点使用hasOwnProperty''防止重复$set

38. 动画在 active 过渡在 to leave

39. devServer proxy 执行后端,本地请求指向本机代理,1.本地已有不会转发 2.无法配置多个,1.字符串 public 已有不转发否则转发

40. 避免以上情况 使用 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#proxycontext-config) . ,配置前缀,为转发,否则不转发,转发会把前缀也带上,需要不在官网的配置 pathRewrite: {'^/api': '' }, ws proxy websockets , changeOrigin: false, 伪装 true 伪装成服务器端口

41. 插槽的作用域为父,但样式作用域为父子

42. 插槽相同名字为累加而非覆盖.

43. 安装了 Vuex 之后 配置在 vue 的选项 store 会在实例上挂着$store

44. Vue.use(Vuex) 必须在 new Vuex.Store 之前 ,无法通过调整 import 的顺序,(会提前)可通过异步 import('')调整

45. import 的提前原生就是这样的 type='module' 而非 webpack

46. 在 module 作用域 会收到局部的 dispatch 和 commit 但相反要使用全局的需要在第三个参数加{ root: true }

47. 在 module 作用域注册全局 action 或者 mutation 使用 handler 和 root: true,

48. 一级路由加 / 其余级 no /

49. /path/:id 占位 传参 path/123 params :{id:123},params 必须为 name ,query 都可以

50. routes 的对象模式(死值) 布尔模式->params 函数模式 query props: true 可以使 params 成为一个 props

51. props: route => ({ name: route.query.name }) 可使 name 成为一个 props

52. 如果用对象方式跳转,query 会在 url 后添加,而 params 必须要有声明才能在其后添加,否则刷新后丢失 params

53. keep alive 是组件名,所以路由名不担心

54. hash /#/ 后的一部分不会作为路径发给服务器,如果是哈希模式相当于一直都在访问服务器的 index.html 这个文件,然后哈希值后面的路径都是 sfc 自己在使用并且跳转,如果使用 history 模式,则必须在后端将访问不到的路径(因为回去请求对应路径的文件) 都转发到 index.html

55. monorepo 管理

    - mono 单个,repo repository 仓库
    - 多个包之间相互独立,有自己的功能逻辑,单元测试,同一个仓库下方便管理
    - 模块划分清晰,可维护性,可拓展性强

56. Vue3 改用 es6 的 Proxy 实现劫持

    - Vue2.x 使用的 Object.defineProperty 来劫持 obj 的 getter 和 setter,缺陷是设置和删除无法劫持,所以用相应的 hack 方法 api$delete,$set,

57. 删除了一些不必要的 api

    - 删除了$on,$off,$once,
    - 移除了 filter,内联模板 inline-template(在父组件中声明的数据和子组件中声明的数据两个都可以渲染,这反而是缺点)等

58. 编译方面的优化

    - 生成 block tree ,slot 编译优化,diff 算法优化,打包大小减少 41%,初次渲染快了 55%,更新渲染快 133%,内存减少 54%
    - 冲重写虚拟 DOM 的实现和实现更好的 tree-shaking

59. 由 Options API 到 Composition Api

    - 在 Vue2.x 通过 Options API 来描述组件对象,包括 data,props,methods,computed,生命周期等选项,问题在于多个逻辑可能实在不同的地方,跳来跳去?
    - composition API 可以将相关联的代码放到同一行进行处理,而不需要在多个 Options 之间寻找

60. Hooks 函数增加代码的复用性

    - Vue2.x 使用 mixins 来共享组件逻辑,缺陷在于 mixins 也使由 Options 组成的,多个 mixins 会存在命名冲突的问题,
    - 3.x 可以通过 hook 函数,将一部分独立的逻辑抽取出去,并且还能做到是响应式的!

61. 拥抱 ts

62. vite 上来就 server ready 其次请求再分析依赖

63. const app = createApp(App) 更轻了

64. setup

    - 新的配置项 是一个在所有生命周期之前的函数(所以没有 this)
    - 返回对象则用于模板中使用,或者直接返回 render 函数()=>(\<section>\</section>)
    - 尽量不要混这些,vue2.x 中可以访问 setup 中的属性和方法,反过来不行,没有 this
    - 如果重名,setup 优先 object.assign
    - 不想写根就用<></>来写

65. refImpl reference implement 引用实现 在模板中自动展开.value ,render 不会自动展开返回引用实现的实例

66. ref 代理基本数据类型用的 object.define,引用用的 proxy,reactive 代理用的 proxy, ref 代理对象其实就是使用了 ref(reactive())

67. ref 中的普通对象会被转换成 proxy,通过.value 访问,

68. 读取 proxy key 中的 refImpl 会自动展开 value,index 值不会自动展开

69. ref(ref()) reactive(reactive()) 返回自身 ref(reactive()) reactive(ref())返回 ref

70. delete 这个关键字是有返回值的,比如删除无配置不可枚举的对象 key 值会返回 false

71. Object,defineProperty can't redefine Reflect.defineProperty 可以

72. Reflect.defineProperty 有返回布尔值表示代理的成功与否

73. this.$slots.default 是一个 vnode 所以用于 render 而非 template

74. setup 有两个参数,第一个是 props 选项声明过的参数.第二个是 ctx 包含{attrs(未声明 props),emit,slots,expose}

75. 似乎只支持 onSubmit 小驼峰写法了监听事件

76. vue3ref 通过 ref() 生成的变量绑定在模板或者渲染函数中的 ref 然后在 onMounted 生命周期即可获得组件实例的 cpn.value 的 Proxy 对象 ,而 setup 中的参数 expose 可以将 ref 获取到的实例对象改为 expose 暴露出的对象

77. computed 返回也是一个引用实现实例对象,且 computed,和 watch 只能捕获到响应式数据的变化

78. watch 监听多个可以多次调用或者传入数组,接收到的新值旧值也是数组

79. - 引用数据类型新旧值相同的地址(vue2 就有这个问题),
    - 似乎不需要 deep:true 就可以深度监听,(proxy 对象不需要强制 deep 函数返回对象需要 deep,函数返回基本数据类型不需要多深都不需要
    - 无法监听对象的 key 这样监听.state.count 采用回调函数()=>state.count
    - 无法监听到 ref 中的 proxy 中的改变,还有 getter 返回的对象中的改变,需要通过.value 直接监听 proxy,或者开启 deep

80. Vue3 生命周期 app 相对于 vm 更轻量化, unmounted,beforeUnmount 重命名,必须挂载才能执行初始化 init,(vue2 可以再执行完 created 之后再挂载)

81. hooks 文件夹 useXXX.js

82. 直接 return 响应式对象 或者 return{...toRefs(响应式对象)},对象解构打断响应式是 proxy 的锅

83. 直接 ref 生成 refImp 打断了关联,生成新的 ref

84. shallowReactive 第一层响应式,内部怎么实现的??? (proxy 本身多层次的 set 就不会触发 set,而是触发 get

85. )shallowRef 不处理对象,即内部不调用 reactive,第一层替换,或者为基本类型还是有响应式

86. toRaw 返回源对象,仍然有对象的关联,但没有响应式,两个概念,对象的地址相同,是否有响应

87. ...toRefs() 模板直接访问 key,但是若 key 不存在就会报错,但如果访问对象的中 key 即为 undefined,和 vue2 的直接模板访问 data 不存在的数据和 data 上对象不存在的数据原理相同

88. markRaw 返回一个对象本身使其不会转换成 proxy,锁住这个对象,比如往一个 proxy 对象上添加一个很复杂的且不改变的对象,就可以通过 markRaw 减少开销

89. readonly 对象不能改变,但是源对象的改变还是会引起 readonly 对象的改变,即 proxy 和地址还在,toRaw 是返回源对象,失去了响应式,地址仍然相同,markRaw 是强制无法代理.

90. ```javascript
    const useDebouncedRef = () => {
      // value也可以是形参
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
    // 和computed的区别就是少了 track, trigger
    // 用一个变量来接收,展示那个变量即可,而customRef而已做到只需一个变量
    ```

91. 同步组件,等待所有组件加载完再渲染,异步组件,先加载的先渲染,但是就导致了一个新问题,即页面空白期

    ```html
    <!-- 用suspense -->
    <suspense>
      <template v-slot:default> </template>
      <template v-slot:fallback> </template>
    </suspense>
    ```

92. 顶层 await

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

    在 setup 顶层使用 await 代码会被编译成 async setup()： 再配合 suspense 和 defineAsyncComponent

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
          <h1> loading...加载中 </h1>
        </template>
      </suspense>
    </template>
    ```

93. file:/// 协议需要设置 publicPath 为./ 且需为 hash 模式.不能使用 cookie cookie 为 http 的产物

94. hook

    替代 destroyed api：`$on('hook:xxx')`

    @hook:mounted='doSomething' 监听子组件的生命周期

95. 性能优化技巧

    JS 引擎是单线程的运行机制，JS 线程会阻塞 UI 线程，所以当脚本执行时间过长，就会阻塞渲染，导致页面卡顿。 `script` 执行时间短，所以它的性能更好。

    [vue-9-perf-secrets ](https://slides.com/akryum/vueconfus-2019#/) [掘金](https://juejin.cn/post/6922641008106668045#heading-2)

    1. Function components

    大量复用的没有响应式数据的子组件采用 函数式组件函数式组件和普通的对象类型的组件不同，它不会被看作成一个真正的组件，我们知道在 `patch` 过程中，如果遇到一个节点是组件 `vnode`，会递归执行子组件的初始化过程；而函数式组件的 `render` 生成的是普通的 `vnode`，不会有递归子组件的过程，因此渲染开销会低很多.因此，函数式组件也不会有状态，不会有响应式数据，生命周期钩子函数这些东西。你可以把它当成把普通组件模板中的一部分 DOM 剥离出来，通过函数的方式渲染出来，是一种在 DOM 层面的复用

    2. child component splitting

    把这个耗时任务 `heavy` 函数的执行逻辑用子组件 `ChildComp` 封装了，由于 Vue 的更新是组件粒度的，虽然每一帧都通过数据修改导致了父组件的重新渲染，但是 `ChildComp` 却不会重新渲染，因为它的内部也没有任何响应式数据的变化。所以优化后的组件不会在每次渲染都执行耗时任务，自然执行的 JavaScript 时间就变少了。 减少了重新渲染的组件

    3. local variables

    大量重复操作 this 的时候,先缓存为局部,computed 默认传了 this 进来

    4. reuse dom with v-show

    使用 v-show 代替 v-if

    5. keep-alive

    空间换时间,占用内存缓存

    6. deferred features

    使用了 `Defer` 这个 `mixin`分批渲染

    7. time slicing

    当 script 执行时间过长的时候会有卡死的可能

    8. non-reactive data

    ```javascript
    const data = items.map(item => ({
      id: uid++,
      data: item,
      vote: 0
    }))
    // object  key为响应式,增加了开销,当数据量大时延迟script 开销
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

    类似的想要在上下文中共一个数据,并不一定要绑定在 data 上

    9. virtual scrolling

    之所以有这个差异，是因为虚拟滚动的实现方式，是只渲染视口内的 DOM，这样总共渲染的 DOM 数量就很少了，自然性能就会好很多。

    虚拟滚动组件也是 [Guillaume Chau](https://github.com/Akryum) 写的，感兴趣的同学可以去研究它的[源码实现](https://github.com/Akryum/vue-virtual-scroller)。它的基本原理就是监听滚动事件，动态更新需要显示的 DOM 元素，计算出它们在视图中的位移。

    虚拟滚动组件也并非没有成本，因为它需要在滚动的过程中实时去计算，所以会有一定的 `script` 执行的成本。因此如果列表的数据量不是很大的情况，我们使用普通的滚动就足够了。
