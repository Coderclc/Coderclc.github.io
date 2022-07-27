# TS - Interfaces 详解

## 一、什么是接口

> One of the core principles of typescript is to type check the shape the value has. It is sometimes called "duck type discrimination" or "structural subtype". In typescript, the function of an interface is to name these types and define contracts for your code or third-party code.

- 常用于对对象的形状（Shape）进行描述。
- 可用于对类的一部分行为进行抽象
- 为类型命名和为你的代码或第三方代码定义契约。

## 二、对象与接口

### 2.1 对象接口简例

接口一般首字母大写。tslint 建议加上 I 前缀, 否则会发出警告,可在 tslint 中关闭它,在 rules 添加规则 `["interface-name":[true,"nerver-prefix"]`

```typescript
interface Person {
  name: string
  age: number
}
const why: Person = {
  name: 'why',
  age: 18
}
```

首先我们定义了一个接口 Person,接口约束了 shape 必须要有 name,age 两个属性,并且有对应的数据类型,然后我们创建了 why 对象面向 Person

---

定义的变量比接口少一些属性是不被允许的： IDE 添加了 tslint 插件会发出警告,编译和浏览器控制台会报错

```typescript
interface Person {
  name: string
  age: number
}
const why: Person = {
  name: 'why'
}
// Property 'age' is missing in type '{ name: string; }' but required in type 'Person'.
```

---

属性溢出也是不允许的：

```typescript
interface Person {
  name: string
  age: number
}
const why: Person = {
  name: 'why',
  age: 18,
  gender: 'female'
}
```

