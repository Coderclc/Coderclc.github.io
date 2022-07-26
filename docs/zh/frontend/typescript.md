# TypeScript

## 基础类型

### 任意类型

```typescript
const foo: any = ???
```

### 数字类型

```typescript
const foo: number = 233
```

### 字符类型

```typescript
const foo: string = 'hello world!'
```

### 布尔类型

```typescript
const flag: boolean = true
```

### 枚举类型

```typescript
enum Color {
  Red,
  Green,
  Blue
} // 0,1,2
```

### 数组类型

```typescript
const arr: number[] = [1, 2]
const arr: Array<number> = [1, 2]
```

### 元组类型

对应位置,数量须相同

```typescript
const tuple: [string, number] = ['hello world!', 233]
```

### void 类型

无返回值 或者返回 return null || undefined

```typescript
function hello(): void {
  alert('Hello Runoob')
}

const hello = (): void => {
  alert('Hello Runoob')
  return null || undefined
}
```

### null 类型

是任何类型的子类型（包括 void）

```typescript
const foo: null = null
```

### undefined 类型

是任何类型的子类型（包括 void）

```typescript
const foo: undefined = undefined
```

### never 类型

never 为其它类型（包括 null 和 undefined）的子类型,只能赋值为 never

```typescript
let x: never

// 返回类型为error
function error(message: string): never {
  throw new Error(message)
}

// 无法达到的闭合
function infiniteLoop(): never {
  while (true) {}
}
```

### 对象类型

```typescript
const user: object = { name: 'chenlicheng', age: 18 }
user.name // Property 'name' does not exist on type 'object'.
```

解决方案

- interface √

- any `const user: any = { name:"chenlicheng",age:18 } `

- 数组表示法 user['name']

- 断言 `(user as any).name ` `(<any>user).age`

### 联合类型

```typescript
const foo: number | string
const arr: (number | string)[]
const arr: Array<number | string>
const arr: Array<number> | Array<String> = []
```

### unknown 类型

```typescript
let value: unknown

value.foo.bar // Error
value.trim() // Error
value() // Error
new value() // Error
value[0][1] // Error
```

使用 `unknown` 还能保持类型安全,使用 `any` 就默认放弃类型检查

## 变量声明

```typescript
var [变量名]: [类型] = 值
```

### 类型断言

`<类型>`值 或者 值 `as` 类型

```typescript
let foo = 'foo'

foo = 233 as any
foo = <any>233

function getLength(target: number | string): number {
  if ((target as string).length || (<string>target).length) {
    // 必须断言,number 没有length属性
  } else {
    return target.toString().length
  }
}
```

### 类型推断

没有给出类型的时候,编译器会利用类型推断推出类型

若不能推断默认为 `any`

```typescript
let foo = 'foo'
foo = 233 // Type 'number' is not assignable to type 'string'.ts(2322)
```

### 类型别名

```typescript
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver
type EventNames = 'click' | 'scroll' | 'mousemove' //还能面向具体值

function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}
```

## 变量作用域

全局作用域

局部作用域

类作用域

## 运算符

算术

```typescript
+ - * / % ++ --
```

逻辑

```typescript
&& || !
```

关系

```typescript
== != > < >= <=
```

按位

```typescript
& | ~ ^ << >> >>>
```

赋值

```typescript
= += -= *= /=
```

三元/条件

```typescript
()?():()
```

字符串

```typescript
- +
```

类型

```typescript
typeof instanceof
```

## 条件语句

if

if else

if else-if else

switch case

## 循环

```typescript
for (init; condition; increment) {}
```

```typescript
for(var i in j)
```

```typescript
for(var i of j)
```

```typescript
Array.forEach Array.every Array.some...
```

```typescript
while (condition) {}
```

```typescript
do {} while (condition)
```

```typescript
break
```

```typescript
continue
```

```typescript
for (;;) {}
while (true) {}
```

## 函数

参数个数,类型限制,返回值限制

```typescript
function add(x: number, y: number): number {
  return x + y
}
```

可选参数必须跟在必需参数后面,参数不能同时设置为可选和默认。

```typescript
function add(x: number = 100, y?: number): number {
  return x + y
}
```

剩余参数

```typescript
function foo(...arg: Array<any>) {}
```

函数定义

```typescript
function foo() {}
```

匿名函数,将匿名函数赋值给一个变量

```typescript
const foo = () => {}
```

构造函数

```typescript
var myFunction = new Function('a', 'b', 'return a * b')
var x = myFunction(4, 3)
```

递归函数

