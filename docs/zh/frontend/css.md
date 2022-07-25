# Css

## Hack

### element

<ClientOnly>
 <Element />
</ClientOnly>

### background-clip

<ClientOnly>
 <BackgroundClip />
</ClientOnly>

## Review

- 选择器＋声明块

- 元素选择器范围太广,ID 选择器范围太窄,类选择器最适宜

- 必须以分号结尾

- user-agent 浏览器用户默认样式表,不同 browser 不同

- color 有哪些值?

  - 名称
  - RGBA -> Red Green Blue Alpha
  - HSL -> Hue(色相) Saturation(饱和度) Luminance(亮度)
  - HEX 十六进制表示法

- 字体加粗有哪些方法?

  - <strong>font-weight</strong >
  - <strong>`<strong >`</strong >

- 斜体有哪些方法?

  - <em>font-style: italic</em>
  - <em>`<i> <em>`</em>

- 文字装饰有哪些?

  - `<del>`<del>废弃的内容</del>
  - `<s>`<s>过期的内容</s>
  - <s>text-decoration:line-through overline</s>

- 说一说样式优先级的规则

  - !important
  - 引入方式,行内大于嵌入和外链 嵌入和外链看引入顺序,后者覆盖前者
  - 选择器的优先级 id 选择器>（类选择器 | 伪类选择器 | 属性选择器 ）> （后代选择器 | 伪元素选择器 ）> （子选择器 | 相邻选择器） > 通配符选择器
  - 继承样式
  - 浏览器默认样式

- font-family 可设定多个值,前提是用户计算机有此字体

- text-indent 文本缩进

- letter-spacing 字符间距

- `<iframe>`用于嵌入网页

- `<object> <embed>`用于嵌入 flash

- [MIME](https://developer.mozilla.org/zh-CN/docs/Glossary/MIME_type)多用途互联网邮邮件扩展类型

- 伪类选择器爱恨法则 lvha `:hover` 悬停 `:active` 激活 `:link` 未访问 `:visited` 访问过

- `a:first-child` 必须是 a 元素,还必须是排在队列中 a 元素的第一个

- `:first-of-type` 选中 a 元素中的第一个元素

- `::first-letter` 选中元素内容的第一个字符

- `::first-line` 选中元素内容的第一行

- `::selection` 框选的内容

- `::placeholder` 改变占位符的颜色

- 元素选择器: 空白 子代, \> 隔一代, \+ 下一个兄弟元素, \~ 后面所有兄弟元素

- `outline` 只能同时设置四条边的边框,不占据空间

- `@`规则

  - `@import "path"` 导入 css 文件
  - `@charset "UTF-8";` defined 浏览器该 css 文件字符编码集 必须写在 import 之前
  - `@font-face{}` 指令制作一个新字体

- `<img />` 标签白边问题解决

  - 设置父元素字体大小为 0, 副作用是元素字体消失
  - 设置图片为块盒
  - 修改对齐的基线

- 参考线-深入理解字体 通常为 5 根参考线

  - text top,ascent 顶线
  - super 上基线
  - baseline 基线
  - sub 下基线
  - text bottom,descent

- svg (scalable vector graphics) 可缩放的矢量图

  - 该图片用代码书写而成的
  - 缩放不会失真,类似 python turtle 用代码作图
  - 内容轻量
  - 使用方法
    - 直接复制源代码
    - img backgroundimg
    - embed object iframe

- css 数据链接

  - 将目标文件的数据直接书写到路径位置
  - dataMIME,数据 (MIME 类型就是设定某种扩展名的文件用一种应用程序来打开的方式类型)
  - 优点
    - 减少了浏览器的请求,减少了请求时间
    - 有利于动态生成数据
  - 缺点
    - 增加了资源的体积,导致了传输内容增加
    - 不利于浏览器的缓存
  - 应用场景
    - 但请求单个图片体积较小，并且该图片因为各种原因，不适合制作雪碧图
    - 图片由其他代码动态生成,并且图片较小，可以使用数据链接

  ```html
  <link rel="stylesheet" href="data:text/css,h1{color:blue;}" />
  <link rel="stylesheet" href="data:text/css;base64,aDF7Y29sb3I6Ymx1ZTt9" />
  ```

- 厂商前缀

  - ie `-ms-`
  - 谷歌 safari `-webkit-`
  - opera `-o-`
  - 火狐 `-moz-`

- 渐进增强和优雅降级

  - 先写个都能运行的,再给新版本加新样式
  - 先写最新的,再针对低版本处理

- 居中总结

  - 水平方向:行盒 `text-align:center`, 块盒 定宽 `margin:auto` `justify-content: center;`
  - 垂直方向:行盒 `line-height` `vertical-align`,块盒 `margin:auto` `align-items: center;`
  - 定位法 定大小 `position,lrtb = 0,margin:auto`

- 万能的`flex` 和 `grid`

- BEM 命名规范块 `Block-Element__Modifier`

- `caret-color` 修改光标颜色

- `-webkit-tap-highlight-color` ios iphone 点击颜色

- css 的锚点定位 `scroll-behavior:smooth` 平滑滚动

- `overflow-anchor` 新内容载入时 scroll 位置

- `scroll-snap-type` 定义滚动容器临界点,自动回调

- `color-scheme` 适配 mac 黑色模式

- div 容器 `aspect-ratio: 1/1;` 宽高比一比一
