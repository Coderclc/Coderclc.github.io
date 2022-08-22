# Javascript

## 内置类型

- 八种内置类型

  - 基本类型: null undefined string number boolean symbol bigint
  - 引用类型 object

- 数字类型是浮点类型,没有整型,浮点类型基于 IEEE 754 标准实现,

- `NaN ! = NaN` `typeof NaN = number`

- 对于基本类型来说，如果使⽤字⾯量的⽅式，那么这个变量只是个字⾯量，只有在必要的时候才会转换为对应的类型

  ```javascript
  let foo = 233 // 这只是字⾯量，不是 number 类型
  foo.toString() // 使⽤时候才会转换为对象类型
  ```

  什么意思呢?要知道 233 数字可没有 toString 这个方法,为什么赋值给了 foo 却拥有了 toString 这个方法(装箱与拆箱)

  装箱：把基本数据类型转化为对应的引用数据类型的操作

  拆箱：将引用数据类型转化为对应的基本数据类型的操作（通过 valueOf 和 toString 方法）

  ```javascript
  233.hasOwnProperty('toString') // error
  new Number(233).__proto__.hasOwnProperty('toString') // true
  new Number(233) === 233 // false
  Number.prototype.hasOwnProperty('toString') // true
  Number.prototype.__proto__===Object.prototype // true
  Number.prototype.__proto__.hasOwnProperty('toString') // true
  ```

## Typeof

- typeof 对于基本类型，除了 null 都可以显示正确的类型

  ```javascript
  typeof 1 // 'number'
  typeof '1' // 'string'
  typeof undefined // 'undefined'
  typeof true // 'boolean'
  typeof Symbol() // 'symbol'
  typeof b // b 没有声明，但是还会显示 undefined
  typeof [] // 'object'
  typeof {} // 'object'
  typeof console.log // 'function'
  typeof null // 'object' 这是⼀个存在很久了的 Bug
  ```

  - 为什么会出现这种情况呢？因为在 JS 的最初版本中，使⽤的是 32 位系统，为了性能考虑使⽤低位存储了变量的类型信息， 000 开头代表是对象，然⽽ null 表示为全零，所以将它错误的判断为 object 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是⼀直流传下来。

  - 所以用 typeof 来判断类型是不严谨且容易出错的,如果我们想获得⼀个变量的正确类型，可以通过 `Object.prototype.toString.call(xx)` 。这样我们就可以获得类似 `[object Type]` 的字符串。

  - ts 自定义函数需要使用 `is` 关键字用于函数返回值类型中,帮助编译器判断

    ```javascript
    function is(val: unknown, type: string) {
      return toString.call(val) === `[object ${type}]`
    }

    function isObject(val: any): val is Record<any, any> {
      return val !== null && is(val, 'Object')
    }

    function isString(val: unknown): val is string {
      return is(val, 'String')
    }
    ```

  - 判断是否为 undefined 还有一种方法

    ```javascript
    let a
    // 我们也可以这样判断 undefined
    a === undefined
    // 但是 undefined 不是保留字，能够在低版本浏览器被赋值
    let undefined = 1
    // 这样判断就会出错
    // 所以可以⽤下⾯的⽅式来判断，并且代码量更少
    // 因为 void 后⾯随便跟上⼀个组成表达式
    // 返回就是 undefined
    a === void 0
    ```

## 类型转换

- 任意类型转 Boolean

  - undefined ， null ， false ， NaN ， '' ， 0 ， -0 ，为 false 其余为 true
  - 注意 [] , {} , '0' 为 true

- 对象转基本类型

  - 对象在转换基本类型时，⾸先会调⽤对象原型上的 valueOf ,然后调⽤ toString

    ```javascript
    // 这就是你在控制台经常看到[object Object]这串字符串的原因
    {foo:'foo'} + 'bar' = > [object Object] bar
    ```

  - 当然可以在对象身上重写这两个方法

    ```javascript
    let foo = {
      valueOf(){
        return 0
      },
      toString (){
        return 666
      }
    }
    foo+'233' ->'0233' // 如果valueOf返回基本数据类型则不会调用toString

    let foo = {
      valueOf(){
        return this
      },
      toString (){
        return 666
      }
    }
    foo+'233' -> '666233'
    ```

  - 还可以重写 `[Symbol.toPrimitive] `方法,它拥有最高的优先级

    ```javascript
    let foo = {
      valueOf(){
        return this
      },
      toString (){
        return 666
      },
      [Symbol.toPrimitive]() {
        return 233;
      }
    }

    foo+'233' -> '233233'
    ```

- 四则运算符

  - \+ 一方为 string,则另一方转为 string

  - \- \* / 一方为 number,另一方转为 number

  - +'1' -> 1 number

  - ```javascript
    [1, 2] + [2, 1] // '1,22,1'
    [1, 2].toString() -> '1,2'
    [2, 1].toString() -> '2,1'
    '1,2' + '2,1' = '1,22,1'
    ```

  - 为什么 [] == ![]

  ![type-conversion](/images/frontend/type-conversion.png)

  ```javascript
  1 == true -> true
  2 == true -> false
  !![] -> true
  [] == false
  ```

  ```javascript
  // [] 转成 true，然后取反变成 false
  [] == false
  // 根据第 8 条得出
  [] == ToNumber(false)
  [] == 0
  // 根据第 10 条得出
  ToPrimitive([]) == 0
  // [].toString() -> ''
  '' == 0
  // 根据第 6 条得出
  0 == 0 // -> true
  // [1] == [2]  两边都是object 返回false
  ```

- 比较运算符

  - 如果是对象，就通过 toPrimitive 转换对象
  - 如果是字符串，就通过 unicode 字符索引来⽐较

## 原型

![prototype](/images/frontend/prototype.png)

## New

- 工厂函数

  ```javascript
  function Person(name, age) {
    var obj = {}
    obj.name = name
    obj.age = age
    obj.run = () => {
      console.log('i am running')
    }
    return obj
  }
  var foo = Person('foo', 18)
  ```

- 构造函数

  ```javascript
  function Person(name, age) {
    this.name = name
    this.age = age
    this.run = () => {
      console.log(this.name + ' running')
    }
  }
  var foo = new Person('foo', 18)
  ```

- new 做了什么?

  在调⽤ new 的过程中会发⽣以上四件事情，我们也可以试着来⾃⼰实现⼀个 new

  1. 新⽣成了⼀个对象
  2. 链接到原型
  3. 绑定 this
  4. 返回新对象

  ```javascript
  function create() {
    // 创建⼀个空的对象
    let obj = new Object()
    // 获得构造函数
    let Con = [].shift.call(arguments) // 空数组执行shift 但把执行对象call为arguments,既把类数组转换为数组并执行shift,且修改了arguments
    // 链接到原型
    obj.__proto__ = Con.prototype
    // 绑定 this，执⾏构造函数
    let result = Con.apply(obj, arguments) // apply的第二个参数为参数数组,可为类数组,既 index:number ,有length 属性
    // 确保 new 出来的是个对象
    return typeof result === 'object' ? result : obj
  }
  // Person 中的this指向Person的调用者.Con
  function Person(name, age) {
    this.name = name
    this.age = age
    this.run = () => {
      console.log(this.name + ' running')
    }
  }

  create(Person, 'zone', 18)
  ```

## InstanceOf

手写 instanceOf

```javascript
function instanceof (left, right) {
  // 获得类型的原型
  let prototype = right.prototype
  // 获得对象的原型
  left = left.__proto__
  // 判断对象的类型是否等于类型的原型
  while (true) {
    if (left === null)
      return false
    if (prototype === left)
      return true
    left = left.__proto__
  }
}
```

## This

- window
- ()=>{}
- call,bind ,apply

## 执行上下文

当执⾏ JS 代码时，会产⽣三种执⾏上下⽂

- 全局执⾏上下⽂
- 函数执行上下文
- eval 执行上下文

```javascript
console.log(foo) // undefined  提升的变量和函数
var foo = 'foo'
const foo = 'foo' // error 临时死区
```

## 闭包

函数 A 返回了⼀个函数 B，并且函数 B 中使⽤了函数 A 的变量，函数 B 就被称为闭包。

```javascript
function A() {
  let a = 1
  function B() {
    console.log(a)
  }
  return B
}

A()()
// 因为函数 A 中的变量这时候是存储在堆上的。现在的 JS 引擎可以通过逃逸分析辨别出,哪些变量需要存储在堆上，哪些需要存储在栈上。
```

