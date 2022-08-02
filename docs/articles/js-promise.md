# JS - Promise usage

## 1. What is Promise

> A [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is an object representing the eventual completion or failure of an asynchronous operation.

From the official documentation we know

- Promise is a new object in ES6, a constructor
- It is used for multi-level asynchronous operations to be expressed in the process of synchronous operations, avoiding the hell of nested callback functions

### 1.1 The three states of Promise

- pending: The initial state, neither a success nor a failure state.
- fulfilled: means the operation completed successfully.
- rejected: means the operation failed.

What does it mean? The three states correspond to the three situations of asynchronous operation, such as sending an ajax request, when the initial wait is pending, the state is pending, when the ajax request is successful, the built-in function resolve() of Promise is called, Promise state => fulfilled, and the request fails When calling the function reject(), Promise status => rejected

## Second, the basic usage of Promise

> `var Promise: PromiseConstructor new <any>(executor: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void) => Promise<any>`

From a grammatical point of view, Promise is a constructor that needs to pass in a parameter executor function. The executor function will be called when the new Promise is called, and the executor function also has two parameters. resolve and reject, these two parameters are also functions, when calling resolve or reject , change the state of the promise to fulfilled or rejected, respectively. Promise state can only be unique

### 2.1 Basic use of Promise

Let's look at two examples

(1) Basic syntax

```javascript
var promise = new Promise((resolve, reject) => {
if (async request succeeded) {
resolve()
} else {
reject()
}
})

promise.then(
() => {
//success
},
() => {
//failure
}
)
```

(2) Use the timer setTimeout to simulate the success of the asynchronous request

```javascript
function ajax() {
  return new Promise(resolve => {
    setTimeout(resolve, 1000)
  })
}

ajax().then(() => {
  console.log('request success') //success
})
```

The above code indicates that if the asynchronous operation is successful, the resolve() method will be called, and the first callback function of the then() method of the Promise instance will be executed, and if it fails, the second callback function of the then() method will be called.

### 2.2 Passing parameters when Promise is used

Parameters can be passed when the resolve() and reject() functions are called, and the passed-in parameters will be captured by the then and catch methods of the Promise instance.

```javascript
var promise = new Promise((resolve, reject) => {
if (async request succeeded) {
resolve('success')
} else {
reject('error')
}
})

promise.then(res => {
res // success
})
// catch exception using catch() method
promise.catch(err => {
err // error
})
```

### 2.3 Promise chaining

The power of Promise lies in this. If an asynchronous request is sent and another asynchronous request is returned, it can be called in a chain.

```javascript
new Promise(resolve => {
  resolve(1)
})
  .then(res => {
    return new Promise(resolve => {
      resolve(res + 2)
    })
  })
  .then(res => {
    return new Promise(resolve => {
      resolve(res + 3)
    })
  })
  .then(res => {
    res // 6
  })
```

---

When the operation of returning the result res of an asynchronous request is simple, you can use Promise.resolve() as a shorthand

```javascript
new Promise(resolve => {
  resolve(1)
})
  .then(res => {
    return Promise.resolve(res + 2)
  })
  .then(res => {
    return Promise.resolve(res + 3)
  })
  .then(res => {
    res // 6
  })
```

---

There is also a simpler syntactic sugar

```javascript
new Promise(resolve => {
  resolve(1)
})
  .then(res => {
    return res + 2
  })
  .then(res => {
    return res + 3
  })
  .then(res => {
    res // 6
  })
```

### 2.4 Notes on chaining calls

Chaining is executed in order, and there are the following conventions. Pay more attention when using it.

- The callback function will not be called until the current round of the event loop is completed.
- callbacks added via then() after this will be called even if the async operation has completed (success or failure)
- Multiple callback functions can be added by calling then() multiple times, and they will be executed in the order of insertion

see the example below

```javascript
new Promise(resolve => {
  resolve()
})
  .then(() => {
    console.log('execute') // execute
  })
  .then(() => {
    console.log('execute') // execute
  })
  .then(() => {
    console.log('execute') // execute
  })
```

---

As long as resolve() is triggered once, all then on the chain will be called. Of course, if resolve is not called later, the operand will not be obtained.

```javascript
new Promise(resolve => {
  resolve()
})
  .then(() => {
    console.log('execute') // execute
  })
  .then(() => {
    console.log('execute') // execute
  })
  .catch(() => {
    console.log('execute') // no execute
  })
  .then(() => {
    console.log('execute') // execute
  })
```

---

Interspersed with catch(), the subsequent then will also be executed

```javascript
new Promise((resolve, reject) => {
  reject()
})
  .then(() => {
    console.log('execute') // no execute
  })
  .catch(() => {
    console.log('execute') // execute
  })
  .then(() => {
    console.log('execute') // execute
  })
```

---

```javascript
new Promise((resolve, reject) => {
  reject()
})
  .then(() => {
    console.log('execute') // no execute
  })
  .catch(() => {
    console.log('execute') // execute
  })
  .then(() => {
    console.log('execute') // execute
  })
```

The then after capturing reject() will be executed

---

```javascript
new Promise(resolve => {
  resolve()
})
  .then(() => {
    console.log('execute') // execute
    throw new Error()
  })
  .then(() => {
    console.log('execute') // no execute
  })
  .catch(() => {
    console.log('execute') // execute
  })
  .then(() => {
    console.log('execute') // execute
  })
```

---

There are many kinds of situations, how to understand it, see the following example

```javascript
const arr = ['foo', 'bar']
arr.forEach(async item => {
  const res = await new Promise(resolve => {
    resolve('why')
  }).then(res => {
    return res
  })
  console.log(res)
  console.log(item)
  // why, foo, why, bar
})
```

res will get the operand of Promise resolve() and output the result as why, foo, why, bar

---

The return res comment is found, and the result can still be output, which is equivalent to executing Promise.resolve(), and the same is true in catch().

```javascript
const arr = ['foo', 'bar']
arr.forEach(async item => {
  const res = await new Promise(resolve => {
    resolve('why')
  }).then(res => {
    // return res
    // Promise.resolve()
  })
  console.log(res)
  console.log(item)
  // undefined, foo, undefined, bar
})
```

Summary: after then(), catch() triggers, it will return an empty resolve()

## Three, Promise built-in method

### 3.1 Promise.all()

The Promise.all(iterable) method returns a Promise instance that calls back when all promises in the iterable iterator parameter are "resolved" or when the parameter does not contain a promise;

If one of the promises in the argument fails (rejected), the callback for this instance fails (reject), and the reason for the failure is the result of the first failed promise.

```javascript
var p1 = Promise.resolve('res1')
var p2 = Promise.resolve('res2')

Promise.all([p1, p2]).then(res => {
  res // ["res1", "res2"]
})
```

---

Catch exception result err for fast response

```javascript
var p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('err1')
  }, 1000)
})
var p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('err2')
  }, 2000)
})
Promise.all([p1, p2]).catch(err => {
  err //err1
})
```

### 3.2 Promise.race()

- The race function returns a Promise that will be fulfilled in the same manner as the first passed promise. It can either resolves or rejects, depending on which of the two is done first.
- If the passed iteration is empty, the returned promise will wait forever.
- If the iteration contains one or more non-promise values and/or resolved/rejected promises, Promise.race will resolve to the first value found in the iteration.

```javascript
var p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('res1')
  }, 3000)
})
var p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('err2')
  }, 2000)
})
Promise.race([p1, p2])
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err) //err2
  })
```

then, catch will only call one of the two, and depends on the response speed of the parameters in the iterator

### 3.3 Promise.allSettled()

The Promise.allSettled() method returns a promise that resolves after all given promises have been resolved or rejected, with an array of objects, each representing the corresponding promise result

```javascript
var p1 = Promise.resolve('res1')
var p2 = Promise.reject('res2')

Promise.allSettled([p1, p2]).then(res => {
  res // [{status: "fulfilled", value: "res1"},
  // {status: "rejected", reason: "res2"}]
})
```

Returns an array of objects containing the states and results of all the iterator's Promise parameters
