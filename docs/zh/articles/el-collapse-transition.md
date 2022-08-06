# El Collapse Transition

因为[El Tree](https://element.eleme.cn/2.13/#/zh-CN/component/tree)不满足项目需要,恰巧 element 提供了修改源码的能力.

修改完之后打包直接引入打包好的 ugly 文件是没问题的,但是这样全量引入了 element,而项目中使用的是[按需引入方案](https://element.eleme.cn/2.13/#/zh-CN/component/quickstart#an-xu-yin-ru)

所以可以直接把修改好的 packages 下 tree 模块整个复制到项目中

![element-tree](/images/articles/element-tree.jpg)

这个时候出现问题了 el-tree 的展开和缩放时的动画能力丢失了

仔细阅读源码发现缩放动画组件是包含在`ElCollapseTransition`这个组件内 ,tree 作为插槽内容嵌入其中

而复制过来的 tree 模块中的`collapse-transition.js` 代码是用的 Class ES6 语法,而直接 new 类的实例直接挂载到 Vue 上,Vue 是监听不到的,因为实例能够访问的方法并不是真正的在实例身上,而是在实例的原型上.`v-on`无法监听原型上的方法.

所以解决问题直接把`collapse-transition.js` 中的语法替换成 ES5 即可