需要注意接口不能转换为 JavaScript。 它只是 TypeScript 的一部分。可在[TypeScript 学习乐园](https://www.tslang.cn/play/index.html)实时转换 TypeScript

### 2.2 可选属性与只读属性

如果希望不要完全匹配形状，那么可以用可选属性：? 如果希望对象中的一些字段只读，那么可以用 readonly 定义

```typescript
interface Person {
  name?: string
  readonly age: number
  run?(): void
}
const why: Person = {
  // name 键值对缺失不会报错
  age: 18
}
why.run && why.run() //判断函数执行
why.age++ //修改age报错 Cannot assign to 'age' because it is a read-only property.
```

### 2.3 任意属性

如果希望一个接口有任意的属性，可以使用如下方式

(1) 可索引类型

```typescript
interface Person {
  name: string
  age?: number
  [attr: string]: any
}
const why: Person = {
  name: 'why',
  age: 18,
  gender: 'female'
}
```

需要注意，定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集,否则会出现 unexpected error.

```typescript
interface Person {
  name: string
  age?: number
  [attr: string]: string // error
}
const why: Person = {
  name: 'why',
  age: 18,
  gender: 'female'

  /* Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
   Property 'age' is incompatible with index signature.
   Type 'number' is not assignable to type 'string'. */
}
```

(2) 类型断言

有两种方法

```typescript
interface Person {
  name: string
  age?: number
}
const why: Person = <Person>{
  name: 'why',
  age: 18,
  gender: 'female'
}
```

当然要配置 tslint `"no-angle-bracket-type-assertion":false`否则 tslint 会报错,因为它推荐你使用第二种方式

```typescript
interface Person {
  name: string
  age?: number
}
const why: Person = {
  name: 'why',
  age: 18,
  gender: 'female'
} as Person
```

(3) 类型兼容性

```typescript
interface IUser {
  name: string
  age: number
}
type IUserFunc = (user: IUser) => string

const foo: IUserFunc = (user: IUser) => {
  return user.name
}

foo({ name: 'clc', age: 18, gender: 'male' }) //error
// TS2345: Argument of type '{ name: string; age: number; gender: string; }' is not assignable to parameter of type 'IUser'.
//Object literal may only specify known properties, and 'gender' does not exist in type 'IUser'.

const bar = { name: 'clc', age: 18, gender: 'male' }
foo(bar)
// 用变量bar 接收参数再传入正常编译
```

直接传参报错,但用变量 bar 接收再传入正常编译

```typescript
interface IUser {
  name: string
  age: number
}

const user: IUser = {} // missing the following properties from type 'IUser': name, age

const user = {} as IUser // right
```

### 2.4 联合类型

```typescript
interface UnionType {
  bar: any[] | (() => void) | object
}
const foo: UnionType = {
  bar: ['w', 'h', 'y']
  // bar 是一个any类型的数组
}
const foo: UnionType = {
  bar() {}
  // bar 是一个返回值为void的函数
}
const foo: UnionType = {
  bar: {}
  // bar 是一个对象
}
```

### 2.5 可索引类型

可索引类型内有一个索引签名,它表示了索引的类型,还有索引值对应的值的类型

#### 2.5.1 数字索引签名 index 作为签名占位,可为任意字符.

```typescript
interface NumMap {
  [index: number]: string
}
const obj: NumMap = {
  0: 'foo',
  1: 'bar',
  '2': 'why',
  c: 'clc' //errorType  is not assignable to type 'NumMap'.Object literal may only specify known properties, and ''c'' does not exist in type 'NumMap'.
}
obj[0] // foo
obj[2] // why
```

数字作为对象的键是转换为字符形式的,key 为数字字符串正常编译,若为非数字字符串,报错.

---

数组本身索引签名即为 number 类型

```typescript
interface NumMap {
  [index: number]: string
}
let arr: NumMap
arr = ['foo', 'bar']
```

#### 2.5.2 字符索引签名

```typescript
interface StrMap {
  [str: string]: string
}
let obj: StrMap = {
  foo: 'foo',
  bar: 'bar',
  1: 'why' // 正常编译
}
const arr: StrMap = ['foo', 'bar'] // error 缺少字符索引签名
```

字符索引签名类型包含一部分数字索引签名类型

---

可同时使用两种索引类型,但是数字索引的返回值必须是字符索引返回值的子类型

```typescript
interface StrNumMap {
  [str: string]: any // any
  [index: number]: string
}
let obj: StrNumMap = {
  foo: 'foo',
  bar: 'bar',
  1: 'why'
}
const arr: StrNumMap = ['foo', 'bar'] // 正常编译
```

### 2.6 可同时面向多个接口

```typescript
const user: IUser | IStudent = {}
```

## 三、函数与接口

### 3.1 TypeScript 函数存在的问题

为了防止错误调用,给函数的参数和返回值定义了类型限制,但代码长不方便阅读

```typescript
const foo = (name: string, age: number): string => {
  return `name : ${name}, age: ${age}`
}
```

#### 3.1.1 使用接口重构一

```typescript
interface IUser {
  name: string
  age: number
}

const foo = ({ name, age }: IUser): string => {
  return `name : ${name}, age: ${age}`
}
```

还可以把参数对象替换成一个变量 user

```typescript
interface IUser {
  name: string
  age: number
}

const foo = (user: IUser): string => {
  return `name : ${user.name}, age: ${user.age}`
}
```

#### 3.1.2 使用接口重构二定义函数还可以写成如下形式

```typescript
const foo: (name: string, age: number) => string = (name, age) => {
  return `name : ${name}, age: ${age}`
}
// 给一个变量foo定义了一个函数类型,并且把一个函数赋值给了foo
```

接着定义两个接口

```typescript
interface IUser {
  name: string
  age: number
}
interface IUserFunc {
  (user: IUser): string
}
// warn Interface has only a call signature — use `type IUserFunc = // (user:IUser) =>string` instead.
```

第二个接口会报警告,tslint 建议您如果一个函数接口只有一个方法,建议使用**类型别名**,type 语句, 可配置`["callable-types":false]` 关掉它,或者听它的吧

```typescript
type IUserFunc = (user: IUser) => string
```

接下来按步重构函数

```typescript
interface IUser {
  name: string
  age: number
}
type IUserFunc = (user: IUser) => string

const foo: (name: string, age: number) => string = (name, age) => {
  return `name : ${name}, age: ${age}`
}
```

面向第一个接口

```typescript
const foo: (user: IUser) => string = user => {
  return `name : ${user.name}, age: ${user.age}`
}
```

next

```typescript
const foo: IUserFunc = user => {
  return `name : ${user.name}, age: ${user.age}`
}
```

函数简短了许多,并且看接口就可以知道函数参数,返回值的类型限制

### 3.2 混合类型

```typescript
interface Counter {
  count: number
  (): void
}
function getFunc(): Counter {
  function fn() {
    fn.count++
  }
  fn.count = 0
  return fn
}
```

函数 getFunc 返回类型为混合类型,即做为函数和对象使用，并带有额外的属性。

## 四、类与接口

接口对类的一部分行为进行抽象。

### 4.1 类实现接口

实现（implements）是面向对象中的一个重要概念。

一个类只能继承自另一个类，不同类之间可以有一些共有的特性，就可以把特性提取成接口（interfaces），用 implements 关键字来实现。

---

(1)TypeScript 中定义一个基本的类

```typescript
class Person {
  name: string
  run: Function
  constructor(name: string) {
    this.name = name
    this.run = () => {}
  }
}
class Rapper extends Person {
  age: number
  constructor(name: string, age: number) {
    super(name)
    this.age = age
  }
  rap() {
    console.log('I can sing and dance tap')
  }
}
```

---

(2) implements 关键字实现接口

```typescript
interface Skr {
  name: string
  age: number
  rap(): void
}
class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
}
class Rapper extends Person implements Skr {
  age: number
  constructor(name: string, age: number) {
    super(name)
    this.age = age
  }
  rap() {
    console.log('I can sing and dance tap')
  }
}
```

虽然定义了一个接口,但是在接口类中的属性和方法还是要写类型限制.感觉代码反而应为接口冗余了. 但类的接口是一种规范,因为接口分离了规范和实现,可通过接口轻易解读类必须提供的属性和方法,增强了可拓展性和可维护性.

---

(3) 一个类可实现多个接口

```typescript
interface Skr {
  name: string
  age: number
  rap(): void
}
interface SkrSkr {
  sing(): void
}
class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
}
class Rapper extends Person implements Skr, SkrSkr {
  age: number
  constructor(name: string, age: number) {
    super(name)
    this.age = age
  }
  rap() {
    console.log('I can sing and dance tap')
  }
  sing() {
    console.log('I can sing and dance tap')
  }
}
```

## 五、接口继承

- 接口可以通过其他接口来扩展自己。
- Typescript 允许接口继承多个接口。
- 继承使用关键字 extends。

### 5.1 单接口继承

extends 关键字后加继承的接口

```typescript
interface Person {
  name: string
  age: number
}
interface Students extends Person {
  gender: string
}
const foo: Students = {
  name: 'why',
  age: 18,
  gender: 'female'
}
```

### 5.2 多接口继承

多接口之间逗号分隔

```typescript
interface Sing {
  sing(): void
}
interface Jump {
  jump(): void
}
interface Rap extends Sing, Jump {
  rap(): void
}
const foo: Rap = {
  sing() {},
  jump() {},
  rap() {}
}
```

### 5.3 接口继承类

常见的面向对象语言中，接口是不能继承类的，但是在 TypeScript 中却是可行的用 extends 关键字继承类

```typescript
class Person {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  run(): void {}
}
interface User extends Person {
  gender: string
}
const foo: User = {
  name: 'foo',
  age: 18,
  gender: 'male',
  run(): void {}
}
```

---

本质上就是接口继承接口

```typescript
interface Person {
  name: string
  age: number
  run(): void
}
interface User extends Person {
  gender: string
}
const foo: User = {
  name: 'foo',
  age: 18,
  gender: 'male',
  run(): void {}
}
```

---

因为声明 class Person 时，除了创建一个名为 Person 的类，同时也创建了一个名为 Person 的类型（实例的类型）。所以 Person 既可以 当做一个类来用,也可以把它实例的类型当成接口使用

```typescript
class Person {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  run(): void {}
}
const foo: Person = {
  name: 'foo',
  age: 18,
  run() {}
}
```

---

实例的类型是不包括构造函数 constructor、静态属性或静态方法,因为生成的实例也不包含这些

```typescript
class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
  run(): void {}
  static age: number
  static jump(): void {}
}
const foo: Person = {
  name: 'foo',
  age: 18, //  “age”不在类型“Person”中
  run() {},
  jump(): void {} // jump”不在类型“Person”中
}
```
