# Node.JS - 爬取 vmgirls 写真

## 一、vmgirls

[vmgirls](https://www.vmgirls.com/)是一个个人维护的图集集合网站.

里面有很多来自图虫摄影，POCO 摄影，网易摄影，网易乐乎等好看小姐姐的写真.

![vmgirls](/images/articles/vmgirls.webp)

图片基本都是 2000px 左右的高清大图,收集资源,养眼都非常不错.

站点结构非常简单.直接用正则匹配或者框架都行. 本文介绍的是使用 cheerio 框架爬取。

## 二、分析

![vmgirls-category](/images/articles/vmgirls-category.webp)

首页无论是 nav 栏或者目录,分类都特别的杂且不全.

![vmgirls-recommend](/images/articles/vmgirls-recommend.webp)

最终敲定专题推荐 page 只把所有的图集分为两类,并且可通过下拉刷新加载

![vmgirls-html](/images/articles/vmgirls-html.webp)

查看页面可知,界面是分段渲染的. 即打开页面初始渲染八个图集通过点击加载更多,再向服务器请求数据,再刷新页面

![vmgirls-more](/images/articles/vmgirls-more.webp)

F12 开发者模式观察请求

![vmgirls-post](/images/articles/vmgirls-post.webp)

每一次点击更多都发送一次 POST 请求并且携带四个参数

![vmgirls-post_](/images/articles/vmgirls-post_.webp)

对比两次请求,可初步判断决定数据结果的参数应该是 query 和 paged 使用 ajax 尝试请求数据

```javascript
Request URL: https://www.vmgirls.com/wp-admin/admin-ajax.php
async function ajax(data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("post", "https://www.vmgirls.com/wp-admin/admin-ajax.php")
    xhr.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    )
    xhr.send(data)
    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve(xhr.responseText)
      } else {
        reject("error")
      }
    }
  })
}
```

返回结果与预期相同,拿到了一组 8 个图集对应 data

```javascript
const page = 1
// options 轻私房/小姐姐
const category = '小姐姐'
const data = `append=list-archive&paged=${i}&action=ajax_load_posts&query=${encodeURI(
  category
)}&page=tax`
```

通过 page 决定下载写真数写真数 = page × 8 类别 = 小姐姐 / 轻私房

![vmgirls-detail](/images/articles/vmgirls-detail.webp)

使用 cheerio 库,传入选择器,捕获元素

```javascript
const $ = cheerio.load(res)
const $arr = $('.col-6 .list-item .media a')
```

这里不选择 img 元素,测试发现 imgsrc 属性渲染结果与源代码不同.

应该是执行了某种反爬虫 js 脚本.

而 data-src 虽然是相同的,但 webp 图片格式无法通过 axios arraybuffer 写入

![vmgirls-src](/images/articles/vmgirls-src.webp)

最终敲定捕获 a 元素只需发送需要的 ajax 请求获取图集再通过图集下载对应图片即可

## 三、成品展示

![vmgirls-result_](/images/articles/vmgirls-result_.webp)

![vmgirls-result](/images/articles/vmgirls-result.webp)

![vmgirls-result__](/images/articles/vmgirls-result__.webp)

## 四、代码实现

函数已封装完毕. 改变全局变量 page、category. 执行 tsc ,node 即可

注意事项

- axios POST 请求得不到想要的结果
- 极少部分详情页布局采用的是 ul li 布局,此代码并不囊括
- vgirls 服务器些许卡顿,图片都是大尺寸,可适当延长 axios timeout 属性
- webp 图像格式无法采用 axios arraybuffer 下载

```javascript
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

type IvmGirls = () => Promise<void>
type IgetDataArr = () => Array<string>
type IgetDetailArr = (dataArr: string[]) => Promise<Array<object>>
type IgetImgArr = (detailArr: any[]) => Promise<Array<object>>
type IdownloadPic = (imgArr: any[]) => void
type Iajax = (data: string) => Promise<string>
type IwriteFile = (path: string, content: any) => void

const page = 1
// options 轻私房/小姐姐
const category = '小姐姐'

const vmGirls: IvmGirls = async () => {
  // 获取ajax请求data arr
  const dataArr = getDataArr()
  // 获取详情页url arr
  const detailArr = await getDetailArr(dataArr)
  // 获取imgurl arr
  const imgArr = await getImgArr(detailArr)
  // 下载图片
  downloadPic(imgArr)
}

const getDataArr: IgetDataArr = () => {
  const dataArr = []
  for (let i = 1; i <= page; i++) {
    const data = `append=list-archive&paged=${i}&action=ajax_load_posts&query=${encodeURI(
      category
    )}&page=tax`
    dataArr.push(data)
  }
  return dataArr
}

const getDetailArr: IgetDetailArr = async dataArr => {
  const detailArr = []
  for (let i = 0; i < dataArr.length; i++) {
    try {
      const res = await ajax(dataArr[i])
      const $ = cheerio.load(res)
      const $arr = $('.col-6 .list-item .media a')
      for (let j = 0; j < $arr.length; j++) {
        const detailHref = $arr[j].attribs['href']
        const title = $arr[j].attribs['title']
        const obj = {
          href: detailHref,
          title
        }
        detailArr.push(obj)
      }
      console.log(`ajax paged ${i + 1} Successful\n`)
    } catch (error) {
      console.log(`ajax paged ${i + 1} Failure\n`)
      continue
    }
  }
  return detailArr
}

const getImgArr: IgetImgArr = async detailArr => {
  const arr = []
  for (let i = 0; i < detailArr.length; i++) {
    try {
      const res = await axios({
        url: detailArr[i].href,
        timeout: 3000
      })
      const $ = cheerio.load(res.data)
      const $arr = $('div.nc-light-gallery p a')
      const imgArr = []
      const title = $arr[0].attribs['alt']
      for (let j = 0; j < $arr.length; j++) {
        const imgUrl = 'https://www.vmgirls.com/' + $arr[j].attribs['href']
        imgArr.push(imgUrl)
      }
      const obj = {
        title,
        url: imgArr
      }
      arr.push(obj)
      console.log(chalk.green(`${detailArr[i].title} atlas get success\n`))
    } catch (error) {
      console.log(chalk.red(`${detailArr[i].title} atlas get failure\n`))
    }
  }
  return arr
}

const downloadPic: IdownloadPic = async imgArr => {
  fs.mkdir('./images', () => {})
  for (let atlas of imgArr) {
    const title = atlas.title
    fs.mkdir(`./images/${title}`, () => {})
    for (let i in atlas.url) {
      const extname = path.extname(atlas.url[i])
      try {
        const res = await axios({
          url: atlas.url[i],
          timeout: 2000,
          responseType: 'arraybuffer'
        })
        await writeFile(`./images/${title}/${title}_${+i + 1}${extname}`, res.data)
        console.log(chalk.green(`${title} (${+i + 1}/${atlas.url.length}) Download Successful\n`))
      } catch (error) {
        console.log(chalk.red(`${title} (${+i + 1}/${atlas.url.length}) Download Failure\n`))
      }
    }
  }
}

const ajax: Iajax = async data => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('post', 'https://www.vmgirls.com/wp-admin/admin-ajax.php')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    xhr.send(data)
    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve(xhr.responseText)
      } else {
        reject('error')
      }
    }
  })
}

const writeFile: IwriteFile = (path, content) => {
  return new Promise(resolve => {
    fs.writeFile(path, content, err => {
      if (!err) resolve()
    })
  })
}
vmGirls()

export {}
```