```typescript
function factorial(number) {
  if (number <= 0) {
    // 停止执行
    return 1
  } else {
    return number * factorial(number - 1) // 调用自身
  }
}

factorial(6) // 输出 720
```

函数重载

```typescript
// 如果参数类型不同，则参数类型应设置为 any。
// 参数数量不同你可以将不同的参数设置为可选。
// 形参类型决定了返回值的类型
function disp(s1: string): void
function disp(n1: number, s1: string): void
function disp(x: any, y?: any): void {}

disp('abc')
disp(1, 'xyz')
```

函数形参对象

```typescript
// 1,2函数 为对象有默认值,3函数为对象中的key有默认值
// 当foo() 会使用整个对象的默认值
// 当foo({}) 会使用对象key的默认值
function foo(user: { name: string; age?: number } = { name: 'chenlicheng' }) {
  user.name
}
foo()

function foo({ name, age }: { name: string; age?: number } = { name: 'chenlicheng' }) {
  name
}
foo()

function foo({ name = 'chenlicheng', age }: { name?: string; age?: number }) {}
foo({})
```

## Map

```typescript
let myMap = new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
])
```

map.clear() –> 移除 Map 对象的所有键/值对 。

map.set() –> 设置键值对，返回该 Map 对象。

map.get() –> 返回键对应的值，如果不存在，则返回 undefined。

map.has() –> 返回一个布尔值，用于判断 Map 中是否包含键对应的值。

map.delete() –> 删除 Map 中的元素，删除成功返回 true，失败返回 false。

map.size –> 返回 Map 对象键/值对的数量。

map.keys() –> 返回一个 Iterator 对象， 包含了 Map 对象中每个元素的键 。

map.values() –> 返回一个新的 Iterator 对象，包含了 Map 对象中每个元素的值 。

```typescript
for (let i of Iterator) or Iterator.next()
```

## 接口

接口一般首字母大写。tslint 建议加上 I 前缀,

```typescript
// 属性不能少,不能溢出
interface IPerson {
  firstName: string
  lastName: string
  sayHi: () => string
  run(): number
}
```

### 可选属性和只读属性

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

### 任意类型

index 只是一个占位符

任意类型可以少,可以溢出

任意类型的类型必须包含其余属性的类型

```typescript
interface Person {
  name: string
  age?: number
  [index: string]: any
}

const why: Person = {
  name: 'why',
  age: 18,
  gender: 'female'
}
```

### 联合类型和接口

```typescript
interface IRunOptions {
  program: string
  commandline: string[] | string | (() => string)
}
```

### 接口和数组

```typescript
// 索引值可以是数字或字符串
interface INamelist {
  [index: number]: string
}

interface ages {
  [key: string]: number // 伪数组
}
```

### 单接口继承

```typescript
interface Person {
  age: number
}

interface Musician extends Person {
  instrument: string
}
```

### 多接口继承

```typescript
interface IParent1 {
  v1: number
}

interface IParent2 {
  v2: number
}

// 逗号分隔符分割
interface Child extends IParent1, IParent2 {}
```

### 面向接口和类型断言

```typescript
interface IUser {
  name: string
  age: number
}

const user: IUser = {} // error  issing the following properties

const user = {} as IUser // true
```

### 接口与函数

```typescript
// 定义两个接口
interface IUser {
  name: string
  age: number
}
interface IUserFunc {
  (user: IUser): string
}
type IUserFunc = (user: IUser) => string

// 给变量foo定义了函数类型,并且把一个定义了类型的匿名函数赋值给他
const foo: (name: string, age: number) => string = (name: string, age: number): string => {
  return `name : ${name}, age: ${age}`
}

// next
const foo: IUserFunc = user => {
  return `name : ${user.name}, age: ${user.age}`
}
```

注意区别

```typescript
// 一个函数,函数返回值为string
interface IUserFunc {
  (): string
}
// 一个对象,对象里有foo这个函数,返回值为string
interface IUserFunc {
  foo(): string
}
```

### 类实现接口

```typescript
// constructor 还是需要定义类型限制,否则仍然无法限制
interface Skr {
  name: string
  age: number
  rap(): void
}

class Person {
  name
  constructor(name: string) {
    this.name = name
  }
}

class Rapper extends Person implements Skr {
  age
  constructor(name: string, age: number) {
    super(name)
    this.age = age
  }
  rap() {}
}
```

## 类

### 类的声明

```typescript
class User {
  name
  age
  gender: string = 'male'
  constructor(name: string, age: number, gender?: string) {
    this.name = name
    this.age = age
    gender && (this.gender = gender)
  }
  run(): void {}
}
```

