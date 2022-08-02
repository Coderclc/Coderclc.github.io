# Node.JS - Crawl vmgirls photo

## One, vmgirls

[vmgirls](https://www.vmgirls.com/) is a personally maintained atlas collection website.

There are many photos of good-looking young ladies and sisters from Tu Wo Photography, POCO Photography, Netease Photography, Netease Lehu and so on.

![vmgirls](/images/articles/vmgirls.webp)

The pictures are basically high-definition big pictures of about 2000px, collecting resources and eye-catching are very good.

The site structure is very simple. You can use regular matching or frameworks directly. This article introduces crawling using cheerio framework.

## 2. Analysis

![vmgirls-category](/images/articles/vmgirls-category.webp)

Whether it is a nav column or a directory on the homepage, the categories are particularly complex and incomplete.

![vmgirls-recommend](/images/articles/vmgirls-recommend.webp)

Finalize the thematic recommendation page only divides all the atlases into two categories, and can be loaded by pull-down refresh

![vmgirls-html](/images/articles/vmgirls-html.webp)

Looking at the page, you can see that the interface is rendered in segments. That is to open the page and initially render eight atlases by clicking to load more, then request data from the server, and then refresh the page

![vmgirls-more](/images/articles/vmgirls-more.webp)

F12 developer mode watch request

![vmgirls-post](/images/articles/vmgirls-post.webp)

Every time you click more, a POST request is sent with four parameters

![vmgirls-post_](/images/articles/vmgirls-post_.webp)

Comparing the two requests, it can be preliminarily judged that the parameters to determine the data result should be query and paged Use ajax to try to request data

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

The returned result is the same as expected, and a set of 8 atlases corresponding to data are obtained

```javascript
const page = 1
// options Light Private Room/Ms.
const category = 'Miss'
const data = `append=list-archive&paged=${i}&action=ajax_load_posts&query=${encodeURI(
  category
)}&page=tax`
```

Decide the number of photos to download through the page Number of photos = page × 8 Category = Miss Sister / Light Private Room

![vmgirls-detail](/images/articles/vmgirls-detail.webp)

Use cheerio library, pass in selector, capture element

```javascript
const $ = cheerio.load(res)
const $arr = $('.col-6 .list-item .media a')
```

The img element is not selected here, and the test found that the rendering result of the imgsrc attribute is different from the source code.

It should be some kind of anti-crawler js script executed.

The data-src is the same, but the webp image format cannot be written through axios arraybuffer

![vmgirls-src](/images/articles/vmgirls-src.webp)

To finalize the capture of the a element, you only need to send the required ajax request to obtain the atlas and then download the corresponding image through the atlas.

## 3. Finished product display

![vmgirls-result_](/images/articles/vmgirls-result_.webp)

![vmgirls-result](/images/articles/vmgirls-result.webp)

![vmgirls-result__](/images/articles/vmgirls-result__.webp)

## Four, code implementation

The function has been encapsulated. Change the global variables page, category. Execute tsc, node can be

Precautions

- axios POST request does not get the desired result
- Very few details page layouts use ul li layout, this code does not include
- The vgirls server is a little stuck, and the pictures are all large in size. The axios timeout attribute can be appropriately extended
- webp image format cannot be downloaded using axios arraybuffer

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
// options Light Private Room/Ms.
const category = 'Miss'

const vmGirls: IvmGirls = async () => {
  // Get the ajax request data arr
  const dataArr = getDataArr()
  // Get the details page url arr
  const detailArr = await getDetailArr(dataArr)
  // get imgurl arr
  const imgArr = await getImgArr(detailArr)
  // download image
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
