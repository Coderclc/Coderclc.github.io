# Javascript

## Built-in types

- Eight built-in types

- base type: null undefined string number boolean symbol bigint
- reference type object

- The number type is a floating point type, there is no integer type, the floating point type is implemented based on the IEEE 754 standard,

- `NaN ! = NaN` `typeof NaN = number`

- For basic types, if the literal method is used, then this variable is only a literal, and will only be converted to the corresponding type when necessary

```javascript
let foo = 233 // this is just a literal, not a number
foo.toString() // will only be converted to object type when used
```

What does it mean? You must know that the 233 number does not have the toString method, why does it assign to foo but has the toString method (boxing and unboxing)

Boxing: The operation of converting a primitive data type into a corresponding reference data type

Unboxing: The operation of converting a reference data type to the corresponding primitive data type (through the valueOf and toString methods)

```javascript
233. hasOwnProperty('toString') // error
new Number(233).__proto__.hasOwnProperty('toString') // true
new Number(233) === 233 // false
Number.prototype.hasOwnProperty('toString') // true
Number.prototype.__proto__===Object.prototype // true
Number.prototype.__proto__.hasOwnProperty('toString') // true
```

## Typeof

- typeof displays the correct type for primitive types except null

```javascript
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof b // b is not declared, but still shows undefined
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
typeof null // 'object' This is a long-standing bug
```

- Why does this happen? Because in the initial version of JS, a 32-bit system was used, and the type information of the variable was stored in the lower bits for performance considerations. The beginning of 000 represents an object, but null represents all zeros, so it is wrongly judged as object . Although the current internal type judgment code has changed, this bug has been passed down.

- So using typeof to judge the type is imprecise and error-prone. If we want to get the correct type of a variable, we can pass `Object.prototype.toString.call(xx)`. This way we can get strings like `[object Type]`.

- ts custom functions need to use the `is` keyword in the return value type of the function to help the compiler judge

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

- There is another way to judge whether it is undefined

```javascript
let a
// We can also judge undefined like this
a === undefined
// But undefined is not a reserved word and can be assigned in lower version browsers
let undefined = 1
// This judgment will be wrong
// So it can be judged in the following way, and the amount of code is less
// because void is followed by a random composition expression
// return is undefined
a === void 0
```

## type conversion

- Convert any type to Boolean

- undefined , null , false , NaN , '' , 0 , -0 , false otherwise true
- Note that [] , {} , '0' are true

- Object to basic type

- When the object converts the basic type, it first calls valueOf on the object prototype, and then calls toString

```javascript
// This is why you often see the string [object Object] in the console
{foo:'foo'} + 'bar' => [object Object] bar
```

- Of course you can override these two methods on the object

```javascript
let foo = {
valueOf(){
return 0
},
toString(){
return 666
}
}
foo+'233' ->'0233' // toString will not be called if valueOf returns a primitive

let foo = {
valueOf(){
return this
},
toString(){
return 666
}
}
foo+'233' -> '666233'
```

- You can also override the `[Symbol.toPrimitive]` method, which has the highest priority

```javascript
let foo = {
valueOf(){
return this
},
toString(){
return 666
},
[Symbol.toPrimitive]() {
return 233;
}
}

foo+'233' -> '233233'
```

- Four operators

- \+ One side is string, the other side is converted to string

- \- \* / One side is number, the other side is number

- +'1' -> 1 number

- ```javascript
  [1, 2] + [2, 1] // '1,22,1'
  [1, 2].toString() -> '1,2'
  [2, 1].toString() -> '2,1'
  '1,2' + '2,1' = '1,22,1'
  ```

`````

- why [] == ![]

![type-conversion](/images/frontend/type-conversion.png)

````javascript
1 == true -> true
2 == true -> false
!![] -> true
[] == false
`````

```javascript
// [] converts to true, then negates it to false
[] == false
// according to clause 8
[] == ToNumber(false)
[] == 0
// according to clause 10
ToPrimitive([]) == 0
// [].toString() -> ''
'' == 0
// according to clause 6
0 == 0 // -> true
// [1] == [2] both sides are objects return false
```

- comparison operators

- If it is an object, convert the object through toPrimitive
- If it is a string, compare by unicode character index

## prototype

![prototype](/images/frontend/prototype.png)

## New

- Factory function

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

- Constructor

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
  this.run = () => {
    console.log(this.name + 'running')
  }
}
var foo = new Person('foo', 18)
```

- what does new do?

The above four things will happen in the process of calling new, we can also try to implement a new by ourselves

1. A new object is created
2. Link to Prototype
3. Bind this
4. Return the new object

```javascript
function create() {
  // create an empty object
  let obj = new Object()
  // get the constructor
  let Con = [].shift.call(arguments) // The empty array executes shift but calls the execution object as arguments, which converts the class array to an array and executes shift, and modifies the arguments
  // link to prototype
  obj.__proto__ = Con.prototype
  // bind this, execute the constructor
  let result = Con.apply(obj, arguments) // The second parameter of apply is the parameter array, which can be a class array, both index:number and length attribute
  // Make sure that new is an object
  return typeof result === 'object' ? result : obj
}
// this in Person points to the caller of Person.Con
function Person(name, age) {
  this.name = name
  this.age = age
  this.run = () => {
    console.log(this.name + 'running')
  }
}