### 类的继承

子类除了不能继承父类的私有成员(方法和属性)和构造函数，其他都可以继承。一次只能继承一个,但可以多重继承

```typescript
class User {
  name
  age
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  run(): void {}
}

class Student extends User {
  gender
  phone
  constructor(name: string, age: number, gender: string, phone: number) {
    super(name, age)
    this.gender = gender
    this.phone = phone
  }
}
```

### 继承类的重写

```typescript
class PrinterClass {
  doPrint(): void {
    // '父类的 doPrint() 方法。'
  }
}

class StringPrinter extends PrinterClass {
  doPrint(): void {
    this.doPrint() //  调用自身的doPrint  Maximum call stack size exceeded
    super.doPrint() // 调用父类的函数
    // '子类的 doPrint()方法。'
  }
}
```

### 关键字

static 定义方法或属性在类名本质是一个函数上

readonly 只读属性

public 默认为公有的

private 只能在定义类中使用

protected 只能在子父类中访问

## 对象

在 typescript 中往对象身上添加属性会编译错误,因为 ts 对象必须是特定类型的实例,

```typescript
// 提前声明类型模板
// 面向一个字符索引接口
var sites = {
  site1: 'Runoob',
  site2: 'Google',
  sayHello: function () {} // 类型模板
}

sites.sayHello = function () {}

sites.sayHello()
```

## 命名空间

```typescript
namespace SomeNameSpaceName {
  export interface ISomeInterfaceName {}
  export class SomeClassName {}
}

SomeNameSpaceName.SomeClassName

export default SomeNameSpaceName

export namespace SomeNameSpaceName {
  export interface ISomeInterfaceName {}
  export class SomeClassName {}
}
```

## 声明文件

在 ts 中使用第三方的 js,无法使用 ts 的类型检查功能

声明文件以.d.ts 结尾

```typescript
//使用 declare 关键字来定义它的类型，帮助 TypeScript 判断我们传入的参数类型对不对
declare var jQuery: (selector: string) => any

jQuery('#foo')
```

### 结构

### 举例

#### 全局变量

```typescript
declare let foo: number
```

#### 全局函数

```typescript
declare function greet(greeting: string): void
declare const greet: (greeting: string) => void
```

#### 命名空间

```typescript
// namespace不可缺少
// 访问 user.foo 只是将声明类型包了一层命名空间
declare namespace user {
  const foo: string
  function bar(): void
  const why: () => void
}
```

#### 可重用类型

```typescript
// 也就是声明的时候可引用其它类型
interface GreetingSettings {
  (): void
}

type GreetingSettings = () => void

declare function greet(setting: GreetingSettings): void
```

#### 空间组织类型

```typescript
declare namespace GreetingLib {
  interface LogOptions {
    verbose?: boolean
  }
  interface AlertOptions {
    modal: boolean
    title?: string
    color?: string
  }
}
GreetingLib.LogOptions

// 嵌套的命名空间
declare namespace GreetingLib.Options {
  // Refer to via GreetingLib.Options.Log
  interface Log {
    verbose?: boolean
  }
  interface Alert {
    modal: boolean
    title?: string
    color?: string
  }
}
```

#### 类类型

```typescript
declare class Greeter {
  constructor(greeting: string)

  greeting: string
  showGreeting(): void
}
```

#### 模块

```typescript
declare module Runoob {
  export class Calc {
    doSum(limit: number): number
  }
}
```

#### 接口

```typescript
export declare interface IPerson {
  name: string
  age: number
}
// same
export interface IPerson {
  name: string
  age: number
}
```

### 规范

不要使用如下类型`Number`，`String`，`Boolean`或`Objet`

不要定义一个从来没使用过其类型参数的泛型型。

应该给返回值被忽略的回调函数设置`void`

不要在回调函数里使用可选参数,*不要*因为回调函数参数个数不同而写不同的重载

```typescript
/* 错误 */
// getObject 函数传入一个回调函数,这个函数不要使用可选参数
interface Fetcher {
  getObject(done: (data: any, elapsedTime?: number) => void): void
}

/* 错误 */
declare function beforeAll(action: () => void, timeout?: number): void
declare function beforeAll(action: (done: DoneFn) => void, timeout?: number): void
```

*不要*把一般的重载放在精确的重载前面：

```typescript
/* 错误 */
declare function fn(x: any): any
declare function fn(x: HTMLElement): number
declare function fn(x: HTMLDivElement): string

var myElem: HTMLDivElement
var x = fn(myElem) // x: any, wat?
```

