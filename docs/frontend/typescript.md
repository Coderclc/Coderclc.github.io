# TypeScript

## base type

### Any type

```typescript
const foo : any = ???
```

### Number Type

```typescript
const foo: number = 233
```

### character type

```typescript
const foo: string = 'hello world!'
```

### boolean type

```typescript
const flag: boolean = true
```

### enumeration type

```typescript
// 0,1,2
enum Color {
  Red,
  Green,
  Blue
}
```

### Array type

```typescript
const arr: number[] = [1, 2]
const arr: Array<number> = [1, 2]
```

### tuple type

Corresponding location, the quantity must be the same

```typescript
const tuple: [string, number] = ['hello world!', 233]
```

### void type

No return value or return return null || undefined

```typescript
function hello(): void {
  alert('Hello Runoob')
}

const hello = (): void => {
  alert('Hello Runoob')
  return null || undefined
}
```

### null type

is a subtype of any type (including void)

```typescript
const foo: null = null
```

### undefined types

is a subtype of any type (including void)

```typescript
const foo: undefined = undefined
```

### never type

never is a subtype of other types (including null and undefined), and can only be assigned to never

```typescript
let x: never

// return type is error
function error(message: string): never {
  throw new Error(message)
}

// unreachable closure
function infiniteLoop(): never {
  while (true) {}
}
```

### Object Type

```typescript
const user: object = { name: 'chenlicheng', age: 18 }
user.name // Property 'name' does not exist on type 'object'.
```

solution

- interface √

- any `const user: any = { name:"chenlicheng",age:18 } `

- array notation user[ 'name' ]

- assert `(user as any).name` `(<any>user).age`

### Union Types

```typescript
const foo: number | string
const arr: (number | string)[]
const arr: Array<number | string>
const arr: Array<number> | Array<String> = []
```

### unknown type

```typescript
let value: unknown

value.foo.bar // Error
value.trim() // Error
value() // Error
new value() // Error
value[0][1] // Error
```

Use `unknown` to maintain type safety, use `any` to give up type checking by default

## variable declaration

```typescript
var [ variable name ]: [ type ] = value
```

### Type Assertion

`<type>` value or value `as` type

```typescript
let foo = 'foo'

foo = 233 as any
foo = <any>233

function getLength(target: number | string): number {
  if ((target as string).length || (<string>target).length) {
    // must assert, number has no length property
  } else {
    return target.toString().length
  }
}
```

### Type inference

When no type is given, the compiler will use type inference to infer the type

Defaults to `any` if it cannot be inferred

```typescript
let foo = 'foo'
foo = 233 // Type 'number' is not assignable to type 'string'.ts(2322)
```

### Type aliases

```typescript
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver
type EventNames = 'click' | 'scroll' | 'mousemove' // can also be oriented to specific values

function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}
```

## variable scope

global scope

local scope

class scope

## operator

arithmetic

```typescript
+ - * / %++ --
```

logic

```typescript
&& || !
```

relation

```typescript
== != > < >= <=
```

bitwise

```typescript
& | ~ ^ << >> >>>
```

assign

```typescript
= += -= *= /=
```

ternary/condition

```typescript
()?():()
```

string

```typescript
- +
```

type

```typescript
typeof instanceof
```

## Conditional statements

if

if else

if else-if else

switch case

## loop

```typescript
for (init; condition; increment) {}
```

```typescript
for ( var i in j )
```

```typescript
for ( var i of j )
```

```typescript
Array.forEach _ _ Array . every Array . some ...
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

## function

Number of parameters, type limit, return value limit

```typescript
function add(x: number, y: number): number {
  return x + y
}
```

Optional parameters must follow required parameters, and parameters cannot be set as optional and default at the same time.

```typescript
function add(x: number = 100, y?: number): number {
  return x + y
}
```

remaining parameters

```typescript
function foo(...arg: Array<any>) {}
```

function definition

```typescript
function foo() {}
```

Anonymous function, assigning an anonymous function to a variable

```typescript
const foo = () => {}
```

Constructor

```typescript
var myFunction = new Function('a', 'b', 'return a * b')
var x = myFunction(4, 3)
```

recursive function

```typescript
function factorial(number) {
  if (number <= 0) {
    // stop execution
    return 1
  } else {
    return number * factorial(number - 1) // call itself
  }
}

