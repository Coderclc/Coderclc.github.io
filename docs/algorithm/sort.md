# Sort

## Bubble Sort

Swap the two, and put the larger one at the back. After the first sorting, the maximum value is already at the end of the array.

Because the two are exchanged, `n-1` sorting is required, such as 10 numbers, 9 sorting is required

```javascript
function bubbleSort(arr) {
  const len ​​= arr.length

  for (let i = 0; i < len - 1; i++) {
    // -1 The last one of each time does not need to be compared or j=1 compares j-1
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }

  return arr
}
```

If the sorting does not occur the first time, return directly

```javascript
function bubbleSort(arr) {
  let flag = 1
  const len ​​= arr.length

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        flag = 0
      }
    }

    if (flag) return arr
  }

  return arr
}
```

## Insertion sort

Insert an element into an ordered array, it is not known whether there is ordered data at the beginning, so the first element of the element is regarded as ordered

Compare with the ordered array, if it is larger than it, put it directly, if it is smaller than it, move the position of the array element to find a suitable position to insert

When there is only one number, there is no need to insert, so `n-1` sorting is required, such as 10 numbers, 9 sorting is required

```javascript
function insertSort(arr: number[]) {
  // The first number does not change, the rest are inserted
  for (let i = 1; i < arr.length; i++) {
    const tmp = arr[i]
    let j = i - 1

    while (arr[j] > tmp) {
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = tmp
  }
  return arr
}
```

```javascript
function insertSort(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j; j--) {
      if (arr[j - 1] > arr[j]) {
        ;[arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
      }
    }
  }
  return arr
}
```

## selection sort

Find the largest element in the array and exchange it with the last element of the array. When there is only one number, there is no need to select it, so `n-1` sorting is required, such as 10 numbers, 9 sorting is required

```javascript
function selectionSort(arr) {
  const len ​​= arr.length

  for (let i = 0; i < len - 1; i++) {
    let index = 0

    for (let j = 0; j < len - i; j++) {
      if (arr[j] > arr[index]) {
        index = j
      }
    }
    ;[arr[index], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[index]]
  }

  return arr
}
```

## quick sort

Iterative divide into three

```javascript
function quickSort(array) {
  let pivot = array[array.length - 1]
  let left = array.filter((v, i) => v <= pivot && i != array.length - 1)
  let right = array.filter(v => v > pivot)
  return [...quickSort(left), pivot, ...quickSort(right)]
}
```

In the end, there are only two kinds of [1,2,3]. The benchmark value is 2, and one sorting is successful. The benchmark value is 1 and then 23. The benchmark value is 3 and then 12.

```javascript
function partition(arr, left, right) {
  const pivot = left
  let j = pivot + 1

  // <= ? len -1
  // It is in reverse order and has been exchanged in place, j is len -1, the reference value is exchanged with the last
  // It is a positive sequence and does not enter the judgment, j-1 = pivot
  // The number equal to the base value will be placed to the right of the base value
  for (let i = j; i <= right; i++) {
    if (arr[pivot] > arr[i]) {
      swap(arr, i, j)
      j++
    }
  }

  swap(arr, pivot, j - 1)

  return j - 1
}

function swap(arr, i, j) {
  if (i !== j) {
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = partition(arr, left, right)
    quickSort(arr, left, pivotIndex - 1)
    quickSort(arr, pivotIndex + 1, right)
  }

  return arr
}
```

## Hill sort

- Hill sort is essentially an enhanced version of insertion sort

```javascript
function shellSort(arr) {
  var gap = Math.floor(arr.length / 2)

  while (gap) {
    for (var i = gap; i < arr.length; i++) {
      var j = i

      while (j > 0 && arr[j - gap] > arr[j]) {
        // eg eleven numbers, both gap = 5 0,6,11 socket
        // eg 4 numbers can't be sorted correctly when they are exchanged in pairs, and 2->4->6->8 can be achieved by inserting rows from small to large
        ;[arr[j], arr[j - gap]] = [arr[j - gap], arr[j]]
        j -= gap
      }
    }

    gap = Math.floor(gap / 2)
  }

  return arr
}
```

## Review

[leetcode](https://leetcode.cn/)

[nowcoder](https://hr.nowcoder.com/)

1. The sum of two numbers Hash table
2. Minimum difference of student scores Sort + sliding window
3. Number of palindromes
   - x and y are modified at the same time, x<y
   - Either x and y are the same number of digits, or y must be one more than x
4. The longest substring without repeating characters Change On\*m to On times ,left,right double pointer
5. Dichotomy of a single element in an ordered array Because mid>=left so left+1 mid =Math.floor((right - left) / 2) + left to prevent out of range Even^1 Odd^1 &1 Magical
6. Roman numerals to integers All enumeration
7. Integer to Roman numeral enumeration + decrement
8. After the longest common prefix ASCII sort, find the union of the first and the last
9. Valid parentheses take the stack in order
10. Remove duplicates in sorted array Fast and slow pointers
11. Removing Elements Dichotomy Dichotomy is faster than direct traversal
12. Implement StrStr KMP algorithm to find prefix function, BM algorithm
13. Find the central node of the star graph and read the question carefully
14. Search for insertion position Dichotomy judgment
15. Maximum subarray sum Find max Math.max MAX_SAFE_INTEGER ,min ....
16. The length of the last word while(i--)
17. Add one to save the carry
18. Binary summation save in
19. The square root of x is also judged by dichotomy
20. Verify the palindrome string ^\da-zA-Z write a regular expression
21. The best time to buy and sell stocks Find max
22. Numbers that only appear once
    - XOR any number with 0, the result is still the original number
    - XOR any number with itself, the result is 0
23. Majority element Moore voting method to find the mode - the consumption is not consumed by itself and the rest must be the mode
24. Excel table column serial number String.fromCharCode 'A'.charCodeAt(0)
25. Excel table column name Remainder range 0~25 The range of A is 1~26 %10 /10 so %26 /26
26. Happy Number Hash Cycle
27. Isomorphic String Double Hash Table (foo.has(x) && foo.get(x) !== y) || (bar.has(y) && bar.get(y) !== x)
28. There are duplicate elements Calculate the length comparison of the array
29. There are duplicate elements II hash table judgment
30. The first wrong version of the dichotomy judgment
31. Move zero double pointer [left,right] =[right,left]
32. Word Regularity Double Hash Table
33. The Nim game controls the remaining number to 1~3, which is a multiple of 4.
34. Reverse String [left,right] =[right,left]
35. Ransom letter new Array(26).fill(0) Statistics
36. Reverse only letters [...string]
37. The first unique character in a string
38. Find the difference
    - sum new Array.fill(0) traverse once -- after <0 is majority
    - Sum ASCII one + one -
    - bitwise operation 0^x = x x^x = 0
39. Judgment subsequence double pointer
40. Binary Watch
    - permutation _Anm_=*n*×(*n*−1)×(*n*−2)×…×(*n*−*m*+1)=_n_!/(*n*−*m* )!
    - Combination _Cnm_=_m_!_Anm_=_n_!/_m_!×(*n*−*m*)!
41. Find all the missing numbers in the array Pigeon coop method index is replaced with negative
42. Minimum number of operations make array elements equal make n-1 numbers plus 1 === make n numbers-1
43. Find the median of two positive-order arrays Find the median after merging the ordered arrays
44. Merge two ordered arrays to judge the size of double pointers,
45. The maximum perplexity of the exam Sliding window accumulates beyond k and moves to the left
46. ​​Disappearing numbers XOR
