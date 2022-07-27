# JS - async 和 await

## 一、async 函数

> An async function is a function declared with the async keyword

- 函数名之前加上 async 关键字，就表明该函数内部有异步操作
- async 函数返回一个 Promise 对象([JS - Promise 使用](https://www.jianshu.com/p/5e6c528edfe1))

### 1.1 async 函数返回值

可用 async 函数返回值特性重构

```javascript
function foo() {
  return new Promise(resolve => {
    resolve('success')
  })
}

async function bar() {
  return 'success'
}

foo().then(res => {
  res // success
})

bar().then(res => {
  res // success
})
```

---

捕获失败抛出异常即可

```javascript
async function foo() {
  if (异步请求成功) {
    return 'success'
  } else {
    throw 'error'
  }
}
foo()
  .then(res => {
    res // success
  })
  .catch(err => {
    err // error
  })
```

## 二、await 操作符

> The await operator is used to wait for a Promise. It can only be used inside an async function.

- await 操作符用于等待一个 Promise 对象。
- 只能在异步函数 async function 中使用。

### 2.1 await 用法

1. await 遇到 Promis 时会暂停 async function 的执行，等待 Promise 处理完成。
2. 若 Promise 正常处理(fulfilled)，其回调的 resolve 函数参数作为 await 表达式的值，继续执行 async function。
3. 若 Promise 处理异常(rejected)，await 表达式会把 Promise 的异常原因抛出。
4. 如果 await 操作符后的表达式的值不是一个 Promise，则返回该值本身。

#### 2.1.1 遇到 Promise 暂停 async 函数

```javascript
async function foo() {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 2000)
  })
  console.log('2s后执行')
}
foo()
```

#### 2.1.2 Promise resolve 的值作为 await 的返回值

```javascript
async function foo() {
  var why = await Promise.resolve('success')
  why // success
}
foo()
```

#### 2.1.3 await 抛出 Promise 处理异常

```javascript
async function foo() {
  try {
    await Promise.reject('error')
    // Uncaught (in promise) error
  } catch (err) {
    err // error
  }
}
foo()
```

#### 2.1.4 非 Promise 对象直接返回对应的值。

```javascript
async function foo() {
  var bar = await 'why'
  bar // why
}
foo()
```

### 2.2 await 结合 Node.js 简单应用

```javascript
const fs = require("fs")

type IRead = (path: string) => void
type IWrite = (path: string, content: string, flag: string) => void

const readFile: IRead = (path) => {
  return new Promise((resolve) => {
    fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
      if (!err) resolve(data)
    })
  })
}
const writeFile: IWrite = (path, content, flag) => {
  return new Promise((resolve) => {
    fs.writeFile(path, content, { flag, encoding: "utf-8" }, (err) => {
      if (!err) resolve()
    })
  })
}

fs.readdir("../NODE", (err, files) => {
  if (err) return
  files.forEach(async (item) => {
    let content = await readFile(item)
    await writeFile("integration.text", content as any as string,"a+")
    console.log("Write succeeded")
  })
})

```

将读写文件封装为返回 Promise 函数,用 await 关键字,等待文件的读取回调成功以后,再将文件写入集合.