factorial(6) // output 720
```

function overloading

```typescript
// If the parameter types are different, the parameter type should be set to any.
// The number of parameters is different and you can set different parameters as optional.
// The parameter type determines the type of the return value
function disp(s1: string): void
function disp(n1: number, s1: string): void
function disp(x: any, y?: any): void {}

disp('abc')
disp(1, 'xyz')
```

function parameter object

```typescript
// 1,2 function has default value for the object, 3 function has default value for the key in the object
// When foo() will use the default value of the whole object
// When foo({}) will use the default value of the object key
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

##Map

```typescript
let myMap = new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
])
```

map.clear() –> removes all key/value pairs from a Map object.

map.set() –> Set the key-value pair and return the Map object.

map.get() –> returns the value corresponding to the key, or undefined if it does not exist.

map.has() –> Returns a boolean value used to determine whether the Map contains the value corresponding to the key.

map.delete() –> deletes the elements in the Map, returns true if the deletion is successful, and returns false if it fails.

map.size –> Returns the number of key/value pairs of the Map object.

map.keys() –> Returns an Iterator object containing the keys of each element in the Map object.

map.values() –> Returns a new Iterator object containing the value of each element in the Map object.

```typescript
for ( let i of Iterator ) or Iterator.next ( ) _
```

## interface

Interfaces are generally capitalized. tslint recommends prefixing with I,

```typescript
// The attribute can't be less, can't overflow
interface IPerson {
  firstName: string
  lastName: string
  sayHi: () => string
  run(): number
}
```

### Optional and read-only properties

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
why.age++ //Modify age and report an error Cannot assign to 'age' because it is a read-only property.
```

### Any type

index is just a placeholder

Any type can be less, can overflow

The type of any type must contain the type of the rest of the properties

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

### Union types and interfaces

```typescript
interface IRunOptions {
  program: string
  commandline: string[] | string | (() => string)
}
```

### Interfaces and arrays

```typescript
// index values can be numbers or strings
interface INamelist {
  [index: number]: string
}

interface ages {
  [key: string]: number // pseudo array
}
```

### Single interface inheritance

```typescript
interface Person {
  age: number
}

interface Musician extends Person {
  instrument: string
}
```

### Multiple interface inheritance

```typescript
interface IParent1 {
  v1: number
}

interface IParent2 {
  v2: number
}

// comma delimiter
interface Child extends IParent1, IParent2 {}
```

### Interface-oriented and type assertions

```typescript
interface IUser {
  name: string
  age: number
}

const user: IUser = {} // error issing the following properties

const user = {} as IUser // true
```

### Interfaces and functions

```typescript
// define two interfaces
interface IUser {
  name: string
  age: number
}
interface IUserFunc {
  (user: IUser): string
}
type IUserFunc = (user: IUser) => string

// Define a function type for the variable foo, and assign an anonymous function with a defined type to it
const foo: (name: string, age: number) => string = (name: string, age: number): string => {
  return `name : ${name} , age: ${age} `
}

// next
const foo: IUserFunc = user => {
  return `name : ${user.name} , age: ${user.age} `
}
```

Note the difference

```typescript
// a function that returns a string
interface IUserFunc {
  (): string
}
// An object, the object has the function foo, the return value is string
interface IUserFunc {
  foo(): string
}
```

### The class implements the interface

```typescript
// constructor still needs to define type restrictions, otherwise it still cannot be restricted
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

## kind

### class declaration

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

### class inheritance

Subclasses can inherit everything except the parent class's private members (methods and properties) and constructors. Can only inherit one at a time, but can inherit multiple times

```typescript
class User {
  name
  age
  constructor ( name : string , age : number ) {
    this . name = name
    this . age = age
}
  run (): void {}
}

class Student extends User {
  gender
  phone
  constructor ( name : string , age : number , gender : string , phone : number ) {
    super ( name , age )
    this.gender = gender _ _
    this . phone = phone
}
}
```

### Overriding of inherited classes

