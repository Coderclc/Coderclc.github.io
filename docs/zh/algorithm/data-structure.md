# 数据结构

## 栈

**概念**

栈是⼀个线性结构，在计算机中是⼀个相当常⻅的数据结构。

栈的特点是只能在某⼀端添加或删除数据，遵循先进后出的原则

**实现**

每种数据结构都可以⽤很多种⽅式来实现，其实可以把栈看成是数组的⼀个⼦集，所以这⾥使⽤数组来实现

```javascript
class Stack {
  constructor() {
    this.stack = []
  }
  push(item) {
    this.stack.push(item)
  }
  pop() {
    this.stack.pop()
  }
  peek() {
    return this.stack[this.getCount() - 1]
  }
  getCount() {
    return this.stack.length
  }
  isEmpty() {
    return this.getCount() === 0
  }
}
```

**应⽤**

选取了 LeetCode 上序号为 20 的题⽬

题意是匹配括号，可以通过栈的特性来完成这道题⽬

```javascript
var isValid = function (s) {
  let map = {
    '(': -1,
    ')': 1,
    '[': -2,
    ']': 2,
    '{': -3,
    '}': 3
  }
  let stack = []
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] < 0) {
      stack.push(s[i])
    } else {
      let last = stack.pop()
      if (map[last] + map[s[i]] != 0) return false
    }
  }
  if (stack.length > 0) return false
  return true
}
```

## 队列

**概念**

队列⼀个线性结构，特点是在某⼀端添加数据，在另⼀端删除数据，遵循先进先出的原则。

**实现**

这⾥会讲解两种实现队列的⽅式，分别是单链队列和循环队列。

单链队列

```javascript
class Queue {
  constructor() {
    this.queue = []
  }
  enQueue(item) {
    this.queue.push(item)
  }
  deQueue() {
    return this.queue.shift()
  }
  getHeader() {
    return this.queue[0]
  }
  getLength() {
    return this.queue.length
  }
  isEmpty() {
    return this.getLength() === 0
  }
}
```

因为单链队列在出队操作的时候需要 O(n) 的时间复杂度，所以引⼊了循环队列。循环队列的出队操作平均是 O(1) 的时间复杂度。

循环队列

```javascript
class SqQueue {
  constructor(length) {
    this.queue = new Array(length + 1)
    // 队头
    this.first = 0
    // 队尾
    this.last = 0
    // 当前队列⼤⼩
    this.size = 0
  }
  enQueue(item) {
    // 判断队尾 + 1 是否为队头
    // 如果是就代表需要扩容数组
    // % this.queue.length 是为了防⽌数组越界
    if (this.first === (this.last + 1) % this.queue.length) {
      this.resize(this.getLength() * 2 + 1)
    }
    this.queue[this.last] = item
    this.size++
    this.last = (this.last + 1) % this.queue.length
  }
  deQueue() {
    if (this.isEmpty()) {
      throw Error('Queue is empty')
    }
    let r = this.queue[this.first]
    this.queue[this.first] = null
    this.first = (this.first + 1) % this.queue.length
    this.size--
    // 判断当前队列⼤⼩是否过⼩
    // 为了保证不浪费空间，在队列空间等于总⻓度四分之⼀时
    // 且不为 2 时缩⼩总⻓度为当前的⼀半
    if (this.size === this.getLength() / 4 && this.getLength() / 2 !== 0) {
      this.resize(this.getLength() / 2)
    }
    return r
  }
  getHeader() {
    if (this.isEmpty()) {
      throw Error('Queue is empty')
    }
    return this.queue[this.first]
  }
  getLength() {
    return this.queue.length - 1
  }
  isEmpty() {
    return this.first === this.last
  }
  resize(length) {
    let q = new Array(length)
    for (let i = 0; i < length; i++) {
      q[i] = this.queue[(i + this.first) % this.queue.length]
    }
    this.queue = q
    this.first = 0
    this.last = this.size
  }
}
```

## 链表

**概念**

链表是⼀个线性结构，同时也是⼀个天然的递归结构。链表结构可以充分利⽤计算机内存空间，实现灵活的内存动态管理。但是链表失去了数组随机读取的优点，同时链表由于增加了结点的指针域，空间开销⽐较⼤。

