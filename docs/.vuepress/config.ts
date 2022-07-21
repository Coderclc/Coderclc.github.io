import { defineUserConfig } from 'vuepress'

const taskLists = require('markdown-it-task-lists')

const footnote = require('markdown-it-footnote')

export default defineUserConfig({
  lang: 'zh-CN',
  title: '你好， VuePress ！',
  description: '这是我的第一个 VuePress 站点',
  markdown: {
    linkify: true
  },
  extendsMarkdown(md) {
    md.use(taskLists).use(footnote)
  }
})