```typescript
class PrinterClass {
  doPrint(): void {
    // 'The doPrint() method of the parent class. '
  }
}

class StringPrinter extends PrinterClass {
  doPrint(): void {
    this.doPrint() // call its own doPrint Maximum call stack size exceeded
    super.doPrint() // call the function of the super class // 'The doPrint() method of the subclass. '
  }
}
```

### Keywords

static defines a method or property on a class whose name is essentially a function

readonly read-only property

public defaults to public

private can only be used in the defining class

protected can only be accessed in child parent classes

## object

Adding properties to objects in typescript will compile errors, because ts objects must be instances of a specific type,

```typescript
// pre-declared type template
// Oriented to a character index interface
var sites = {
  site1: 'Runoob' ,
  site2: 'Google' ,
  sayHello : function () {} // type template
}

sites.sayHello = function ( ) { }

sites.sayHello ( ) _
```

## Namespaces

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

## declaration file

When using third-party js in ts, the type checking function of ts cannot be used

Declaration files end with .d.ts

```typescript
//Use the declare keyword to define its type to help TypeScript determine whether the parameter type we passed in is correct
declare var jQuery: (selector: string) => any

jQuery('#foo')
```

### Structure

### Example

#### global variables

```typescript
declare let foo: number
```

#### global functions

```typescript
declare function greet(greeting: string): void
declare const greet: (greeting: string) => void
```

#### Namespaces

```typescript
// namespace is indispensable
// Accessing user.foo just wraps the declared type in a namespace
declare namespace user {
  const foo: string
  function bar(): void
  const why: () => void
}
```

#### Reusable Types

```typescript
// That is, when declaring, you can refer to other types
interface GreetingSettings {
  (): void
}

type GreetingSettings = () => void

declare function greet(setting: GreetingSettings): void
```

#### Spatial organization type

```typescript
declare namespace GreetingLib {
  interface LogOptions {
    verbose ?: boolean
}

  interface AlertOptions {
    modal : boolean
    title ?: string
    color ?: string
}
}
GreetingLib.LogOptions _ _

// nested namespaces
declare namespace GreetingLib.Options { _ _
  // Refer to via GreetingLib.Options.Log
  interface Log {
    verbose ?: boolean
}

  interface Alert {
    modal : boolean
    title ?: string
    color ?: string
}
}
```

#### class type

```typescript
declare class Greeter {
  constructor(greeting: string)

  greeting: string
  showGreeting(): void
}
```

#### Modules

```typescript
declare module runoob {
  export class Calc {
    doSum(limit: number): number
  }
}
```

#### interface

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

### Specification

Do not use types like `Number` , `String` , `Boolean` or `Objet`

Do not define a generic type whose type parameter is never used.

`void` should be set for callback functions whose return value is ignored

Don't use optional parameters in callbacks, _don't_ write different overloads for different number of callbacks

```typescript
/* mistake*/
// The getObject function passes in a callback function, this function does not use optional parameters
interface Fetcher {
  getObject(done: (data: any, elapsedTime?: number) => void): void
}

/* mistake*/
declare function beforeAll(action: () => void, timeout?: number): void
declare function beforeAll(action: (done: DoneFn) => void, timeout?: number): void
```

_Don't_ put generic overloads before precise overloads:

```typescript
/* mistake*/
declare function fn(x: any): any
declare function fn(x: HTMLElement): number
declare function fn(x: HTMLDivElement): string

var myElem: HTMLDivElement
var x = fn(myElem) // x: any, wat?
```

Use optionals and unions whenever possible

### In-depth

### Template

## project configuration

- When `tsc` is called without any input files , the compiler will start looking for the `tsconfig.json` file from the current directory,

- When an input file is specified on the command line, the `tsconfig.json` file is ignored.

- tsc --watch must have tsconfig.json tsc --init

- If file.include is not configured, all defaults in the recursive directory will be compiled into corresponding js default `.ts` , `.tsx` , and `.d.ts`

- `"files"` specifies a list containing relative or absolute file paths.

- The `"include"` and `"exclude"` attributes specify a list of file glob matching patterns

- "exclude" can filter "include" but not "files"

- Associated references are also included

- `@types` , `typeRoots` and `types`

- By default all _visible_ " `@types` " packages are included during compilation, `./node_modules/@types/` , `../node_modules/@types/` recursively, etc.

