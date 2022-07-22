import { defineUserConfig, defaultTheme } from 'vuepress'

const taskLists = require('markdown-it-task-lists')

const footnote = require('markdown-it-footnote')

export default defineUserConfig({
  head: [['link', { rel: 'icon', href: '/images/favicon.ico' }]],
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Full Stack',
      description: 'Full Stack Development Review'
    },
    '/zh/': {
      lang: '简体中文',
      title: '全栈',
      description: '全栈开发回顾'
    }
  },
  markdown: {
    linkify: true
  },
  extendsMarkdown(md) {
    md.use(taskLists).use(footnote)
  }
})
