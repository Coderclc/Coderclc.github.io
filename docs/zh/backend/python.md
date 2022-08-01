# Python

## 一、起步

命名文件、文件夹采用小写,下划线代替空格

`execute  python main.py`

易于阅读>易于编写   indent = 4 space   行长不超过80字符   注释不超过72字符    运算符左右加space

print(??,end='')  nowrap

## 二、变量

字母数字下划线打头,无法数字打头

避免大写字母变量名

Traceback: 回溯记录.指出了解释器interpreter运行错误

str.title() 首字符大写

str.upper() 所有字符大写

str.lower() 所有字符小写

\t 制表符 \n 换行符

rstrip() 末尾空白 lstrip() 开头 strip()两端 临时的

\+ - * \ 使用()改变运算优先级

str() int->str    int()  str->int

## 三、列表

列表名称为复数是个不错的主意

index -1 为列表最后一个元素

append() 末尾添加

insert(index,el) 任意位置

extend()  区别于插入列表,字典,str -> 's','t','r', 将其拆开在插入列表,字典插入key

del arr[0] 关键字删除 根据index

pop() 删除并返回最后一个       pop(index) 弹出任何位置

remove() 根据value  一次只移除一个

sort() A-Z a-z 顺序排列    sort(reverse=True)  倒序   列表的方法 arr.sort()

sorted()  临时排序  全局方法  sorted(arr,reverse=True)

reverse() 倒序 永久改变

len(arr) 长度 return number

## 四、操作列表

for _ in _s :  冒号不可缺失

for 下缩进的代码都是循环的一部分

range(start,stop,step)  不包括stop

list(tuple) -> list      list(range())

min(list) 列表中最小的数   max()  sum() 求和

列表解析 arr = [value*2 for value in range(1,11)]  for语句无 :

切片 [0:3]  index 0 1 2 三个el

[:?] 0 ~?   [0:] all  

[start,stop,step]  step  default 1  left to right  if step = -1     r to l

复制列表 arr_ = arr[:]   复制文本  

arr = arr_ = []   改变了指针的指向,还是同一个列表

不可变的列表称为元组 tuple =  ( )   tuple[0]  can't modify

tuple[0] = ? error   tuple = new tuple  success

## 五、if 语句

if: elif: else:   冒号不可缺少

and  or  逻辑与 逻辑或

in  el in list return true/false

not in 

True/False 大写

arr = []  if arr:  False  区别于js  空的数组也为1

## 六、字典

字典为无序

key 必须加引号,访问同理,只有[]访问法

del key 删除键值对

dict.items()  return  list of contain key,value   dict.keys()    dict.values()

遍历字典键值对   for  key,value in dict.items():

直接遍历字典为默认遍历dict.keys():  =  dict:

按序遍历 将item()..等方法放回的列表排序 sorted(list)  无法使用 list.sort()  类列表罢了

set(dict.values()) 返回唯一值 key本身唯一    set(sorted()) 排列后唯一

## 七、用户输入和while循环

input(prompt)  prompt 末尾包含一个空格可分开提示和用户输入  

while():

使用标志sign/? = True/False

break 退出循环

continue 跳过当次

循环时不应该修改列表或者字典不然会出现不可预期的错误,可通过修改列表的副本
