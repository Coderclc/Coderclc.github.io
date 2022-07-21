import { defineUserConfig } from 'vuepress'

const taskLists = require('markdown-it-task-lists')

const footnote = require('markdown-it-footnote')

export default defineUserConfig({
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'en-US',
      title: 'Review',
      description: 'Full Stack Development Review'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Review',
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