```javascript
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}

//闭包
for (var i = 1; i <= 5; i++) {
  ;(function (j) {
    setTimeout(function timer() {
      console.log(j)
    }, j * 1000)
  })(i)
}

//seTimeout 第三个参数
for (var i = 1; i <= 5; i++) {
  setTimeout(
    function timer(i) {
      console.log(i)
    },
    i * 1000,
    i
  )
}

//let
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

## 深浅拷贝

- 浅拷贝

  - Object.assign
  - ...运算符

- 深拷贝

  - JSON.parse(JSON.stringify(object))
    - 忽略 undefined
    - 忽略 symbol
    - 不能序列化函数
    - 不能解决循环引⽤的对象
  - lodash \_.cloneDeep

  ```javascript
  undefined == null // true

  const toString = Object.prototype.toString

  function getTag(value) {
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]'
    }
    return toString.call(value)
  }
  // xxx..toString() 方法，会返回一个形如 "[object XXX]" 的字符串。
  // 但是大多数对象toString()方法都是重写了，这时，需要用 call() 或 Reflect.apply() 等方法来调用。
  ;({}.toString()) // => "[object Object]"
  Math.toString() // => "[object Math]"
  // Object.prototype.toString.call(x);
  // 准确使用的是Object原型上的toString方法,且通过call改变执行对象
  ```

## 模块化

- es6

  - 异步导⼊，因为⽤于浏览器，需要下载⽂件，如果也采⽤同步导⼊会对渲染有很⼤影响
  - 采⽤实时绑定的⽅式，导⼊导出的值都指向同⼀个内存地址，所以导⼊值会跟随导出值变化

  ```javascript
  // file a.js
  export function a() {}
  export function b() {}
  // file b.js
  export default function () {}
  import { a, b } from './a.js'
  import XXX from './b.js'
  ```

- commonJs

  - 浏览器中使⽤就需要⽤到 Browserify 解析了。
  - 是同步导⼊，因为⽤于服务端，⽂件都在本地，同步导⼊即使卡住主线程影响也不大
  - ⽀持动态导⼊，也就是 require(${path}/xx.js) .
  - 值拷⻉，就算导出的值变了，导⼊的值也不会改变，所以如果想更新
  - 值，必须重新导⼊⼀次。

  ```javascript
  var exports = module.exports

  // a.js
  module.exports = {
    a: 1
  }
  // or
  exports.a = 1
  // b.js
  var module = require('./a.js')
  module.a // -> log 1
  ```

- amd

## 防抖

- easy

  ```javascript
  const debounce = (func, wait = 50) => {
    let timer = 0
    return function (...args) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, wait)
    }
  }
  ```

  缺点,函数是在 wait 之后才调用

- hard

  ```javascript
  function debounce(func, wait = 50, immediate = true) {
    let timer, context, args
    const later = () =>
      setTimeout(() => {
        timer = null
        if (!immediate) {
          func.apply(context, args)
          context = args = null
        }
      }, wait)

    return function (...params) {
      if (!timer) {
        timer = later()
        if (immediate) {
          func.apply(this, params)
        } else {
          context = this
          args = params
        }
      } else {
        clearTimeout(timer)
        timer = later()
      }
    }
  }
  ```

  缺点,执行的是第一个触发的函数

## Dom

- `cloneNode()` 拷贝一个节点 传 true 递归复制子孙节点,否则只复制当前节点
- `@touchstart` `@touchmove` `@touchend` 针对移动端的事件
- `querySelector` 无论什么 selector 都只返回第一个匹配项
- `querySelectorAll` arguments
- `return false` 取消浏览器默认行为
- 从外往内捕获 ,从内向外冒泡 微软认为从内向外传播,网景认为从外向内创播事件的传播
- `btn.addEventListener("click",clc,false)`,第三个参数默认为 false,既不在捕获阶段触发, 传参数 true 可先捕获
- 兼容 ie `event=event||window.event` 取消冒泡 `event.cancelBubble=true`;
- innerHTML 所有节点 innerText 文本节点
- `body=document.body` `html=document.documentelement` `document.all =getelementbytagname("\*")`

## Ajax

asynchronous javascript and xml

```javascript
var xhr = new XMLHttpRequest()
xhr.open("get","url")
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
xhr.send(json{} or urlencoded)
xhr.onload=function(){xhr.responseText}
```

- xhr.responseText 类型为 JSON 字符串
- 传输数据格式 x-www-form-urlencoded 和 Json
- xhr.readyState()
  - 0 请求了但未初始化,即未调用 open()
  - 1 已初始化未发送
  - 2 已经发送未响应
  - 3 正在接受响应
  - 4 响应完成
- xhr.onreadystatechange()状态码改变时触发兼容 ie,效率低. xhr.onload() capture respond 触发
- xhr.status http 状态码
  - 200 ok
  - 400 server
  - 500 network

## RegExp

- `exec` 将()赋予 Regexp.$1.....$9
- `igsm` ignore 忽略大小写 global 全局模式 s . 匹配空白符 multiline 多行模式
- `[.-]` 匹配.或者-
- `[A-Z0-9]` 所有字母和数字
- `.?`懒惰匹配 `.*` 贪婪匹配
- `\b` 单词边界
- `(n)` 捕获
- `(?:n)` 不捕获,返回的整体包含这一部分
- `(?=n)` 不捕获,返回的整体也不包含
- `n(?!233)` 捕获 不紧跟着 233 的 n
- `n(<=233)` 捕获前面紧跟着 233 的 n
- `n(<!233)` 之后
- `?<n>` 给组命名

## Review

- \>\>\> 0

  - 如果不能转换为`Number`，那就为`0`
  - 如果为非整数，先转换为整数，参考公式`sign(n) ⋅ floor(abs(n))`
  - 如果是正数，返回正数，如果是负数，返回负数 + 2 的 32 次方

- `process.argv.splice(2) [node url,exe.* url, Extra parameters]`
- `process.exit()`
  - `exit(0)` success exit
  - `exit(1)` error exit
- `NaN !== NaN true 0 !==-0 false Object.is(NaN,NaN) true Object.is(+0,-0) false`
- `isNaN()` 先转换为`number`类型在判断
- 关系运算符 两边皆为 str 时比较 unicode,按位比较
- 有符号整数,32 位为符号位,0 为正数,1 为负数
- 负数是用二进制的补码存储的 补码即为绝对值,取反 ➕1
- 左移 有符号,无符号<< 左移动 左移不会影响符号位,-2 左移为-64,空缺补 0
- 右移 有符号右移 左边空出,补的是符号位的值 对于正数来说,结果相同
- 无符号右移 空缺位补 0
- 基本数据类型在栈,引用数据类型在堆 创建变量开辟栈,创建对象开辟堆, 引用数据类型在栈里存的值是堆的地址
- 比较 object 比较的是在栈中的地址
- js 函数有类函数签名,形参实参
- function 默认返回 undefined
- 全局变量为 window 的属性 ,全局方法为 window 的方法
- document.write 会覆盖整个页面
- 函数属性 prototype 指向原型对象,原型对象 constructor 指向函数
- easy data proxy

  ```javascript
  function observer(obj) {
    const keys = Object.keys(obj)
    keys.forEach(k => {
      Object.defineProperty(this, k, {
        get() {
          return obj[k]
        },
        set(v) {
          obj[k] = v
        }
      })
    })
  }

  const obs = new observer(obj)
  ```

- 可选链 x.prop1?.prop2 不用担心是否存在,不存在会返回 undefined
- Error Cause - throw Error('Upload job result failed', { cause: err }) 多错误抛出,可在第二个参数指定,在外部 try cause 访问 err.cause 就可知道是哪一个错误抛出了
- for await of

  ```javascript
  function fn (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${time}毫秒后我成功啦！！！`)
    }, time)
  })

  async function asyncFn () {
    const arr = [fn(3000), fn(1000), fn(1000), fn(2000), fn(500)]
    for await (let x of arr) {
      console.log(x) x即为resolve
    }
  }

  asyncFn()
  ```

- Array.flatMap

  ```javascript
  let arr = ['科比 詹姆斯 安东尼', '利拉德 罗斯 麦科勒姆']
  console.log(arr.map(x => x.split(' ')).flat())
  console.log(arr.flatMap(x => x.split(' ')))
  ```

- `BigInt`是 ES10 新加的一种 JavaScript 数据类型，用来表示表示大于 `2^53 - 1` 的整数，`2^53 - 1`是 ES10 之前，JavaScript 所能表示最大的数字

- Object.fromEntries 与 Object.entries 相反

  ```javascript
  const arr = [
    ['name', '林三心'],
    ['age', 22],
    ['gender', '男']
  ]

  console.log(Object.fromEntries(arr)) // { name: '林三心', age: 22, gender: '男' }
  ```

  还有一个用处就是把 map 转为对象

  ```javascript
  const map = new Map()
  map.set('name', '林三心')
  map.set('age', 22)
  map.set('gender', '男')

  console.log(map) // Map(3) { 'name' => '林三心', 'age' => 22, 'gender' => '男' }

  const obj = Object.fromEntries(map)
  console.log(obj) // { name: '林三心', age: 22, gender: '男' }
  ```

- String.trimStart && String.trimEnd 对比 trim clear whitespace

- promise

  - `all`方法

    - 接收一个 Promise 数组，数组中如有非 Promise 项，则此项当做成功
    - 如果所有 Promise 都成功，则返回成功结果数组
    - 如果有一个 Promise 失败，则返回这个失败结果

  - `race`方法

    - 接收一个 Promise 数组，数组中如有非 Promise 项，则此项当做成功
    - 哪个 Promise 最快得到结果，就返回那个结果，无论成功失败

  - all settled

    - 接收一个 Promise 数组，数组中如有非 Promise 项，则此项当做成功
    - 把每一个 Promise 的结果，集合成数组，返回

  - any 那个成功返回最快成功的,全部失败就失败
    - 接收一个 Promise 数组，数组中如有非 Promise 项，则此项当做成功
    - 如果有一个 Promise 成功，则返回这个成功结果
    - 如果所有 Promise 都失败，则报错

- ||= 和 &&=

  - 或等于(||=) a ||= b 等同于 a || (a = b);

  - 且等于(&&=) a &&= b 等同于 a && (a = b);

- try catch 新格式,允许不写 error

  ```javascript
  try {
  } catch (error) {}
  try {
  } catch {}
  ```

- string.matchAll 返回一个 iterator 替代 reg.exec 递归

  ```javascript
  const regexp = /[a-c]/g
  const str = 'abc'

  const iterator = str.matchAll(regexp)

  iterator.next() // {value: [ 'c', index: 2, input: 'abc', groups: undefined ],done: false}
  // or
  Array.from(iterator, res => console.log(res))
  ```

- at() 数组切片

  ```javascript
  const arr = [1, 2, 3, 4]
  ;(arr[3] === arr[arr.length - 1]) === arr.at(-1)
  ```

- 顶层 await 允许再非函数作用域使用 await

  ```javascript
  async function foo() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('success')
      }, 2000)
    })
  }

  const res = await foo()
  ```

- await().catch

  ```javascript
  async function foo() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() >= 0.5 ? resolve('success') : reject('error')
      }, 2000)
    })
  }

  const res = await foo().catch(err => {
    console.log(err)
  })
  console.log(res)
  ```

- Error Cause

  ```javascript
  async function foo(cause) {
    throw Error('error', { cause })
  }

  try {
    await foo('cause1')
    await foo('cause2')
  } catch (error) {
    console.log(error.cause) // cause1
  }
  ```

- 权限验证

  当用户填写完账号和密码后向服务端验证是否正确，验证通过之后，服务端会返回一个**token**，拿到 token 之后（我会将这个 token 存贮到 cookie 中，保证刷新页面后能记住用户登录状态），前端会根据 token 再去拉取一个 **user_info** 的接口来获取用户的详细信息（如用户权限，用户名等等信息）。

  权限验证：通过 token 获取用户对应的 **role**，动态根据用户的 role 算出其对应有权限的路由，通过 **router.addRoutes** 动态挂载这些路由。使用 vuex 管理路由表，根据 vuex 中可访问的路由渲染侧边栏组件。

  一个是能否进入,一个是侧边渲染

  为什么不采取路由表由后端根据用户动态生成?前后端不分离,

- process

  process.env.port 命令行控制端口 set port=8081 yarn dev // yarn dev --port=7777

  process.env.npm_config_port 全局变量控制端口

- Object.freeze

  this.item = Object.freeze(Object.assign({}, this.item)) 将 data 的值对象冻结,减少开销

  当你把一个普通的 JavaScript 对象传给 Vue 实例的 data 选项，Vue 将遍历此对象所有的属性，并使用 `Object.defineProperty` 把这些属性全部转为 `getter/setter`，它们让 Vue 能进行追踪依赖，在属性被访问和修改时通知变化。 使用了 `Object.freeze` 之后，不仅可以减少 `observer` 的开销，还能减少不少内存开销。相关 [issue](https://github.com/vuejs/vue/issues/4384)。

- count++ 如果 count 为 undefined 返回 NAN

- ex 就是 css 中的一个相对单位, 相对的是字体大小和字体样式而改变的一个单位

- GET 和 POST 的区别? get：使用 URL 传递参数；发送信息的数量有限制；post：所发送的数据的大小理论上是没有限制，post 可以发送纯文本、URL 编码格式、二进制格式的字符串

- Math.random

  - 0~1 包括 0,不包含 1
  - 0~10 Math.floor(Math.random()\*10) 不包含 10
  - 2~10 Math.floor(Math.random()\*(10 - 2)) + 2

- let [a,b, c,d, e] = `"hello"`; 数组可以解构字符串

- Html5 的存储对象 localStorage sessionStorage

- window.onload

- `<script>`放在`<head>`和放到`<body>`底部的区别,head 优先加载,但是无法操作 body 里的元素,且加载慢的时候会阻塞

- defer 和 async dom 的加载和 style 和 script 的下载是同步的,影响用户体验.JavaScript 线程和 GUI 线程是互斥的

  - defer 用于开启新的线程下载脚本文件，并使脚本在文档解析完成后执行。多个 defer 按照文档顺序
  - async 用于异步下载脚本文件，下载完毕立即解释执行代码多个 async 根据先加载先解析原则

- new 操作符做了什么

  - 创建空对象
  - 链接原型
  - 绑定 this
  - 返回新对象

- session 和 cookie 记住登录机制的原理

  - cookie 客户端的状态保存机制 通过 cookie 里携带的用户信息识别用户
  - session 服务端的状态保存机制 通过 cookie 里携带 sessionId 通过 sessionId 识别用户

- 网页中接收事件的顺序（事件流）有哪些？它们之间的区别是什么？

  - 冒泡 向上传递
  - 捕获 相下传递

- 跨域,网页发起的请求与网页的协议,域名,端口有一样不同就是跨域请求,原因?浏览器为了保证网页的安全，出的同源协议策略。解决方法?

  - cors：目前最常用的一种解决办法，通过设置后端允许跨域实现。 res.setHeader('Access-Control-Allow-Origin', '\*'); res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS, POST");

    node 中间件、nginx 反向代理：跨域限制的时候浏览器不能跨域访问服务器，node 中间件和 nginx 反向代理，都是让请求发给代理服务器，静态页面面和代理服务器是同源的，然后代理服务器再向后端服务器发请求，服务器和服务器之间不存在同源限制。

    JSONP：利用的原理是 script 标签可以跨域请求资源，将回调函数作为参数拼接在 url 中。后端收到请求，调用该回调函数，并将数据作为参数返回去，注意设置响应头返回文档类型，应该设置成 javascript。

    postmessage：H5 新增 API，通过发送和接收 API 实现跨域通信。

- cookie ,localStorage,sessionStorage 的区别

  - 都是浏览器的本地存储
  - cookie 通常是由服务端写入,并且决定生命周期,LocalStorage 是写入就一直存在，除非手动清除，SessionStorage 是页面关闭的时候就会自动清除
  - cookie 的存储空间比较小大概 4KB,storage 5MB
  - 都遵循同源原则, sessionStorage 必须是同一个页面
  - 发送请求会自动携带 cookie,storage 不会
  - 应用场景 Cookie 一般用于存储登录验证信息 SessionID 或者 token，LocalStorage 常用于存储不易变动的数据，减轻服务器的压力,SessionStorage 可以用来检测用户是否是刷新进入页面，如音乐播放器恢复播放进度条的功能。

- 基本数据类型和引用数据类型的根本区别.

  - 基本数据类型是直接存储在栈中的简单数据段，占据空间小，属于被频繁使用的数据。
  - 引用数据类型是存储在堆内存中，占据空间大。引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址，当解释器寻找引用值时，会检索其在栈中的地址，取得地址后从堆中获得实体
  - BigInt 的使用方式 1. 整数后面直接 ➕n 2. BigInt('')构造函数

- setTimeout(foo, 0) 这行代码不可以等价替换为 foo() 同步变异步 不能相互转换

- window.requestAnimationFrame 你希望执行一个动画，该回调函数会在浏览器下一次重绘之前执行,回调函数执行次数通常是每秒 60 次 既 setInterval(function(){ },1000/60) requestAnimationFrame 相比 setInterval 1. 会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成 2.会在在后台标签页或者隐藏的 iframe 里时暂停调用以提升性能和电池寿命。

  无限重绘动画

  ```javascript
  ;(function animloop() {
    render()
    window.requestAnimationFrame(animloop)
  })()
  ```

- Object.defineProperty configurable、enumerable、writable 不指定默认为 false node 环境下不指定 enumerable 看不到对象的 key,value,浏览器环境下还是看得到,如果对象已经有了这个 key,再指定时,不指定的不会变成 false

- js 严格模式 出厂的时候太松散了,后加的对弱语言的限制 [了解 JS 严格模式，对你没坏处！-阿里云开发者社区 (aliyun.com)](https://developer.aliyun.com/article/975537)

  - 整个文件开启

    ```javascript
    <script>"use strict"; console.log("严格模式");</script>
    ```

  - 单个函数开启

    ```javascript
    function strict() {
      'use strict'
      return '严格模式'
    }
    ```

  - 一个项目多个脚本文件,有的开启有的没开启,打包完成以后合并的代码属于什么模式?

    - 建议按照一个个的函数去开启严格模式。

    - 所有代码都放到立即执行的匿名函数中

      ```javascript
      ;(function () {
        'use strict'
      })()
      ```

  1. 声明变量必须要有关键字
  2. 无法使用`delete`
  3. 无法使用一些未来铺垫的关键字作为变量 implements`、`interface`、`let`、`package
  4. 对象操作会更严格,例如只读属性被修改会报错
  5. 函数参数不能重名
  6. 函数中 arguments 无法被修改
  7. arguments 和参数不再互相绑定
  8. 函数声明必须在顶层
  9. 禁止使用 eval()
  10. 禁止使用 with()
  11. this 不会指向全局,函数执行上下文,普通函数
  12. 禁止八进制写法

- .除了加法且一方为字符串,其余减、乘、除、求余基本类型转 number,引用类型转 valueOf().toString() 所以 Number(null) ->0 Number(undefined) -> NaN,1+[] -> 1

- 两边都会转为 Number Number([]) -> 0 Number({})

- Function instanceof Object , Object instanceof Function

- 无论同步操作多久,都优先高于微任务和宏任务

- javascript 分为预处理和执行阶段,尽管 a = 2 没有执行 但作用域里的 a 已经声明了

  ```javascript
  var a = 1
  function test() {
    console.log(a)
    if (false) {
      var a = 2
    }
  }
  test()
  ```

- 静态语言 既强类型语言 c, c++, java ,动态语言 既弱类型语言 js

- parseInt("1a") === 1 true

- ie 中 attachEvent 等于其他浏览器的 addEventListener

- 0/0 会返回 NaN 不会触发 catch

- Date setMonth(0~11) setDate(40) 大于 30 或 31 会进入下一个月

- requestAnimationFrame 非同步执行 所以和循环输出 var i 结果一样

- with 改变作用域里的变量,如果没有就会往外泄露,直到全局

- readonly 对 button 无效,用于表单

- call,bind ,apply 如果传 null 或者 undefined ,this 指向全局对象,非严格模式下

- new Boolean(false) ->Boolean {false} 得到一个对象,但是 document.write 又为结果值,fuck Boolean(false) -> false 得到布尔值,document 传的如果不为基本数据类型,会执行 toString()

- var foo = new Function('x', 'y', 'return x + y') new Function 可将字符串转为函数

- let num = (function(x){delete x;return x;})(1); 可以从立即执行函数中获取值

- 什么是闭包

  - 内部的函数存在外部作用域的引用就会导致闭包
  - 函数的上级作用域在哪里创建创建的，上级作用域就是谁,是创建的位置而非调用的位置
  - 闭包中的变量存储的位置是堆内存。栈内存有回收机制,如果在栈就被回收了
  - 闭包中的变量是独立的,多个闭包互不干扰
  - 形成的原理：作用域链，当前作用域可以访问上级作用域中的变量

- isNaN `isNaN`函数会首先尝试将这个参数转换为数值，然后才会对转换后的结果是否是[`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)进行判断

- 函数没有重载!!同名函数会覆盖,并且提升

- 数组改变自身的方法,sort 也改变了,改变了顺序,concat 没改变,返回连接后的副本

- dom id,className innerHTML 都是可读可写,tagName 只能读

- continue 会跳过后面的内容直接执行

- 什么是 Promise

  - es6 新增的构造函数,异步编程的解决方案
  - 有三种状态 pending,fulfilled(Resolved),rejected

- 什么是 BFC

  - 从翻译上来说,Block Formatting Context 块级格式化上下文,独立的渲染区域、不会影响边界以外的元素,当外边距或者内边距合并时,就可以用 BFC 解决这个问题
  - 布局规则 1.内部盒子会在垂直方向，一个接一个地放置。2.垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠 3.计算 BFC 的高度时，浮动元素也参与计算
  - float `设置成 `left `或 `right` -`position `是`absolute`或者`fixed` -`overflow `不是`visible`，为 `auto`、`scroll`、`hidden` -`display`是`flex`或者`inline-block
  - 解决问题,清楚浮动

- iframe

  - 创建比一般的 DOM 元素慢了 1-2 个数量级
  - 阻塞页面加载.window 的 onload 事件需要在所有 iframe 加载完毕后（包含里面的元素）才会触发。
  - 唯一的连接池 占用连接池阻塞了主页面资源的加载
  - 不利于 SEO 搜索引擎的检索程序无法解读 iframe 另外，iframe 本身不是动态语言，样式和脚本都需要额外导入

- for(;i<6,j<10;) 多个条件判断逗号分隔,以后者为据

- confirm() 确认框 alert()警示框 prompt()对话框 open()打开新窗口

- Object.is() 严格判断是否相等,基本与===一致 除了 +0===-0 ,NaN === NaN 刚好结果相反

- 连等操作是右向左执行的,所以 let a = b= 10 相当于 b = 10 ,let a = b 那么这个 b 会发生内存溢出

- 只要不写关键字的声明都会泄露到全局 ,当然要注意是没写关键字还是在进行赋值

- let a = {n:1} let b = a a.x = a = {n:2} 点运算符优先级比较高 所以此时先拿到 a.x 的内存地址,既原来{n:1,x:undefined}

- es6 之前的遍历会自动跳过 undefined 的位置,[0,1,undefined,3]->0,1,3 for of 等 es6 之后的不会,map 会保留

- 非字符串作 key,将会调用 toString()方法

- const func = (inner.func, inner.func) = inner.func = inner.func ,逗号操作符会返回表达式最后一个值,为函数本身,func,赋值表达式同理,也是返回函数的本身

- Object.assign([1, 2, 3], [4, 5]) ->[4,5,3] 覆盖位置上的值

- typeof NULL 此时 NULL 为未声明的变量,即为 undefined ,class {} 为 es6 新增的语法糖,本质上还是一个函数

- 变量和函数同时提升,既名字相同时,忽略变量,有赋值,赋值为准

- 对象->原型对象 读取时,按照原型链读取,修改时 1 层点都是在对象本身操作,两层点对象原型都没有就报错,原型上有就修改原型上的

- 原始数据类型不包括引用数据类型

- js 烧脑面试大赏[js 烧脑面试题大赏 - 掘金 (juejin.cn)](https://juejin.cn/post/6989433079760683022#heading-0)

- class this.变量与 getter 变量相同且无 set 时,变量为只读,修改会报错

- ({} + 'b' > {} + 'a') b 的 ascii 码比较大

- try-> catch ->finally 如果有 finally 那么 try 中的 return 不会直接跳出函数,而是会进入 finally,但是 finally 执行完之后还是会 return 除非 break

- break + 标签代码块,跳出代码块,如果 try 后又 finally 在 finally 之前 break try 仍然会进入 finally

- 类中的静态方法和非静态方法是可以重名的,因为调用者不同,不会出现歧义

- 闭包 this 指向

  ```javascript
  function bar() {
    return {
      name: 'clc',
      run: () => {
        console.log(this) // 'why' this为bar中的变量,既闭包,因为是箭头函数,就跟调用者无关了,而是看保存的是哪个闭包变量
      }
    }
  }

  function bar() {
    return {
      name: 'clc',
      run() {
        console.log(this) // 'clc'
      }
    }
  }

  bar.call({ name: 'why' }).run()
  ```

- window.addEventListener(`"click"`, button.change) 此时 button.change 不再是调用者了,这里不是执行,执行由 window 决定

- 不要在块内声明一个函数(use strict) 会报错,如果需要这么做,使用函数表达式来声明(命令声明,函数表达式声明,构造函数声明)

- new 关键字 如果手动返回了引用类型 则该引用类型替换自动生成的,如果是基本类型,则仍然是由 new 内部生成的对象决定

- 创建->初始化->赋值 变量提升,let var const 都会提升,此时决定使用内部的还是外部的变量,但是 var 会先初始化为 undefined,let const 不会,存在暂时性死区

- addEventListener 第三个参数默认为 false 决定是否在捕获的时候触发,默认冒泡的时候触发

- [JavaScript 实现继承的 6 种方式 - Leophen - 博客园 (cnblogs.com)](https://www.cnblogs.com/Leophen/p/11401734.html)

原型链,构造函数,组合,原型式,寄生式,寄生组合式.

- 原型链 一个构造函数的原型是另一个类型的实例
  - 创建子类时不能往超类传递数据
  - 所有子类的实例的原型都指向同一个父类的实例,所有父类实例上的引用类型再子类实例都是共享的
- 构造函数式 在子类型构造函数的内部调用父类型构造函数通过 call 或者 bind 绑定 this,相当于都在自身进行
  - 引用类型不共享了,但是父类函数方法也不能复用了
  - 访问不到父类原型 (没有关联)
- 组合式 (原型链+构造函数式)最常见的方法 可传递数据到父类,引用数据在自身不共享,方法在父类原型上
  - 是会调用两次父类构造函数
- 原型式 Object.create

  - (const foo = Object.create({ name: 'clc',age:19}, { age: { value: 18} });) function object(o){function F(){} F.prototype = o;return new F();} 第一个参数为创建出的新对象的隐式原型 ,第二个参数如果第一个参数有同名则覆盖,无则为 foo 自身的属性
  - 缺点同原型链

- 寄生式 函数封装 增强了 object.create,还是做不到复用
- 寄生组合式

  - 减少了组合式中的一次父类原型生成

- console.log.call(console,this); 函数内的调用 this 的指向为 console,但打印的 this 为外部传进去的 window

- undefined 和 null 和任意有意义的值相比 (==) 都返回 false ,但 null ==undefined 之间为 true null == false false

- 'Value is ' + (val != '0') ? 'define' : 'undefine' -> define 因为加号运算符优先级大于?

- var foo = function bar() {}; 此时的 bar 作为 foo.name 并不是函数 bar

- 未使用关键字还有 eval()创建的变量可以被 delete 删除

- 不支持冒泡 mouseenter mouseleave load unload resize focus blur

- 匿名函数的 length 为形参个数,

- var str = "Hellllo world"; str = str.replace(/(l)\1/g, '$1'); \1 何$1 都为第一个分组

- js 判断类型

  - typeof
  - constructor
  - instanceof
  - Object.prototype.toString.call()

- js 实现异步的方式 .所有异步任务都是在同步任务执行结束之后，从任务队列中依次取出执行
  - 回调函数 比如 AJAX 回调 ,简单容易实现,不利于阅读和维护,高度耦合,结构混乱,流程难以追踪
  - 事件监听
  - setTimeOut
  - Promise 能够捕获错误,很好的解决地狱回调的问题,缺点是无法取消 promise
  - 生成器 Generators/yield、es6 新增的异步编程解决方案,Generator 函数是一个状态机，封装了多个内部状态,可暂停函数, yield 可暂停，next 方法可启动优点是异步语义清晰，缺点是手动迭代`Generator` 函数很麻烦
  - async/await 基于 Promise 实现的 使得异步代码像同步代码 优点是方法清晰不了,缺点是强行使用降低性能
- vue2.0 双向绑定的原理与缺陷
  - 响应式指的是：组件的 data 发生变化，立刻触发视图的更新
  - Vue 采用数据劫持结合发布者-订阅者模式的方式来实现数据的响应式 Object.defineProperty
  - 缺点 1.一次性递归到底开销很大,当数据很大时大量的递归导致调用栈溢出,因为所有的数据都要进行 Obect.de.... 2 不能监听新增和删除,数组下标的改变
- vue3.0 双向绑定的原理

  - Proxy 实现的数据双向绑定
  - 劫持整个对象,弥补了 Object.defineProperty 需要迭代遍历,和无法监听新增删除,数组下标的缺陷

- 数组的去重有哪些方法
  - 新数组存储只出现过一次的元素 占用空间大
  - [...new Set(arr)]
  - filter +indexof index 相同即为第一个
- null 和 undefined 的区别
  - undefined 变量没有赋值, 函数没有返回值,对象不存在的属性,有形参无实参即为 undefiend,
  - null 定义了且赋值为 null,人为设置的空对象,释放对象 直接赋值为 null
- 浮动
  - 让元素脱离文档流,实现图片文字环绕效果
  - 浮动块级元素可排列在同一行
  - 缺点,父元素高度塌陷,影响其他元素排版,清除浮动,给父元素加上 .clearfix::after { content: ''; display: table; clear: both; } ,bfc
- 箭头函数
  - 箭头函数相当于匿名函数，简化了函数定义。
  - 没有 this,this 从外部继承,单条语句可忽略 return 和{}
  - 没有 this,不能作为构造函数 ,当使用 call,bind,apply 时无法绑定 this
  - 没有原型和 super 不能使用 yield 关键字，因此箭头函数不能用作 Generator 函数。\
- this 指向
  - 全局执行上下文 无论是否严格模式 都指向全局对象
  - 函数执行上下文 严格模式 普通函数为 undefined ,非严格为全局对象 箭头函数都顺着作用域链外上找
- css 设置尺寸的单位
  - px ,em,vw,vh,rem
- 水平垂直居中方法
  - 行盒 text-align vertical-align
  - 块盒 justifly-content align-items
  - position:absolute;left:50%;right:50% transform: translate(-50%,-50%);
- js 变量的提升,
  - var 提升 定义 初始化 赋值
  - const let 不提升 暂时性死区
  - 函数声明提升
- HashRouter 和 HistoryRouter 的区别和原理
  - history 和 hash 都是利用浏览器的两种特性实现前端路由
  - history 浏览历史记录栈的 API,没有 # 需要后端配合,否则刷新 404 history.pushState replaceState 进行页面跳转,window.onpopstate 监听,更优雅
  - hash 监听 location 对象 hash 值变化,window.onhashchange ,兼容性更好
- Node 在执行微任务的时候会优先执行 process.nextTick() , promise.then()
- Object(1)||new Object(1) == new Number(1) 传字符串 为 String 对象
- ^\[abc\]\[1,2]$ 匹配 a1 a2 b1 b2 c1 c2 这里[]中的逗号仅作分隔使用
- 什么是 XML

  - XML 指可扩展标记语言（**EXtensible Markup Language**）
  - XML 是一种标记语言，很类似 HTML
  - XML 的设计宗旨是传输数据，而非显示数据
  - XML 标签没有被预定义。您需要自行定义标签。
  - XML 被设计为具有自我描述性。
  - XML 是 W3C 的推荐标准

- XML 与 HTML 的主要差异

  - XML 不是 HTML 的替代。
  - XML 和 HTML 为不同的目的而设计：
  - XML 被设计为传输和存储数据，其焦点是数据的内容。
  - HTML 被设计用来显示数据，其焦点是数据的外观。
  - HTML 旨在显示信息，而 XML 旨在传输信息。

- 类的声明同 let 和 const 有暂时性死区
- typeof [] 为 object 只有函数为 function
- 函数传参,时相当于创建了一个变量,并且赋值,和下面的同名变量都提升了
- 浏览器不兼容 CommonJS 的根本原因，在于缺少四个 Node.js 环境的变量。 module exports require global
- Symbol.for() 和 Symbol()不同的时,他会将创建的 Symbol()放入到一个全局的注册表中,如果已有相同的 key,返回已存在注册表的 Symbol()
- Symbol 值不可以和其他类型值进行混合运算,否则会报错
- 基本类型占用 8byte 64 位
- js 内置的可迭代对象 Array Map Set String TypedArray Arguments NodeList
- slice() 截取数组并且返回新数组
- f = (x = xxxxx) => x; f(2) √ f() error 有实参,忽略默认值,读取默认值报错
- es5 forEach() filter() reduce() every() some()若数组有 undefined 都会跳过空位,且不保留 只有 map 会保留 undefined 值
- RegExp 的方法 test exec compile(已弃用)
- IIFE 立即执行函数 + NFE 具名函数 的函数名为常量 不可修改,此时的函数名变量为局部变量,不是全局函数,函数名 a 和形参 a 形参的优先级高
- _函数提升优先级高于变量提升_,且不会被同名变量声明时覆盖,但是会被变量赋值后覆盖
- eval 会返回最后一个表达式的结果
- 2.toString() error 数字后面直接跟小数点会被解析为小数
- repaint 重绘

  - 文字颜色
  - 背景颜色

- reflow 回流

  - 改变窗口大小
  - 改变文字大小
  - 内容的改变,输入框输入
  - 激活伪类,hover
  - 操作 class 属性
  - 脚本操作 DOM
  - 计算 offsetWidth offsetHeight scrollTop 等属性,浏览器都会重排获取最新的值
  - 计算 style 属性

- 说一下重绘、回流/重排区别如何避免？ 当元素发生几何变化,位置大小尺寸,那么就会发生回流/重排,重排一定重绘,而改变颜色只会重绘,跳过了 render 和分层分块的步骤,重绘是不怎么消耗性能的,所以要注重的是重排,

  - 样式一次性集中改变
  - position 脱离文档流
  - 使用 GPU 加速

- Event Loop 执行 js 代码时，遇见同步任务，直接推入调用栈执行，遇到异步任务，将该任务挂起，等到异步任务有返回之后推入到任务队列中，当调用栈中的所有同步任务全部执行完成，将任务队列中的任务按顺序一个一个的推入并执行，重复执行这一系列的行为。浏览器和 Node 环境下，microtask 任务队列的执行时机不同 - Node 端，microtask 在事件循环的各个阶段之间执行 - 浏览器端，microtask 在事件循环的 macrotask 执行完之后执行
- 宏任务(macrotask) 执行 script 标签内部代码、setTimeout/setInterval、ajax、postMessageMessageChannel、setImmediate(异步的尽可能块,大部分情况比 timeout 0 优先,但不是绝对的执行顺序取决于各种因素,在事件循环的下一个迭代中执行)，I/O（Node.js）
- 微任务(microtask ) Promise、MutonObserver、Object.observe、process.nextTick（Node.js）
- 说一下 diff 算法(patch ,pathchVnode updateChildren)

  - vue 和 react 组件渲染的时候会返回 virtual dom,渲染器再把 vdom 通过增删改的 api 同步到 dom,再次渲染的时候产生新的 vdom 新旧 vdom 之间的对比找到差异的算法就是 diff 算法
  - 树的对比是 O(n\*3) ,多对多为 n\*2,插入,删除,修改也为 n 的复杂度,所以约定只做同层对比,type 类型改变的子节点不对比,dom 记录了关联节点,增删改也不遍历,如此 On3 变成 On
  - 对比一次,复杂度大幅降低,但是处理调换顺序的时候不智能了,顺序一改变导致节点和子节点都要重新渲染,时间复杂度降低了,dom 的操作次数增加,所以需要 key
  - 简单 diff :找相同的 key,有的话移动按照新 vdom 的顺序调换,没有的话执行插入,锚点是上一个节点的 nextSibling
  - 双端 diff:4 个指针同时指向新旧 vdom 的头尾,patch 函数比较新老,不存在创建,多了销毁,相同则进入 patchVnode,在进行三种 children 的情况判断,新增删除,对比,执行 updateChildren 如果 children 是 textNode 直接更新文本,否则进行头头,尾尾,头尾,尾头对比

- 三栏布局

  - 圣杯布局 两边盒子宽度固定 中间盒子自适应的三栏布局 ,三栏 float left ,父元素 padding, left right 设置负的 margin 和 left right 移动到 padding 处
  - 双飞翼布局 同圣杯 区别于父元素 padding 变成中间元素的 margin ,缺点多套了一层 dom,优点在于对比圣杯,不要设置 min-body 也不会变形

- 浏览器垃圾回收机制

  - 根据数据的存储方式也就是数据类型分为 堆回收和栈垃圾回收

    - 栈垃圾回收 例如一个函数执行完 ,js 上下移动 ESP 销毁上下文,根据后入先进的原则销毁

  - 可达性 从根节点出发(window,dom 树 栈上的变量)遍历所有的对象,可以遍历到的对象就是可达的
  - 内存碎片 当不可达对象被回收以后,内存中会出现大量的不连续空间
  - 长久对象(老生代) 声明周期很长的对象,比如 window/Dom
  - 临时对象(新生代) 函数内部,块级作用域变量对象
  - 主垃圾回收器(标记清除算法) 运用优化版的可达性算法标记可达的对象,回收后出现内存碎片,再进行内存整理
  - 副垃圾回收器(Scavenge 算法) 大概支持 1~8 M 的容量,分为两个区域 对象区域和空闲区域,新回收的副垃圾进入对象区域,等块存满的时候执行一次垃圾清理,清理过程为

    - 标记所有对象区域的垃圾对象
    - 把对象区域的对象移动到空闲区域排列好
    - 把空闲区域和对象区域对调(其实就是两个对象区域) 如此排列清理就不会出现内存碎片的问题

  - 增量回收 浏览器在进行垃圾回收的时候，会暂停 JS 脚本，可能会导致卡顿.增量回收将垃圾回收工作分成很小的块,与 js 代码循环多次处理,避免卡顿
  - 闲时收集 垃圾收集器只在 cpu 空闲时尝试运行,
  - 内存泄露 无法被垃圾回收机制回收

    - window 事件没有解绑
    - vue 中 watch 之后没有 unwatch
    - 互相引用,
    - 定时器
    - 滥用闭包

- 说一说 vue 的 keep-alive 组件 vue 用来缓存组件的内置组件,提升性能通常是用来缓存路由. 有两个属性 include exclude ,通常用于路由
- 1<2<3 连续关系运算符 2>1 true -> 1 3>1 true
- 什么是 CSRF (cross site request forgey) 攻击者盗用了你的身份，以你的名义发送恶意请求，对服务器来说这个请求是完全合法的

  - 登陆受信任网站 A,并在本地生成 Cookie

  - 在不登出 A 的情况下,访问危险网站 B

  - B 收到用户请求之后返回一些攻击代码.要求访问返回 cookie 的网站 A 就是以用户的角度访问了网站 A
  - 预防 CSRF 策略

    - 验证码 要求用户与应用之间进行交互
    - HTTP request header 中的 referer 检查是否是当前域名过来,并不是万无一失的,refer 由浏览器生成,跟浏览器的漏洞安全有关
    - token 验证 在 get 或者 post 添加与后端 token 检验 但是 get 或者 post 传参的不便性。也不是绝对安全
    - 把 token 放在自定义的请求头中,自定义的不会记录在浏览器的地址栏上

- 什么是 XSS (cross site scripting) 区分 css 改为 xss.攻击者向 Web 页面里面插入 script 代码,当用户浏览这个页面的时候,就会运行攻击者插入的代码

  - 反射型 攻击者构造出特殊的 URL，其中包含恶意代码。用户打开 URL 时，网站服务端将 HTML 和恶意代码都返回给浏览器。浏览器解析 html,且执行恶意代码,窃取用户数据,冒充用户行为.常见于网站搜索,挑战等
  - 存储型 攻击者把恶意代码提交到网站的数据库上.用户在解析 html 时,也解析了存储在数据库的恶意代码.常见于论坛发帖、商品评论、用户私信等。
  - 防止 XSS

    - 对用户数据进行严格的编码 HTML 元素的编码，JavaScript 编码，css 编码，url 编码等
    - html 代码 转义<,>
    - js 代码序列化,
    - Http Only cookie 无法从 document.cookie 获取 cookie

- 浏览器是如何渲染页面的 将 html -> dom 树,将 css ->stylesheet,根据 dom 树和 stylesheet 结合生成渲染树 render tree,将渲染树进行分层,为每一层绘制列表,再把每一层分成图块,紧接着光栅化将图块绘制成位图,最后所有位图合成为一个页面

  - 分层的目的,当某一层有动画时,避免整个图层渲染,
  - 光栅化,分块的目的 只渲染可视的附近区域

- computed 和 watch 的区别

  - computed 有缓存,依赖属性变化
  - watch 无缓存,支持异步,监听数据变化

- 说一说 Vue 中 $nextTick 作用与原理? Vue 的响应式是异步的,当数据发生改变的时候,视图不会立刻更新,而是将同一事件循环的所有数据变化完成以后统一更新,所以在修改 dom 之后,立刻获取 dom,或者修改 props,此时的还是未修改的, $nextTick 本质上是返回一个 promise,他会在当前事件执行完成以后再执行,.
- token 能放在 cookie 中吗 ,当然,token 就是用来判断用户是否登录的,通常里面包含用户的唯一标识,uid ,时间戳 time 签名 sign.token 是否过期应该由后端来判断,当 token 失效的时候返回状态码 401 用户登录,服务的返回 token 前端存储 token 再 cookie,每一次发送请求都携带 token,服务端验证 token
- 浏览器输入 url 发生了什么

  1. url 解析 判断是搜索内容还是请求 url
  2. 查找缓存 浏览器查看浏览器缓存,系统缓存,路由缓存,ISP 缓存
  3. DNS 解析 浏览器向 DNS 服务器发起请求,解析 URL 域名对应的 IP 地址(DNS 服务器是基于 UDP 协议)
  4. 建立 TCP 连接 解析出 IP 地址后,根据默认端口 80 和服务器建立 TCP 连接
  5. 发起 HTTP 请求 浏览器发起读取文件的 HTTP 请求,该请求报文会作为 TCP 连接的第三次握手数据发送给服务器
  6. 服务器响应请求有重定向返回重定向,浏览器再根据重定向发起请求,如果请求参数有误返回 404,服务器有问题返回 500,一切正常返回 200 并返回 html
  7. 关闭 TCP 连接 通过四次挥手后释放 TCP 连接
  8. 浏览器解析 HTML 并渲染

- 浏览器的缓存机制

  - 浏览器每次发起请求,都会现在浏览器的缓存中查找结果和缓存标识(第一次发起请求默认为 no-cache,所以第二次会发送 max-age=0 private 即为进入协商缓存)
  - 浏览器每次拿到结果都会将结果和缓存标识存到浏览器缓存中
  - 强制缓存 有强制缓存且仍在有效期 直接返回,不在有效期,进入协商缓存,向服务器发起请求并携带缓存标识
    - Cache-Control http/1.1 缓存字段 优先级更高,值为
      - public：所有内容都将被缓存（客户端和代理服务器都可缓存）
      - private：所有内容只有客户端可以缓存，Cache-Control 的默认取值
      - no-cache：客户端缓存内容，但是是否使用缓存则需要经过协商缓存来验证决定
      - no-store：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存
      - max-age=xxx (xxx is numeric)：缓存内容将在 xxx 秒后失效,原服务器 以这个值为准
      - s-maxage=xxx 代理服务器的缓存时间
    - expires http/1.0 的缓存字段,值为到期时间,与客户端时间进行判断,容易修改,时区不同,误差比较大,淘汰
  - 协商缓存 在有效期返回 304 ,使用缓存 ,不在有效期 返回 200 和请求结果
    - Etag / If-None-Match 优先级更高 值为哈希值/唯一标识/指纹码
    - Last-Modified / If-Modified-Since Last-Modified 是服务器响应请求时，返回该资源文件在服务器最后被修改的时间， If-Modified-Since 为上一次请求时 Last-Modified 的值,比较二者相同返回 304
  - from memory cache 内存中的缓存 读取顺序为 memory->disk
  - from disk cache 硬盘中的缓存

- 304 的过程 304 Not Modified 请求的资源为改变
  - 验证 Cache-Control/Expire 是否有强缓存 是否过期
  - 验证 etag/If-None-Match Last-Modified / If-Modified-Sinc 验证协商缓存是否过期
- TCP 的三次握手

  - 第一次握手 客户端发送 SYN 标志和序号 (SYN=1,seq = x)
  - 第二次握手 服务器收到 SYN 包并且确认,同时也发送一个自己的 SYN 包,即 SYN+ACK 包( SYN=1,ACK=1,seq = y,ack=x+1)
  - 第三次握手 客户端收到 SYN+ACK 包,向服务器发送确认包和序号(ACK = 1,ack = y+1,seq=x+1+1)

  - 客户端的状态 close -> syn_sent(发送状态) ->Estab-lished(稳定连接)
  - 服务端状态 close -> syn_recvd(回复) -> Estab-lished(稳定连接)
  - 序号(seq) 32 位，用来标识从 TCP 源端向目的端发送的字节流
  - 确认号(ack) 32 位，只有 ACK 标志位为 1 时，确认序号字段才有效，ack=seq+1。
  - 标志位(Flag)
    - URG：紧急指针（urgent pointer）有效。
    - ACK：确认序号有效。（为了与**确认号 ack**区分开，我们用大写表示）
    - PSH：接收方应该尽快将这个报文交给应用层。
    - RST：重置连接。
    - SYN：发起一个新连接。(同步序列编号)
    - FIN：释放一个连接。
  - TCP 握手过程中 ack 和 seq 都是在批次的 ack 和 seq 之间计算,确保 TCP 的连贯性

- 为什么要进行三次握手

  - 减小服务器开销.为了防止服务器端开启一些无用的连接增加服务器开销(一开始服务器都保持 close 状态)
  - 接收到失效请求发生的错误.防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误。

- TCP 的四次挥手

  - 第一次挥手 客户端发送 FIN 标志和序号 (FIN = 1,seq = u)
  - 第二次挥手 服务端接受并返回 ACK 标志,序号和确认号 ( ACK = 1,seq = v,ack=u+1)
  - 第三次挥手 服务器再次发出标志位 FIN,ACK(表示已经准备好释放连接,此处 ACK 非确认标识) ( ACK = 1,FIN = 1,seq = w, ack=u+1)
  - 第四次挥手 客户端发出 ACK,seq = u+1 ,ack =w +1 随后客户端开始在 TIME-WAIT 阶段等待 2MSL
  - 客户端的状态 Estab-lished ->FIN-WAIT-1 终止等待 1 -> FIN-WAIT-2 终止等待 2 ->TIME-WATI 时间等待 ->close
  - 服务端的状态 Estab-lished ->CLOSE-WAIT 关闭等待 -> LAST-ACK 最后确认 ->close

- 为什么要四次挥手 .因为第二次握手,服务器同时返回了 SYN 和 ACK 标志,而挥手的标志 ACK 和 FIN 分别为第二第三次挥手传送,因为握手时,服务端不需要任何准备,而挥手,服务端需要释放一些数据,所以才需要 CLOSE-WAIT 和 LAST-ACK 两个阶段
- 为什么客户端在 TIME-WAIT 阶段要等两**2MSL** , 为的是确认服务器收到第四次挥手的 ACK 包, 因为服务端在第三次挥手时,如果在 1MSL 内没有收到客户端发出的 ACK 确认报文，就会再次向客户端发出 FIN 报文.所以如果在客户端 2MSL 再次接收到 FIN 包,证明了服务端未收到第四次挥手的 ACK 包,那么客户端会再次发送并且定时器重置.否则为服务端接收到了 ACK 包,客户端进入 CLOSE 状态,比服务端晚.所以挥手是最少四次
- 组件通信方式

  - 父子通信 props emit proview inject
  - 其他通信 EventBus,vuex

- 说一说盒模型 ,决定一个盒子的大小由 margin padding border content,标准盒 width/height 设置的是 content,怪异盒设置的是 padding+border+content
- 伪数组和数组的区别 都有 length 属性,都可以用 for in ,一个是 array 一个本质是 object 可以用数组的 call 方法,Array.from 将伪数组转为真数组
- expire localstorage
  - 惰性删除 下次使用的时,检查 expire 字段
  - 定时删除 设置的时候同时设一个定时器
- axios( Axios 是一个基于 promise 的 HTTP 库)拦截器

  - 请求拦截 添加 token,header
  - 响应拦截 校验 token ,操作数据

- 创建 ajax 过程

  - 创建 xhr 对象 new XMLHttpRequest()
  - 设置请求参数 xhr.open(Method, 服务器接口地址);
  - 发送请求: request.send(data) post 请求需要参数 data
  - 监听 xhr 状态变化 ,XHR.onreadystatechange = function () { if (XHR.readyState == 4 && XHR.status == 200) { console.log(XHR.responseText);

- fetch 请求 fetch 是一种 HTTP 数据请求的方式 是 xhr 的一种替代方案,它本身就会返回 promise
- 前端后实时通信

  - 轮询 实现简单,占用流量,cpu,时间过长无法及时响应,客户端定时发送请求,服务器响应
  - 长轮询 服务器收到响应后,若无数据则等待直到超时再返回,客户端收到返回结果后再次发送请求
  - iframe 流 frame 流方式是在页面中插入一个隐藏的 iframe，利用其 src 属性在服务器和客户端之间创建一条长连接，服务器向 iframe 传输数据 维护一个长连接会增加开销
  - websocket
  - SSE SSE(Server-Sent Event)是建立在浏览器与服务器之间的通信渠道，然后服务器向浏览器推送信息。SSE 是单向通道，只能服务器向浏览器发送

- Vue 为什么要加 key 为了性能优化,因为更新 dom 是需要用 diff 算法进行对比,如果没有手动传入 key 那么会使用 index 做 key,当交换顺序的时候,所有的元素就需要重新渲染,有了 key 之后则 key 相同的元素不需要重新渲染
- vuerouter 懒加载的方法

  - component: resolve=>(require(['../views/About'],resolve)) require 手动返回 promise
  - component: () => import(/_ webpackChunkName: "about" _/ '../views/About.vue') import 返回的就是 promise

- 事件拓展符的用法

  - spread syntax 展开对象,展开数组
  - rest syntax 剩余 凝聚成数组

- 说一说服务端渲染 减少网络传输，响应快，用户体验好，首屏渲染快，对搜索引擎友好，搜索引擎爬虫可以看到完整的程序源码，有利于 SEO。
- 前端优化手段 [前端性能优化 24 条建议（2020） - 掘金 (juejin.cn)](https://juejin.cn/post/6892994632968306702#heading-19)

  - 加载更快

    - 减小加载文件大小: 压缩文件,图片
    - 减少加载次数 : 雪碧图,节流防抖

  - 渲染更快

    - 提前渲染 ssr,css 放在 header ,js 放在 body 避免渲染阻塞,懒加载,
    - 合并渲染操作,避免回流

  - 减少,减小 http 请求
  - 使用 http2
  - 使用 ssr 服务端渲染
  - 使用 cdn
  - 先执行 css 在执行 js
  - 使用字体图标替代图片
  - 缓存策略
  - 压缩文件
  - 图片优化
  - 按需加载
  - 减少回流
  - 事件委托
  - 使用 requestAnimationFrame 替代 set
  - 算法

- 性能优化有哪些性能指标,如何量化

  - FCP（First Contentful Paint）首次内容绘制 指浏览器从响应用户输入网络地址到页面内容的任何部分在屏幕上完成渲染的时间。这个就是实际有意义的首屏时间。
  - LCP（Largest Contentful Paint）最大内容绘制 表示可视区最大内容（文本块或图像元素）在屏幕上完成渲染的时间。该时间会随着页面渲染变化而变化，因为页面中的最大元素在渲染过程中可能会发生改变，另外该指标会在用户第一次交互后停止记录。
  - TTI（Time to Interactive）可交互时间 测量页面从开始加载到视觉上完成渲染、初始脚本完成加载，并能够快速、可靠地响应用户输入所需的可交互状态时间。 可交互状态指的是页面上的 UI 组件是可以交互的（可以响应按钮的点击或在文本框输入文字等）。
  - TBT（Total Blocking Time）总阻塞时间 FCP+TTI
  - CLS (Cumulative Layout Shift) 累积布局偏移 每当一个可见元素的位置从一个已渲染帧变更到下一个已渲染帧时，就发生了布局偏移 。
  - FID（First input delay）首次输入延迟 用户单击链接、点按按钮或使用由 JavaScript 驱动的自定义控件）直到浏览器实际能够对交互做出响应所经过的时间
  -

- 前端监控

  - 数据监控(监控用户行为)

  - 性能监控(监控页面性能)

  - 异常监控(监控产品,系统异常)

- 前端异常监控

  - 发生了什么错误
  - 时间段
  - 影响了多少用户
  - 哪些页面
  - 错误的原因
  - 定位解决问题
  - app.config.errorHandler vue 的错误监控
  - window.onerror 脚本错误
  - window.addEventListener( 'unhandledrejection') promise 未捕获异常
  - window.addEventListener( 'error') 静态资源加载错误
  - 搜集上报 -> 采集聚合 -> 可视化分析 -> 监控告警

- 为什么要开启 GZIP,减少 css,js,html,xml 的传输大小,但是需要消耗 cpu 去解压,有利有弊要平衡,压缩率为原来的 30%,不建议压缩图片和大文件,图片本身就有压缩,大文件消耗 CPU 得不偿失

  - gzip 两种方案(对应的 nginx conf 配置不一样)

    - 在线解压
    - 本地解压

  - Content-Encoding 值

    - gzip 表明实体采用 GNU zip 编码（使用最多）
    - compress 表明实体采用 Unix 的文件压缩程序
    - deflate 　表明实体是用 zlib 的格式压缩的
    - identity 　表明没有对实体进行编码。当没有 Content-Encoding header 时， 就默认为这种情况

  - Accept-Encoding 值

    - gzip
    - compress
    - deflate
    - br 　　 一种新的压缩算法 Brotli

- http

  - 服务器传输超文本到本地浏览器的超文本传输协议.信息是明文
  - 默认端口 80
  - 无状态连接

- https

  - http 下加入 SSL 证书层进行加密 确保数据传输,确保网站真实,防止数据在传输过程中被窃
  - 默认端口 443
  - 握手比较费时,加载时间,耗电增加
  - 缓存不如 http 高效,增加数据开销
  - 需要 ca 证书,功能越强大的越高
  - ssl 证书需要绑定 ip

- https 协议工作原理

  - 客户端请求 https url ,建立 ssl 链接
  - 服务器收到请求之后返回网站证书(证书中包含了公钥)给客户端
  - 客户端和服务端协商 ssl 链接的安全等级/加密等级
  - 协商一致的安全等级以后,建立会话密钥,客户端通过公钥来加密会话密钥
  - 服务端通过私钥解密出会话密钥
  - 服务端再通过会话密钥与客户端之前进行通信

- 什么是 mvvm

  - mvc model view controller 操作 dom 更新视图
  - mvvm model view viewmodel 数据驱动视图
  - 优点

    - 低耦合一个 model 可以绑定到多个 view 上 view 改变不一定改变 model ,model 改变 view 也可以不变
    - 可重复 封装
    - 独立开发 更专注于某一个块开发
    - 可测试

- webpack 的优化

  - 优化构建速度
  - 优化打包体积

    - 压缩代码
    - 提取公共资源
    - tree shaking 移除未使用的代码
    - Scope hoisting 将所有模块的代码按照引用顺序放在⼀个函数作用域，然后适当的重命名⼀些变量以防止变量名冲突。
    - 图片压缩
    - 动态 polyfill

- babel 的编译过程

  - babel 本质是一个 js 的编译器,将 es5 以后的代码转换为向后兼容的 js

  - babel 本质就是才操作 ast(抽象语法树)来完成代码的编译

  - 解析 将源代码转换成更加抽象的表示方法（例如抽象语法树）。包括词法分析和语法分析。词法分析主要把字符流源代码（Char Stream）转换成令牌流（ Token Stream），语法分析主要是将令牌流转换成抽象语法树（Abstract Syntax Tree，AST）。

  - 转换 通过 Babel 的插件能力，对（抽象语法树）做一些特殊处理，将高版本语法的 AST 转换成支持低版本语法的 AST。让它符合编译器的期望，当然在此过程中也可以对 AST 的 Node 节点进行优化操作，比如添加、更新以及移除节点等

  - 生成 将 AST 转换成字符串形式的低版本代码，同时也能创建 Source Map 映射。

- await 后的执行代码相当于 promise.then 也在微任务中 ,若无 reslove 则不执行

- require('xxx') 查找包过程

  - 首先找到 package.json 同级的 node_modules
  - 找到'xxx' 包
  - 找到'xxx'下的 package.json 的 main 字段中的 js 文件
  - 若没有 package.json 或没有 main 字段 则默认加载'xxx' 包的 index.js 文件
  - 若没有则查找上一级的 node_modules 直到根目录,最后报错

- 判断链表是否有环

  - 哈希表 set 遍历存储判断
  - 遍历链表添加访问字段
  - 快慢指针,若追上则为环

- Vue.use 原理 链式调用每一次

  ```javascript
  Vue.use = function (plugin) {
    const installedPlugins = this._installedPlugins || (this._installedPlugins = [])
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
  // 每一次都返回this链式调用
  // 获取Vue身上的_installedPlugins 判断是否已经安装过
  // 如果plugin是对象则执行他身上的install方法,如果是function 则直接执行
  ```

- js 实现异步任务调度器

  ```javascript
  const sleep = time => new Promise(resolve => setTimeout(resolve, time))

  class Scheduler {
    constructor(max) {
      this.max = max
      this.count = 0
      this.queue = []
    }

    async add(fn) {
      if (this.count >= this.max) {
        await new Promise(resolve => this.queue.push(resolve))
      }

      this.count++
      const res = await fn()
      this.count--
      this.queue.length && this.queue.shift()()
      return res
    }
  }

  const scheduler = new Scheduler(1)

  const addTask = (time, val) => {
    scheduler.add(() => sleep(time)).then(() => console.log(val))
  }

  addTask(1000, '1')
  addTask(1000, '2')
  addTask(1000, '3')
  addTask(1000, '4')
  ```

  ```javascript
  const sleep = delayInms => new Promise(resolve => setTimeout(resolve, delayInms))

  class Scheduler {
    constructor(max) {
      this.max = max
      this.working = []
      this.notWorking = []
    }

    addTask(task) {
      return new Promise(resolve => {
        task.resolve = resolve

        if (this.working.length < this.max) {
          return this.runTask(task)
        } else {
          this.notWorking.push(task)
        }
      })
    }

    runTask(task) {
      this.working.push(task)

      return task().then(() => {
        task.resolve()

        const index = this.working.indexOf(task)
        this.working.splice(index, 1)

        if (this.notWorking.length) {
          this.runTask(this.notWorking.shift())
        }
      })
    }
  }

  const scheduler = new Scheduler(1)

  async function addTask(delay, value) {
    scheduler
      .addTask(() => sleep(delay))
      .then(() => {
        console.log(value)
      })
  }

  addTask(2000, '2')
  addTask(1000, '1')
  addTask(1000, '1')
  addTask(1000, '1')
  ```

- 前端测试

  - ESLINT 测试，过 ESLint 进行类型校验，格式校验，
  - 工具类函数测试 jest
  - 组件测试 复用组件测试 testing-library 沙盒环境下对 vue 进行渲染，根据渲染结果进行判断
  - 页面测试 cypress 模拟用户的点击，判断页面元素
  - mock 数据测试，将所有的请求结果都 mock 出来，方便纠错

- [「前端进阶」高性能渲染十万条数据(虚拟列表)](https://juejin.cn/post/6844903982742110216#heading-0)

  - 时间分片： 交由 前端来进行分页，使用定时器分批量添加到下一次 event loop,切割渲染，避免长时间空白 setTimeout 会有丢帧的情况。requestAnimationFrame 不会。使用 DocumentFragment 减少回流。只适用于简单的 dom
  - 虚拟列表
    - Recalculate Style：样式计算，浏览器根据 css 选择器计算哪些元素应该应用哪些规则，确定每个元素具体的样式。耗时长
    - Layout：布局，知道元素应用哪些规则之后，浏览器开始计算它要占据的空间大小及其在屏幕的位置。耗时长
    - 空白列表占位，滚动列表进行虚拟加载slice
    - 动态高度 ，以预估高度先行渲染，再通过updated来更新为真正的高度。IntersectionObserver可以监听目标元素是否出现在可视区域内，在监听的回调事件中执行可视区域数据的更新。减少scroll性能消耗，ResizeObserver监听图片加载导致的内容高度大小变化

- DocumentFragment，文档片段接口，表示一个没有父级文件的最小文档对象。它被作为一个轻量版的 Document 使用，用于存储已排好版的或尚未打理好格式的 XML 片段。最大的区别是因为 DocumentFragment 不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的（重新渲染) ，且不会导致性能等问题。可以使用 document.createDocumentFragment 方法或者构造函数来创建一个空的 DocumentFragment


- [图片懒加载](https://juejin.cn/post/7120214953256026125) 将图片路径存到data-xxx，当图片出现在可视区域时，再赋值给src