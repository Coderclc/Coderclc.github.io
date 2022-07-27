# JS - this 指向

## 一、什么是 this

> A **function's `this` keyword** behaves a little differently in JavaScript compared to other languages. It also has some differences between strict mode and non-strict mode.

从官方文档我们可知

- this 是一个关键字
- this 主要用在函数中
- this 在 strict mode 下指向有一些不同

### 1.1 全局环境

无论是否在 strict mode，在全局执行环境中（在任何函数体外部）this 都指向全局对象。(浏览器中 window 为 ECMAscript 规定的 Global 对象)

```javascript
'use strict'
//在 Node 中
console.log(this) // {}

//在浏览器中
console.log(this) //window
console.log(this === window) //true
this.foo = 'foo'
console.log(window.foo) //foo
window.bar = 'bar'
console.log(this.bar) //bar
```

#### 1.1.1 执行上下文(Execution Context)

在全局作用域 var 关键字声明变量和省略声明的变量都会添加为全局对象的属性

```javascript
var foo = 'foo'
bar = 'bar'
this.foo // foo
this.bar // bar
```

const 、let 关键字声明的变量有自己的作用域

```javascript
const foo = 'foo'
let bar = 'bar'
this.foo // undefined
this.bar // undefined
```

### 1.2 函数（运行内）环境

在函数内部，this 的指向取决于函数被调用的方式。

#### 1.2.1 函数简单调用

```javascript
//非严格模式下  this 的值默认指向全局对象。
function foo() {
  return this
}
// 在Node 中
foo() // Object [global]

//在浏览器中
foo() //window
```

```javascript
//严格模式下 this 默认为undefined。
function foo() {
  'use strict'
  return this
}
// 在Node 中
foo() // undefined

//在浏览器中
foo() // undefined
```

#### 1.2.2 函数作为对象的方法调用

(1) 当函数作为方法被调用时， this 指向调用该方法的对象

```javascript
var foo = {
  fn: function () {
    return this
  }
}
foo.fn() // foo
```

```javascript
var foo = {}
function fn() {
  return this
}
foo.fn = fn
foo.fn() // foo
```

(2) 链式调用,this 指向上一个绑定对象

```javascript
var bar = {
  fn: function () {
    return this
  }
}
var foo = {
  bar: bar
}
foo.bar.fn() // this ->bar
```

(3)当函数调用时没有绑定任何对象,隐式丢失

```javascript
// 隐式丢失
var foo = {
  fn: function () {
    return this
  }
}
var bar = foo.fn
bar() // window
```

## 二、this 与箭头函数

### 2.1 箭头函数中，this 与最近作用域的 this 相同

```javascript
var foo = {
  fn: function () {
    return () => {
      return this
    }
  }
}
var bar = foo.fn()
bar() // this -> foo
```

fn 函数返回一个匿名箭头函数,箭头函数中的 this 向上一层级找,此时箭头函数中的 this=> fn 中的 this

### 2.2 对象的方法中的箭头函数

```javascript
var foo = {
  bar: this,
  fn: () => {
    return this
  }
}
foo.bar // window
foo.fn() //window
```

此时 fn 函数虽然作为 foo 的方法调用,但由于箭头函数向上找作用域 this 的缘故,箭头函数的 this 指向 window

## 三、this 与匿名函数

this 对象是基于函数的运行环境绑定的

因为匿名函数的执行环境有全局性,因此 this 对象常指向 window

```javascript
var foo = {
  fn: function () {
    return function () {
      return this
    }
  }
}
foo.fn()() // this -> window
```

为什么匿名函数作用域的 this 没有访问外部作用域 fn 中的 this 呢? 因为函数在调用时会自动取得两个特殊的变量,this 和 arguments,匿名函数本身也会取得指向 window 的 this,一旦搜得其活动对象即停止.

那么如何访问 fn 中的 this 呢

### 3.1 通过闭包保存

```javascript
var foo = {
  fn: function () {
    var _this = this
    return function () {
      return _this
    }
  }
}
foo.fn()() // _this -> foo
```

### 3.2 通过箭头函数访问外部作用域

```javascript
var foo = {
  fn: function () {
    return () => {
      return this
    }
  }
}
foo.fn()() // this -> foo
```

## 四、this 与 call()和 apply()

可以通过使用函数继承自 Function.prototype 的 call 或  apply  方法将  this 值绑定到调用中的特定对象。

```javascript
var foo = {}
var args = []
function bar(...args) {
  return this
}
bar.call(foo, ...args) // this -> foo
bar.apply(foo, args) // this -> foo
```

call 和 apply 的区别为,call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组。

## 五、this 与 bind()

ECMAScript 5 引入了 Function.prototype.bind()。调用 f.bind(someObject)会创建一个与 f 具有相同函数体和作用域的函数，但是在这个新函数中，this 将永久地被绑定到了 bind 的第一个参数，无论这个函数是如何被调用的。

```javascript
var obj = {}
function bar() {
  return this
}
var foo = bar.bind(obj)
foo() // this -> obj
obj.foo = foo
obj.foo() //this -> obj
```

## 六、this 与 getter 和 setter

当函数在一个 getter 或者 setter 中被调用。用作 getter 或 setter 的函数都会把 this 绑定到设置或获取属性的对象。

```javascript
var foo = {}
Object.defineProperty(foo, 'bar', {
  get() {
    return this
  }
})
foo.bar // this -> foo
```

## 七、this 与构造函数

当一个函数用作构造函数时（使用 new 关键字），this 被绑定到构造的新对象。

```javascript
function foo(why) {
  this.why = why
}
var bar = new foo('why')
bar.why // -> why
```

## 八、this 与 DOM 事件处理函数

绝大部分浏览器,当函数被用作事件处理函数时，它的 this 指向触发事件的元素

```javascript
var btn = document.getElementsByClassName('btn')
for (var i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', () => {
    return this
  })
}
// this ->btn[i]
```

总结非严格模式下,浏览器中

- 函数外 this 指向 window
- 函数内 this 指向取决于调用方式
- 箭头函数 this 指向向上一层作用域的 this
- 匿名函数 this 指向 window
