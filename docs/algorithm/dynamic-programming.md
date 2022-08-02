# Dynamic programming

The basic idea behind dynamic programming is very simple. It is to divide a problem into sub-problems. Generally speaking, these sub-problems are very similar, so we can reduce the amount of computation by solving each sub-problem only once.

Once a solution to each subproblem is found, the result is stored for next use.

## Fibonacci sequence

The Fibonacci sequence starts with 0 and 1, and the following numbers are the sum of the first two numbers

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89....

So obviously, we can solve the Fibonacci sequence recursively.

```javascript
function fib(n) {
  if (n < 2 && n >= 0) return n
  return fib(n - 1) + fib(n - 2)
}

fib(10)
```

The above code has solved the problem perfectly. However, the above solution has serious performance problems. When n is larger, the time required increases exponentially. At this time, dynamic programming can be used to solve this problem.

The essence of dynamic programming is actually two points

- Bottom-up decomposition of subproblems
- store already computed solutions via variables

According to the above two points, the dynamic programming idea of ​​our Fibonacci sequence comes out

- The Fibonacci sequence starts at 0 and 1, so this is the bottom level of this subproblem
- Store the value of the Fibonacci sequence corresponding to each bit through an array

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

## 0 - 1 Knapsack Problem

The problem can be described as: Given a set of items, each item has its own weight and price, within the limited total weight, how do we choose to make the total price of the item the highest. Each question can only be placed at most once.

Suppose we have the following items

| Item ID / Weight | Value |
| :--------------: | :---: |
|        1         |   3   |
|        2         |   7   |
|        3         |  12   |

For a backpack with a total capacity of 5, we can put items of weights 2 and 3 to maximize the total value of the items in the backpack.

For this problem, there are two sub-problems, which are to put items and not to put items. The sub-problems can be understood through the following table

| Item ID / Remaining Capacity |  0  |  1  |  2  |  3  |  4  |  5  |
| :--------------------------: | :-: | :-: | :-: | :-: | :-: | :-: | --- |
|              1               |  0  |  3  |  3  |  3  |  3  |  3  | 3   |
|              2               |  0  |  3  |  7  | 10  | 10  | 10  |
|              3               |  0  |  3  |  7  | 12  | 15  | 19  |

- When the capacity is less than 3, only the data corresponding to the previous row is taken, because the current capacity cannot accommodate item 3
- When the capacity is 3, consider two cases, with item 3 and without item 3
  - Without item 3, the total value is 10
  - If you put item 3, the total value is 12, so you should put item 3
- When the capacity is 4, consider two cases, with item 3 and without item 3
  - Without item 3, the total value is 10
  - In the case of putting item 3, add the value of putting item 1 together, and the total value is 15, so you should put item 3
- When the capacity is 5, consider two cases, with item 3 and without item 3
  - Without item 3, the total value is 10
  - In the case of putting item 3, add the value of putting item 2 together, and the total value is 19, so you should put item 3

The following code is easier to understand by comparing the above table

```javascript
/**
 * @param {*} w item weight
 * @param {*} v item value
 * @param {*} C total capacity
 * @returns
 */
function knapsack(w, v, C) {
  let length = w.length
  if (length === 0) return 0
  // Compare the table, the generated two-dimensional array, the first dimension represents the item, and the second dimension represents the remaining capacity of the backpack
  // The element in the second dimension represents the total value of the backpack items
  let array = new Array(length).fill(new Array(C + 1).fill(null))
  // complete the solution to the bottom subproblem
  for (let i = 0; i <= C; i++) {
    // Compare the first row of the table, array[0] represents item 1
    // i represents the total remaining capacity
    // When the total remaining capacity is greater than the weight of item 1, record the total value of the backpack items, otherwise the value is 0
    array[0][i] = i >= w[0] ? v[0] : 0
  }
  // Solve the subproblems from the bottom up, starting with item 2
  for (let i = 1; i < length; i++) {
    for (let j = 0; j <= C; j++) {
      // Solve the sub-problems here, respectively not putting the current item and putting the current item
      // First find the total value of the backpack without putting the current item, the value here is the value corresponding to the previous row in the corresponding table
      array[i][j] = array[i - 1][j]
      // Determine whether the current remaining capacity can be put into the current item
      if (j >= w[i]) {
        // If you can put it in, it's the size
        // Put the current item or not put the current item, which backpack has a greater total value
        array[i][j] = Math.max(array[i][j], v[i] + array[i - 1][j - w[i]])
      }
    }
  }
  return array[length - 1][C]
}
```

`cell[i][j] = Math.max((cell[i-1][j])`The value of the current item + the value of the remaining space (the value of the remaining space of the previous cell))

```javascript
function findMaxTest() {
  const commodities = ['', 'guitar', 'sound', 'laptop', 'phone']
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
        // The current value comes from the previous one
        findMax(x - 1, y)
      } else {
        // The current value is derived from the maximum value of the difference between the self and the pounds backpacks[x][y] === (prices[x] + backpacks[x - 1][y - lbs[x]])
        console.log(commoditys[x], prices[x])
        findMax(x - 1, y - lbs[x]) // lbs difference
      }
    }
  }

  findMax(4, 4)
}

findMaxTest()
```

## Longest increasing subsequence

Longest increasing subsequence means finding the longest increasing number in a set of numbers, such as

0, 3, 4, 17, 2, 8, 6, 10

For the above string of numbers, the longest increasing subsequence is 0, 3, 4, 8, 10, which can be more clearly understood from the following table

| Numbers |  0  |  3  |  4  | 17  |  2  |  8  | 6   | 10  |
| :-----: | :-: | :-: | :-: | :-: | :-: | :-: | --- | --- |
| Length  |  1  |  2  |  3  |  4  |  2  |  4  | 4   | 5   |

Through the above table, you can clearly find a rule, find the number that is just smaller than the current number, and add one to the length of the small number. Find all the results to find the maximum value

The dynamic thinking solution to this problem is very simple, just go directly to the code

```javascript
function lis(n) {
  if (n.length === 0) return 0
  // Create an array of the same size as the parameter and fill it with 1
  let array = new Array(n.length).fill(1)
  // Start traversing at index 1, since the array is already filled with all 1s
  for (let i = 1; i < n.length; i++) {
    // traverse from index 0 to i
    // Determine if the value at index i is greater than the previous value
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
