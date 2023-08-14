# Vuepress Search

官方 [Vuepress Search](https://v2.vuepress.vuejs.org/zh/reference/plugin/docsearch.html)提供了两种搜索插件,既你现在看到页面的右上角搜索框

## Search

<NpmBadge package="@vuepress/plugin-search" />

为你的文档网站提供本地搜索能力。

该插件会根据你的页面，在本地生成搜索索引，然后在用户访问站点时加载搜索索引文件。换句话说，这是一个轻量级的内置搜索能力，不会进行任何外部请求。他仅仅只能进行简单的路由搜索,建议你使用更成熟的解决方案 - docsearch 。

## Docsearch

将 Algolia DocSearch 集成到 VuePress 中，为你的文档网站提供搜索功能。

你需要 [提交你的网站 URL](https://docsearch.algolia.com/apply) 来加入 DocSearch 项目。当你的索引成功创建后， DocSearch 团队会将 apiKey 和 indexName 发送到你的邮箱。接下来，你就可以配置该插件，在 VuePress 中启用 DocSearch 了。

```javascript
const { docsearchPlugin } = require('@vuepress/plugin-docsearch')

 docsearchPlugin({
      appId: 'BXVCMB3WP4',
      apiKey: '1f1ea2c1822461715676a7ee0955d200',
      indexName: 'chenlicheng',
      searchParameters: {
        facetFilters: ['tags:v2']
      },
      locales: {
        '/zh/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
              buttonAriaLabel: '搜索文档'
            },
            modal: {
              searchBox: {
                resetButtonTitle: '清除查询条件',
                resetButtonAriaLabel: '清除查询条件',
                cancelButtonText: '取消',
                cancelButtonAriaLabel: '取消'
              },
              startScreen: {
                recentSearchesTitle: '搜索历史',
                noRecentSearchesText: '没有搜索历史',
                saveRecentSearchButtonTitle: '保存至搜索历史',
                removeRecentSearchButtonTitle: '从搜索历史中移除',
                favoriteSearchesTitle: '收藏',
                removeFavoriteSearchButtonTitle: '从收藏中移除'
              },
              errorScreen: {
                titleText: '无法获取结果',
                helpText: '你可能需要检查你的网络连接'
              },
              footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭',
                searchByText: '搜索提供者'
              },
              noResultsScreen: {
                noResultsText: '无法找到相关结果',
                suggestedQueryText: '你可以尝试查询',
                reportMissingResultsText: '你认为该查询应该有结果？',
                reportMissingResultsLinkText: '点击反馈'
              }
            }
          }
        }
      }
    }),
```

大概三天左右会收到一个确认的邮件,回复确认之后大约一天左右就可以收到你的 `appId` `apiKey` `indexName` 了

满怀欣喜的填上参数,结果却无法搜索

登录[Algolia](https://www.algolia.com/account/api-keys/all?applicationId=BXVCMB3WP4)查看你的 index 爬取的数据集

![search-algolia](/images/articles/search-algolia.png)

有数据集但是数据有误,只能采用官方提供的自定义爬虫方案[Run your own](https://docsearch.algolia.com/docs/legacy/run-your-own/)

准备好 `config.json` 配置文件

```json
{
  "index_name": "chenlicheng",
  "start_urls": [
    {
      "url": "https://www.chenlicheng.lol/",
      "selectors_key": "v2",
      "tags": ["v2"]
    }
  ],
  "stop_urls": [],
  "selectors": {
    "v2": {
      "lvl0": {
        "selector": ".sidebar-heading.active",
        "global": true,
        "default_value": "Documentation"
      },
      "lvl1": ".theme-default-content h1",
      "lvl2": ".theme-default-content h2",
      "lvl3": ".theme-default-content h3",
      "lvl4": ".theme-default-content h4",
      "lvl5": ".theme-default-content h5",
      "text": ".theme-default-content p, .theme-default-content li",
      "lang": {
        "selector": "/html/@lang",
        "type": "xpath",
        "global": true
      }
    }
  },
  "scrape_start_urls": false,
  "strip_chars": " .,;:#",
  "custom_settings": {
    "attributesForFaceting": ["lang", "tags"]
  }
}
```

运行爬虫

我们在服务器上运行爬虫，系统为 Debian 10。首先需要安装 jq，一个简单而又强大的 json 解析工具，一行命令就搞定。

`yum install jq`

接着拉取 Docker 镜像，并运行爬虫，注意修改配置文件的路径。

复制成功

```sh
docker run -it --env APPLICATION_ID=APPLICATION_ID --env API_KEY=API_KEY -e "CONFIG=$(cat /root/docsearch/config.json | jq -r tostring)" algolia/docsearch-scraper
```

等待爬虫运行结束，就可以在控制台看到结果了，免费版的索引存储上限是 10000 条。

最后再去 Algolia 控制台查看`Search-Only API Key` 填入`Vuepress`即可

::: tip 新的内容,新的文档需要重新爬虫获取数据集