尽可能使用可选类型还有联合类型

### 深入

### 模板

## 项目配置

- 不带任何输入文件的情况下调用`tsc`，编译器会从当前目录开始去查找`tsconfig.json`文件，

- 当命令行上指定了输入文件时，`tsconfig.json`文件会被忽略。

- tsc --watch 必须要有 tsconfig.json tsc --init

- file.include 等都没配置会递归目录下所有的默认编译成对应的 js 默认`.ts`，`.tsx`，和`.d.ts`

- `"files"`指定一个包含相对或绝对文件路径的列表。

- `"include"`和`"exclude"`属性指定一个文件 glob 匹配模式列表

- "exclude"可以过滤"include"但不能过滤"files"

- 关联引用的也会包含进来

- `@types`，`typeRoots`和`types`

  - 默认所有*可见的*"`@types`"包会在编译过程中被包含进来, `./node_modules/@types/`，`../node_modules/@types/`递归等等。

  - 如果指定了`typeRoots`，_只有_`typeRoots`下面的包才会被包含进来。 比如：

    ```json
    {
       "compilerOptions": {
           "typeRoots" : ["./typings"]  选择路径
       }
    }
    ```

  - 如果指定了`types`，只有被列出来的包才会被包含进来。 比如：

    ```json
    {
       "compilerOptions": {
            "types" : ["node", "lodash", "express"]  选择包
       }
    }
    ```

  - 命名空间内类型的使用

    ```typescript
    export = QueryString
    export as namespace qs

    declare namespace QueryString {
      interface IUser {
        name: string
      }
    }

    // main.ts
    const obj: qs.IUser = {
      name: 'asd'
    }

    import QueryString = require('qs')

    const obj: QueryString.IUser = {
      name: 'asd'
    }
    ```

- 编译选项

  ```json
  {
    "compilerOptions": {
      "target": "esnext", // 生成js ECMAScript 版本
      "module": "esnext", // 指定生成哪个模块系统代码
      "moduleResolution": "node", // 决定如何处理模块。?
      "strict": true, // 相当于启动noImplicitAny, --noImplicitThis, --alwaysStrict， --strictNullChecks和 --strictFunctionTypes和--strictPropertyInitialization。
      "forceConsistentCasingInFileNames": true, // 	禁止对同一个文件的不一致的引用。
      "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。这并不影响代码的输出，仅为了类型检查。
      "strictFunctionTypes": false, // 禁用函数参数双向协变检查。
      "jsx": "preserve", // 在 .tsx文件里支持JSX： "React"或 "Preserve"。查看 JSX。
      "baseUrl": ".", // 解析非相对模块名的基准目录。
      "allowJs": true, // 允许编译javascript文件。
      "sourceMap": true, // 	生成相应的 .map文件。
      "esModuleInterop": true, // export = QueryString;  export as namespace qs; 可以同时使用
      "resolveJsonModule": true, // Cannot find module './settings.json'. Consider using '--resolveJsonModule' to
      "noUnusedLocals": true, // 	若有未使用的局部变量则抛错。
      "noUnusedParameters": true, // 若有未使用的参数则抛错。
      "experimentalDecorators": true, // 启用实验性的ES装饰器。
      "lib": ["dom", "esnext"], // 	编译过程中需要引入的库文件的列表。
      "types": ["vite/client", "jest"],
      "typeRoots": ["./node_modules/@types/", "./types"],
      "noImplicitAny": false, // 在表达式和声明上有隐含的 any类型时报错。
      "skipLibCheck": true, // 忽略所有的声明文件（ *.d.ts）的类型检查。
      "paths": {
        // 模块名到基于 baseUrl的路径映射的列表。查看 模块解析文档了解详情
        "/@/*": ["src/*"],
        "/#/*": ["types/*"]
      }
    },
    "include": [],
    "exclude": ["node_modules", "tests/server/**/*.ts", "dist", "**/*.js"]
  }
  ```

## 泛型

不预先指定具体类型,而在使用的时候再指定

```typescript
export {}
type IGetFunc = (...args: Array<number | string>) => (number | string)[]

let getArr: IGetFunc

getArr = (...args) => {
  const arr = []
  arr.push(...args)
  return arr
}

// 使用类型断言,函数重载,any有些许本末倒置
getArr('foo', 'bar').forEach(item => {
  item.length // error Property 'length' does not exist on type 'number'.
})
```

声明时声明\<T>,调用的时候指定类型

