# 动态规划

动态规划背后的基本思想⾮常简单。就是将⼀个问题拆分为⼦问题，⼀般来说这些⼦问题都是⾮常相似的，那么我们可以通过只解决⼀次每个⼦问题来达到减少计算量的⽬的。

⼀旦得出每个⼦问题的解，就存储该结果以便下次使⽤。

## 斐波那契数列

斐波那契数列就是从 0 和 1 开始，后⾯的数都是前两个数之和

0，1，1，2，3，5，8，13，21，34，55，89....

那么显然易⻅，我们可以通过递归的⽅式来完成求解斐波那契数列

```javascript
function fib(n) {
  if (n < 2 && n >= 0) return n
  return fib(n - 1) + fib(n - 2)
}

fib(10)
```

以上代码已经可以完美的解决问题。但是以上解法却存在很严重的性能问题，当 n 越⼤的时候，需要的时间是指数增⻓的，这时候就可以通过动态规划来解决这个问题。

动态规划的本质其实就是两点

- ⾃底向上分解⼦问题
- 通过变量存储已经计算过的解

根据上⾯两点，我们的斐波那契数列的动态规划思路也就出来了

- 斐波那契数列从 0 和 1 开始，那么这就是这个⼦问题的最底层
- 通过数组来存储每⼀位所对应的斐波那契数列的值

```javascript
function fib(n) {
  let array = new Array(n + 1).fill(null)
  array[0] = 0
  array[1] = 1
  for (let i = 2; i <= n; i++) {
    array[i] = array[i - 1] + array[i - 2]
  }
  return array[n]
}
fib(10)
```

## 0 - 1 背包问题

该问题可以描述为：给定⼀组物品，每种物品都有⾃⼰的重量和价格，在限定的总重量内，我们如何选择，才能使得物品的总价格最⾼。每个问题只能放⼊⾄多⼀次。

假设我们有以下物品

| 物品 ID / 重量 | 价值 |
| :------------: | :--: |
|       1        |  3   |
|       2        |  7   |
|       3        |  12  |

对于⼀个总容量为 5 的背包来说，我们可以放⼊重量 2 和 3 的物品来达到背包内的物品总价值最⾼。

对于这个问题来说，⼦问题就两个，分别是放物品和不放物品，可以通过以下表格来理解⼦问题

| 物品 ID / 剩余容量 |  0  |  1  |  2  |  3  |  4  |  5  |
| :----------------: | :-: | :-: | :-: | :-: | :-: | :-: |
|         1          |  0  |  3  |  3  |  3  |  3  |  3  |
|         2          |  0  |  3  |  7  | 10  | 10  | 10  |
|         3          |  0  |  3  |  7  | 12  | 15  | 19  |

- 当容量少于 3 时，只取上⼀⾏对应的数据，因为当前容量不能容纳物品 3
- 当容量 为 3 时，考虑两种情况，分别为放⼊物品 3 和不放物品 3
  - 不放物品 3 的情况下，总价值为 10
  - 放⼊物品 3 的情况下，总价值为 12，所以应该放⼊物品 3
- 当容量 为 4 时，考虑两种情况，分别为放⼊物品 3 和不放物品 3
  - 不放物品 3 的情况下，总价值为 10
  - 放⼊物品 3 的情况下，和放⼊物品 1 的价值相加，得出总价值为 15，所以应该放⼊ 物品 3
- 当容量 为 5 时，考虑两种情况，分别为放⼊物品 3 和不放物品 3
  - 不放物品 3 的情况下，总价值为 10
  - 放⼊物品 3 的情况下，和放⼊物品 2 的价值相加，得出总价值为 19，所以应该放⼊物品 3

以下代码对照上表更容易理解

