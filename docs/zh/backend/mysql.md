# Mysql

关系型数据库管理系统

unicode: utf8mb4

sort rule: utf8mb4_general_ci

## Sign in

mysql -h localhost -u root -p

## Sign up

exit or quit or ctrl +z

## Show

### 展示所有数据库

show databases;

### 展示所有表

use d_n , show tables;

### 展示表头属性,属性类型,主键信息

show columns from t_n;

### 展示表的详细索引信息

show index from t_n;

### 展示表的所有信息

show table status from d_n;

## Create database

create database d_n;

## Drop database

drop database d_n

## Use database

use d_n

## Data type

number / string / date 数值/字符/时间

### NUMBER

TINYINT SMALLINT MEDIUMINT INT/INTEGER BIGINT FLOAT DOUBLE DECIMAL

### DATE

DATE TIME YEAR DATETIME TIMESTAMP

### STRING

CHAR VARCHAR TINYBLOB TINYTEXT BLOB TEXT MEDIUMBLOB MEDIUMTEXT LONGBLOB LONGTEXT

## Build table

create table table_name(column_name column_type) column at least 1

## Delete table

drop table t_n

## Insert into data

insert into t_n (key_1,key_2) values (values_1,values_2)

## Query

### \*

select \* from t_n

select \* from t_n_1,t_n_2

### C_n

select c_n from t_n

### limit

select \* from t_n limit 2 (return 2 records,eg return id 1, 2 )

### Offset

select \* from t_n limit 2 offset 1 (return 2 records,eg return id 2, 3 )

### Where

\> , < , >=,<=,!=,<>,

select \* from t_n where id > 1

#### And

select \* from t_n where id >= 1 and id < 3

#### Or

select \* from t_n where id >= 1 or id < 3

#### Between

select \* from t_n where id between 1 and 3 (include 1,3)

## Update

update t_n set field_1 = new_value_1 , field_2= new_value_2

select \_ from table where author in ['clc','why']

模糊查找

- like %表示任意多个字符
- \_表示任意一个字符 select \_ from table where title like "%少女%"

范围查找

- limit 范围限制 select \* from table limit 0,30 限制
- between in select \* from table where id in (100,101,102) between and where id between 3 and 8 and gender = male

查找空 select _ from table where id is null 都是无视大小写 select _ from table where id is not null

## Paradigm

第一范式 1NF 表中的列只能含有原子性 (不可再分的值)

第二范式 2NF 没有部分依赖(比如部分编号决定部门名字,单独拎出来), 把一个表拆分成几个没有依赖的表

第三范式 3NF 没有层级依赖 比如省市区拆分表

## Foreign key

约束数据的有效验证. 比如老师和学生的关系表中,增加了不存在的老师或者学生,怎么保证数据的有效性级联操作 restrict 限制 默认值,抛出异常 cascade 级联 删除主表,表相关联也被删除 set null 将外键设置为空 no action 什么都不做

## Linked table query

inner join 全连接 on 关系 select _ from author inner join authorbook 将两张表拼接 select _ from author inner join authorbook on author.id authorbook.authodid 将相同数据 id 链接在一起可在基础拼接 where author.author= '郭敬明'

left join 表 A left join 表 B 以 right join 以右边为准,未出现的数据添加 NULL

SELECT \* FROM score INNER JOIN student on student.id = score.stuid INNER JOIN project on project.id = score.projectid WHERE project.project = 'chinese' 链接两张表

## Delete

逻辑删除 设置字段 isdelete true UPDATE book set isdelete= "true" where id = 2

物理删除 DELETE from book WHERE bookname = "鬼吹灯"
