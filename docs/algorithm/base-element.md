# Basic elements

## time complexity

The time complexity of an algorithm is a function, and the time complexity is usually expressed in O notation

- ![[Formula]](https://www.zhihu.com/equation?tex=O%281%29) The running time has nothing to do with the input size, it is calculated in a fixed time. For example, four arithmetic operations.

- ![[Formula]](https://www.zhihu.com/equation?tex=O%28log%28N%29%29) Every time I provide twice as much wheat, he only consumes one more grid! [[Formula]](https://www.zhihu.com/equation?tex=O%28N%29) It's closer! [[Formula]](https://www.zhihu.com/equation?tex= O%281%29) Each time the operation is performed, the scale to be processed is half smaller. Both binary search![[Formula]](https://www.zhihu.com/equation?tex=O%28N%29) : As the input size increases, the running time increases linearly.

- ![[Formula]](https://www.zhihu.com/equation?tex=O%28Nlog%28N%29%29):???

- ![[Formula]](https://www.zhihu.com/equation?tex=O%28N%5E2%29) : As the input size increases, the running time increases to the power.

sort by

- in-place takes constant memory, no extra memory
- out-place takes extra memory

Usually the worst time complexity is used to measure the quality of an algorithm.

When using two algorithms, it may appear that the time complexity of both algorithms is![[Formula]](https://www.zhihu.com/equation?tex=O%28N%29), then compare The quality of the two algorithms is determined by comparing the low-order term and the constant term.

## bitwise operations

Bit operations are useful in arithmetic and can be much faster than arithmetic operations.

Before learning bit operations, you should know how to convert decimal to binary and how to convert binary to decimal. Here is a simple calculation method

- Decimal 33 can be regarded as 32 + 1, and 33 should be a six-digit decimal (because 33 is approximately 32, and 32 is the fifth power of 2, so it is six digits), then decimal 33 is 100001 , as long as it is a power of 2, then it is 1, otherwise it is 0

- Then the binary 100001 is the same, the first digit is 2^5 and the last digit is 2^0 , adding up to 33

### left shift <<

```
10 << 1 // -> 20
```

Left shift is to move all the binary to the left. 10 is represented as 1010 in binary, and after shifting one bit to the left, it becomes 10100. Converting to decimal is 20, so the left shift can basically be regarded as the following formula a\*(2^b)

### Arithmetic right shift >>

```
10 >> 1 // -> 5
```

Arithmetic right shift is to move all the binary to the right and remove the redundant right side. 10 is represented as 1010 in binary, and it becomes 101 after shifting to the right. Converting to decimal is 5, so basically you can put Shift right as the following formula int v = a / (2^b)

Right shift is very useful, for example, it can be used to take the middle value in the binary algorithm

```
13 >> 1 // -> 6
```

### Bitwise operations

#### Bitwise AND

Each bit is 1, the result is 1

```
8 & 7 // -> 0
// 1000 & 0111 -> 0000 -> 0
```

#### bitwise OR

One of the bits is 1, the result is 1

```
8 | 7 // -> 15
// 1000 | 0111 -> 1111 -> 15
```

#### Bitwise XOR

Each bit is different, the result is 1

```
8^7 // -> 15
8^8 // -> 0
// 1000^0111 -> 1111 -> 15
// 1000^1000 -> 0000 -> 0
```

From the above code, it can be found that the bitwise XOR is the addition without carry

## Review

- Two numbers are summed without arithmetic operations

  In this question, bitwise XOR can be used, because bitwise XOR is an addition without carry, 8 ^ 8 = 0 If it is carried, it is 16, so we only need to XOR the two numbers, and then carry. That is to say, where both binary digits are 1, there should be a carry 1 on the left, so the following formula a + b = (a ^ b) + ((a & b) <<

  ```javascript
  function sum(a, b) {
    if (a == 0) return b
    if (b == 0) return a
    let newA = a ^ b
    let newB = (a & b) << 1
    return sum(newA, newB)
  }
  ```