```javascript
/**
 * @param {*} w 物品重量
 * @param {*} v 物品价值
 * @param {*} C 总容量
 * @returns
 */
function knapsack(w, v, C) {
  let length = w.length
  if (length === 0) return 0
  // 对照表格，⽣成的⼆维数组，第⼀维代表物品，第⼆维代表背包剩余容量
  // 第⼆维中的元素代表背包物品总价值
  let array = new Array(length).fill(new Array(C + 1).fill(null))
  // 完成底部⼦问题的解
  for (let i = 0; i <= C; i++) {
    // 对照表格第⼀⾏， array[0] 代表物品 1
    // i 代表剩余总容量
    // 当剩余总容量⼤于物品 1 的重量时，记录下背包物品总价值，否则价值为 0
    array[0][i] = i >= w[0] ? v[0] : 0
  }
  // ⾃底向上开始解决⼦问题，从物品 2 开始
  for (let i = 1; i < length; i++) {
    for (let j = 0; j <= C; j++) {
      // 这⾥求解⼦问题，分别为不放当前物品和放当前物品
      // 先求不放当前物品的背包总价值，这⾥的值也就是对应表格中上⼀⾏对应的值
      array[i][j] = array[i - 1][j]
      // 判断当前剩余容量是否可以放⼊当前物品
      if (j >= w[i]) {
        // 可以放⼊的话，就⽐⼤⼩
        // 放⼊当前物品和不放⼊当前物品，哪个背包总价值⼤
        array[i][j] = Math.max(array[i][j], v[i] + array[i - 1][j - w[i]])
      }
    }
  }
  return array[length - 1][C]
}
```

`cell[i][j] = Math.max((cell[i-1][j])`当前商品的价值+剩余空间的价值(上一个单元格的剩余空间价值))

```javascript
function findMaxTest() {
  const commoditys = ['', 'guitar', 'sound', 'laptop', 'phone']
  const lbs = [0, 1, 4, 3, 1]
  const prices = [0, 1500, 3000, 2000, 2000]
  const backpacks = Array.from(new Array(5), () => new Array(5).fill(0))

  for (let x = 1; x <= 4; x++) {
    for (let y = 1; y <= 4; y++) {
      const previousPrice = backpacks[x - 1][y]

      if (lbs[x] > y) {
        backpacks[x][y] = previousPrice
      } else {
        const currentPrice = prices[x] + backpacks[x - 1][y - lbs[x]]
        backpacks[x][y] = Math.max(previousPrice, currentPrice)
      }
    }
  }

  function findMax(x, y) {
    if (x) {
      if (backpacks[x][y] === backpacks[x - 1][y]) {
        // 当前的价值由上一个来
        findMax(x - 1, y)
      } else {
        // 当前价值由自身加磅数差最大值而来 backpacks[x][y] === (prices[x] + backpacks[x - 1][y - lbs[x]])
        console.log(commoditys[x], prices[x])
        findMax(x - 1, y - lbs[x]) // 磅数差
      }
    }
  }

  findMax(4, 4)
}

findMaxTest()
```

## 最⻓递增⼦序列

最⻓递增⼦序列意思是在⼀组数字中，找出最⻓⼀串递增的数字，⽐如

0, 3, 4, 17, 2, 8, 6, 10

对于以上这串数字来说，最⻓递增⼦序列就是 0, 3, 4, 8, 10，可以通过以下表格更清晰的理解

| 数字 |  0  |  3  |  4  | 17  |  2  |  8  | 6   | 10  |
| :--: | :-: | :-: | :-: | :-: | :-: | :-: | --- | --- |
| 长度 |  1  |  2  |  3  |  4  |  2  |  4  | 4   | 5   |

通过以上表格可以很清晰的发现⼀个规律，找出刚好⽐当前数字⼩的数，并且在⼩的数组成的⻓度基础上加⼀。既求出所有结果找最大值

这个问题的动态思路解法很简单，直接上代码

```javascript
function lis(n) {
  if (n.length === 0) return 0
  // 创建⼀个和参数相同⼤⼩的数组，并填充值为 1
  let array = new Array(n.length).fill(1)
  // 从索引 1 开始遍历，因为数组已经所有都填充为 1 了
  for (let i = 1; i < n.length; i++) {
    // 从索引 0 遍历到 i
    // 判断索引 i 上的值是否⼤于之前的值
    for (let j = 0; j < i; j++) {
      if (n[i] > n[j]) {
        array[i] = Math.max(array[i], 1 + array[j])
      }
    }
  }
  let res = 1
  for (let i = 0; i < array.length; i++) {
    res = Math.max(res, array[i])
  }
  return res
}
```
