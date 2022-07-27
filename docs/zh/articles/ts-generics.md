# TS - Generics 泛型

## 一、泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

### 1.1 泛型的基本使用

首先实现一个函数 getArr ，它创建一个数组，将传入的可变数量参数 push 到数组,并且将这个数组返回.

我限制了传入参数的类型 `string|number`

传入字符串'foo',''bar,并通过 forEach 方法获取 item 的长度

```typescript
type Arr = (...args: (string | number)[]) => Array<string | number>
let getArr: Arr
getArr = (...args) => {
  const arr = []
  arr.push(...args)
  return arr
}
getArr('foo', 'bar').forEach(item => {
  item.length // “string | number”上不存在属性“length”
})
```

但 TS 报错了,虽然逻辑上没有错误,但 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型中共有的属性或方法.返回的数组类型是 string|number,而 number 类型的数据是没有 length 这个属性的

---

此时可以使用类型断言，将 item 断言成 string 类型

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

类型断言非常好用,但只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误.

有没有其他办法呢?

---

试着把返回数组的类型改成 any 呢

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
  item.toFixed(1) // 正常编译
})
```

更改后,可以正确获取 item.length,但是却丢失了一些信息.`item.toFixed()`方法也能正常编译了. 要知道 `toFixed()`只能作用于 number 类型的数据.这显然是不对的.

果然浏览器报错了.

`error Uncaught TypeError: item.toFixed is not a function`

这已经失去了使用 TS 的初衷:在书写代码时就发现错误

有什么办法可以让返回的类型与传入的类型保持一致呢

#### 1.1.1 函数重载

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
  item.toFixed(1) // 报错  string上不存在error
})
```

通过函数重载,我指定了输入输出类型一致.使其能够正确的访问正确属性,对不存在的属性报错.但这样写代码未免太冗余了.

#### 1.1.2 使用泛型

```typescript
let getArr = function <T>(...args: T[]): Array<T> {
  const arr: T[] = [] //泛型变量可用于函数体中
  arr.push(...args)
  return arr
}
getArr<string>('foo', 'bar').forEach(item => {
  item.length // 3
})

getArr<number>('foo', 'bar').forEach(item => {
  item.toFixed(1) // 正常编译
})
```

在匿名函数名前添加了 `<T>`， T 用来指代任意输入的类型，通过泛型变量就可以使输入输出类型保持一致.

在调用的时候，可以在函数名后指定它具体的类型为 string。当然，也可以不手动指定，而让类型推论自动推算.

### 1.2 多个泛型参数

定义泛型的时候，可以一次定义多个类型参数：

```typescript
type Func = <T, U>(x: T, y: U) => [U, T]
let swap: Func = (x, y) => {
  return [y, x]
}
swap(1, '1') // ['1',1]
```

函数 swap 返回一个元组,元组中的数据类型与函数传入参数类型一致.

### 1.3 泛型约束

使用泛型时,不预先指定具体的类型，而在使用的时候再指定.

```typescript
function foo<T>(x: T): T {
  return x
}
foo<string>('foo').length
```

这未免有点与 TypeScript 优点相悖,类型限制 shape 应该在定义而不是在使用时.

---

此时如果把访问 length 属性放在函数体中,

```typescript
function foo<T>(x: T): T {
  x.length // 类型“T”上不存在属性“length”
  return x
}
foo('foo')
```

报错了,此时 x 的类型为 any,不是所有的类型都有 length 这个属性,所以不能随意的操作它的属性或方法.

那么怎么在定义函数时给泛型类型加以限制呢.

使用 extends 关键字

(1)直接继承具体类型

```typescript
function foo<T extends string>(x: T): T {
  x.length
  return x
}
foo('foo')
```

此时才真正做到了输入输出类型一致,并且限制了输入类型的 shape

(2)继承接口

```typescript
interface Bar {
  length: number
}
function foo<T extends Bar>(x: T): T {
  x.length
  return x
}
foo('foo') // ✔
foo({ length: 233 }) // ✔
```

限制了泛型必须要有 length 这个属性.

(3)多个泛型参数之间相互约束

```typescript
function foo<T, U extends keyof T>(obj: T, attr: U): T {
  console.log(obj[attr])
  return obj
}
const bar = {
  name: 'bar'
}
foo(bar, 'name')
foo(bar, 'age') // error 类型“"age"”的参数不能赋给类型“"name"”的参数。
```

限制了泛型 U 类型必须是 T 类型的 key

### 1.4 泛型默认值

```typescript
function foo<T = number>(x: T): T {
  return x
}
```

在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。

## 二、泛型与接口

(1) interface 将 1.1.2 使用泛型例子可用接口重构

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

也可以把泛型参数提前到接口名上,应用于混合类型接口

```typescript
interface Arr<T> {
  (...args: T[]): Array<T>
}
let getArr: Arr<any> //定义类型any
getArr = (...args) => {
  const arr = []
  arr.push(...args)
  return arr
}
```

注意，此时在使用泛型接口的时候，需要定义泛型的类型。且会出现 unexpected error .慎用.

---

(2) type 同理

```typescript
type Arr = <T>(...args: T[]) => Array<T>

let getArr: Arr
getArr = (...args) => {
  const arr = []
  arr.push(...args)
  return arr
}
```

提取到接口名上也要定义泛型类型,但其实多此一举

```typescript
type Arr<T> = (...args: T[]) => Array<T>

let getArr: Arr<any> = (...args) => {
  const arr = []
  arr.push(...args)
  return arr
}
```

## 三、泛型与类

与泛型接口类似，泛型也可以用于类的类型定义中.

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
