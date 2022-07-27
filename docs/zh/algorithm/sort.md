# 排序

## 冒泡排序

俩俩交换，大的放在后面，第一次排序后最大值已在数组末尾。

因为俩俩交换，需要`n-1`趟排序，比如 10 个数，需要 9 趟排序

```javascript
function bubbleSort(arr) {
  const len = arr.length

  for (let i = 0; i < len - 1; i++) {
    // -1 每一次的最后一个不用比较了 或者j=1比较 j-1
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }

  return arr
}
```

如果第一次没有发生排序,直接返回

```javascript
function bubbleSort(arr) {
  let flag = 1
  const len = arr.length

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

## 插入排序

将一个元素插入到已有序的数组中，在初始时未知是否存在有序的数据，因此将元素第一个元素看成是有序的

与有序的数组进行比较，比它大则直接放入，比它小则移动数组元素的位置，找到个合适的位置插入

当只有一个数时，则不需要插入了，因此需要`n-1`趟排序，比如 10 个数，需要 9 趟排序

```javascript
function insertSort(arr: number[]) {
  // 第一个数不动,其余的插排
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

## 选择排序

找到数组中最大的元素，与数组最后一位元素交换 当只有一个数时，则不需要选择了，因此需要`n-1`趟排序，比如 10 个数，需要 9 趟排序

```javascript
function selectionSort(arr) {
  const len = arr.length

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

## 快速排序

迭代归分一分为三

```javascript
function quickSort(array) {
  let pivot = array[array.length - 1]
  let left = array.filter((v, i) => v <= pivot && i != array.length - 1)
  let right = array.filter(v => v > pivot)
  return [...quickSort(left), pivot, ...quickSort(right)]
}
```

最终情况只有两种 [1,2,3] 基准值为 2 ,一次排序成功 基准值为 1 再排 23 ,基准值为 3 再排 12

```javascript
function partition(arr, left, right) {
  const pivot = left
  let j = pivot + 1

  //  <= ? len -1
  // 本身为倒序 一直原地交换,j为len -1 基准值与最后交换
  // 本身为正序 不进入判断 , j-1  = pivot
  // 与基准值相等的数会放在基准值的右侧
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

## 希尔排序

- 希尔排序实质上就是插入排序的增强版

```javascript
function shellSort(arr) {
  var gap = Math.floor(arr.length / 2)

  while (gap) {
    for (var i = gap; i < arr.length; i++) {
      var j = i

      while (j > 0 && arr[j - gap] > arr[j]) {
        // eg 十一个数 既gap = 5  0,6,11 插排
        // eg 4个数两两交换无法获得正确排序,当通过从小到大的插排即可实现  2->4->6->8
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

1. 两数之和 哈希表
2. 学生分数的最小差值 排序＋滑动窗口
3. 回文数
   - x 和 y 同时修改 ,x<y
   - 要么 x 和 y 为同位数,要么 y 一定比 x 多一位
4. 无重复字符的最长子串 将 On\*m 改为 On 次 ,left,right 双指针
5. 有序数组中的单一元素 二分法 因为 mid>=left 所以 left+1 mid =Math.floor((right - left) / 2) + left 防止超出范围 偶数^1 奇数^1 &1 妙用
6. 罗马数字转整数 全部枚举
7. 整数转罗马数字 枚举+递减
8. 最长公共前缀 ASIIC 排序以后,求第一个和最后一个的并集
9. 有效的括号 有序采用堆栈
10. 删除有序数组中的重复项 快慢指针
11. 移除元素 二分法 二分法比直接遍历快
12. 实现 StrStr KMP 算法 找前缀函数,BM 算法
13. 找出星型图的中心节点 认真读题即可
14. 搜索插入位置 二分法判断
15. 最大子数组和 求 max Math.max MAX_SAFE_INTEGER ,min ....
16. 最后一个单词的长度 while(i--)
17. 加一 保存进位
18. 二进制求和 保存进
19. x 的平方根 也是采用二分法判断
20. 验证回文串 ^\da-zA-Z 写好正则表达
21. 买卖股票的最佳时机 求 max
22. 只出现一次的数字
    - 任何数和 0 做异或运算，结果仍然是原来的数
    - 任何数和其自身做异或运算，结果是 0
23. 多数元素 摩尔投票法 求众数 一一消耗不为自身消耗剩下的肯定是众数
24. Excel 表列序号 String.fromCharCode 'A'.charCodeAt(0)
25. Excel 表列名称 余数范围 0~25 A 的范围为 1~26 %10 /10 所以%26 /26
26. 快乐数 哈希循环
27. 同构字符串 双哈希表 (foo.has(x) && foo.get(x) !== y) || (bar.has(y) && bar.get(y) !== x)
28. 存在重复元素 计算数组长度比较
29. 存在重复元素 II 哈希表判断
30. 第一个错误版本 二分法判断
31. 移动零 双指针 [left,right] =[right,left]
32. 单词规律 双哈希表
33. Nim 游戏 先手后手都将剩余数控制为 1~3 即为 4 的倍数
34. 反转字符串 [left,right] =[right,left]
35. 赎金信 new Array(26).fill(0) 统计法
36. 仅仅反转字母 [...string]
37. 字符串中的第一个唯一字符
38. 找不同
    - 求和 new Array.fill(0) 遍历 一旦 --后<0 即为多数
    - 求和 ASCII 一个＋一个-
    - 位运算 0^x = x x^x = 0
39. 判断子序列 双指针
40. 二进制手表
    - 排列 _Anm_=*n*×(*n*−1)×(*n*−2)×…×(*n*−*m*+1)=_n_!/(*n*−*m*)!
    - 组合 _Cnm_=_m_!_Anm_=_n_!/_m_!×(*n*−*m*)!
41. 找到所有数组中消失的数字 鸽笼法 index 替换为负
42. 最小操作次数使数组元素相等 使 n-1 个数字加 1 ===使 n 个数字-1
43. 寻找两个正序数组的中位数 合并有序数组后求中位
44. 合并两个有序数组 双指针判断大小,
45. 考试的最大困扰度 滑动窗口 累加 超出 k 既左移
46. 消失的数字 找异或