**实现**

单向链表

```javascript
class Node {
  constructor(v, next) {
    this.value = v
    this.next = next
  }
}
class LinkList {
  constructor() {
    // 链表⻓度
    this.size = 0
    // 虚拟头部
    this.dummyNode = new Node(null, null)
  }
  find(header, index, currentIndex) {
    if (index === currentIndex) return header
    return this.find(header.next, index, currentIndex + 1)
  }
  addNode(v, index) {
    this.checkIndex(index)
    // 当往链表末尾插⼊时，prev.next 为空
    // 其他情况时，因为要插⼊节点，所以插⼊的节点
    // 的 next 应该是 prev.next
    // 然后设置 prev.next 为插⼊的节点
    let prev = this.find(this.dummyNode, index, 0)
    prev.next = new Node(v, prev.next)
    this.size++
    return prev.next
  }
  insertNode(v, index) {
    return this.addNode(v, index)
  }
  addToFirst(v) {
    return this.addNode(v, 0)
  }
  addToLast(v) {
    return this.addNode(v, this.size)
  }
  removeNode(index, isLast) {
    this.checkIndex(index)
    index = isLast ? index - 1 : index
    let prev = this.find(this.dummyNode, index, 0)
    let node = prev.next
    prev.next = node.next
    node.next = null
    this.size--
    return node
  }
  removeFirstNode() {
    return this.removeNode(0)
  }
  removeLastNode() {
    return this.removeNode(this.size, true)
  }
  checkIndex(index) {
    if (index < 0 || index > this.size) throw Error('Index error')
  }
  getNode(index) {
    this.checkIndex(index)
    if (this.isEmpty()) return
    return this.find(this.dummyNode, index, 0).next
  }
  isEmpty() {
    return this.size === 0
  }
  getSize() {
    return this.size
  }
}
```

- 多个元素组成的列表
- 元素存储不连续，是用过 next 指针联系在一起的
- 增删数组 ->下标
- 增删链表 -> 改变.next
- 删除链表 替换成下一个删除的值,替换 next.next,不能直接将 this 修改为 this.next
- 反转

  - next.next = prev prev = next 指针迭代正序反转 eg 2 指向上一次村的 1 保存 2
  - return new head next.next.next = next next = null 函数递归到链表的尾部 eg 5 指向 4 ,打断 4 的 next

- 删除重复 迭代 判断 next.val === next.next.val? 相同改变指向,否则移动指针
- 环形链表

  - 哈希表
  - 龟兔赛跑 快慢指针,如果存在环形,那么快指针一定会追上慢指针

## 树

⼆叉树

树拥有很多种结构，⼆叉树是树中最常⽤的结构，同时也是⼀个天然的递归结构。

⼆叉树拥有⼀个根节点，每个节点⾄多拥有两个⼦节点，分别为：左节点和右节点。树的最底部节点称之为叶节点，当⼀颗树的叶数量数量为满时，该树可以称之为满⼆叉树。

⼆分搜索树

⼆分搜索树也是⼆叉树，拥有⼆叉树的特性。但是区别在于⼆分搜索树每个节点的值都⽐他的左⼦树的值⼤，⽐右⼦树的值⼩。

这种存储⽅式很适合于数据搜索。因为需要查找的值⽐根节点的值⼤，所以只需要在根节点的右⼦树上寻找，⼤⼤提⾼了搜索效率。

**实现**

```javascript
class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}
class BST {
  constructor() {
    this.root = null
    this.size = 0
  }
  getSize() {
    return this.size
  }
  isEmpty() {
    return this.size === 0
  }
  addNode(v) {
    this.root = this._addChild(this.root, v)
  }
  // 添加节点时，需要⽐较添加的节点值和当前
  // 节点值的⼤⼩
  _addChild(node, v) {
    if (!node) {
      this.size++
      return new Node(v)
    }
    if (node.value > v) {
      node.left = this._addChild(node.left, v)
    } else if (node.value < v) {
      node.right = this._addChild(node.right, v)
    }
    return node
  }
}
```

以上是最基本的⼆分搜索树实现，接下来实现树的遍历。

