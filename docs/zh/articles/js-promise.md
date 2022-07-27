# JS - Promise 使用

## 一、什么是 Promise

> A [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is an object representing the eventual completion or failure of an asynchronous operation.

从官方文档我们可知

- Promise 是 ES6 新增的一个对象,一个构造函数
- 用于多层次异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数地狱

### 1.1 Promise 的三种状态

- pending: 初始状态，既不是成功，也不是失败状态。
- fulfilled: 意味着操作成功完成。
- rejected: 意味着操作失败。

什么意思呢?三种状态对应异步操作的三种情况,比如发送一次 ajax 请求,初始等待时,状态为 pending,ajax 请求成功时,调用 Promise 内置函数 resolve(), Promise 状态 => fulfilled,请求失败时,调用函数 reject(),Promise 状态 => rejected

## 二、Promise 基本用法

> `var Promise: PromiseConstructor new <any>(executor: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void) => Promise<any>`

从语法上来看,Promise 是一个构造函数,需要传入一个参数 executor 函数. new Promise 时会调用 executor 函数， executor 函数也有两个参数.resolve 和 reject,这两个参数也是函数,调用 resolve 或 reject 时，分别将 promise 的状态改为 fulfilled（完成）或 rejected（失败）。Promise 状态只能唯一

### 2.1 Promise 基本使用

下面来看两个例子

(1) 基本语法

```javascript
var promise = new Promise((resolve, reject) => {
  if (异步请求成功) {
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

(2) 用定时器 setTimeout 模拟异步请求成功

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

上面代码表示，如果异步操作成功，就调用 resolve()方法,就会执行 Promise 实例 then()方法的第一个回调函数,如果失败则调用 then()方法的第二个回调函数.

### 2.2 Promise 使用时传参

resolve()和 reject()函数调用时可传参,传入的参数会被 Promise 实例 then 和 catch 方法捕获.

```javascript
var promise = new Promise((resolve, reject) => {
  if (异步请求成功) {
    resolve('success')
  } else {
    reject('error')
  }
})

promise.then(res => {
  res // success
})
//捕获异常可用catch()方法
promise.catch(err => {
  err // error
})
```

### 2.3 Promise 链式调用

Promise 强大的地方在于此,如果发送一个异步请求,又返回另外一个异步请求时,可用链式调用

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

当对异步请求返回结果 res 的操作简单操作时,可用 Promise.resolve()简写

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

还有一种更简单的语法糖

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

### 2.4 链式调用注意事项

链式调用（chaining）按序执行,有以下约定,使用时要多注意.

- 在本轮   事件循环运行完成之前，回调函数是不会被调用的。
- 即使异步操作已经完成（成功或失败），在这之后通过  then()添加的回调函数也会被调用
- 通过多次调用 then() 可以添加多个回调函数，它们会按照插入顺序执行

看下面的例子

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

只要触发了一次 resolve(),链上的所有 then 都会被调用,当然后面的没有调用 resolve 自然拿不到操作数.

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

中间穿插 catch(),其后的 then 也会被执行

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

捕获 reject()后的 then 会被执行

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

情况有很多种,怎么去理解呢,看下面这个例子

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
  // why、foo、why、bar
})
```

res 会拿到 Promise resolve()的操作数输出结果为 why、foo、why、bar

---

把 return res 注释发现,仍然可以输出结果,相当于执行了 Promise.resolve(),catch()中同理

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
  // undefined、foo、undefined、bar
})
```

总结 :then(),catch()触发后,会返回一个空的 resolve()

## 三、Promise 内置方法

### 3.1 Promise.all()

Promise.all(iterable) 方法返回一个 Promise 实例，此实例在 iterable 迭代器 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；

如果参数中 promise 有一个失败（rejected），此实例回调失败（reject），失败的原因是第一个失败 promise 的结果。

```javascript
var p1 = Promise.resolve('res1')
var p2 = Promise.resolve('res2')

Promise.all([p1, p2]).then(res => {
  res // ["res1", "res2"]
})
```

---

捕获异常结果 err 为响应速度快的

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

- race 函数返回一个 Promise，它将与第一个传递的 promise 相同的完成方式被完成。它可以是完成（ resolves），也可以是失败（rejects），这要取决于第一个完成的方式是两个中的哪个。
- 如果传的迭代是空的，则返回的 promise 将永远等待。
- 如果迭代包含一个或多个非承诺值和/或已解决/拒绝的承诺，则 Promise.race 将解析为迭代中找到的第一个值。

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

then,catch 只会调用二者其一,并且取决于迭代器中参数的响应速度

### 3.3 Promise.allSettled()

Promise.allSettled()方法返回一个在所有给定的 promise 已被决议或被拒绝后决议的 promise，并带有一个对象数组，每个对象表示对应的 promise 结果

```javascript
var p1 = Promise.resolve('res1')
var p2 = Promise.reject('res2')

Promise.allSettled([p1, p2]).then(res => {
  res // [{status: "fulfilled", value: "res1"},
  //  {status: "rejected", reason: "res2"}]
})
```

返回一个对象数组,包含 iterator 所有参数 Promise 的状态和结果
