# El Collapse Transition

Because [El Tree](https://element.eleme.cn/2.13/#/zh-CN/component/tree) does not meet the needs of the project, it happens that element provides the ability to modify the source code.

After the modification, it is no problem to directly import the packaged ugly file, but the element is fully introduced in this way, and the project uses the [on-demand import scheme] (https://element.eleme.cn/2.13/#/ zh-CN/component/quickstart#an-xu-yin-ru)

So you can directly copy the entire tree module under the modified packages to the project

![element-tree](/images/articles/element-tree.jpg)

At this time, there is a problem. The animation ability of el-tree when expanding and zooming is lost.

Carefully read the source code and found that the zoom animation component is included in the `ElCollapseTransition` component, and the tree is embedded as the slot content.

The `collapse-transition.js` code in the copied tree module uses the Class ES6 syntax, and the instance of the new class is directly mounted on Vue, which cannot be monitored by Vue, because the methods that the instance can access are not Not really on the instance, but on the instance's prototype. `v-on` cannot listen to methods on the prototype.

So to solve the problem, just replace the syntax in `collapse-transition.js` with ES5
