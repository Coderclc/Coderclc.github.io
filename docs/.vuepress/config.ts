import { defineUserConfig, defaultTheme } from 'vuepress'

const taskLists = require('markdown-it-task-lists')

const footnote = require('markdown-it-footnote')

export default defineUserConfig({
  head: [['link', { rel: 'icon', href: '/images/favicon.ico' }]],
  locales: {
    '/': {
      lang: 'English',
      title: 'Full Stack',
      description: 'Full Stack Development Review'
    },
    '/zh/': {
      lang: '简体中文',
      title: '全栈',
      description: '全栈开发回顾'
    }
  },
  // theme
  theme: defaultTheme({
    locales: {
      '/': {
        selectLanguageName: 'English',
        navbar: [
          {
            text: 'Docs',
            children: [
              {
                text: 'Front End',
                children: ['/front-end/html.md']
              },
              {
                text: 'Back End',
                children: ['/back-end/mysql.md']
              }
            ]
          }
        ],
        sidebar: [
          {
            text: 'Front End',
            children: ['/front-end/html.md']
          },
          {
            text: 'Back End',
            children: ['/back-end/mysql.md']
          }
        ]
      },
      '/zh/': {
        selectLanguageName: '简体中文',
        navbar: [
          {
            text: '文档',
            children: [
              {
                text: '前端',
                children: ['/zh/front-end/html.md']
              },
              {
                text: '后端',
                children: ['/zh/back-end/mysql.md']
              }
            ]
          }
        ],
        sidebar: [
          {
            text: '前端',
            children: ['/zh/front-end/html.md']
          },
          {
            text: '后端',
            children: ['/zh/back-end/mysql.md']
          }
        ]
      }
    }
  }),
  // markdown
  markdown: {
    linkify: true
  },
  extendsMarkdown(md) {
    md.use(taskLists).use(footnote)
  }
})
