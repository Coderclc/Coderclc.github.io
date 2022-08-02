# JS - This points to

## 1. What is this

> A **function's `this` keyword** behaves a little differently in JavaScript compared to other languages. It also has some differences between strict mode and non-strict mode.

From the official documentation we know

- this is a keyword
- this is mainly used in functions
- this points to something different in strict mode

### 1.1 Global Environment

In the global execution environment (outside any function body) this refers to the global object, whether in strict mode or not. (The window in the browser is the Global object specified by ECMAscript)

```javascript
'use strict'
// in Node
console.log(this) // {}

// in the browser
console.log(this) //window
console.log(this === window) //true
this.foo = 'foo'
console.log(window.foo) //foo
window.bar = 'bar'
console.log(this.bar) //bar
```

#### 1.1.1 Execution Context

Variables declared in the global scope with the var keyword and variables that are omitted from the declaration are added as properties of the global object

```javascript
var foo = 'foo'
bar = 'bar'
this.foo // foo
this.bar // bar
```

Variables declared with const and let keywords have their own scope

```javascript
const foo = 'foo'
let bar = 'bar'
this.foo // undefined
this.bar // undefined
```

### 1.2 Function (In-Run) Environment

Inside a function, what this refers to depends on how the function was called.

#### 1.2.1 Simple function call

```javascript
//The value of this in non-strict mode points to the global object by default.
function foo() {
  return this
}
// in Node
foo() // Object [global]

// in the browser
foo() //window
```

```javascript
//This defaults to undefined in strict mode.
function foo() {
  'use strict'
  return this
}
// in Node
foo() // undefined

// in the browser
foo() // undefined
```

#### 1.2.2 Function as a method call of an object

(1) When a function is called as a method, this refers to the object that called the method

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

(2) Chain call, this points to the previous binding object

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

(3) No object is bound when the function is called, which is implicitly lost

```javascript
// implicitly lost
var foo = {
  fn: function () {
    return this
  }
}
var bar = foo.fn
bar() // window
```

## Second, this and arrow functions

### 2.1 In arrow functions, this is the same as this in the nearest scope

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

The fn function returns an anonymous arrow function, the this in the arrow function is looked up one level up, at this time this in the arrow function=> this in fn

### 2.2 Arrow functions in methods of objects

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

At this time, although the fn function is called as a method of foo, because the arrow function looks up the scope this, the this of the arrow function points to window

## Three, this and anonymous functions

this object is bound based on the runtime environment of the function

Because the execution environment of anonymous functions is global, this object often points to window

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

Why doesn't this in the scope of the anonymous function access this in the outer scope fn? Because the function will automatically obtain two special variables, this and arguments, when the function is called, and the anonymous function itself will also obtain this pointing to the window. Its active object is stopped.

So how to access this in fn?

### 3.1 Saving through closures

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

### 3.2 Accessing outer scopes via arrow functions

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

## Four, this and call() and apply()

The this value can be bound to a specific object in the call by using the call or apply methods that functions inherit from Function.prototype.

```javascript
var foo = {}
var args = []
function bar(...args) {
  return this
}
bar.call(foo, ...args) // this -> foo
bar.apply(foo, args) // this -> foo
```

The difference between call and apply is that the call() method accepts a list of parameters, while the apply() method accepts an array containing multiple parameters.

## Five, this and bind()

ECMAScript 5 introduced Function.prototype.bind(). Calling f.bind(someObject) will create a function with the same body and scope as f, but in this new function, this will be permanently bound to the first parameter of bind, no matter how the function is called called.

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

## Six, this and getter and setter

When the function is called in a getter or setter. Functions used as getters or setters bind this to the object that sets or gets the property.

```javascript
var foo = {}
Object.defineProperty(foo, 'bar', {
  get() {
    return this
  }
})
foo.bar // this -> foo
```

## Seven, this and constructor

When a function is used as a constructor (using the new keyword), this is bound to the new object constructed.

```javascript
function foo(why) {
  this.why = why
}
var bar = new foo('why')
bar.why // -> why
```

## Eight, this and DOM event handlers

In most browsers, when a function is used as an event handler, its this points to the element that triggered the event

```javascript
var btn = document.getElementsByClassName('btn')
for (var i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', () => {
    return this
  })
}
// this ->btn[i]
```

Summary In non-strict mode, in the browser

- outside the function this points to window
- The this pointer in the function depends on the calling method
- The arrow function this points to this in the upper scope
- Anonymous function this points to window
