import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarEn: SidebarConfig = {
  '/': [
    {
      text: 'Front End',
      children: [
        '/frontend/html.md',
        '/frontend/css.md',
        '/frontend/scss.md',
        '/frontend/jsx.md',
        '/frontend/javascript.md',
        '/frontend/typescript.md',
        '/frontend/webpack.md',
        '/frontend/vue.md',
        '/frontend/workflow.md',
        '/frontend/vuepress.md'
      ]
    },
    {
      text: 'Back End',
      children: [
        '/backend/node.md',
        '/backend/script.md',
        '/backend/mysql.md',
        '/backend/python.md'
      ]
    },
    {
      text: 'Algorithm',
      children: [
        '/algorithm/base-element.md',
        '/algorithm/data-structure.md',
        '/algorithm/sort.md',
        '/algorithm/dynamic-programming.md'
      ]
    },
    {
      text: 'O&M',
      children: ['/ops/github.md']
    }
  ],
  '/articles/': [
    {
      children: [
        '/articles/js-class.md',
        '/articles/js-this',
        '/articles/js-promise',
        '/articles/js-async&&await',
        '/articles/ts-generics.md',
        '/articles/ts-interfaces.md',
        '/articles/node-crawl-vmgirls-photo.md',
        '/articles/webpack-frontend-automated-imports.md',
        '/articles/github-pr.md',
        '/articles/deploy-v2ray.md',
        '/articles/vuepress-search.md',
        '/articles/el-collapse-transition'
      ]
    }
  ],
  '/awesome/': [
    {
      children: ['/awesome/']
    }
  ]
}