- If `typeRoots` is specified , _only_ packages under `typeRoots` will be included. for example:

```json
{
       "compilerOptions" : {
           "typeRoots" : [ "./typings" ] select paths
}
}
```

- If `types` is specified , only the listed packages will be included. for example:

```json
{
       "compilerOptions" : {
            "types" : [ "node" , "lodash" , "express" ] select package
}
}
```

- Use of types within namespaces

```typescript
export = QueryString
export as namespace qs

declare namespace QueryString {
  interface IUser {
    name: string
  }
} // main.ts

const obj: qs.IUser = {
  name: 'asd'
}

import QueryString = require('qs')

const obj: QueryString.IUser = {
  name: 'asd'
}
```

-compile options

```json
{
  "compilerOptions": {
    "target": "esnext", // generate js ECMAScript version
    "module": "esnext", // specify which module system code to generate
    "moduleResolution": "node", // decide how to handle modules. ?
    "strict": true, // Equivalent to enabling noImplicitAny, --noImplicitThis, --alwaysStrict, --strictNullChecks and --strictFunctionTypes and --strictPropertyInitialization.
    "forceConsistentCasingInFileNames": true, // Disallow inconsistent references to the same file.
    "allowSyntheticDefaultImports": true, // Allow default imports from modules that do not have default exports set. This does not affect the output of the code, it is only for type checking.
    "strictFunctionTypes": false, // Disable two-way covariance checking for function arguments.
    "jsx": "preserve", // Support JSX in .tsx files: "React" or "Preserve". Check out JSX.
    "baseUrl": ".", // Base directory for resolving non-relative module names.
    "allowJs": true, // Allow javascript files to be compiled.
    "sourceMap": true, // Generate the corresponding .map file.
    "esModuleInterop": true, // export = QueryString; export as namespace qs; can be used at the same time
    "resolveJsonModule": true, // Cannot find module './settings.json'. Consider using '--resolveJsonModule' to
    "noUnusedLocals": true, // throws an error if there are unused locals.
    "noUnusedParameters": true, // throws an error if there are unused parameters.
    "experimentalDecorators": true, // Enable experimental ES decorators.
    "lib": ["dom", "esnext"], // List of library files that need to be imported during compilation.
    "types": ["vite/client", "jest"],
    "typeRoots": ["./node_modules/@types/", "./types"],
    "noImplicitAny": false, // Error on expressions and declarations with implicit any type.
    "skipLibCheck": true, // Ignore type checking for all declaration files ( *.d.ts ).
    "paths": {
      // List of module names to baseUrl-based path mappings. See the module parsing documentation for details
      "/@/*": ["src/*"],
      "/#/*": ["types/*"]
    }
  },
  "include": [],
  "exclude": ["node_modules", "tests/server/**/*.ts", "dist", "**/*.js"]
}
```

## Generics

Do not specify the specific type in advance, but specify it when using it

```typescript
export {}
type IGetFunc = (... args : Array < number | string >) => ( number | string )[]

let getArr : IGetFunc

getArr = (... args ) => {
  const arr = []
  arr . push (... args )
  return arr
}

// use type assertion, function overloading, any is a bit of putting the cart before the horse
getArr ( 'foo' , 'bar' ) .forEach ( item => {
  item.length _ _ // error Property 'length' does not exist on type 'number'.
})
```

Declare \ < T > when declaring , specify the type when calling

```typescript
type IGetFunc = < T >(... args : Array < T >) => T []

let getArr : IGetFunc

getArr = (... args ) => {
  const arr = []
  arr . push (... args )
  return arr
}

getArr < string >( 'foo' , 'bar' ) .forEach ( item => {
  item.length _ _
})
```

If not specified manually, the type is automatically inferred

```typescript
getArr('foo', 'bar').forEach(item => {
  item.toFixed(1) // error // Property 'toFixed' does not exist on type 'string'. Did you mean 'fixed'
})
```

Generic parameters can specify multiple

```typescript
type Func = <T, U>(x: T, y: U) => [U, T]

let swap: Func = (x, y) => {
  return [y, x]
}

swap(1, '1') // ['1',1]
```

generic constraints

```typescript
type IFunc = < T extends string >( x : T ) => T

const foo : IFunc = x => {
  x.length _ _ // right T defaults to any, cannot access sting.length
  return x
}

foo ( 'foo' ) .length
```