```typescript
type IGetFunc = <T>(...args: Array<T>) => T[]

let getArr: IGetFunc

getArr = (...args) => {
  const arr = []
  arr.push(...args)
  return arr
}

getArr<string>('foo', 'bar').forEach(item => {
  item.length
})
```

不手动指定则类型自动推论

```typescript
getArr('foo', 'bar').forEach(item => {
  item.toFixed(1) // error
  // Property 'toFixed' does not exist on type 'string'. Did you mean 'fixed'
})
```

泛型参数可指定多个

```typescript
type Func = <T, U>(x: T, y: U) => [U, T]

let swap: Func = (x, y) => {
  return [y, x]
}

swap(1, '1') // ['1',1]
```

泛型约束

```typescript
type IFunc = <T extends string>(x: T) => T

const foo: IFunc = x => {
  x.length // right T 默认为any,无法访问 sting.length
  return x
}

foo('foo').length
```

泛型延伸接口

```typescript
// 限制了T需拥有length这个属性,而非T为一个对象
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

多个泛型参数之间的约束

```typescript
// keyof为ts在泛型定义时独有的关键字
function foo<T, U extends keyof T>(obj: T, attr: U): T {
  return obj
}

const bar = {
  name: 'bar'
}

foo(bar, 'name')

foo(bar, 'age') // error 类型“"age"”的参数不能赋给类型“"name"”的参数。
```

泛型 T 默认值

```typescript
// 不指定或者无法推测时, 将会使用默认值
function foo<T = number>(x: T): T {
  return x
}
```

泛型与接口

- 切记一定要搞清楚是声明还是调用

- 写在()的\<T>只有函数这种情况

- 使用 type,interface 声明类型的时候使用泛型

- 声明函数的时候使用泛型

- 形参前,或接口名后

```typescript
// 第二种在面向时需手动定义泛型类型 error 理解错了
interface Arr {
  <T>(...args: T[]): Array<T>
}

interface Arr<T> {
  (...args: T[]): Array<T>
  attr: T
}
```

```typescript
//全程交由ts推导,面向该类型的时候不能指定T的类型
//调用面向该类型的函数,可以指定T的类型
type Arr = <T>(...args: T[]) => Array<T>

//面向该类型的时候必须指定T的类型
//调用面向该类型的函数,不可以指定T的类型
type Arr<T> = (...args: T[]) => Array<T>
```

泛型与类

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

## 装饰器

tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```

