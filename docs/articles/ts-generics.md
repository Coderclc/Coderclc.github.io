# TS - Generics Generics

## 1. Generics

Generics (Generics) refers to a feature that does not specify a specific type in advance when defining a function, interface or class, but specifies the type when it is used.

### 1.1 Basic use of generics

First implement a function getArr that creates an array, pushes the variable number of arguments passed to the array, and returns the array.

I restrict the type of incoming parameter to `string|number`

Pass in the string 'foo',''bar, and get the length of item through the forEach method

```typescript
type Arr = (...args: (string | number)[]) => Array<string | number>
let getArr: Arr
getArr = (...args) => {
  const arr = []
  arr.push(...args)
  return arr
}
getArr('foo', 'bar').forEach(item => {
  item.length // Property 'length' does not exist on 'string|number'
})
```

But TS reported an error, although there is no logical error, but when TypeScript is not sure which type a variable of a union type is, we can only access properties or methods common to all types of this union type. The returned array type is string |number, and the data of type number does not have the attribute length

---

At this point, you can use type assertion to assert item as string type

```typescript
type Arr = (...args: (string | number)[]) => Array<string | number>
let getArr: Arr
getArr = (...args) => {
  const arr = []
  arr.push(...args)
  return arr
}
getArr('foo', 'bar').forEach(item => {
  ;(item as string).length
})
```

Type assertions are very useful, but they can only "deceive" the TypeScript compiler and cannot avoid runtime errors. On the contrary, misuse of type assertions may lead to runtime errors.

Is there any other way?

---

Try changing the type of the returned array to any

```typescript
type Arr = (...args: (string | number)[]) => Array<any>
let getArr: Arr
getArr = (...args) => {
  const arr = []
  arr.push(...args)
  return arr
}
getArr('foo', 'bar').forEach(item => {
  item.length // 3
  item.toFixed(1) // normal compilation
})
```

After the change, item.length can be obtained correctly, but some information is lost. The `item.toFixed()` method also compiles normally. Be aware that `toFixed()` can only work on data of type number. This is obviously wrong.

Sure enough, the browser reported an error.

`error Uncaught TypeError: item.toFixed is not a function`

This has lost the original purpose of using TS: to find errors while writing code

Is there any way to make the returned type consistent with the incoming type?

#### 1.1.1 Function overloading

```typescript
function getArr(...args: string[]): Array<string>
function getArr(...args: number[]): Array<number>
function getArr(...args: (string | number)[]): Array<string | number> {
  const arr = []
  arr.push(...args)
  return arr
}
getArr('foo', 'bar').forEach(item => {
  item.length // 3
  item.toFixed(1) // There is no error on the error string
})
```

Through function overloading, I specify the same input and output types. It can correctly access the correct attributes and report errors for non-existent attributes. But writing code like this is too redundant.

#### 1.1.2 Using generics

```typescript
let getArr = function <T>(...args: T[]): Array<T> {
  const arr: T[] = [] //Generic variables can be used in the function body
  arr.push(...args)
  return arr
}
getArr<string>('foo', 'bar').forEach(item => {
  item.length // 3
})

getArr<number>('foo', 'bar').forEach(item => {
  item.toFixed(1) // normal compilation
})
```

`<T>` is added before the anonymous function name, T is used to refer to the type of any input, and the input and output types can be kept consistent through generic variables.

When calling, you can specify its specific type as string after the function name. Of course, you can also let the type inference calculate automatically without specifying it manually.

### 1.2 Multiple generic parameters

When defining generics, you can define multiple type parameters at once:

```typescript
type Func = <T, U>(x: T, y: U) => [U, T]
let swap: Func = (x, y) => {
  return [y, x]
}
swap(1, '1') // ['1',1]
```

The function swap returns a tuple, and the data type in the tuple is the same as the type of the parameter passed to the function.

### 1.3 Generic constraints

When using generics, do not specify the specific type in advance, but specify it when using it.

```typescript
function foo<T>(x: T): T {
  return x
}
foo<string>('foo').length
```

This is a bit against the advantages of TypeScript, type constraints shape should be defined rather than used.

---

At this point, if you put the access length property in the function body,

```typescript
function foo<T>(x: T): T {
  x.length // Property 'length' does not exist on type 'T'
  return x
}
foo('foo')
```

An error is reported. At this time, the type of x is any, and not all types have the property length, so its properties or methods cannot be manipulated at will.

So how do you limit the generic type when defining a function?

Use the extends keyword

(1) Direct inheritance of specific types

```typescript
function foo<T extends string>(x: T): T {
  x.length
  return x
}
foo('foo')
```

At this time, the input and output types are truly consistent, and the shape of the input type is limited

(2) Inherit the interface

```typescript
interfaceBar {
  length: number
}
function foo<T extends Bar>(x: T): T {
  x.length
  return x
}
foo('foo') // ✔
foo({ length: 233 }) // ✔
```

Restrictions that generics must have the length property.

(3) Mutual constraints between multiple generic parameters

```typescript
function foo<T, U extends keyof T>(obj: T, attr: U): T {
  console.log(obj[attr])
  return obj
}
const bar = {
  name: 'bar'
}
foo(bar, 'name')
foo(bar, 'age') // error Argument of type ""age"" cannot be assigned to argument of type ""name"".
```

Restricts the generic U type must be a key of type T

### 1.4 Generic defaults

```typescript
function foo<T = number>(x: T): T {
  return x
}
```

Since TypeScript 2.3, we can specify default types for type parameters in generics. This default type works when generics are used without specifying the type parameter directly in the code, nor can it be inferred from the actual value parameter.

## 2. Generics and Interfaces

(1) interface Refactoring 1.1.2 using generic example available interface

```typescript
interface Arr {
  <T>(...args: T[]): Array<T>
}
let getArr: Arr
getArr = (...args) => {
  const arr = []
  arr.push(...args)
  return arr
}
```

---

It is also possible to advance generic parameters to the interface name and apply to mixed-type interfaces

```typescript
interface Arr<T> {
  (...args: T[]): Array<T>
}
let getArr: Arr<any> //Define the type any
getArr = (...args) => {
  const arr = []
  arr.push(...args)
  return arr
}
```

Note that when using a generic interface, you need to define the generic type. And an unexpected error will appear. Use with caution.

---

(2) type is the same

```typescript
type Arr = <T>(...args: T[]) => Array<T>

let getArr: Arr
getArr = (...args) => {
  const arr = []
  arr.push(...args)
  return arr
}
```

It is also necessary to define a generic type when extracting the interface name, but in fact it is superfluous.

```typescript
type Arr<T> = (...args: T[]) => Array<T>

let getArr: Arr<any> = (...args) => {
  const arr = []
  arr.push(...args)
  return arr
}
```

## 3. Generics and classes

Similar to generic interfaces, generics can also be used in the type definition of a class.

```typescript
class Person<T = string> {
  name: T
  constructor(name: T) {
    this.name = name
  }
  run(): T {
    const foo: T = this.name
    return foo
  }
}
const why = new Person<string>('why')
```