generic extension interface

```typescript
// Restricts T to have the property length, instead of T being an object
interface Bar {
  length : number
}

function foo < T extends Bar >( x : T ): T {
  x.length _ _
  return x
}

foo ( 'foo' ) // ✔

foo ({ length: 233 }) // ✔
```

Constraints between multiple generic parameters

```typescript
// keyof is a keyword unique to ts when generics are defined
function foo<T, U extends keyof T>(obj: T, attr: U): T {
  return obj
}

const bar = {
  name: 'bar'
}

foo(bar, 'name')

foo(bar, 'age') // error Parameter of type '"age"' cannot be assigned to parameter of type '"name"'.
```

generic T default value

```typescript
// When not specified or cannot be speculated, the default value will be used
function foo<T = number>(x: T): T {
  return x
}
```

Generics and Interfaces

- Remember to figure out whether to declare or call

- \ < T > written in () is only the case for functions

- Use generics when declaring types with type and interface

- Use generics when declaring functions

- Before the formal parameter, or after the interface name

```typescript
// The second one needs to manually define the generic type error when oriented, misunderstood
interface Arr {
  <T>(...args: T[]): Array<T>
}

interface Arr<T> {
  (...args: T[]): Array<T>
  attr: T
}
```

```typescript
//The whole process is deduced by ts, and the type of T cannot be specified when facing this type
/ / Call the function for this type, you can specify the type of T
type Arr = < T >(... args : T []) => Array < T >

//When targeting this type, the type of T must be specified
/ / Call the function oriented to this type, the type of T cannot be specified
type Arr < T > = (... args : T []) => Array < T >
```

Generics and classes

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

## decorator

tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```

_Decorators_ are a special type of declaration that can be attached to [ class declarations ](https://www.tslang.cn/docs/handbook/decorators.html#class-decorators), [ methods ]( https://www.tslang.cn/docs/handbook/decorators.html#class-decorators ://www.tslang.cn/docs/handbook/decorators.html#method-decorators ), [ Accessor ](https://www.tslang.cn/docs/handbook/decorators.html#accessor-decorators), [ properties ](https://www.tslang.cn/docs/handbook/decorators.html#property-decorators) or [ parameters ]( https://www.tslang.cn/docs/handbook/decorators.html#parameter -decorators ).

Decorators use the form of `@expression` , `expression` must be a function after evaluation, it will be called at runtime, and the decorated declaration information is passed in as a parameter.

decorator factory is simply a function that returns an expression for the decorator to call at runtime.

```typescript
function color(value: string) {
  // This is a decorator factory
  return function (target) {
    // this is the decorator
    // do something with "target" and "value"...
  }
}
```

**Multiple decorator declarations**

1. The decorator expressions are evaluated in order from top to bottom.
2. The result of the evaluation will be treated as a function, which will be called sequentially from bottom to top.

**Sequential application of different declared decorators**

1. _parameter decorators_ , then _method decorators_ , _accessor decorators_ , or _property decorators_ in that order are applied to each instance member.
2. _parameter decorators_ , then _method decorators_ , _accessor decorators_ , or _property decorators_ in that order are applied to each static member.
3. _parameter decorator_ applied to the constructor.
4. _class decorators_ applied to classes.

Decorators cannot be used in declaration files ( `.d.ts` ), nor in any external context (such as `declare` classes).

### class decorator

The constructor of the class as its only parameter.

```typescript
// The Object.seal() method seals an object, preventing new properties from being added and marking all existing properties as non-configurable. The value of the current property can be changed as long as it was originally writable.
function sealed(constructor: Function) {
  Object.seal(constructor)
  Object.seal(constructor.prototype)
}

@sealed
class Greeter {}
```

class decorator factory

```typescript
function foo(params: string) {
  return (constructor: Function) => {
    params
    constructor
  }
}

