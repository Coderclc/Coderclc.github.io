# TS - Interfaces Details

## 1. What is an interface

> One of the core principles of typescript is to type check the shape the value has. It is sometimes called "duck type discrimination" or "structural subtype". In typescript, the function of an interface is to name these types and define contracts for your code or third-party code.

- Often used to describe the shape of an object (Shape).
- Can be used to abstract part of the behavior of a class
- Name types and define contracts for your code or third-party code.

## 2. Objects and Interfaces

### 2.1 Simple example of object interface

Interfaces are generally capitalized. tslint recommends prefixing with I, otherwise a warning will be issued, you can turn it off in tslint, and add the rule `["interface-name":[true,"nerver-prefix"]` to the rules

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

First we define an interface Person, the interface constrains that shape must have two attributes, name and age, and have corresponding data types, and then we create a why object for Person

---

Defining variables with fewer properties than interfaces is not allowed: IDE added tslint plugin will issue warnings, compile and browser console will report errors

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

Property overflow is also disallowed:

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

Note that interfaces cannot be converted to JavaScript. It's just part of TypeScript. TypeScript can be converted in real time at [TypeScript Learning Paradise](https://www.tslang.cn/play/index.html)

### 2.2 Optional and read-only properties

If you don't want to match the shape exactly, you can use optional attributes: ? If you want some fields in the object to be read-only, you can define it with readonly

```typescript
interface Person {
  name?: string
  readonly age: number
  run?(): void
}
const why: Person = {
  // If the name key-value pair is missing, no error will be reported
  age: 18
}
why.run && why.run() //Judge function execution
why.age++ //Modify age report error Cannot assign to 'age' because it is a read-only property.
```

### 2.3 Arbitrary properties

If you want an interface to have arbitrary properties, you can use the following methods

(1) Indexable types

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

It should be noted that if any attribute is defined, then the type of the definite attribute and optional attribute must be a subset of its type, otherwise an unexpected error will occur.

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

(2) Type assertion

There are two ways

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

Of course, configure tslint `"no-angle-bracket-type-assertion": false` otherwise tslint will report an error, because it recommends you to use the second method

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

(3) Type compatibility

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
// Use the variable bar to receive parameters and then pass them into normal compilation
```

Directly pass the parameter and report an error, but use the variable bar to receive it and then pass it in for normal compilation

```typescript
interface IUser {
  name: string
  age: number
}

const user: IUser = {} // missing the following properties from type 'IUser': name, age

const user = {} as IUser // right
```

### 2.4 Union Types

```typescript
interface UnionType {
  bar: any[] | (() => void) | object
}
const foo: UnionType = {
  bar: ['w', 'h', 'y']
  // bar is an array of type any
}
const foo: UnionType = {
  bar() {}
  // bar is a function that returns void
}
const foo: UnionType = {
  bar: {}
  // bar is an object
}
```

### 2.5 Indexable Types

There is an index signature in the indexable type, which represents the type of the index, as well as the type of the value corresponding to the index value

#### 2.5.1 Digital index signature index is a placeholder for the signature, which can be any character.

```typescript
interfaceNumMap {
[index: number]: string
}
const obj: NumMap = {
0: 'foo',
1: 'bar',
'2': 'why',
c: 'clc' //errorType is not assignable to type 'NumMap'.Object literal may only specify known properties, and ''c'' does not exist in type 'NumMap'.
}
obj[0] // foo
obj[2] // why
```

Numbers as the key of the object are converted to character form. If the key is a numeric string, it will be compiled normally. If it is a non-numeric string, an error will be reported.

---

The index signature of the array itself is of type number

```typescript
interfaceNumMap {
[index: number]: string
}
let arr: NumMap
arr = ['foo', 'bar']
```

#### 2.5.2 Character Index Signature

```typescript
interface StrMap {
  [str: string]: string
}
let obj: StrMap = {
  foo: 'foo',
  bar: 'bar',
  1: 'why' // normal compilation
}
const arr: StrMap = ['foo', 'bar'] // error missing character index signature
```

The character index signature type contains part of the digital index signature type

---

Both index types can be used at the same time, but the return value of a numeric index must be a subtype of the return value of a character index

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
const arr: StrNumMap = ['foo', 'bar'] // compiles normally
```

### 2.6 Can target multiple interfaces at the same time

```typescript
const user: IUser | IStudent = {}
```

## Three, functions and interfaces

### 3.1 Problems with TypeScript functions

In order to prevent wrong calls, type restrictions are defined for the parameters and return values of the function, but the code is long and inconvenient to read

```typescript
const foo = (name: string, age: number): string => {
  return `name : ${name}, age: ${age}`
}
```

#### 3.1.1 Using Interface Refactoring 1

```typescript
interface IUser {
  name: string
  age: number
}

const foo = ({ name, age }: IUser): string => {
  return `name : ${name}, age: ${age}`
}
```

You can also replace the parameter object with a variable user

```typescript
interface IUser {
  name: string
  age: number
}

const foo = (user: IUser): string => {
  return `name : ${user.name}, age: ${user.age}`
}
```

#### 3.1.2 Using the interface to refactor the two-definition function can also be written in the following form

```typescript
const foo: (name: string, age: number) => string = (name, age) => {
  return `name : ${name}, age: ${age}`
}
// Define a function type for a variable foo and assign a function to foo
```

Then define two interfaces

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

The second interface will report a warning, tslint recommends that if a functional interface has only one method, it is recommended to use **type alias**, type statement, configurable `["callable-types":false]` to turn it off, or listen to its

```typescript
type IUserFunc = (user: IUser) => string
```

Next, refactor the function step by step

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

For the first interface

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

The function is much shorter, and you can know the function parameters and return value type restrictions by looking at the interface

### 3.2 Mixed types

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

The return type of the function getFunc is a mixed type, that is, it is used as a function and an object, with additional properties.

## Fourth, classes and interfaces

An interface abstracts part of the behavior of a class.

### 4.1 Class implementing interface

Implementations are an important concept in object orientation.

A class can only inherit from another class, and there can be some common features between different classes. The features can be extracted into interfaces and implemented with the implements keyword.

---

(1) Define a basic class in TypeScript

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

(2) implements keyword implements interface

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

Although an interface is defined, the properties and methods in the interface class still need to write type restrictions. It feels that the code should be redundant for the interface. But the interface of the class is a specification, because the interface separates the specification and the implementation, which can be passed through The interface can easily interpret the properties and methods that the class must provide, which enhances the extensibility and maintainability.

---

(3) A class can implement multiple interfaces

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

## Five, interface inheritance

- Interfaces can extend themselves with other interfaces.
- Typescript allows interfaces to inherit from multiple interfaces.
- Inheritance uses the keyword extends.

### 5.1 Single Interface Inheritance

Add the inherited interface after the extends keyword

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

### 5.2 Multiple Interface Inheritance

Separate multiple interfaces with commas

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

### 5.3 Interface inheritance class

In common object-oriented languages, interfaces cannot inherit classes, but in TypeScript it is feasible to use the extends keyword to inherit classes

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

In essence, the interface inherits the interface

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

Because when you declare class Person, in addition to creating a class named Person, you also create a type (the type of instance) named Person. So Person can be used as a class, or the type of its instance can be used as an interface

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

The type of the instance is one that does not include constructors, static properties, or static methods, because the generated instance does not contain these either

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
  age: 18, // "age" is not in type "Person"
  run() {},
  jump(): void {} // jump" is not in type "Person"
}
```
