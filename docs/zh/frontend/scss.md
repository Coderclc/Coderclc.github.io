# [Scss](https://www.sass.hk/)

## 语法格式

Scss 使用花括号,Sass 缩进代替花括号

任何一种格式可以直接 [导入 (@import)](https://www.sass.hk/docs/#t7-1) 到另一种格式中使用，或者通过 `sass-convert` 命令行工具转换成另一种格式：

## 变量声明

变量以美元符号开头

```scss
$highlight-color: #f90;
$basic-border: 1px solid black;
```

## 变量引用

```scss
div {
  border: 1px solid $highlight-color;
}
```

## 变量名用中划线还是下划线

```scss
// both
$link-color: blue;

a {
  color: $link_color;
}
```

## 嵌套

### 父选择器的标识符&

```html
<div class="bullshit">
  <div class="bullshit__oops">OOPS!</div>
  <div class="bullshit--info">All rights reserved</div>
</div>
```

```scss
.bullshit {
  &\_\_oops {
  }
  &--info {
  }
}
```

### 群组选择器的嵌套

```scss
.container {
  h1,
  h2,
  h3 {
    margin-bottom: 0.8em;
  }
}
```

### 组合选择器：>、+和~

```scss
article {
  ~ article {
    border-top: 1px dashed #ccc;
  }

  \> section {
    background: #eee;
  }

  nav + & {
    margin-top: 0;
  }
}
```

### 嵌套属性

```scss
border: {
  style: solid;
  width: 1px;
  color: #ccc;
  top: 0;
}

border: 1px solid #008c8c {
  left: 0px;
} ;
```

## 导入 Scss 文件

对比 css 无需发起额外的下载请求

不需要指明被导入文件的全名

## 使用 Scss 部分文件

不希望 scss 文件单独编译成 css 文件

scss 命名时加\_ eg:themes/\_night-sky.scss ,此时不会单独编译成 css

@import 'themes/night-sky' 可忽略 \_ ext

## 默认变量值

!default

## 嵌套导入

```scss
.blue-theme {
  @import 'blue-theme';
}
```

相当于将内容编译出来放到该处

## 原生的 CSS 导入

直接将 css 改成 scss 文件即可

## 静默注释

```scss
main {
  color/* 这种注释内容会出现在生成的css文件中 */: #f00; // 这种注释内容不会出现在生成的css文件中
  padding: 10px; /* 这种注释内容会出现在生成的css文件中 */
}

// 编译之后的css

main {
  color/* 这种注释内容会出现在生成的css文件中 */: #f00;
  padding: 10px;
  /* 这种注释内容会出现在生成的css文件中 */
}
```

## 混合器

```scss
@mixin name {
}
@include name;
```

大量的重用可能会导致生成的样式表过大，避免滥用

## 混合器中的 CSS 规则

```scss
@mixin name {
  ul li {
  }
}
```

## 给混合器传参

```scss
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover {
    color: $hover;
  }
  &:visited {
    color: $visited;
  }
}

a {
  @include link-colors(blue, red, green);
}
```

\$name: value 指定形参

```scss
a {
  @include link-colors($normal: blue, $visited: green, $hover: red);
}
```

## 默认参数值;

```scss
@mixin link-colors($normal, $hover: $normal, $visited: $normal) {
  color: $normal;
  &:hover {
    color: $hover;
  }
  &:visited {
    color: $visited;
  }
}

@include link-colors(red);
```

## 继承

@extend

```scss
.error {
  border: 1px solid red;
  background-color: #fdd;
  a {
  }
}
.seriousError {
  @extend .error;
  border-width: 3px;
  a {
  }
}
```

混合器把样式直接放到了`css`规则中，而继承存在样式层叠的问题

即`error a {...}` 也会被继承到 `seriousError a{}`

## 继承的高级用法

继承一个`html`元素的样式

```scss
.disabled {
  color: gray;
  @extend a;
}
```

## Vue 文件使用 scss 文件的变量

```scss
:export {
  menuText: $menuText;
  menuActiveText: $menuActiveText;
  subMenuActiveText: $subMenuActiveText;
  menuBg: $menuBg;
  menuHover: $menuHover;
  subMenuBg: $subMenuBg;
  subMenuHover: $subMenuHover;
  sideBarWidth: $sideBarWidth;
}
```

```js
import variables from '@/styles/variables.scss'

computed: {
    variables() {
        return variables
    }
},
mounted() {
    console.log(variables)
},
```