@foo(' bar ')
class Foo {
  constructor() {}
}
```

### Method decorators

A method decorator expression is called at runtime as a function, passing in the following 3 arguments:

1. For static members, it is the constructor of the class, and for instance members, it is the prototype object of the class.
2. Member's name.
3. The member's _property descriptor_ .

### Accessor Decorator

It is not allowed to decorate both `get` and `set` accessors of a member. All decorations of a member must be applied to the first accessor in document order. Both the get accessor decorator expression will be called at runtime as a function, passing in the following 3 parameters:

1. For static members, it is the constructor of the class, and for instance members, it is the prototype object of the class.
2. Member's name.
3. The member's _property descriptor_ .

### property decorator

Property decorator expressions are called at runtime as functions, passing in the following 2 arguments:

1. For static members, it is the constructor of the class, and for instance members, it is the prototype object of the class.
2. Member's name.

### parameter decorator

### metadata

## Triple slash directive

A triple-slash directive is a single-line comment containing a single XML tag. The content of the comment will be used as a compiler directive.

A triple-slash directive _only_ can be placed at the very top of the file that contains it. Only single or multi-line comments can appear before a triple-slash directive, including other triple-slash directives. If they appear after a statement or declaration, they are treated as ordinary single-line comments and have no special meaning.

```typescript
/// < reference path = "..." />
The // directive is the most common type of triple-slash directive. It is used to declare dependencies between files.
```

```typescript
/// < reference types = "..." />
// For example, the introduction of /// <reference types="node" /> into the declaration file indicates that this file uses the name declared in @types/node/index.d.ts; and, this package needs to be compiled at the compile stage is included with the declaration file.
```

## remap

```typescript
// T extends Record<string, any> is limited to the index type, which is to judge the value assertion key
type FilterString<T extends Record<string, any>> = {
  [Key in keyof T as T[Key] extends string ? Key : never]: T[Key]
}
```

```typescript
// modify key
type Getters < T extends Record < any , any >> = {
[ Key in keyof T as `get ${ Capitalize < Key & string > } ` ]: T [ Key ];
}

type Person = {
  name : 'chenlicheng' ,
  age : 20 ,
  gender : true
}

type foo = Getters < Person > = type foo = {
    getName : "chenlicheng" ;
    getAge : 20 ;
    getGender : true ;
}
```

```typescript
// key, value exchange
type Flip < T extends Record < any , any >> = {
  T [ Key ]: Key // Cannot find name 'Key'.
}

type Flip < T extends Record < any , any >> = {
[ Key in keyof T as ` ${ T [ Key ] } ` ]: Key  // none `` none true
}

type foo = Flip < Person >
```

```typescript
type GetValueType<T> = T extends Promise<infer R> ? R : never

type foo = GetValueType<Promise<string>>
```

## Review

- tsc specifies the file, the compiler will not look for tsconfig.json

- Use esModule import and export instead of require

- strictNullChecks

When strict null checking is turned on, the cases that may be null or undefined must be specified manually

And `null` and `undefined` can only be assigned to `void` and each of them. (4.3 cannot be assigned to void)

```typescript
var foo: string[] | null

foo.length // error - 'foo' is possibly 'null'

foo!.length // okay - 'foo!' just has type 'string[]' // Assuming there is a value TypeScript thinks can be null or undefined, but you know its type better, you can use the ! suffix.
```

- (capital o) In other languages, the Object type has almost any effect, it allows you to assign any value, but you can't access the methods on it, even if it really has

```typescript
let prettySure: Object = 4

prettySure.toFixed() // Error: Property 'toFixed' doesn't exist on type 'Object'.
```

- (lowercase o) `object` represents a non-primitive type, that is, a type other than `number` , `string` , `boolean` , `symbol` , `null` or `undefined` .

- When you use JSX in TypeScript, only `as` syntax assertions are allowed.

- ```typescript
  // declares that the incoming object of foo has a name key type is string
  const foo = (user: { name: string }) => {}
  ```

const foo = ({ name : { foo } }) => {} // destructuring

````

- import type, export type is used to import d and export the interface, type, etc. of the .d.ts declaration file

- Instances of inherited classes and subclasses show implicit prototype objects / both subclasses show prototype objects that point to instances of parent classes

- super

  - constructor super() is the constructor of the exe parent class
  - In the public method of the subclass, the display prototype object pointed by super to the parent class is consistent with the location of the parent class method
  - In the static method of the subclass, super points to the parent class in the same position as the parent class method
  -Subclass this access method, first find its own display prototype object, and then find the parent class display prototype object

- private can modify constructor, then the class cannot be inherited and instantiated

- protected can modify the constructor, can be inherited, subclasses can be instantiated, but their own parent classes cannot be instantiated

- ```typescript
  type Record < K extends keyof any , T >= {
[ P in K ]: T
}

  // declares T and gives m
  declare type Recordable < T = any > = Record < string , T >
