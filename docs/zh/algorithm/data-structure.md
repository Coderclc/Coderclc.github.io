# 数据结构

## 链表

- 多个元素组成的列表
- 元素存储不连续，是用过next指针联系在一起的
- 增删数组 ->下标
- 增删链表 -> 改变.next
- 删除链表 替换成下一个删除的值,替换next.next,不能直接将this 修改为 this.next 
- 反转 
  - next.next  = prev  prev = next 指针迭代正序反转   eg  2指向上一次村的1 保存2
  - return new head next.next.next  = next  next  = null  函数递归到链表的尾部 eg  5指向4 ,打断4的next

- 删除重复 迭代 判断 next.val  === next.next.val? 相同改变指向,否则移动指针
- 环形链表
  - 哈希表 
  - 龟兔赛跑 快慢指针,如果存在环形,那么快指针一定会追上慢指针
