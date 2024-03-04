import{_ as d,o as n,c as i,a as e,b as t,e as h,d as a,r as s}from"./app.a81d06d1.js";const o={},l=h('<h1 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> Mysql</h1><p>\u5173\u7CFB\u578B\u6570\u636E\u5E93\u7BA1\u7406\u7CFB\u7EDF</p><p>unicode: utf8mb4</p><p>sort rule: utf8mb4_general_ci</p><h2 id="sign-in" tabindex="-1"><a class="header-anchor" href="#sign-in" aria-hidden="true">#</a> Sign in</h2><p>mysql -h localhost -u root -p</p><h2 id="sign-up" tabindex="-1"><a class="header-anchor" href="#sign-up" aria-hidden="true">#</a> Sign up</h2><p>exit or quit or ctrl +z</p><h2 id="show" tabindex="-1"><a class="header-anchor" href="#show" aria-hidden="true">#</a> Show</h2><h3 id="\u5C55\u793A\u6240\u6709\u6570\u636E\u5E93" tabindex="-1"><a class="header-anchor" href="#\u5C55\u793A\u6240\u6709\u6570\u636E\u5E93" aria-hidden="true">#</a> \u5C55\u793A\u6240\u6709\u6570\u636E\u5E93</h3><p>show databases;</p><h3 id="\u5C55\u793A\u6240\u6709\u8868" tabindex="-1"><a class="header-anchor" href="#\u5C55\u793A\u6240\u6709\u8868" aria-hidden="true">#</a> \u5C55\u793A\u6240\u6709\u8868</h3><p>use d_n , show tables;</p><h3 id="\u5C55\u793A\u8868\u5934\u5C5E\u6027-\u5C5E\u6027\u7C7B\u578B-\u4E3B\u952E\u4FE1\u606F" tabindex="-1"><a class="header-anchor" href="#\u5C55\u793A\u8868\u5934\u5C5E\u6027-\u5C5E\u6027\u7C7B\u578B-\u4E3B\u952E\u4FE1\u606F" aria-hidden="true">#</a> \u5C55\u793A\u8868\u5934\u5C5E\u6027,\u5C5E\u6027\u7C7B\u578B,\u4E3B\u952E\u4FE1\u606F</h3><p>show columns from t_n;</p><h3 id="\u5C55\u793A\u8868\u7684\u8BE6\u7EC6\u7D22\u5F15\u4FE1\u606F" tabindex="-1"><a class="header-anchor" href="#\u5C55\u793A\u8868\u7684\u8BE6\u7EC6\u7D22\u5F15\u4FE1\u606F" aria-hidden="true">#</a> \u5C55\u793A\u8868\u7684\u8BE6\u7EC6\u7D22\u5F15\u4FE1\u606F</h3><p>show index from t_n;</p><h3 id="\u5C55\u793A\u8868\u7684\u6240\u6709\u4FE1\u606F" tabindex="-1"><a class="header-anchor" href="#\u5C55\u793A\u8868\u7684\u6240\u6709\u4FE1\u606F" aria-hidden="true">#</a> \u5C55\u793A\u8868\u7684\u6240\u6709\u4FE1\u606F</h3><p>show table status from d_n;</p><h2 id="create-database" tabindex="-1"><a class="header-anchor" href="#create-database" aria-hidden="true">#</a> Create database</h2><p>create database d_n;</p><h2 id="drop-database" tabindex="-1"><a class="header-anchor" href="#drop-database" aria-hidden="true">#</a> Drop database</h2><p>drop database d_n</p><h2 id="use-database" tabindex="-1"><a class="header-anchor" href="#use-database" aria-hidden="true">#</a> Use database</h2><p>use d_n</p><h2 id="data-type" tabindex="-1"><a class="header-anchor" href="#data-type" aria-hidden="true">#</a> Data type</h2><p>number / string / date \u6570\u503C/\u5B57\u7B26/\u65F6\u95F4</p><h3 id="number" tabindex="-1"><a class="header-anchor" href="#number" aria-hidden="true">#</a> NUMBER</h3><p>TINYINT SMALLINT MEDIUMINT INT/INTEGER BIGINT FLOAT DOUBLE DECIMAL</p><h3 id="date" tabindex="-1"><a class="header-anchor" href="#date" aria-hidden="true">#</a> DATE</h3><p>DATE TIME YEAR DATETIME TIMESTAMP</p><h3 id="string" tabindex="-1"><a class="header-anchor" href="#string" aria-hidden="true">#</a> STRING</h3><p>CHAR VARCHAR TINYBLOB TINYTEXT BLOB TEXT MEDIUMBLOB MEDIUMTEXT LONGBLOB LONGTEXT</p><h2 id="build-table" tabindex="-1"><a class="header-anchor" href="#build-table" aria-hidden="true">#</a> Build table</h2><p>create table table_name(column_name column_type) column at least 1</p><h2 id="delete-table" tabindex="-1"><a class="header-anchor" href="#delete-table" aria-hidden="true">#</a> Delete table</h2><p>drop table t_n</p><h2 id="insert-into-data" tabindex="-1"><a class="header-anchor" href="#insert-into-data" aria-hidden="true">#</a> Insert into data</h2><p>insert into t_n (key_1,key_2) values (values_1,values_2)</p><h2 id="query" tabindex="-1"><a class="header-anchor" href="#query" aria-hidden="true">#</a> Query</h2><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> *</h3><p>select * from t_n</p><p>select * from t_n_1,t_n_2</p><h3 id="c-n" tabindex="-1"><a class="header-anchor" href="#c-n" aria-hidden="true">#</a> C_n</h3><p>select c_n from t_n</p><h3 id="limit" tabindex="-1"><a class="header-anchor" href="#limit" aria-hidden="true">#</a> limit</h3><p>select * from t_n limit 2 (return 2 records,eg return id 1, 2 )</p><h3 id="offset" tabindex="-1"><a class="header-anchor" href="#offset" aria-hidden="true">#</a> Offset</h3><p>select * from t_n limit 2 offset 1 (return 2 records,eg return id 2, 3 )</p><h3 id="where" tabindex="-1"><a class="header-anchor" href="#where" aria-hidden="true">#</a> Where</h3><p>&gt; , &lt; , &gt;=,&lt;=,!=,&lt;&gt;,</p><p>select * from t_n where id &gt; 1</p><h4 id="and" tabindex="-1"><a class="header-anchor" href="#and" aria-hidden="true">#</a> And</h4><p>select * from t_n where id &gt;= 1 and id &lt; 3</p><h4 id="or" tabindex="-1"><a class="header-anchor" href="#or" aria-hidden="true">#</a> Or</h4><p>select * from t_n where id &gt;= 1 or id &lt; 3</p><h4 id="between" tabindex="-1"><a class="header-anchor" href="#between" aria-hidden="true">#</a> Between</h4><p>select * from t_n where id between 1 and 3 (include 1,3)</p><h2 id="update" tabindex="-1"><a class="header-anchor" href="#update" aria-hidden="true">#</a> Update</h2><p>update t_n set field_1 = new_value_1 , field_2= new_value_2</p><p>select _ from table where author in [&#39;clc&#39;,&#39;why&#39;]</p><p>\u6A21\u7CCA\u67E5\u627E</p><ul><li>like %\u8868\u793A\u4EFB\u610F\u591A\u4E2A\u5B57\u7B26</li><li>_\u8868\u793A\u4EFB\u610F\u4E00\u4E2A\u5B57\u7B26 select _ from table where title like &quot;%\u5C11\u5973%&quot;</li></ul><p>\u8303\u56F4\u67E5\u627E</p><ul><li>limit \u8303\u56F4\u9650\u5236 select * from table limit 0,30 \u9650\u5236</li><li>between in select * from table where id in (100,101,102) between and where id between 3 and 8 and gender = male</li></ul><p>\u67E5\u627E\u7A7A select _ from table where id is null \u90FD\u662F\u65E0\u89C6\u5927\u5C0F\u5199 select _ from table where id is not null</p><h2 id="paradigm" tabindex="-1"><a class="header-anchor" href="#paradigm" aria-hidden="true">#</a> Paradigm</h2><p>\u7B2C\u4E00\u8303\u5F0F 1NF \u8868\u4E2D\u7684\u5217\u53EA\u80FD\u542B\u6709\u539F\u5B50\u6027 (\u4E0D\u53EF\u518D\u5206\u7684\u503C)</p><p>\u7B2C\u4E8C\u8303\u5F0F 2NF \u6CA1\u6709\u90E8\u5206\u4F9D\u8D56(\u6BD4\u5982\u90E8\u5206\u7F16\u53F7\u51B3\u5B9A\u90E8\u95E8\u540D\u5B57,\u5355\u72EC\u62CE\u51FA\u6765), \u628A\u4E00\u4E2A\u8868\u62C6\u5206\u6210\u51E0\u4E2A\u6CA1\u6709\u4F9D\u8D56\u7684\u8868</p><p>\u7B2C\u4E09\u8303\u5F0F 3NF \u6CA1\u6709\u5C42\u7EA7\u4F9D\u8D56 \u6BD4\u5982\u7701\u5E02\u533A\u62C6\u5206\u8868</p><h2 id="foreign-key" tabindex="-1"><a class="header-anchor" href="#foreign-key" aria-hidden="true">#</a> Foreign key</h2><p>\u7EA6\u675F\u6570\u636E\u7684\u6709\u6548\u9A8C\u8BC1. \u6BD4\u5982\u8001\u5E08\u548C\u5B66\u751F\u7684\u5173\u7CFB\u8868\u4E2D,\u589E\u52A0\u4E86\u4E0D\u5B58\u5728\u7684\u8001\u5E08\u6216\u8005\u5B66\u751F,\u600E\u4E48\u4FDD\u8BC1\u6570\u636E\u7684\u6709\u6548\u6027\u7EA7\u8054\u64CD\u4F5C restrict \u9650\u5236 \u9ED8\u8BA4\u503C,\u629B\u51FA\u5F02\u5E38 cascade \u7EA7\u8054 \u5220\u9664\u4E3B\u8868,\u8868\u76F8\u5173\u8054\u4E5F\u88AB\u5220\u9664 set null \u5C06\u5916\u952E\u8BBE\u7F6E\u4E3A\u7A7A no action \u4EC0\u4E48\u90FD\u4E0D\u505A</p><h2 id="linked-table-query" tabindex="-1"><a class="header-anchor" href="#linked-table-query" aria-hidden="true">#</a> Linked table query</h2>',73),c=a("inner join \u5168\u8FDE\u63A5 on \u5173\u7CFB select _ from author inner join authorbook \u5C06\u4E24\u5F20\u8868\u62FC\u63A5 select _ from author inner join authorbook on "),p={href:"http://author.id",target:"_blank",rel:"noopener noreferrer"},u=a("author.id"),_=a(" authorbook.authodid \u5C06\u76F8\u540C\u6570\u636E id \u94FE\u63A5\u5728\u4E00\u8D77\u53EF\u5728\u57FA\u7840\u62FC\u63A5 where author.author= '\u90ED\u656C\u660E'"),b=e("p",null,"left join \u8868 A left join \u8868 B \u4EE5 right join \u4EE5\u53F3\u8FB9\u4E3A\u51C6,\u672A\u51FA\u73B0\u7684\u6570\u636E\u6DFB\u52A0 NULL",-1),f=a("SELECT * FROM score INNER JOIN student on "),m={href:"http://student.id",target:"_blank",rel:"noopener noreferrer"},x=a("student.id"),E=a(" = score.stuid INNER JOIN project on "),w={href:"http://project.id",target:"_blank",rel:"noopener noreferrer"},T=a("project.id"),g=a(" = score.projectid WHERE project.project = 'chinese' \u94FE\u63A5\u4E24\u5F20\u8868"),N=e("h2",{id:"delete",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#delete","aria-hidden":"true"},"#"),a(" Delete")],-1),I=e("p",null,'\u903B\u8F91\u5220\u9664 \u8BBE\u7F6E\u5B57\u6BB5 isdelete true UPDATE book set isdelete= "true" where id = 2',-1),k=e("p",null,'\u7269\u7406\u5220\u9664 DELETE from book WHERE bookname = "\u9B3C\u5439\u706F"',-1);function y(L,B){const r=s("ExternalLinkIcon");return n(),i("div",null,[l,e("p",null,[c,e("a",p,[u,t(r)]),_]),b,e("p",null,[f,e("a",m,[x,t(r)]),E,e("a",w,[T,t(r)]),g]),N,I,k])}var q=d(o,[["render",y],["__file","mysql.html.vue"]]);export{q as default};