````

- ```typescript
  type Partial<T> = {
    [P in keyof T]?: T[P]
  }
  ```

````

- ```typescript
  type Partial < T > = {
[ P in keyof T ]?: T [ P ]
}

  interface CreateStorageParams {
    prefixKey : string
    storage : Storage
}

  // Convert all CreateStorageParams to optional types
  type Options = Partial < CreateStorageParams >
````

- ```typescript
  // Time-oriented temporary complement type
  interface Person {
    name: string
    age: number
  }
  ```

const obj : Person & { gender : string } = {     name: 'chenlichengg' ,     age: 18 ,     gender: 'male' }

````

- ```typescript
  // return boolean of type passed in
  function isNull ( val : unknown ): val is null {
    return val === null
}
````

- ```typescript
  // A T is required for InjectionKey, and provide restricts the T of the value according to the T of the first parameter, and infers it by itself
  interface InjectionKey<T> extends Symbol {}
  ```

export declare function provide < T >( key : InjectionKey < T > | string | number , value : T ): void

const key : InjectionKey < string > = Symbol ()

````

- ```typescript
  interface foo1 {
    name : string
}

  interface foo2 {
    age : number
}

  interface foo3 {
    gender : boolean
}

  type foo = foo1 & ( foo2 | foo3 )

  const bar : foo = {
    name: 'chenlicheng' ,
    age: 18 ,
    gender: true
}
  // bar must satisfy foo1, foo2, may or may not satisfy foo3, equivalent to optional
````

- ```typescript
  type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
  ```

export let i18n : ReturnType < typeof createI18n >

type ReturnType < T extends (... args : any ) => any > // restrict T to be a function

````

- ```typescript
  const num : number = 10

;( num as unknown as string ). split ( '' ) // Note that this is as statically checked as any
  // When num already has a type, it needs to be converted to any or unknown first
````

- unknow replaces the functionality of any while retaining the ability to statically check.

- not-null assertion operator

```typescript
function onClick(callback: () => void) {
  callback!() // The parameter is optional, add this exclamation mark! After that, TS compiles without error
}
```

- number separator

```typescript
let num: number = 1_2_345.6_78_9 // The compiled code does not have _
```

- keyof to use in to traverse

```typescript
  //keyof can get all key values of a type and return a union type, as follows:
  type Person = {
    name : string
    age : number
}

  type PersonKey = keyof Person // PersonKey gets type 'name' | 'age'
  A typical use of //keyof is to restrict the legalization of keys for accessing objects, since any indexing is not acceptable. i.e. extends keyof
```

-typeof \_

```typescript
  typeof Is to get the type of an object / instance , as follows :

  const me : Person = { name: 'gzx' , age: 16 };

  type P = typeof me ; // { name: string, age: number | undefined }

  const you : typeof me = { name: 'mabaoguo' , age: 69 } // can be compiled by
```

- Traverse properties in

```typescript
// in can only be used in the definition of the type, you can traverse the enumeration type, as follows:
// This type can convert any type of key value into a number type
type TypeToNumber<T> = {
  [key in keyof T]: number
}
```

- ```typescript
  // normal type definition
  type Dog<T> = { name: string; type: T } // Common type use, no default value must declare the type
  const dog: Dog<number> = { name: 'ww', type: 20 }
  ```

// class definition   class Cat < T > {     private type : T     constructor ( type : T ) {       this . type = type } }   // The class is used as a type definition. There is no default value. The type must be declared. When a new instance is used, it can be passed or automatically deduced, because a class can be used as a type, but a function cannot   const cat : Cat < number > = new Cat < number >( 20 ) // or shorthand const cat = new Cat(20)

// function definition   function swipe < T , U >( value : [ T , U ]): [ U , T ] {     return [ value [ 1 ], value [ 0 ]] }