*装饰器*是一种特殊类型的声明，它能够被附加到[类声明](https://www.tslang.cn/docs/handbook/decorators.html#class-decorators)，[方法](https://www.tslang.cn/docs/handbook/decorators.html#method-decorators)， [访问符](https://www.tslang.cn/docs/handbook/decorators.html#accessor-decorators)，[属性](https://www.tslang.cn/docs/handbook/decorators.html#property-decorators)或[参数](https://www.tslang.cn/docs/handbook/decorators.html#parameter-decorators)上。

装饰器使用 `@expression`这种形式，`expression`求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。

*装饰器工厂*就是一个简单的函数，它返回一个表达式，以供装饰器在运行时调用。

```typescript
function color(value: string) {
  // 这是一个装饰器工厂
  return function (target) {
    //  这是装饰器
    // do something with "target" and "value"...
  }
}
```

**多个装饰器声明**

1. 由上至下依次对装饰器表达式求值。
2. 求值的结果会被当作函数，由下至上依次调用。

**不同声明装饰器的顺序应用**

1. _参数装饰器_，然后依次是*方法装饰器*，_访问符装饰器_，或*属性装饰器*应用到每个实例成员。
2. _参数装饰器_，然后依次是*方法装饰器*，_访问符装饰器_，或*属性装饰器*应用到每个静态成员。
3. *参数装饰器*应用到构造函数。
4. *类装饰器*应用到类。

装饰器不能用在声明文件中( `.d.ts`)，也不能用在任何外部上下文中（比如`declare`的类）。

### 类装饰器

类的构造函数作为其唯一的参数。

```typescript
// Object.seal()方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变。
function sealed(constructor: Function) {
  Object.seal(constructor)
  Object.seal(constructor.prototype)
}

@sealed
class Greeter {}
```

类装饰器工厂

```typescript
function foo(params: string) {
  return (constructor: Function) => {
    params
    constructor
  }
}

@foo('bar')
class Foo {
  constructor() {}
}
```

### 方法装饰器

方法装饰器表达式会在运行时当作函数被调用，传入下列 3 个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 成员的*属性描述符*。

### 访问器装饰器

不允许同时装饰一个成员的`get`和`set`访问器.成员的所有装饰的必须应用在文档顺序的第一个访问器上。既 get 访问器装饰器表达式会在运行时当作函数被调用，传入下列 3 个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 成员的*属性描述符*。

### 属性装饰器

属性装饰器表达式会在运行时当作函数被调用，传入下列 2 个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。

### 参数装饰器

### 元数据

## 三斜线指令

三斜线指令是包含单个 XML 标签的单行注释。 注释的内容会做为编译器指令使用。

三斜线指令*仅*可放在包含它的文件的最顶端。 一个三斜线指令的前面只能出现单行或多行注释，这包括其它的三斜线指令。 如果它们出现在一个语句或声明之后，那么它们会被当做普通的单行注释，并且不具有特殊的涵义。

```typescript
/// <reference path="..." />
// 指令是三斜线指令中最常见的一种。 它用于声明文件间的 依赖。
```

```typescript
/// <reference types="..." />
// 例如，把 /// <reference types="node" />引入到声明文件，表明这个文件使用了 @types/node/index.d.ts里面声明的名字； 并且，这个包需要在编译阶段与声明文件一起被包含进来。
```

## 重映射

```typescript
// T extends Record<string,any> 限制为索引类型,既判断value断言key
type FilterString<T extends Record<string, any>> = {
  [Key in keyof T as T[Key] extends string ? Key : never]: T[Key]
}
```

```typescript
// modify key
type Getters<T extends Record<any, any>> = {
  [Key in keyof T as `get${Capitalize<Key & string>}`]: T[Key];
}

type Person ={
  name:'chenlicheng',
  age:20,
  gender:true
}

type foo = Getters<Person> = type foo = {
    getName: "chenlicheng";
    getAge: 20;
    getGender: true;
}
```

```typescript
// key,value 互换
type Flip<T extends Record<any, any>> = {
  T[Key]: Key // Cannot find name 'Key'.
}

type Flip<T extends Record<any, any>> = {
  [Key in keyof T as `${T[Key]}`]: Key  // 无``无true
}

type foo = Flip<Person>
```

```typescript
type GetValueType<T> = T extends Promise<infer R> ? R : never

type foo = GetValueType<Promise<string>>
```

## Review

- tsc 指定文件,编译器不会去查找 tsconfig.json

- 使用 esModule 导入导出替代 require

- strictNullChecks

  当开启了严格的 null 检查时,必须手动指定可能为 null 或者 undefined 的情况

  且`null`和`undefined`只能赋值给`void`和它们各自。(4.3 不能赋予给 void)

  ```typescript
  var foo: string[] | null

  foo.length // error - 'foo' is possibly 'null'

  foo!.length // okay - 'foo!' just has type 'string[]'

  // 假设有一个值TypeScript认为可以为null或undefined，但是你更清楚它的类型，你可以使用!后缀。
  ```

- (大写的 o)在其他语言,Object 类型有着近乎 any 的作用,他允许你赋予任何值,但是你不能访问它上面的方法,即时他真的有

  ```typescript
  let prettySure: Object = 4

  prettySure.toFixed() // Error: Property 'toFixed' doesn't exist on type 'Object'.
  ```

- (小写的 o)`object`表示非原始类型，也就是除`number`，`string`，`boolean`，`symbol`，`null`或`undefined`之外的类型。

- 当你在 TypeScript 里使用 JSX 时，只有 `as`语法断言是被允许的。

- ```typescript
  // 声明foo的传入对象有一个name key type is string
  const foo = (user: { name: string }) => {}

  const foo = ({ name: { foo } }) => {} // 解构
  ```

- import type ,export type 用于导入 d 导出.d.ts 声明文件的接口,类型等

- 继承类子类的实例隐示原型对象/既子类的显示原型对象指向父类的实例

- super

  - constructor super() 为 exe 父类的 constructor
  - 子类的 public 方法中 super 指向父类的显示原型对象 与父类方法所处位置一致
  - 子类的 static 方法中 super 指向父类 与父类方法所处位置一致
  - 子类 this 访问方法,优先找自身的显示原型对象,再找父类的显示原型对象

- private 可以修饰 constructor,那么该类无法被继承和实例化

- protected 可以修饰 constructor,可以被继承,子类可以实例化,但是自身父类不能实例化

- ```typescript
  type Record<K extends keyof any, T> = {
    [P in K]: T
  }

  // 声明了T,并且给了m
  declare type Recordable<T = any> = Record<string, T>
  ```

- ```typescript
  type Partial<T> = {
    [P in keyof T]?: T[P]
  }
  ```

- ```typescript
  type Partial<T> = {
    [P in keyof T]?: T[P]
  }

  interface CreateStorageParams {
    prefixKey: string
    storage: Storage
  }

  //将CreateStorageParams 全部转为可选类型
  type Options = Partial<CreateStorageParams>
  ```

- ```typescript
  // 面向时临时补类型
  interface Person {
    name: string
    age: number
  }

  const obj: Person & { gender: string } = {
    name: 'chenlichengg',
    age: 18,
    gender: 'male'
  }
  ```

- ```typescript
  // 返回类型为传入类型的布尔值
  function isNull(val: unknown): val is null {
    return val === null
  }
  ```

- ```typescript
  // 面向InjectionKey需要一个T ,而provide根据第一个参数的T限制了value的T,自己推断
  interface InjectionKey<T> extends Symbol {}

  export declare function provide<T>(key: InjectionKey<T> | string | number, value: T): void

  const key: InjectionKey<string> = Symbol()
  ```

- ```typescript
  interface foo1 {
    name: string
  }

  interface foo2 {
    age: number
  }

  interface foo3 {
    gender: boolean
  }

  type foo = foo1 & (foo2 | foo3)

  const bar: foo = {
    name: 'chenlicheng',
    age: 18,
    gender: true
  }
  // bar 必须满足 foo1,foo2,可以或不可以满足foo3,相当于可选
  ```

- ```typescript
  type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

  export let i18n: ReturnType<typeof createI18n>

   type ReturnType<T extends (...args: any) => any> // 限制T是一个函数
  ```

- ```typescript
  const num: number = 10

  ;(num as unknown as string).split('') // 注意，这里和any一样完全可以通过静态检查
  // 当num已经拥有类型的时候, 需要先转换为any或者unknow
  ```

- unknow 替代 any 的功能同时保留静态检查的能力。

- 非空断言运算符

  ```typescript
  function onClick(callback: () => void) {
    callback!() // 参数是可选入参，加了这个感叹号!之后，TS编译不报错
  }
  ```

- 数字分隔符

  ```typescript
  let num: number = 1_2_345.6_78_9
  // 编译出来的代码是没有_的
  ```

- keyof 要用 in 来遍历

  ```typescript
  //keyof 可以获取一个类型所有键值，返回一个联合类型，如下：
  type Person = {
    name: string
    age: number
  }

  type PersonKey = keyof Person // PersonKey得到的类型为 'name' | 'age'
  //keyof 的一个典型用途是限制访问对象的 key 合法化，因为 any 做索引是不被接受的。即 extends keyof
  ```

- typeof

  ```typescript
  typeof 是获取一个对象/实例的类型，如下：

  const me: Person = { name: 'gzx', age: 16 };

  type P = typeof me;  // { name: string, age: number | undefined }

  const you: typeof me = { name: 'mabaoguo', age: 69 }  // 可以通过编译
  ```

- 遍历属性 in

  ```typescript
  // in 只能用在类型的定义中，可以对枚举类型进行遍历，如下：
  // 这个类型可以将任何类型的键值转化成number类型
  type TypeToNumber<T> = {
    [key in keyof T]: number
  }
  ```

- ```typescript
  // 普通类型定义
  type Dog<T> = { name: string; type: T }
  // 普通类型使用,没有默认值必须声明类型
  const dog: Dog<number> = { name: 'ww', type: 20 }

  // 类定义
  class Cat<T> {
    private type: T
    constructor(type: T) {
      this.type = type
    }
  }
  // 类使用,作为类型定义,没有默认值必须声明类型,new 实例的时候可以传或者自动推导,因为类可以作为类型,而函数不行
  const cat: Cat<number> = new Cat<number>(20) // 或简写 const cat = new Cat(20)

  // 函数定义
  function swipe<T, U>(value: [T, U]): [U, T] {
    return [value[1], value[0]]
  }

  // 函数使用
  swipe<Cat<number>, Dog<number>>([cat, dog]) // 或简写 swipe([cat, dog])
  ```

- ```typescript
  // 泛型约束
  T extends keyof U
  // T 约束为U类型的key组成的联合类型

  // 泛型条件
  T extends keyof U?X:Y
  // 判断是否,true的话,T为X类型
  ```

- infer 推断就是你不用预先指定在泛型列表中，在运行时会自动判断，

  ```typescript
  type Foo<T> = T extends { t: infer Test } ? Test : string //首选看 extends 后面的内容，{t: infer Test}可以看成是一个包含t属性的类型定义，这个t属性的 value 类型通过infer进行推断后会赋值给Test类型，如果泛型实际参数符合{t: infer Test}的定义那么返回的就是Test类型，否则默认给缺省的string类型。举个例子加深下理解：

  type One = Foo<number> // string，因为number不是一个包含t的对象类型

  type Two = Foo<{ t: boolean }> // boolean，因为泛型参数匹配上了，使用了infer对应的type

  type Three = Foo<{ a: number; t: () => void }> // () => void，泛型定义是参数的子集，同样适配
  ```

- 泛型工具

  - Partial

    ```typescript
    // 用于转换为可选
    type Partial<T> = {
      [P in keyof T]?: T[P]
    }
    ```

  - Required

    ```typescript
    type Required<T> = {
      [P in keyof T]-?: T[P]
    }
    ```

  - Record

    ```typescript
    // 用于声明对象 ,string|number|symbol:???
    type Record<K extends keyof any, T> = {
      [key in K]: T
    }
    ```

  - Pick 此工具的作用是将 T 类型中的 K 键列表提取出来，生成新的子键值对类型。

    ```typescript
    type Pick<T, K extends keyof T> = {
      [P in K]: T[P]
    }

    const bird: Pick<Animal, 'name' | 'age'> = { name: 'bird', age: 1 }
    ```

  - exclude

    ```typescript
    type language = 'ts' | never  *// 任何类型联合never 为那个类型
    type Exclude<T, U> = T extends U ? never : T
    type T1 = Exclude<"a" | "b" | "c", "a" | "b">;   // "c"

     T extends U? T: never // 返回T 和 U 的交集。 没有返回never
     T extends U? never:T  // 返回T 和 U 无交集的部分 没有返回never
    ```

  - Omit

    ```typescript
    // Omit 的结果为Pick相反,既取非并集
    type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
    ```

  - ReturnType

    ```typescript
    type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
    // 简化一下

    type ReturnType<T extends func> = T extends () => infer R ? R : any
    // 泛型条件T是否为一个函数, 并且将这个返回值用infer存了起来
    ```

- type 还是 interface?

  ```typescript
  type Name = { name: string };
  interface IName { name: string };

  type Person = Name & { age: number };
  interface IPerson extends IName { age: number };
  // 拓展来看type 简单

  type I = string|number

  declare global {
      interface Window { MyNamespace: any; }
  }
  interface 可以基于window 新添加属性
  ```

- 什么时候写.d.ts 文件

  - 通过 script 标签引入的第三方库 挂载了一些全局的方法，

  - 使用的第三方 npm 包，但是没有提供声明文件.第三方 npm 包如果有提供声明文件的话，一般会以两种形式存在：一是 `@types/xxx`，另外是在源代码中提供 `.d.ts` 声明文件。第一种的话一般是一些使用量比较高的库会提供，可以通过 `npm i @type/xxx` 尝试安装。如果这两种都不存在的话，那就需要我们自己来定义了

  - 自身团队内比较优秀的 JS 库或插件，为了提升开发体验

  - 全局变量的声明文件主要有以下几种语法：声明文件中只是对类型的定义，不能进行**赋值**。

    ```typescript
    declare let/const  // 声明全局变量
    declare function   // 声明全局方法
    declare class      // 声明全局类
    declare enum       // 声明全局枚举类型
    declare namespace  // 声明（含有子属性的）全局对象
    interface/type     // 声明全局类型
    ```

  - npm 包的声明文件主要有以下几种语法：

    ```typescript
    export const/let  // 导出变量
    export namespace  // 导出（含有自属性的）对象
    export default    // ES6 默认导出
    export =          // commonjs 导出模块
    ```

  - 拓展原有模块,全局变量.

    ```typescript
    // 对于已经有声明定义的模块或者全局变量，可以利用 TS 中的声明合并对其进行拓展。
    // 比如在 window 下挂载的一些全局变量:
    interface Window {
      readonly request?: any
      readonly devToolsExtension?: any
      readonly wx?: any
    }
    ```

    ```typescript
    // 已有模块的拓展
    declare module 'querystring' {
      function escape(str: string): string
      function unescape(str: string): string
    }
    ```

- 类型保护: typeof instanceof in 字面量类型等将代码分割成范围更小的代码块,在这个代码块中,变量的类型是确定的

- is 关键字用于函数返回值类型中,判断参数是否某一类型,并根据结果返回对应的布尔类型,用于自定义限制函数的判断
