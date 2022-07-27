# JS - Class 类

## 一、类的由来

### 1.1 工厂函数

ES5 时批量生成实例对象的传统方法是通过工厂函数

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

### 1.2 构造函数

引入关键字 new

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

每一个 Person 实例都有一个独立的 run 方法,高度开辟空间,可添加到 Person 函数的原型中

```
Person.prototype.run=function(){
  console.log(this.name +"running");
}
foo.run() // foo running
```

## 二、类的声明 

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过 class 关键字，可以定义类。

### 2.1 Class 关键字

用 class 改写上述例子

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  run() {
    console.log(this.name + ' running')
  }
}

var foo = new Person('foo', 18)
foo.run()
```

### 2.2 static 关键字

类的所有方法都定义在类的 prototype 属性上面。

实例访问类定义的方法是通过\_\_proto\_\_访问类原型上的方法

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

Person.prototype.run = () => {
  console.log(this.name + ' running')
}

var foo = new Person('foo', 18)
foo.__proto__.run()
```

可用关键字 static 将方法挂载到类的属性

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  static run() {
    console.log(this.name + ' running')
  }
}

Person.run()
```

### 2.3 constructor 方法

constructor 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。一个类必须有 constructor 方法，如果没有显式定义，一个空的 constructor 方法会被默认添加

```javascript
class Point {}

// 等同于
class Point {
  constructor() {}
}
```

可通过 return 返回另一个对象

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
    return {}
  }
}

var foo = new Person('foo', 18)
foo instanceof Person // false
```

### 2.4 getter 和 setter

与 ES5 一样，在“类”的内部可以使用 get 和 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```javascript
class Person {
  constructor() {}
  get name() {
    return 'foo'
  }
  set name(name) {
    console.log(name)
  }
}

var foo = new Person()
console.log(foo.name) // foo
foo.name = 'bar' // bar
```

## 三、类的事项

### 3.1 严格模式

类和模块的内部，默认就是严格模式，所以不需要使用 use strict 指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

### 3.2 不存在提升

类不存在变量提升（hoist），这一点与 ES5 完全不同。

```
new Foo(); // ReferenceError
class Foo {}
```

上面代码中，Foo 类使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部。这种规定的原因与继承有关，必须保证子类在父类之后定义。

### 3.3 name 属性

类的 name 属性总是返回紧跟在 class 关键字后面的类名。

```javascript
class Person {
  constructor() {}
}

Person.name // Person
```

### 3.4 Generator 方法

如果某个方法之前加上星号（\*），就表示该方法是一个 Generator 函数

```javascript
class Person {
  constructor(...args) {
    this.args = args
  }
  *[Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg
    }
  }
}

for (let x of new Foo('foo', 'bar')) {
  console.log(x)
}
// foo
// bar
```

Symbol.iterator 方法返回一个 Foo 类的默认遍历器，for...of 循环会自动调用这个遍历器。
