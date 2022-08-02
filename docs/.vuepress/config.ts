import { defineUserConfig, defaultTheme } from 'vuepress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { head, navbarEn, navbarZh, sidebarEn, sidebarZh } from './configs'
import { searchPlugin } from '@vuepress/plugin-search'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'

const taskLists = require('markdown-it-task-lists')
const footnote = require('markdown-it-footnote')
const { path } = require('@vuepress/utils')

const isProd = process.env.NODE_ENV === 'production'

export default defineUserConfig({
  // set site base to default value
  base: '/',

  // extra tags in `<head>`
  head,

  // site-level locales config
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Full Stack',
      description: 'Full Stack Development Review'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: '全栈',
      description: '全栈开发回顾'
    }
  },

  // configure default theme
  theme: defaultTheme({
    logo: '/images/hero.png',
    repo: 'Coderclc/coderclc.github.io',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinkPattern: ':repo/edit/:branch/:path',

    // theme-level locales config
    locales: {
      /**
       * English locale config
       *
       * As the default locale of @vuepress/theme-default is English,
       * we don't need to set all of the locale fields
       */
      '/': {
        selectLanguageName: 'English',
        navbar: navbarEn,
        sidebar: sidebarEn,
        // page meta
        editLinkText: 'Edit this page on GitHub'
      },

      /**
       * Chinese locale config
       */
      '/zh/': {
        // navbar
        navbar: navbarZh,
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        // sidebar
        sidebar: sidebarZh,
        // page meta
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        // custom containers
        tip: '提示',
        warning: '注意',
        danger: '警告',
        // 404 page
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接'
        ],
        backToHome: '返回首页',
        // a11y
        openInNewWindow: '在新窗口打开',
        toggleColorMode: '切换颜色模式',
        toggleSidebar: '切换侧边栏'
      }
    },

    themePlugins: {
      // only enable git plugin in production mode
      git: isProd,
      // use shiki plugin in production mode instead
      prismjs: !isProd
    }
  }),

  // markdown
  markdown: {
    linkify: true,
    code:{lineNumbers:false}
  },
  extendsMarkdown(md) {
    md.use(taskLists).use(footnote)
  },

  // use plugins
  plugins: [
    // search
    docsearchPlugin({
      appId: '34YFD9IUQ2',
      apiKey: '9a9058b8655746634e01071411c366b8',
      indexName: 'vuepress',
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
    // searchPlugin({
    //   locales: {
    //     '/': {
    //       placeholder: 'Search'
    //     },
    //     '/zh/': {
    //       placeholder: '搜索'
    //     }
    //   },
    //   hotKeys: [
    //     {
    //       key: 'f',
    //       ctrl: true
    //     }
    //   ],
    //   maxSuggestions: 5,
    //   isSearchable: page => page.path !== '/'
    // }),

    // .vue
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components')
    }),

    // only enable shiki plugin in production mode
    isProd ? shikiPlugin({ theme: 'dark-plus' }) : [],

    googleAnalyticsPlugin({
      // we have multiple deployments, which would use different id
      id: process.env.DOCS_GA_ID ?? ''
    })
  ]
})