对于树的遍历来说，有三种遍历⽅法，分别是先序遍历、中序遍历、后序遍历。三种遍历的区别在于何时访问节点。在遍历树的过程中，每个节点都会遍历三次，分别是遍历到⾃⼰，遍历左⼦树和遍历右⼦树。如果需要实现先序遍历，那么只需要第⼀次遍历到节点时进⾏操作即可。

以下都是递归实现，如果你想学习⾮递归实现，

```javascript
// 先序遍历可⽤于打印树的结构
// 先序遍历先访问根节点，然后访问左节点，最后访问右节点。
preTraversal() {
 this._pre(this.root) }
_pre(node) {
 if (node) {
 console.log(node.value)
 this._pre(node.left)
 this._pre(node.right)
 }
}
// 中序遍历可⽤于排序
// 对于 BST 来说，中序遍历可以实现⼀次遍历就
// 得到有序的值
// 中序遍历表示先访问左节点，然后访问根节点，最后访问右节点。
midTraversal() {
 this._mid(this.root) }
_mid(node) {
 if (node) {
 this._mid(node.left)
 console.log(node.value)
 this._mid(node.right)
 }
}
// 后序遍历可⽤于先操作⼦节点
// 再操作⽗节点的场景
// 后序遍历表示先访问左节点，然后访问右节点，最后访问根节点。
backTraversal() {
 this._back(this.root) }
_back(node) {
 if (node) {
 this._back(node.left)
 this._back(node.right)
 console.log(node.value)
 }
}
```

以上的这⼏种遍历都可以称之为深度遍历，对应的还有种遍历叫做⼴度遍历，也就是⼀层层地遍历树。对于⼴度遍历来说，我们需要利⽤之前讲过的队列结构来完成。

```javascript
breadthTraversal() {
 if (!this.root) return null
 let q = new Queue()
 // 将根节点⼊队
 q.enQueue(this.root)
 // 循环判断队列是否为空，为空
 // 代表树遍历完毕
 while (!q.isEmpty()) {
 // 将队⾸出队，判断是否有左右⼦树
 // 有的话，就先左后右⼊队
 let n = q.deQueue()
 console.log(n.value)
 if (n.left) q.enQueue(n.left)
 if (n.right) q.enQueue(n.right)
 }
}
```

接下来先介绍如何在树中寻找最⼩值或最⼤数。因为⼆分搜索树的特性，所以最⼩值⼀定在根节点的最左边，最⼤值相反

```javascript
getMin() {
 return this._getMin(this.root).value
}
_getMin(node) {
 if (!node.left) return node
 return this._getMin(node.left) }
getMax() {
 return this._getMax(this.root).value
}
_getMax(node) {
 if (!node.right) return node
 return this._getMin(node.right) }
```

向上取整和向下取整，这两个操作是相反的，所以代码也是类似的，这⾥只介绍如何向下取整。既然是向下取整，那么根据⼆分搜索树的特性，值⼀定在根节点的左侧。只需要⼀直遍历左⼦树直到当前节点的值不再⼤于等于需要的值，然后判断节点是否还拥有右⼦树。如果有的话，继续上⾯的递归判断。

```javascript
floor(v) {
 let node = this._floor(this.root, v)
 return node ? node.value : null
}
_floor(node, v) {
 if (!node) return null
 if (node.value === v) return v
 // 如果当前节点值还⽐需要的值⼤，就继续递归
 if (node.value > v) {
 return this._floor(node.left, v)
 }
 // 判断当前节点是否拥有右⼦树
 let right = this._floor(node.right, v)
 if (right) return right
 return node
}
```

排名，这是⽤于获取给定值的排名或者排名第⼏的节点的值，这两个操作也是相反的，所以这个只介绍如何获取排名第⼏的节点的值。对于这个操作⽽⾔，我们需要略微的改造点代码，让每个节点拥有⼀个 size 属性。该属性表示该节点下有多少⼦节点（包含⾃身）。

