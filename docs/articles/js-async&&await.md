# JS - Async and Await

## One, async function

> An async function is a function declared with the async keyword

- Add the async keyword before the function name to indicate that there is an asynchronous operation inside the function
- async function returns a Promise object ([JS - Promise use](https://www.jianshu.com/p/5e6c528edfe1))

### 1.1 async function return value

Refactoring with async function return value feature

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

Catch failure and throw an exception

```javascript
async function foo() {
  if (async request succeeded) {
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

## Second, the await operator

> The await operator is used to wait for a Promise. It can only be used inside an async function.

- The await operator is used to wait for a Promise object.
- Can only be used in async functions.

### 2.1 await usage

1. When await encounters Promis, it will suspend the execution of async function and wait for the completion of Promise processing.
2. If the Promise is processed normally (fulfilled), the resolve function parameter of its callback is used as the value of the await expression, and the async function continues to be executed.
3. If the Promise handles exceptions (rejected), the await expression will throw the exception reason of the Promise.
4. If the value of the expression following the await operator is not a Promise, return the value itself.

#### 2.1.1 Suspend async function when encountering Promise

```javascript
async function foo() {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 2000)
  })
  console.log('execute after 2s')
}
foo()
```

#### 2.1.2 Promise resolve value as the return value of await

```javascript
async function foo() {
  var why = await Promise.resolve('success')
  why // success
}
foo()
```

#### 2.1.3 await throws Promise to handle exception

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

#### 2.1.4 Non-Promise objects directly return the corresponding value.

```javascript
async function foo() {
  var bar = await 'why'
  bar // why
}
foo()
```

### 2.2 Simple application of await combined with Node.js

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

Encapsulate the read-write file as a return Promise function, use the await keyword, wait for the read callback of the file to succeed, and then write the file to the collection.