// function use   swipe < Cat < number >, Dog < number >>([ cat , dog ]) // or shorthand swipe([cat, dog])

````

- ```typescript
  // generic constraints
  T extends keyof U
  // T is constrained to a union type composed of keys of type U

  // generic condition
  T extends keyof U ? X : Y
  // Judging whether, if true, T is of type X
````

- infer inference means that you do not need to pre-specify in the generic list, it will be automatically judged at runtime,

```typescript
type Foo<T> = T extends { t: infer Test } ? Test : string //It is preferred to look at the content after extends. {t: infer Test} can be regarded as a type definition containing the t attribute. The value type of this t attribute is inferred by infer and will be assigned to the Test type. If the actual parameter of the generic type conforms to The definition of {t: infer Test} then returns the Test type, otherwise it defaults to the default string type. For a better understanding:

type One = Foo<number> // string because number is not an object type containing t

type Two = Foo<{ t: boolean }> // boolean, because the generic parameter matches, the type corresponding to infer is used

type Three = Foo<{ a: number; t: () => void }> // () => void, the generic definition is a subset of the parameters, also adapted
```

- Generic tools

-Partial \_

```typescript
// for converting to optional
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

-Record \_

```typescript
// used to declare objects, string|number|symbol:???
type Record<K extends keyof any, T> = {
  [key in K]: T
}
```

- Pick The function of this tool is to extract the K key list in the T type and generate a new sub-key-value pair type.

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

const bird: Pick<Animal, 'name' | 'age'> = { name: 'bird', age: 1 }
```

- exclude

```typescript
    type language = 'ts' | never * // any type associates never with that type
    type Exclude < T , U > = T extends U ? never : T
    type T1 = Exclude < "a" | "b" | "c" , "a" | "b" >; // "c"

     T extends U ? T : never // Returns the intersection of T and U. did not return never
     T extends U ? never : T  // Returns the part where T and U do not intersect, and never returns
```

- Omit

```typescript
// The result of Omit is the opposite of Pick, which is not a union
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
```

- ReturnType

```typescript
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any // simplify
type ReturnType<T extends func> = T extends () => infer R ? R : any // Whether the generic condition T is a function, and the return value is stored in infer
```

- type or interface?

```typescript
  type Name = { name : string };
  interface IName { name : string };

  type Person = Name & { age : number };
  interface IPerson extends IName { age : number };
  // Expand to see the type is simple

  type I = string | number

  declare global {
      interface Window { MyNamespace : any ; }
}
  interface can be based on window Newly added property
```

- when to write .d.ts files

-The third-party library introduced through the script tag mounts some global methods,

- The third-party npm package used, but no declaration file is provided. If the third-party npm package provides a declaration file, it generally exists in two forms: one is `@types/xxx` , and the other is provided in the source code` .d.ts` declaration file. The first one is generally provided by some highly used libraries, which can be tried to install through `npm i @type/xxx` . If neither of these exist, then we need to define ourselves

-Excellent JS library or plug-in within its own team, in order to improve the development experience

-The declaration file of global variables mainly has the following syntaxes: The declaration file is only the definition of the type, and **assignment** cannot be performed .

```typescript
    declare let / const  // declare global variables
    declare function   // declare global method
    declare class      // declare global class
    declare enum       // declare the global enum type
    declare namespace  // declare the global object (with sub-properties)
    interface / type     // declare global type
```

- The declaration file of npm package mainly has the following syntax:

```typescript
    export const / let  // export variable
    export namespace  // export (with own properties) object
    export default    // ES6 default export
    export = // commonjs export module
```

-Expand original modules, global variables.

```typescript
// For modules or global variables that already have declaration definitions, they can be expanded by using declaration merging in TS.
// For example, some global variables mounted under window:
interface Window {
  readonly request?: any
  readonly devToolsExtension?: any
  readonly wx?: any
}
```

```typescript
// Expansion of existing modules
declare module 'querystring' {
  function escape(str: string): string
  function unescape(str: string): string
}
```

-Type protection: typeof instanceof in literal types, etc. divide the code into smaller code blocks, in which the type of the variable is determined

- The is keyword is used in the return value type of the function to judge whether the parameter is of a certain type, and return the corresponding boolean type according to the result, which is used for the judgment of the custom limit function