```javascript
class Node {
 constructor(value) {
 this.value = value
 this.left = null
 this.right = null
 // 修改代码
 this.size = 1
 }
}
// 新增代码
_getSize(node) {
 return node ? node.size : 0 }
_addChild(node, v) {
 if (!node) {
 return new Node(v)
 }
 if (node.value > v) {
 // 修改代码
 node.size++
 node.left = this._addChild(node.left, v)
 } else if (node.value < v) {
 // 修改代码
 node.size++
 node.right = this._addChild(node.right, v)
 }
 return node
}
select(k) {
 let node = this._select(this.root, k)
 return node ? node.value : null
}
_select(node, k) {
 if (!node) return null
 // 先获取左⼦树下有⼏个节点
 let size = node.left ? node.left.size : 0
 // 判断 size 是否⼤于 k
 // 如果⼤于 k，代表所需要的节点在左节点
 if (size > k) return this._select(node.left, k)
 // 如果⼩于 k，代表所需要的节点在右节点
 // 注意这⾥需要重新计算 k，减去根节点除了右⼦树的节点数量
 if (size < k) return this._select(node.right, k - size - 1)
 return node
}
```

- 接下来讲解的是⼆分搜索树中最难实现的部分：删除节点。因为对于删除节点来说，会存在以下⼏种情况
  - 需要删除的节点没有⼦树
  - 需要删除的节点只有⼀条⼦树
  - 需要删除的节点有左右两条树

对于前两种情况很好解决，但是第三种情况就有难度了，所以先来实现相对简单的操作：删除最⼩节点，对于删除最⼩节点来说，是不存在第三种情况的，删除最⼤节点操作是和删除最⼩节点相反的，所以这⾥也就不再赘述。

```javascript
delectMin() {
 this.root = this._delectMin(this.root)
 console.log(this.root) }
_delectMin(node) {
 // ⼀直递归左⼦树
 // 如果左⼦树为空，就判断节点是否拥有右⼦树
 // 有右⼦树的话就把需要删除的节点替换为右⼦树
 if ((node != null) & !node.left) return node.right
 node.left = this._delectMin(node.left)
 // 最后需要重新维护下节点的 `size`
 node.size = this._getSize(node.left) + this._getSize(node.right) + 1
 return node
}
```

最后讲解的就是如何删除任意节点了。对于这个操作，T.Hibbard 在 1962 年提出了解决这个难题的办法，也就是如何解决第三种情况。当遇到这种情况时，需要取出当前节点的后继节点（也就是当前节点右⼦树的最⼩节点）来替换需要删除的节点。然后将需要删除节点的左⼦树赋值给后继结点，右⼦树删除后继结点后赋值给他。

你如果对于这个解决办法有疑问的话，可以这样考虑。因为⼆分搜索树的特性，⽗节点⼀定⽐所有左⼦节点⼤，⽐所有右⼦节点⼩。那么当需要删除⽗节点时，势必需要拿出⼀个⽐⽗节点⼤的节点来替换⽗节点。这个节点肯定不存在于左⼦树，必然存在于右⼦树。然后⼜需要保持⽗节点都是⽐右⼦节点⼩的，那么就可以取出右⼦树中最⼩的那个节点来替换⽗节点。

```javascript
delect(v) {
 this.root = this._delect(this.root, v) }
_delect(node, v) {
 if (!node) return null
 // 寻找的节点⽐当前节点⼩，去左⼦树找
 if (node.value < v) {
 node.right = this._delect(node.right, v)
 } else if (node.value > v) {
 // 寻找的节点⽐当前节点⼤，去右⼦树找
 node.left = this._delect(node.left, v)
 } else {
 // 进⼊这个条件说明已经找到节点
 // 先判断节点是否拥有拥有左右⼦树中的⼀个
 // 是的话，将⼦树返回出去，这⾥和 `_delectMin` 的操作⼀样
 if (!node.left) return node.right
 if (!node.right) return node.left
 // 进⼊这⾥，代表节点拥有左右⼦树
 // 先取出当前节点的后继结点，也就是取当前节点右⼦树的最⼩值
 let min = this._getMin(node.right)
 // 取出最⼩值后，删除最⼩值
 // 然后把删除节点后的⼦树赋值给最⼩值节点
 min.right = this._delectMin(node.right)
 // 左⼦树不动
 min.left = node.left
 node = min
 }
 // 维护 size
 node.size = this._getSize(node.left) + this._getSize(node.right) + 1
 return node
}
```
