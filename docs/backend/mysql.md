# Mysql

relational database management system

unicode: utf8mb4

sort rule: utf8mb4_general_ci

## Sign in

mysql -h localhost -u root -p

## Sign up

exit or quit or ctrl +z

## Show

### show all databases

show databases;

### show all tables

use d_n , show tables;

### Display header attributes, attribute types, primary key information

show columns from t_n;

### Display the detailed index information of the table

show index from t_n;

### Display all the information of the table

show table status from d_n;

## Create database

create database d_n;

## Drop database

drop database d_n

## Use database

use d_n

## Data type

number / string / date numeric value / character / time

###NUMBER

TINYINT SMALLINT MEDIUMINT INT/INTEGER BIGINT FLOAT DOUBLE DECIMAL

###DATE

DATE TIME YEAR DATETIME TIMESTAMP

###STRING

CHAR VARCHAR TINYBLOB TINYTEXT BLOB TEXT MEDIUMBLOB MEDIUMTEXT LONGBLOB LONGTEXT

##Build table

create table table_name(column_name column_type) column at least 1

## Delete table

drop table t_n

## Insert into data

insert into t_n (key_1,key_2) values ​​(values_1,values_2)

## Query

### \*

select \* from t_n

select \* from t_n_1,t_n_2

### C_n

select c_n from t_n

### limit

select \* from t_n limit 2 (return 2 records, eg return id 1, 2 )

###Offset

select \* from t_n limit 2 offset 1 (return 2 records, eg return id 2, 3 )

###Where

\> , < , >=,<=,!=,<>,

select \* from t_n where id > 1

#### And

select \* from t_n where id >= 1 and id < 3

####Or

select \* from t_n where id >= 1 or id < 3

#### Between

select \* from t_n where id between 1 and 3 (include 1,3)

##Update

update t_n set field_1 = new_value_1 , field_2= new_value_2

select \_ from table where author in ['clc','why']

Fuzzy lookup

- like % means any number of characters
- \_ means any character select \_ from table where title like "%girl%"

range lookup

- limit range limit select \* from table limit 0,30 limit
- between in select \* from table where id in (100,101,102) between and where id between 3 and 8 and gender = male

Find empty select _ from table where id is null is case-insensitive select _ from table where id is not null

## Paradigm

Columns in a first normal form 1NF table can only contain atomic (non-divisible values)

The second normal form 2NF has no partial dependencies (for example, the part number determines the department name, which is picked out separately), and splits a table into several tables without dependencies

The third normal form 3NF has no hierarchical dependencies, such as the division table of provinces and cities

## Foreign keys

Effective verification of constraint data. For example, in the relationship table between teachers and students, a non-existent teacher or student is added. How to ensure the validity of the data Cascading operation restricts the default value, throws an exception, cascade deletes the main table, the table is related Links are also removed set null set foreign key to null no action do nothing

## Linked table query

inner join full join on relation select _ from author inner join authorbook splicing two tables select _ from author inner join authorbook on author.id authorbook.authodid linking the same data id together can be spliced ​​on the basis where author.author= 'Guo Jingming '

left join table A left join table B is based on right join and the right side shall prevail, and NULL is added to the data that does not appear

SELECT \* FROM score INNER JOIN student on student.id = score.stuid INNER JOIN project on project.id = score.projectid WHERE project.project = 'chinese' Link two tables

## Delete

Tombstone set field isdelete true UPDATE book set isdelete= "true" where id = 2

Physical deletion DELETE from book WHERE bookname = "Ghost Blowing Lamp"