create(Person, 'zone', 18)
```

##InstanceOf

handwritten instanceOf

```javascript
function instanceof (left, right) {
// get the prototype of the type
let prototype = right.prototype
// get the prototype of the object
left = left.__proto__
// Determine if the type of the object is equal to the prototype of the type
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
- call,bind,apply

## execution context

When executing JS code, three execution contexts are generated

- Global execution context
- function execution context
- eval execution context

```javascript
console.log(foo) // undefined hoisted variables and functions
var foo = 'foo'
const foo = 'foo' // error temporary dead zone
```

## Closure

Function A returns a function B, and function B uses the variables of function A, and function B is called a closure.

```javascript
function A() {
  let a = 1
  function B() {
    console.log(a)
  }
  return B
}

A()()
// Because the variables in function A are stored on the heap at this time. Today's JS engines can identify which variables need to be stored on the heap and which need to be stored on the stack through escape analysis.
```

```javascript
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}

//Closure
for (var i = 1; i <= 5; i++) {
  ;(function (j) {
    setTimeout(function timer() {
      console.log(j)
    }, j * 1000)
  })(i)
}

//seTimeout third parameter
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

## deep and shallow copy

- Shallow copy

- Object.assign
- ... operator

- deep copy

- JSON.parse(JSON.stringify(object))
- ignore undefined
- ignore symbols
- cannot serialize function
- cannot resolve circularly referenced objects
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
// The xxx..toString() method will return a string like "[object XXX]".
// But most of the object toString() methods are overridden. In this case, you need to call them with methods such as call() or Reflect.apply().
;({}.toString()) // => "[object Object]"
Math.toString() // => "[object Math]"
// Object.prototype.toString.call(x);
// The toString method on the Object prototype is used exactly, and the execution object is changed by call
```

## Modular

- es6

- Asynchronous import, because it is used in browsers, files need to be downloaded, if synchronous import is also used, it will have a great impact on rendering
- Using real-time binding, the imported and exported values all point to the same memory address, so the imported value will change with the exported value

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

- Browserify parsing is required for use in browsers.
- It is a synchronous import, because it is used for the server, the files are all local, and the synchronous import has little effect even if the main thread is stuck
- Support dynamic import, that is, require(${path}/xx.js) .
- Value copy, even if the exported value changes, the imported value will not change, so if you want to update
- value, which must be imported again.

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

## Anti-shake

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

Disadvantage, the function is called after wait

-hard

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

The disadvantage is that the first triggered function is executed

## Dom

- `cloneNode()` copy a node and pass true to recursively copy descendant nodes, otherwise only the current node is copied
- `@touchstart` `@touchmove` `@touchend` events for mobile
- `querySelector` returns only the first match of whatever selector
- `querySelectorAll` arguments
- `return false` cancels browser default behavior
- Capture from the outside in, bubbling from the inside out
- `btn.addEventListener("click",clc,false)`, the third parameter defaults to false, it is not triggered in the capture phase, pass the parameter true to capture first
- Compatible with ie `event=event||window.event` Cancel Bubble `event.cancelBubble=true`;
- innerHTML all nodes innerText text nodes
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

- xhr.responseText is of type JSON string
- Transmission data format x-www-form-urlencoded and Json
- xhr.readyState()
- 0 is requested but not initialized, i.e. open() is not called
- 1 Initialized not sent
- 2 has been sent without response
- 3 is accepting response
- 4 Response complete
- Compatible ie is triggered when the status code of xhr.onreadystatechange() changes, which is inefficient. xhr.onload() capture respond triggers
- xhr.status http status code
- 200 ok
- 400 servers
- 500 network

## RegExp

- `exec` assign() to Regexp.$1.....$9
- `igsm` ignore ignore case global global pattern s. match whitespace multiline multiline pattern
- `[.-]` matches .or-
- `[A-Z0-9]` all letters and numbers
- `.?` lazy match `.*` greedy match
- `\b` word boundary
- `(n)` capture
- `(?:n)` does not capture, the returned whole contains this part
- `(?=n)` does not capture, and the returned whole does not contain
- `n(?!233)` captures n not immediately followed by 233
- `n(<=233)` captures n followed by 233
- after `n(<!233)`
- `?<n>` to name the group

## Review

- \>\>\> 0

- `0` if not convertible to `Number`
- If it is a non-integer, convert it to an integer first, refer to the formula `sign(n) ⋅ floor(abs(n))`
- If it is a positive number, return the positive number, if it is a negative number, return the negative number + 2 to the 32nd power

- `process.argv.splice(2) [node url,exe.* url, Extra parameters]`
- `process.exit()`
- `exit(0)` success exit
- `exit(1)` error exit
- `NaN !== NaN true 0 !==-0 false Object.is(NaN,NaN) true Object.is(+0,-0) false`
- `isNaN()` is first converted to `number` type before judgment
- When both sides of the relational operator are str, compare unicode, bitwise comparison
- Signed integer, 32 bits are the sign bit, 0 is positive, 1 is negative
- Negative numbers are stored in two's complement, which is the absolute value, negated ➕1
- Left-shift signed, unsigned << Left-shift left-shift will not affect the sign bit, -2 left-shift is -64, vacancy is filled with 0
- Shift to the right with a sign, shift to the right, the left side is vacated, and the value of the sign bit is filled. For positive numbers, the result is the same
- Unsigned right shift vacant bits filled with 0
- The basic data type is on the stack, the reference data type is on the heap to create a variable to open up the stack, the object is created to open the heap, the value stored in the stack of the reference data type is the address of the heap
- Comparing objects compares addresses on the stack
- js functions have class function signatures, formal parameters and actual parameters
- function returns undefined by default
- The global variable is the property of the window, and the global method is the method of the window
- document.write will cover the entire page
- The function attribute prototype points to the prototype object, and the prototype object constructor points to the function
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

- Optional chain x.prop1?.prop2 don't worry if it exists, it will return undefined if it doesn't exist
- Error Cause - throw Error('Upload job result failed', { cause: err }) Multiple errors are thrown, which can be specified in the second parameter, and you can know which error is thrown by accessing err.cause in the external try cause span
- for await of

```javascript
function fn (time) {
return new Promise((resolve, reject) => {
setTimeout(() => {
resolve(`${time} I succeeded after milliseconds!!!`)
}, time)
})

async function asyncFn () {
const arr = [fn(3000), fn(1000), fn(1000), fn(2000), fn(500)]
for await (let x of arr) {
console.log(x) x is resolve
}
}

asyncFn()
```

- Array.flatMap

```javascript
let arr = ['Kobe James Anthony', 'Lillard Rose McCollum']
console.log(arr.map(x => x.split(' ')).flat())
console.log(arr.flatMap(x => x.split(' ')))
```

- `BigInt` is a new JavaScript data type added to ES10, used to represent integers greater than `2^53 - 1`, `2^53 - 1` is the largest number that JavaScript can represent before ES10

- Object.fromEntries is the opposite of Object.entries

```javascript
const arr = [
  ['name', 'Lin Sanxin'],
  ['age', 22],
  ['gender', 'male']
]

console.log(Object.fromEntries(arr)) // { name: 'Lin Sanxin', age: 22, gender: 'male' }
```

Another use is to convert map to object

```javascript
const map = new Map()
map.set('name', 'Lin Sanxin')
map.set('age', 22)
map.set('gender', 'male')

console.log(map) // Map(3) { 'name' => 'Lin Sanxin', 'age' => 22, 'gender' => 'male' }

const obj = Object.fromEntries(map)
console.log(obj) // { name: 'Lin Sanxin', age: 22, gender: 'male' }
```

- String.trimStart && String.trimEnd vs trim clear whitespace

- promise

- `all` method

- Receive a Promise array, if there is a non-Promise item in the array, this item is considered successful
- If all Promises succeed, return an array of successful results
- If a Promise fails, return this failure result

- `race` method

- Receive a Promise array, if there is a non-Promise item in the array, this item is considered successful
- Whichever Promise gets the result the fastest, return that result, regardless of success or failure

- all settled

- Receive a Promise array, if there is a non-Promise item in the array, this item is considered successful
- Assemble the results of each Promise into an array and return

- any which successfully returns the fastest success, all failures will fail
- Receive a Promise array, if there is a non-Promise item in the array, this item is considered successful
- If a Promise succeeds, return this success result
- If all Promises fail, report an error

- ||= and &&=

- or equal to (||=) a ||= b is equivalent to a || (a = b);

- and is equal to (&&=) a &&= b is equivalent to a && (a = b);

- try catch new format, allowing not to write error

```javascript
try {
} catch (error) {}
try {
} catch {}
```

- string.matchAll returns an iterator instead of reg.exec recursively

```javascript
const regexp = /[ac]/g
const str = 'abc'

const iterator = str.matchAll(regexp)

iterator.next() // {value: [ 'c', index: 2, input: 'abc', groups: undefined ],done: false}
// or
Array.from(iterator, res => console.log(res))
```

- at() array slice

```javascript
const arr = [1, 2, 3, 4]
;(arr[3] === arr[arr.length - 1]) === arr.at(-1)
```

- Top-level await allows use of await in non-function scopes

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

- ASD

After the user fills in the account and password, he will verify to the server whether it is correct. After the verification is passed, the server will return a **token**, after getting the token (I will store this token in a cookie to ensure that after refreshing the page Can remember the user's login status), the front end will pull a **user_info** interface according to the token to obtain the user's detailed information (such as user permissions, user name, etc.).

Permission verification: Obtain the **role** corresponding to the user through the token, dynamically calculate the corresponding authorized routes according to the user's role, and dynamically mount these routes through **router.addRoutes**. Use vuex to manage the routing table and render sidebar components based on the routes accessible in vuex.

One is whether to enter, the other is side rendering

Why not use the routing table to be dynamically generated by the back-end according to the user? The front-end and back-end are not separated,

- process

process.env.port command line control port set port=8081 yarn dev // yarn dev --port=7777

The process.env.npm_config_port global variable controls the port

- Object.freeze

this.item = Object.freeze(Object.assign({}, this.item)) Freeze the value object of data to reduce overhead

When you pass a normal JavaScript object to the data option of a Vue instance, Vue will iterate over all the properties of this object and use `Object.defineProperty` to convert all these properties to `getter/setter`, which allow Vue to track Dependencies, notify changes when properties are accessed and modified. After using `Object.freeze`, you can not only reduce the overhead of `observer`, but also reduce a lot of memory overhead. Related [issue](https://github.com/vuejs/vue/issues/4384).

- count++ returns NAN if count is undefined

- ex is a relative unit in css, relative to a unit that changes with font size and font style

- What is the difference between GET and POST? get: use URL to pass parameters; the amount of information sent is limited; post: theoretically there is no limit to the size of the data sent, post can send strings in plain text, URL encoded format, and binary format

- Math.random

- 0~1 including 0, not including 1
- 0~10 Math.floor(Math.random()\*10) excluding 10
- 2~10 Math.floor(Math.random()\*(10 - 2)) + 2

- let [a,b, c,d, e] = `"hello"`; arrays can destructure strings

- Html5 storage object localStorage sessionStorage

- window.onload

- The difference between placing `<script>` at the bottom of `<head>` and placing it at the bottom of `<body>`, the head is loaded first, but the elements in the body cannot be manipulated, and it will block when the loading is slow

- The loading of defer and async dom is synchronized with the downloading of style and script, which affects user experience. JavaScript thread and GUI thread are mutually exclusive

- defer is used to start a new thread to download the script file and make the script execute after the document is parsed. Multiple defers in document order
- async is used to asynchronously download script files, and immediately interpret and execute the code after downloading. Multiple async are based on the principle of loading first and parsing first.

- what the new operator does

- create empty object
- Link prototype
- bind this
- return new object

- Session and cookie remember the principle of login mechanism

- The state saving mechanism of the cookie client identifies the user through the user information carried in the cookie
- The state preservation mechanism of the session server identifies the user by carrying the sessionId in the cookie

- What is the order (event flow) in which events are received in the web page? What is the difference between them?

- Bubble up and pass
- capture phase pass

- Cross-domain, the request initiated by the web page is different from the protocol, domain name, and port of the web page, that is, the cross-domain request. Solution?

- cors: One of the most commonly used solutions at present, allowing cross-domain implementation by setting the backend. res.setHeader('Access-Control-Allow-Origin', '\*'); res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS, POST");

Node middleware, nginx reverse proxy: When cross-domain restrictions are used, browsers cannot access the server across domains. Node middleware and nginx reverse proxy both allow requests to be sent to the proxy server. The static page and the proxy server are of the same origin. , and then the proxy server sends a request to the backend server. There is no same-origin restriction between the server and the server.

JSONP: The principle of use is that the script tag can request resources across domains, and the callback function is spliced in the url as a parameter. The backend receives the request, calls the callback function, and returns the data as a parameter. Pay attention to setting the response header to return the document type, which should be set to javascript.

postmessage: H5 adds an API to realize cross-domain communication through sending and receiving APIs.

- Difference between cookie, localStorage, sessionStorage

- Both are local storage of the browser
- The cookie is usually written by the server and determines the life cycle. LocalStorage will always exist when it is written. Unless it is manually cleared, SessionStorage will be automatically cleared when the page is closed.
- The storage space of cookies is relatively small about 4KB, storage 5MB
- Both follow the same-origin principle, sessionStorage must be the same page
- Sending requests will automatically carry cookies, storage will not
- Application scenario Cookie is generally used to store login authentication information SessionID or token, LocalStorage is often used to store data that is not easy to change, to reduce the pressure on the server, SessionStorage can be used to detect whether the user refreshes the entry page, such as the music player resumes the playback progress bar Function.

- The fundamental difference between primitive data types and reference data types.

- The basic data type is a simple data segment directly stored in the stack, occupies a small space, and belongs to frequently used data.
- Reference data types are stored in heap memory and occupy a large space. The reference data type stores a pointer in the stack, which points to the starting address of the entity in the heap. When the interpreter looks for the reference value, it retrieves its address in the stack, and then obtains the entity from the heap after obtaining the address.
- How to use BigInt 1. Directly after the integer ➕n 2. BigInt('') constructor

- setTimeout(foo, 0) This line of code cannot be equivalently replaced with foo() Synchronous to asynchronous cannot be converted to each other

- window.requestAnimationFrame you want to perform an animation, the callback function will be executed before the browser's next repaint, the callback function execution times is usually 60 times per second compared to setInterval(function(){ },1000/60) requestAnimationFrame setInterval 1. Gathers all DOM operations in each frame and completes in one repaint or reflow 2. Pauses calls when in background tabs or hidden iframes to improve performance and battery life.

infinite redraw animation

```javascript
;(function animloop() {
  render()
  window.requestAnimationFrame(animloop)
})()
```

- Object.defineProperty configurable, enumerable, writable if not specified, the default is false. In node environment, if enumerable is not specified, you cannot see the key and value of the object, but you can still see it in the browser environment. If the object already has this key, when you specify it again, it will not be specified will not become false

- The js strict mode is too loose when it leaves the factory, and the restrictions on weak languages are added later [understand JS strict mode, it is not harmful to you! -Alibaba Cloud Developer Community (aliyun.com)](https://developer.aliyun.com/article/975537)

- Open the whole file

```javascript
<script>"use strict"; console.log("strict mode");</script>
```

- single function open

```javascript
function strict() {
  'use strict'
  return 'strict mode'
}
```

- There are multiple script files for a project, some are enabled and some are not. What mode does the merged code belong to after the package is completed?

- It is recommended to enable strict mode according to one function.

- All code is put into an anonymous function that executes immediately

```javascript
;(function () {
  'use strict'
})()
```

1. Declare variables must have keywords
2. Cannot use `delete`
3. Unable to use some future keywords as variables implements`, `interface`, `let`, `package
4. Object operations will be stricter, for example, if a read-only property is modified, an error will be reported
5. Function parameters cannot have the same name
6. The arguments in the function cannot be modified
7. arguments and parameters are no longer bound to each other
8. Function declarations must be at the top level
9. Forbid the use of eval()
10. Prohibit the use of with()
11. this will not point to the global, function execution context, ordinary functions
12. Prohibit octal notation

- .In addition to addition and one side is a string, the rest of the subtraction, multiplication, division and remainder are converted to number from basic types, and reference types are converted to valueOf().toString() so Number(null) ->0 Number(undefined) -> NaN, 1+[] -> 1

- Both sides will be converted to Number Number([]) -> 0 Number({})

- Function instanceof Object , Object instanceof Function

- No matter how long the synchronization operation is, it takes priority over micro-tasks and macro-tasks

- javascript is divided into preprocessing and execution stages, although a = 2 is not executed but a in the scope has been declared

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

- Static languages are strongly typed languages c, c++, java, dynamic languages are both weakly typed languages js

- parseInt("1a") === 1 true

- attachEvent in ie is equal to addEventListener of other browsers

- 0/0 will return NaN and will not trigger a catch

- Date setMonth(0~11) setDate(40) greater than 30 or 31 will enter the next month

- requestAnimationFrame is executed asynchronously so it is the same as loop output var i

- with changes the variables in the scope, if not, it will leak out until the global

- readonly is invalid for buttons, used for forms

- call, bind , apply if null or undefined is passed, this points to the global object, in non-strict mode

- new Boolean(false) ->Boolean {false} gets an object, but document.write is the result value again, fuck Boolean(false) -> false gets a boolean value, if the document passed is not a basic data type, toString will be executed ()

- var foo = new Function('x', 'y', 'return x + y') new Function converts strings to functions

- let num = (function(x){delete x;return x;})(1); you can get the value from the immediately executed function

- what is a closure

- The inner function has a reference to the outer scope, which will lead to a closure
- Where is the upper-level scope of the function created, who is the upper-level scope, the location where it is created, not the location where it is called
- The location where the variables in the closure are stored is heap memory. The stack memory has a recycling mechanism, if it is on the stack, it will be recycled
- The variables in the closure are independent, and multiple closures do not interfere with each other
- Principle of formation: scope chain, the current scope can access variables in the parent scope

- isNaN The `isNaN` function will first try to convert this parameter to a number, and then will check whether the converted result is [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/ JavaScript/Reference/Global_Objects/NaN) to judge

- The function is not overloaded!! The function with the same name will be overwritten and promoted

- The way the array changes itself, sort has also changed, changed the order, concat has not changed, and returns the connected copy

- dom id, className innerHTML are readable and writable, tagName can only be read

- continue will skip the following content and execute it directly

- What is Promise

- The new constructor of es6, the solution for asynchronous programming
- There are three states pending, fulfilled (Resolved), rejected

- What is BFC

- In terms of translation, Block Formatting Context is a block-level formatting context, independent rendering area, and will not affect elements outside the border. When the margins or padding are merged, you can use BFC to solve this problem
- Layout rules 1. The inner boxes will be placed one after the other in the vertical direction. 2. The vertical distance is determined by margin. The margins of two adjacent Boxes belonging to the same BFC will overlap 3. When calculating the height of the BFC, the floating element also participates in the calculation
- float `is set to`left`or`right`-`position`is`absolute`or`fixed`-`overflow`is not`visible`, is `auto`, `scroll`, `hidden`-`display`is`flex`or`inline-block
- problem solving, clear float

- iframes

- Creation is 1-2 orders of magnitude slower than normal DOM elements
- Block page loading. The onload event of window needs to be fired after all iframes (including the elements inside) are loaded.
- The only connection pool occupies the connection pool and blocks the loading of the main page resources
- Retrieval programs that are not conducive to SEO search engines cannot interpret iframes In addition, iframes themselves are not dynamic languages, and styles and scripts need to be imported additionally

- for(;i<6,j<10;) Multiple condition judgments are separated by commas, the latter is the basis

- confirm() confirmation box alert() alert box prompt() dialog open() opens a new window

- Object.is() strictly judges equality, basically the same as === except +0===-0, NaN === NaN is just the opposite

- The operation of connecting and so on is performed from right to left, so let a = b = 10 is equivalent to b = 10, let a = b, then this b will overflow memory

- As long as no keyword is written, the declaration will be leaked to the whole world. Of course, pay attention to whether the keyword is not written or the assignment is being performed.

- let a = {n:1} let b = a ax = a = {n:2} The dot operator has a higher priority, so get the memory address of ax first, that is, {n:1,x:undefined }

- Traversal before es6 will automatically skip the undefined position, [0,1,undefined,3]->0,1,3 for of and so on after es6 will not, the map will remain

- If a non-string is used as the key, the toString() method will be called

- const func = (inner.func, inner.func) = inner.func = inner.func , the comma operator will return the last value of the expression, which is the same for the function itself, func, and assignment expression, which is also the return function itself

- Object.assign([1, 2, 3], [4, 5]) ->[4,5,3] Overwrite the value at the position

- typeof NULL At this time, NULL is an undeclared variable, that is, undefined, and class {} is a syntactic sugar added to es6, which is essentially a function

- The variable and the function are promoted at the same time. When the name is the same, the variable is ignored. If there is an assignment, the assignment will prevail

- When object->prototype object is read, it is read according to the prototype chain. When modifying, the first-level point is operated on the object itself. If there is no prototype of the two-level point object, an error will be reported. If there is a prototype, the prototype will be modified.

- Primitive data types do not include reference data types

- js Brain Burning Interview Award

- class this. When the variable is the same as the getter variable and there is no set, the variable is read-only, and an error will be reported if modified

- ({} + 'b' > {} + 'a') the ascii code of b is larger

- try->catch ->finally If there is a finally, the return in try will not directly jump out of the function, but will enter the finally, but after the finally is executed, it will still return unless break

- break + label code block, jump out of the code block, if try and finally break before finally, try will still enter finally

- Static methods and non-static methods in a class can have the same name, because the caller is different, there will be no ambiguity

- the closure this points to

```javascript
function bar() {
  return {
    name: 'clc',
    run: () => {
      console.log(this) // 'why' this is a variable in bar, which is a closure, because it is an arrow function, it has nothing to do with the caller, but depends on which closure variable is saved
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

- window.addEventListener(`"click"`, button.change) At this point button.change is no longer the caller, this is not the execution, the execution is determined by the window

- Don't declare a function inside a block (use strict) it will throw an error, if you need to do so, use a function expression to declare it (command declaration, function expression declaration, constructor declaration)

- If the new keyword manually returns a reference type, the reference type will be replaced automatically. If it is a basic type, it will still be determined by the object generated inside new

- Create->initialize->assignment variable promotion, let var const will be promoted, at this time it is decided to use internal or external variables, but var will be initialized to undefined first, let const will not, there is a temporary dead zone

- The third parameter of addEventListener defaults to false to determine whether to trigger when capturing, and trigger when bubbling by default

- [6 Ways to Implement Inheritance in JavaScript - Leophen - Blog Park (cnblogs.com)](https://www.cnblogs.com/Leophen/p/11401734.html)

Prototype chain, constructor, composition, prototype, parasitic, parasitic composition.

- Prototype chain A constructor's prototype is an instance of another type
- When creating a subclass, you cannot pass data to the superclass
- The prototypes of all instances of subclasses point to the same instance of the superclass, and the reference types on all instances of the superclass and the instances of subclasses are shared
- The constructor type calls the super-type constructor inside the sub-type constructor and binds this through call or bind, which is equivalent to doing it in itself
- The reference type is not shared, but the parent class function method cannot be reused
- No access to parent class prototype (no association)
- The most common method of composition (prototype chain + constructor) can pass data to the parent class, the reference data is not shared by itself, and the method is on the prototype of the parent class
- will call the parent class constructor twice
- Prototype Object.create

- (const foo = Object.create({ name: 'clc',age:19}, { age: { value: 18} });) function object(o){function F(){} F.prototype = o ;return new F();} The first parameter is the implicit prototype of the new object created, the second parameter is overwritten if the first parameter has the same name, and if there is no parameter, it is the property of foo itself
- Disadvantages same as prototype chain

- Parasitic function encapsulation enhances object.create, but it still cannot be reused
- Parasitic combination

- Reduced one parent class prototype generation in composition

- console.log.call(console,this); The call this inside the function points to the console, but the printed this is the window passed in from outside

- undefined and null return false compared to any meaningful value (==), but true between null == undefined null == false false

- 'Value is ' + (val != '0') ? 'define' : 'undefine' -> define because the plus operator precedence is greater than ?

- var foo = function bar() {}; at this time bar as foo.name is not function bar

- Unused keywords and variables created by eval() can be deleted by delete

- does not support bubbling mouseenter mouseleave load unload resize focus blur

- The length of the anonymous function is the number of formal parameters,

- var str = "Hellllo world"; str = str.replace(/(l)\1/g, '$1'); \1 and $1 are the first group

- js to judge the type

-typeof

- constructor
- instanceof
- Object.prototype.toString.call()

- js implements the asynchronous way. All asynchronous tasks are executed sequentially from the task queue after the execution of the synchronous task is completed.
- Callback functions such as AJAX callbacks are simple and easy to implement, not conducive to reading and maintenance, highly coupled, chaotic structure, and difficult to track the process
- event listener
- setTimeOut
- Promise can catch errors, which is a good solution to the problem of hell callback, but the disadvantage is that promises cannot be cancelled
- Generators/yield, a new asynchronous programming solution for es6, the Generator function is a state machine that encapsulates multiple internal states, the function can be paused, the yield can be paused, and the next method can be started. The advantage is that the asynchronous semantics are clear, and the disadvantage is that Manually iterating over `Generator` functions is cumbersome
- async/await based on Promise makes asynchronous code like synchronous code. The advantage is that the method is not clear, and the disadvantage is that forced use reduces performance
- Principles and defects of two-way binding in vue2.0
- Responsiveness means that when the data of the component changes, the update of the view is triggered immediately
- Vue uses data hijacking combined with publisher-subscriber pattern to implement data responsive Object.defineProperty
- Disadvantage 1. One-time recursion is very expensive. When the data is large, a lot of recursion will cause the call stack to overflow, because all data must be subject to Obect.de.... 2 Cannot monitor addition and deletion, array subscripts Change
- The principle of vue3.0 two-way binding

- Data two-way binding implemented by Proxy
- Hijacks the entire object, making up for the defects that Object.defineProperty needs to be iteratively traversed, and cannot monitor new deletions and array subscripts

- What are the methods for deduplication of arrays
- The new array stores elements that only appear once and takes up a lot of space
- [...new Set(arr)]
- filter +indexof index is the same as the first
- Difference between null and undefined
- undefined The variable has no assignment, the function has no return value, the property of the object does not exist, and the formal parameter and no actual parameter are undefiend,
- null is defined and assigned to null, an artificially set empty object, and the released object is directly assigned to null
- float
- Make elements out of the document flow to achieve image text wrapping effect
- Floating block-level elements can be arranged on the same line
- Disadvantage, the height of the parent element is collapsed, affecting the layout of other elements, clearing the float, adding .clearfix::after { content: ''; display: table; clear: both; } ,bfc
- Arrow functions
- Arrow functions are equivalent to anonymous functions, simplifying function definitions.
- Without this, this is inherited from the outside, and a single statement can ignore return and {}
- Without this, it cannot be used as a constructor, and cannot bind this when using call, bind, apply
- The yield keyword cannot be used without prototype and super, so arrow functions cannot be used as Generator functions. \
- this points to
- The global execution context points to the global object regardless of strict mode or not
- Function execution context Strict mode ordinary functions are undefined, non-strict are global objects, arrow functions are all found outside the scope chain
- css sets the unit of size
- px ,em,vw,vh,rem
- Horizontal and vertical centering method
- line box text-align vertical-align
- block box justifly-content align-items
- position:absolute;left:50%;right:50% transform: translate(-50%,-50%);
- hoisting of js variables,
- var promotion definition initialization assignment
- const let does not raise transient dead zones
- Function declaration hoisting
- The difference and principle of HashRouter and HistoryRouter
- Both history and hash use two features of the browser to achieve front-end routing
- history API for browsing the history stack, no # requires back-end cooperation, otherwise refresh 404 history.pushState replaceState for page jump, window.onpopstate monitoring, more elegant
- Hash monitors the change of the hash value of the location object, window.onhashchange, better compatibility
- Node will execute process.nextTick() and promise.then() first when executing microtasks
- Object(1)||new Object(1) == new Number(1) pass string as String object
- ^\[abc\]\[1,2]$ matches a1 a2 b1 b2 c1 c2 where commas in [] are only used for separation
- What is XML

- XML stands for Extensible Markup Language (**EXtensible Markup Language**)
- XML is a markup language, much like HTML
- XML is designed to transmit data, not display it
- XML tags are not predefined. You need to define your own labels.
- XML is designed to be self-describing.
- XML is a W3C Recommendation

- Main differences between XML and HTML

- XML is not a replacement for HTML.
- XML and HTML are designed for different purposes:
- XML is designed to transmit and store data, and its focus is on the content of the data.
- HTML is designed to display data and its focus is on how the data should look.
- HTML is designed to display information while XML is designed to transmit information.

- Class declarations have temporary dead zones with let and const
- typeof [] is object only function is function
- When a function passes parameters, it is equivalent to creating a variable, and assigning it, and the following variables with the same name are promoted
- The root cause of browser incompatibility with CommonJS is the lack of four Node.js environment variables. module exports require global
- When Symbol.for() is different from Symbol(), it will put the created Symbol() into a global registry. If the same key already exists, return the Symbol() of the existing registry
- Symbol values cannot be mixed with other types of values, otherwise an error will be reported
- Basic type occupies 8byte 64 bits
- js built-in iterable object Array Map Set String TypedArray Arguments NodeList
- slice() slices the array and returns a new array
- f = (x = xxxxx) => x; f(2) √ f() error There are actual parameters, the default value is ignored, and an error is reported when reading the default value
- es5 forEach() filter() reduce() every() some() If the array is undefined, it will skip the empty space, and not retain only the map will retain the undefined value
- RegExp method test exec compile (deprecated)
- IIFE executes the function immediately + NFE The function name of the named function cannot be modified. The function name variable at this time is a local variable, not a global function. The priority of the function name a and the formal parameter a is high.
- _Function promotion has a higher priority than variable promotion_, and will not be overwritten when a variable of the same name is declared, but will be overwritten after the variable is assigned
- eval returns the result of the last expression
- 2.toString() error A number directly followed by a decimal point will be parsed as a decimal
- repaint

- Text color
- background color

- reflow

- Change window size
- Change text size
- Content changes, input box input
- Activate pseudo-class, hover
- Manipulate the class attribute
- Scripts manipulate the DOM
- Calculate offsetWidth offsetHeight scrollTop and other properties, the browser will rearrange to get the latest value
- Calculate the style property

- Tell me how to avoid the difference between redrawing, reflow/reflow? When the geometry of the element changes, the position size and size, then reflow/rearrangement will occur, and the reflow must be redrawn, while changing the color will only redraw, skip the steps of rendering and layering, and redrawing is not very good. It consumes performance, so we should pay attention to rearrangement,

- One-time centralized change of style
- position out of document flow
- Use GPU acceleration

- When Event Loop executes js code, it encounters a synchronous task and pushes it directly into the call stack for execution. When it encounters an asynchronous task, it suspends the task and pushes it into the task queue after the asynchronous task returns. After all the tasks are executed, the tasks in the task queue are pushed into and executed one by one in sequence, and this series of behaviors are repeated. In the browser and Node environments, the execution timing of the microtask task queue is different - on the Node side, the microtask is executed between various stages of the event loop - on the browser side, the microtask is executed after the macrotask of the event loop is executed.
- Macrotask executes the internal code of the script tag, setTimeout/setInterval, ajax, postMessageMessageChannel, setImmediate (asynchronous block as much as possible, in most cases, it takes precedence over timeout 0, but not the absolute execution order depends on various factors, in the event executed in the next iteration of the loop), I/O (Node.js)
- Microtask (microtask) Promise, MutonObserver, Object.observe, process.nextTick (Node.js)
- Talk about the diff algorithm (patch ,pathchVnode updateChildren)

- When the vue and react components are rendered, they will return to the virtual dom. The renderer then synchronizes the vdom to the dom through the added, deleted, and modified api. When rendering again, a new vdom is generated. The comparison between the old and the new vdom is the diff algorithm.
- The comparison of trees is O(n\*3), many-to-many is n\*2, insertion, deletion, and modification are also of the complexity of n, so it is agreed that only the same level comparison is performed, and the child nodes whose type type changes are not compared. , dom records the associated nodes, and the addition, deletion and modification are not traversed, so On3 becomes On
- Comparing once, the complexity is greatly reduced, but it is not intelligent when dealing with the exchange order. Once the order is changed, the nodes and child nodes have to be re-rendered, the time complexity is reduced, and the number of dom operations is increased, so the key is required.
- Simple diff: find the same key, if there is one, move it in the order of the new vdom, if not, execute the insertion, the anchor point is the nextSibling of the previous node
- Double-ended diff: 4 pointers point to the head and tail of the old and new vdom at the same time, the patch function is relatively new and old, there is no creation, more destruction, the same will enter the patchVnode, in the judgment of three children, add delete, compare, Execute updateChildren If children is textNode, update the text directly, otherwise, compare the head, tail, head and tail, tail and head

- Three column layout

- Three-column layout with fixed box width on both sides of Holy Grail layout, three-column float left, parent element padding, left right set negative margin and left right move to padding
- The double-flying wing layout is different from the Holy Grail. The padding of the parent element becomes the margin of the middle element. The disadvantage is that there is an extra layer of dom.

- Browser garbage collection mechanism

- According to the storage method of the data, that is, the data type is divided into heap collection and stack garbage collection

- Stack garbage collection. For example, after a function is executed, js moves ESP up and down to destroy the context, and destroys it according to the principle of last entry first

- Reachability starts from the root node (window, variables on the dom tree stack) to traverse all objects, and the objects that can be traversed are reachable
- Memory Fragmentation When the unreachable object is reclaimed, there will be a lot of discontinuous space in the memory
- Long-lived objects (old generation) Objects with a long declaration cycle, such as window/Dom
- Temporary objects (new generation) inside functions, block-scoped variable objects
- The main garbage collector (mark-and-sweep algorithm) uses an optimized version of the reachability algorithm to mark reachable objects, memory fragmentation occurs after recycling, and then memory sorting is performed
- The secondary garbage collector (Scavenge algorithm) roughly supports a capacity of 1~8 M. It is divided into two areas, an object area and a free area. The newly collected secondary garbage enters the object area. When the block is full, a garbage cleanup is performed. The process is

- Mark all object areas for garbage objects
- Move the objects in the object area to the free area and arrange them
- Swap the free area and the object area (in fact, two object areas), so that there will be no memory fragmentation problem.

- Incremental recycling When the browser is performing garbage collection, it will pause the JS script, which may cause lag. Incremental recycling divides the garbage collection work into small blocks and processes it with the js code multiple times to avoid lag.
- Idle collection garbage collector only tries to run when the cpu is idle,
- Memory leak cannot be recovered by garbage collection mechanism

- window event is not unbound
- There is no unwatch after watch in vue
- referencing each other,
- Timer
- Abuse of closures

- Let's talk about vue's keep-alive component vue is a built-in component used to cache components. It is usually used to cache routing to improve performance. There are two attributes include exclude, which are usually used for routing
- 1<2<3 continuous relational operator 2>1 true -> 1 3>1 true
- What is CSRF (cross site request forgey) An attacker steals your identity and sends a malicious request in your name, which is completely legal to the server

- Log in to trusted website A and generate cookies locally

- Access dangerous website B without logging out of A

- B returns some attack codes after receiving the user's request. Requesting to visit website A that returns cookies is to visit website A from the user's point of view
- CSRF prevention strategy

- Captcha requires interaction between the user and the app
- The referer in the HTTP request header checks whether it is the current domain name, which is not foolproof. The referer is generated by the browser, which is related to the vulnerability security of the browser.
- Token verification is added to the back-end token verification in get or post, but the inconvenience of passing parameters in get or post. not absolutely safe
- Put the token in the custom request header, the custom will not be recorded on the browser's address bar

- What is XSS (cross site scripting) Differentiate css to xss. An attacker inserts script code into a Web page, and when a user browses this page, the code inserted by the attacker will run

- Reflective attackers construct special URLs that contain malicious code. When the user opens the URL, the website server returns both HTML and malicious code to the browser. The browser parses html, executes malicious code, steals user data, and impersonates user behavior. Common in website searches, challenges, etc.
- Storage attackers submit malicious code to the website's database. When users parse HTML, they also parse the malicious code stored in the database. Commonly used in forum postings, product reviews, user private messages, etc.
- Prevent XSS

- Strict encoding of user data HTML element encoding, JavaScript encoding, css encoding, url encoding, etc.
- html code escape <,>
- js code serialization,
- Http Only cookie cannot get cookie from document.cookie

- How the browser renders the page: html -> dom tree, css -> stylesheet, according to the combination of dom tree and stylesheet to generate a render tree render tree, layer the render tree, draw a list for each layer, and then put each One layer is divided into tiles, followed by rasterization to draw the tiles into bitmaps, and finally all bitmaps are synthesized into a page

- The purpose of layering, when a layer has animation, avoid the whole layer rendering,
- Rasterization, the purpose of tiling is to render only visible nearby areas

- The difference between computed and watch

- computed has cache, dependency property changes
- watch has no cache, supports asynchronous, and monitors data changes

- Tell me about the function and principle of $nextTick in Vue? Vue's responsiveness is asynchronous. When the data changes, the view will not be updated immediately, but will be updated uniformly after all data changes in the same event loop are completed. After modifying the dom, immediately obtain the dom, or modify the props. At this time, it is still unmodified. $nextTick essentially returns a promise, which will be executed after the current event is executed.
- Can the token be placed in a cookie? Of course, the token is used to determine whether the user is logged in. Usually, it contains the user's unique ID, uid, timestamp time signature sign. Whether the token has expired should be judged by the backend, when the token is invalid When the status code 401 is returned, the user logs in, the service returns the token, the front-end stores the token and then the cookie, each time a request is sent, the token is carried, and the server verifies the token
- what happens when the browser enters the url

1. url parsing to determine whether to search for content or request a url
2. Find the cache browser View browser cache, system cache, route cache, ISP cache
3. DNS resolution The browser initiates a request to the DNS server to resolve the IP address corresponding to the URL domain name (the DNS server is based on the UDP protocol)
4. After establishing a TCP connection to resolve the IP address, establish a TCP connection with the server according to the default port 80
5. Initiate an HTTP request The browser initiates an HTTP request to read the file, and the request message will be sent to the server as the third handshake data of the TCP connection
6. The server responds to the request with a redirection and returns a redirection, and the browser initiates a request based on the redirection. If the request parameters are incorrect, it returns 404. If there is a problem with the server, it returns 500. Everything is normal and returns 200 and html.
7. Close the TCP connection by releasing the TCP connection after four waves
8. The browser parses the HTML and renders it

- Browser caching mechanism

- Every time the browser initiates a request, it will now look up the result and cache ID in the browser's cache (the default for the first request is no-cache, so the second time it will send max-age=0 private to enter the negotiation cache)
- Every time the browser gets the result, it will store the result and the cache ID in the browser cache
- Mandatory cache If there is a mandatory cache and it is still valid, it will return directly. If it is not within the validity period, enter the negotiated cache, initiate a request to the server and carry the cache ID
- Cache-Control http/1.1 cache field has higher priority, the value is
- public: all content will be cached (both client and proxy server cacheable)
- private: all content can only be cached by the client, the default value of Cache-Control
- no-cache: The client caches the content, but whether to use the cache needs to be verified by negotiating the cache
- no-store: all content will not be cached, i.e. no forced cache nor negotiated cache is used
- max-age=xxx (xxx is numeric): the cached content will be invalid after xxx seconds, the original server will take this value as the standard
- s-maxage=xxx proxy server cache time
- The cache field of expires http/1.0 is the expiration time, which is judged with the client time, easy to modify, the time zone is different, the error is relatively large, and it is eliminated.
- Negotiated cache returns 304 within the validity period, uses the cache, and returns 200 and the request result when it is not within the validity period
- Etag / If-None-Match priority value is Hash value / Unique ID / Fingerprint code
- Last-Modified / If-Modified-Since Last-Modified is when the server responds to the request, returns the time when the resource file was last modified on the server, If-Modified-Since is the value of Last-Modified in the last request, compare the two Same returns 304
- from memory cache The cache read order in memory is memory->disk
- from disk cache cache in hard disk

- 304 Process 304 Not Modified The requested resource is changed
- Verify that Cache-Control/Expire has a strong cache and expires
- Verify etag/If-None-Match Last-Modified / If-Modified-Sinc Verify that the negotiation cache is expired
- TCP three-way handshake

- First handshake client sends SYN flag and sequence number (SYN=1,seq=x)
- The second handshake server receives the SYN packet and confirms it, and also sends its own SYN packet, ie SYN+ACK packet (SYN=1, ACK=1, seq = y, ack=x+1)
- In the third handshake, the client receives the SYN+ACK packet and sends the confirmation packet and sequence number to the server (ACK = 1, ack = y+1, seq=x+1+1)

- Client status close -> syn_sent (send status) ->Estab-lished (stable connection)
- Server status close -> syn_recvd (reply) -> Estab-lished (stable connection)
- Sequence number (seq) 32 bits, used to identify the byte stream sent from the TCP source to the destination
- The acknowledgment number (ack) is 32 bits. The acknowledgment number field is valid only when the ACK flag is 1, ack=seq+1.
- Flag bit (Flag)
- URG: Urgent pointer is valid.
- ACK: Acknowledgment that the serial number is valid. (In order to distinguish from **acknowledgement number ack**, we use uppercase)
- PSH: The receiver should deliver this message to the application layer as soon as possible.
- RST: reset the connection.
- SYN: initiate a new connection. (synchronization sequence number)
- FIN: release a connection.
- During the TCP handshake process, both ack and seq are calculated between batches of ack and seq to ensure the continuity of TCP

- Why do three handshakes

- Reduce server overhead. In order to prevent the server from opening some useless connections to increase server overhead (the server keeps the close state at the beginning)
- An error occurred when an invalid request was received. To prevent an invalid connection request segment from being suddenly sent to the server, resulting in an error.

- Four waves of TCP

- The first wave client sends FIN flag and sequence number (FIN = 1, seq = u)
- The second wave of the server accepts and returns the ACK flag, sequence number and confirmation number (ACK = 1, seq = v, ack=u+1)
- The third wave of the server sends the flag FIN, ACK again (indicating that it is ready to release the connection, where ACK is not a confirmation flag) ( ACK = 1, FIN = 1, seq = w, ack=u+1)
- The fourth wave of the client sends ACK, seq = u+1 , ack =w +1 and then the client starts to wait for 2MSL in the TIME-WAIT phase
- Client's status Estab-lished ->FIN-WAIT-1 Terminate Waiting 1 -> FIN-WAIT-2 Terminate Waiting 2 ->TIME-WATI Time Waiting ->close
- The status of the server is Estab-lished -> CLOSE-WAIT close waiting -> LAST-ACK final confirmation -> close

- Why do you wave your hand four times? Because of the second handshake, the server returns the SYN and ACK flags at the same time, and the waved flags ACK and FIN are sent for the second and third wave respectively, because the server does not need any preparation during the handshake, When waved, the server needs to release some data, so the two stages of CLOSE-WAIT and LAST-ACK are needed.
- Why does the client wait for two **2MSL** in the TIME-WAIT stage, in order to confirm that the server receives the ACK packet of the fourth wave, because when the server waves for the third time, if it does not receive within 1MSL The ACK confirmation message sent by the client will send a FIN message to the client again. So if the FIN packet is received again at the client 2MSL, it proves that the server has not received the ACK packet of the fourth wave, then the client It will be sent again and the timer will be reset. Otherwise, the server receives an ACK packet, and the client enters the CLOSE state, which is later than the server. So wave at least four times
- Component communication method

- Parent-child communication props emit proview inject
- Other communication EventBus, vuex

- Talking about the box model, the size of a box is determined by margin padding border content, the standard box width/height is set to content, and the weird box is set to padding+border+content
- The difference between a pseudo-array and an array has a length attribute, both of which can be used for in, one is an array, the other is an object, and the call method of the array can be used, and Array.from converts the pseudo-array into a true array
- expire localstorage
- lazy delete next time use, check expire field
- Set a timer at the same time when deleting the settings regularly
- axios (Axios is a promise-based HTTP library) interceptor

- Request interception to add token, header
- Response interception verification token, operation data

- Create ajax process

- Create xhr object new XMLHttpRequest()
- Set the request parameter xhr.open(Method, server interface address);
- Send request: request.send(data) post request requires parameter data
- Monitor xhr state changes, XHR.onreadystatechange = function () { if (XHR.readyState == 4 && XHR.status == 200) { console.log(XHR.responseText);

- fetch request fetch is a way of HTTP data request is an alternative to xhr, it will return promise itself
- Real-time communication after front-end

- Polling is simple to implement, occupies traffic, cpu, and cannot respond in time due to too long time. The client sends requests regularly, and the server responds.
- After the long polling server receives the response, if there is no data, it will wait until it times out before returning, and the client will send the request again after receiving the returned result
- iframe flow The frame flow method is to insert a hidden iframe in the page, and use its src attribute to create a long connection between the server and the client. The server transmits data to the iframe and maintains a long connection will increase the overhead
- websocket
- SSE SSE (Server-Sent Event) is a communication channel established between the browser and the server, and then the server pushes information to the browser. SSE is a one-way channel and can only be sent from the server to the browser

- Why does Vue add a key for performance optimization, because updating the dom requires a diff algorithm to compare, if the key is not manually passed in, the index will be used as the key, when the order is exchanged, all elements need to be re-rendered, with After key, elements with the same key do not need to be re-rendered
- Vuerouter lazy loading method

- component: resolve=>(require(['../views/About'],resolve)) require manually return promise
- component: () => import(/_ webpackChunkName: "about" _/ '../views/About.vue') import returns a promise

- Usage of event expander

- spread syntax to expand objects, expand arrays
- rest syntax residual condensed into an array

- Let's talk about server-side rendering to reduce network transmission, fast response, good user experience, fast rendering of the first screen, friendly to search engines, and search engine crawlers can see the complete program source code, which is beneficial to SEO.
- Front-end optimization methods [24 suggestions for front-end performance optimization (2020) - Nuggets (juejin.cn)](https://juejin.cn/post/6892994632968306702#heading-19)

- Faster loading

- Reduce loading file size: compressed files, pictures
- Reduce loading times: Sprite, throttling and anti-shake

- render faster

- Render ssr in advance, css in the header, js in the body to avoid render blocking, lazy loading,
- Combine rendering operations to avoid reflow

- reduce, reduce http requests
- use http2
- use ssr server-side rendering
- use cdn
- Execute css first and then execute js
- Use font icons instead of images
- caching strategy
- Compressed file
- Image optimization
- Load on demand
- reduce backflow
- event delegation
- Use requestAnimationFrame instead of set
- Algorithms

- What are the performance indicators for performance optimization and how to quantify them

- FCP (First Contentful Paint) refers to the time from when the browser responds to user input of a network address to when any part of the page content is rendered on the screen. This is the actual meaningful screen time.
- LCP (Largest Contentful Paint) indicates the time it takes to complete the rendering of the largest content (text block or image element) in the viewable area on the screen. This time varies as the page renders, as the largest element in the page may change during rendering, and the metric stops recording after the first user interaction.
- TTI (Time to Interactive) interactive time measures the interactive state time required for a page to start loading until it visually finishes rendering, the initial script finishes loading, and responds quickly and reliably to user input. The interactive state refers to the UI components on the page that can be interacted with (can respond to button clicks or enter text in text boxes, etc.).
- TBT (Total Blocking Time) total blocking time FCP+TTI
- CLS (Cumulative Layout Shift) Cumulative Layout Shift A layout shift occurs whenever the position of a visible element changes from one rendered frame to the next.
- FID (First input delay) the time elapsed until the browser is actually able to respond to the interaction
-

- Front-end monitoring

- Data monitoring (monitoring user behavior)

- Performance monitoring (monitoring page performance)

- Abnormal monitoring (monitoring products, system abnormality)

- Front-end exception monitoring

- what went wrong
- period
- How many users were affected
- which pages
- wrong reason
- Positioning to solve problems
- error monitoring for app.config.errorHandler vue
- window.onerror script error
- window.addEventListener('unhandledrejection') promises uncaught exception
- window.addEventListener('error') static resource loading error
- Collect and report -> Collect and aggregate -> Visual analysis -> Monitor alarms

- Why open GZIP to reduce the transfer size of css, js, html, xml, but need to consume cpu to decompress, the advantages and disadvantages should be balanced, the compression rate is 30% of the original, it is not recommended to compress pictures and large files, the pictures themselves With compression, large files consume CPU more than the gain

- gzip two schemes (the corresponding nginx conf configuration is different)

- Online decompression
- local decompression

- Content-Encoding value

- gzip indicates that the entity is encoded in GNU zip (most used)
- compress indicates that the entity uses the Unix file compression program
- deflate indicates that the entity is compressed in zlib format
- identity indicates that the entity is not encoded. This is the case by default when there is no Content-Encoding header

- Accept-Encoding value

- gzip -compress
- deflate
- br A new compression algorithm Brotli

- http

- Hypertext Transfer Protocol for transferring hypertext from server to local browser. Information is in clear text
- default port 80
- stateless connection

- https

- Add SSL certificate layer under http for encryption to ensure data transmission, ensure the authenticity of the website, and prevent data from being stolen during transmission
- Default port 443
- Handshake is time-consuming, loading time, and power consumption increase
- Cache is not as efficient as http, increasing data overhead
- ca certificate is required, the more powerful the higher
- ssl certificate needs to bind ip

- How the https protocol works

- Client requests https url to establish ssl link
- After the server receives the request, it returns the website certificate (the certificate contains the public key) to the client
- Client and server negotiate the security level/encryption level of the ssl connection
- After negotiating the agreed security level, the session key is established, and the client encrypts the session key with the public key
- The server decrypts the session key through the private key
- The server communicates with the client through the session key before

- what is mvvm

- mvc model view controller operates dom to update view
- mvvm model view viewmodel data-driven view
- advantage

- Low coupling A model can be bound to multiple views. View changes do not necessarily change the model, and the model can change the view without changing.
- Repeatable packaging
- Independent development is more focused on a certain block development
- Testable

- optimization of webpack

- Optimized build speed
- Optimized packing volume

- Compressed code
- Extract public resources
- tree shaking to remove unused code
- Scope hoisting puts all module code in a function scope in reference order, and renames some variables appropriately to prevent variable name conflicts.
- Image Compression
- Dynamic polyfill

- Compilation process of babel

- Babel is essentially a js compiler that converts the code after es5 into backward compatible js

- The essence of babel is to operate ast (abstract syntax tree) to complete code compilation

- Parsing transforms the source code into a more abstract representation (such as an abstract syntax tree). Including lexical analysis and syntax analysis. Lexical analysis mainly converts character stream source code (Char Stream) into token stream (Token Stream), and syntax analysis mainly converts token stream into Abstract Syntax Tree (AST).

- Conversion Through Babel's plug-in capability, some special processing is performed on (abstract syntax tree), and the AST of the higher version syntax is converted into an AST that supports the lower version syntax. Make it meet the compiler's expectations. Of course, in the process, you can also optimize the Node nodes of the AST, such as adding, updating, and removing nodes.

- Generate low-level code that converts AST to string form, and can also create Source Maps.

- The execution code after await is equivalent to promise.then is also in the microtask, if there is no reslove, it will not be executed

- require('xxx') to find the package process

- First find the node_modules at the same level as package.json
- found the 'xxx' package
- find the js file in the main field of package.json under 'xxx'
- If there is no package.json or no main field, the index.js file of the 'xxx' package is loaded by default
- If not, find the node_modules of the previous level until the root directory, and finally report an error

- Determine if the linked list has a cycle

- Hash table set traversal storage judgment
- Traverse the linked list to add access fields
- Fast and slow pointer, if it catches up, it will be a ring

- Vue.use principle chain calls each time

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
// each time return this chained call
// Get _installedPlugins on Vue to determine whether it has been installed
// If the plugin is an object, execute the install method on him, if it is a function, execute it directly
```

- js implements asynchronous task scheduler

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

- Front-end testing

  - ESLINT test, type check, format check through ESLint,
  - Tool class function test jest
  - Component testing Reuse component testing testing-library Render vue in the sandbox environment, and judge according to the rendering results
  - Page testing cypress simulates user clicks and judges page elements
  - Mock data test, mock out all request results for easy error correction

- ["Advanced Front-end" high-performance rendering of 100,000 pieces of data (virtual list)](https://juejin.cn/post/6844903982742110216#heading-0)

  - Time slicing: Leave it to the front-end for paging, use the timer to add it to the next event loop in batches, cut and render, and avoid frame loss with setTimeout for a long time. requestAnimationFrame doesn't. Use DocumentFragment to reduce reflow. Only works with simple dom
  - Virtual list
    - Recalculate Style: Style calculation, the browser calculates which elements should apply which rules according to the CSS selector, and determines the specific style of each element. time consuming
    - Layout: After knowing which rules are applied to the element, the browser starts to calculate the size of the space it will occupy and its position on the screen. time consuming
    - Blank list placeholder, scrolling the list for virtual loading slices
    - Dynamic height, which is rendered with the estimated height first, and then updated to the real height through updated. IntersectionObserver can monitor whether the target element appears in the visible area, and perform the update of the visible area data in the monitored callback event. Reduce scroll performance consumption, ResizeObserver monitors the content height and size changes caused by image loading

- DocumentFragment, the document fragment interface, represents a minimal document object without a parent document. It is used as a lightweight version of Document for storing typeset or unformatted XML fragments. The biggest difference is that because the DocumentFragment is not part of the real DOM tree, its changes will not trigger a (re-render) of the DOM tree, and will not cause performance problems. An empty DocumentFragment can be created using the document.createDocumentFragment method or constructor

- [Image lazy loading](https://juejin.cn/post/7120214953256026125) Save the image path to data-xxx, and assign it to src when the image appears in the visible area

- Closure vulnerability Defined by Object.defineProperty Return this arbitrarily, getter gets this,
   - hasOwnProperty judgment key
   - Object.setPrototypeOf sets the prototype to empty

- Regular look-ahead (?=) will not consume characters, it is at the cursor position, used to verify string rules

- window.addEventListener 'storage' listens to other tabs to modify storage

- interrupt network transfer request
   - axios discards the corresponding result instead of canceling the request
   - fetch new AbortController() associated controller.signal calls abort()

- code units and code points
   - ucs-2 16 code elements
   - utf-16 16/32
   - The length and array subscripts are read in code units