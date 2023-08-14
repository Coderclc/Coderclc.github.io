# Vuepress Search

The official [Vuepress Search](https://v2.vuepress.vuejs.org/zh/reference/plugin/docsearch.html) provides two search plugins, you now see the search box in the upper right corner of the page

## Search

<NpmBadge package="@vuepress/plugin-search" />

Provides local search capabilities for your documentation website.

The plugin generates a search index locally based on your page, and then loads the search index file when a user visits your site. In other words, it's a lightweight built-in search capability that doesn't make any external requests. He can only perform simple route search, and recommends you to use a more mature solution - docsearch.

##Docsearch

Integrate Algolia DocSearch into VuePress to provide search functionality to your documentation site.

You need to [submit your website URL](https://docsearch.algolia.com/apply) to join the DocSearch project. When your index is successfully created, the DocSearch team will send the apiKey and indexName to your email. Next, you can configure the plugin to enable DocSearch in VuePress.

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
          placeholder: 'Search documents',
          translations: {
            button: {
              buttonText: 'Search document',
              buttonAriaLabel: 'Search Documentation'
            },
            modal: {
              searchBox: {
                resetButtonTitle: 'Clear query conditions',
                resetButtonAriaLabel: 'Clear query conditions',
                cancelButtonText: 'Cancel',
                cancelButtonAriaLabel: 'Cancel'
              },
              startScreen: {
                recentSearchesTitle: 'Search history',
                noRecentSearchesText: 'No search history',
                saveRecentSearchButtonTitle: 'Save to search history',
                removeRecentSearchButtonTitle: 'Remove from search history',
                favoriteSearchesTitle: 'Favorites',
                removeFavoriteSearchButtonTitle: 'Remove from Favorites'
              },
              errorScreen: {
                titleText: 'Unable to get results',
                helpText: 'You may need to check your network connection'
              },
              footer: {
                selectText: 'Select',
                navigateText: 'Switch',
                closeText: 'close',
                searchByText: 'Search provider'
              },
              noResultsScreen: {
                noResultsText: 'Unable to find relevant results',
                suggestedQueryText: 'You can try to query',
                reportMissingResultsText: 'Do you think this query should have results? ',
                reportMissingResultsLinkText: 'Click Feedback'
              }
            }
          }
        }
      }
    }),
```

You will receive a confirmation email in about three days, and you will receive your `appId` `apiKey` `indexName` in about a day after replying to the confirmation.

Filled in the parameters with joy, but the result could not be searched

Log in to [Algolia](https://www.algolia.com/account/api-keys/all?applicationId=BXVCMB3WP4) to view the datasets crawled by your index

![search-algolia](/images/articles/search-algolia.png)

If there is a dataset but the data is wrong, you can only use the officially provided custom crawler solution [Run your own](https://docsearch.algolia.com/docs/legacy/run-your-own/)

Prepare the `config.json` configuration file

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

run crawler

We run the crawler on the server, the system is Debian 10. First of all, you need to install jq, a simple and powerful json parsing tool, which can be done with one line of command.

`yum install jq`

Then pull the Docker image and run the crawler, pay attention to modifying the path of the configuration file.

Copy successfully

```sh
docker run -it --env APPLICATION_ID=APPLICATION_ID --env API_KEY=API_KEY -e "CONFIG=$(cat /root/docsearch/config.json | jq -r tostring)" algolia/docsearch-scraper
```

After waiting for the crawler to finish running, you can see the results in the console. The index storage limit of the free version is 10,000.

Finally, go to the Algolia console to view `Search-Only API Key` and fill in `Vuepress`

::: tip New content, new documents need to re-crawl to get the dataset
