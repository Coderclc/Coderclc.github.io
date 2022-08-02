# JS - Class class

## First, the origin of the class

### 1.1 Factory function

The traditional way to generate instance objects in batches in ES5 is through factory functions

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

### 1.2 Constructor

Introduce the keyword new

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

Each Person instance has an independent run method, which is highly open up and can be added to the prototype of the Person function

```
Person.prototype.run=function(){
console.log(this.name + "running");
}
foo.run() // foo running
```

## Second, the class declaration

ES6 provides a way of writing that is closer to traditional languages, and introduces the concept of Class (class) as a template for objects. With the class keyword, classes can be defined.

### 2.1 Class keyword

Rewrite the above example with class

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  run() {
    console.log(this.name + 'running')
  }
}

var foo = new Person('foo', 18)
foo.run()
```

### 2.2 static keyword

All methods of a class are defined in the prototype property of the class.

The way an instance accesses a class definition is to access the method on the class prototype through \_\_proto\_\_

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

Person.prototype.run = () => {
  console.log(this.name + 'running')
}

var foo = new Person('foo', 18)
foo.__proto__.run()
```

Use the keyword static to mount a method to a class property

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  static run() {
    console.log(this.name + 'running')
  }
}

Person.run()
```

### 2.3 constructor method

The constructor method is the default method of the class, which is automatically called when an object instance is generated through the new command. A class must have a constructor method, if not explicitly defined, an empty constructor method will be added by default

```javascript
class Point {}

// Equivalent to
class Point {
  constructor() {}
}
```

Another object can be returned by return

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

### 2.4 getters and setters

Like ES5, the get and set keywords can be used inside a "class" to set a store-value function and a value-get function for a property, and intercept the access behavior of the property.

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

## Three, class matters

### 3.1 Strict Mode

Inside classes and modules, the default is strict mode, so there is no need to use use strict to specify the running mode. As long as your code is written in a class or module, only strict mode is available. Considering that all code in the future is actually running in modules, ES6 actually upgrades the entire language to strict mode.

### 3.2 No boost exists

Classes do not have variable hoisting (hoist), which is completely different from ES5.

```
new Foo(); // ReferenceError
class Foo {}
```

In the above code, the Foo class is used first and defined after, which will report an error, because ES6 will not lift the class declaration to the head of the code. The reason for this stipulation has to do with inheritance, which must ensure that the subclass is defined after the superclass.

### 3.3 name attribute

The name attribute of a class always returns the class name immediately following the class keyword.

```javascript
class Person {
  constructor() {}
}

Person.name // Person
```

### 3.4 Generator method

If a method is preceded by an asterisk (\*), it indicates that the method is a Generator function

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

The Symbol.iterator method returns a default iterator of class Foo, which is automatically called by the for...of loop.
