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

## typeof

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

## new

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

## instanceOf

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

## this

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

## 节流
