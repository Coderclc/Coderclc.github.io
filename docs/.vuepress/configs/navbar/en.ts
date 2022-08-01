import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarEn: NavbarConfig = [
  {
    text: 'Docs',
    children: [
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
          '/frontend/vue2.md',
          '/frontend/vue3.md',
          '/frontend/vue-cli2.md',
          '/frontend/vue-router.md',
          '/frontend/vuex.md',
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
    ]
  },
  {
    text: 'Articles',
    children: [
      '/articles/js-class.md',
      '/articles/js-this',
      '/articles/js-promise',
      '/articles/js-async&&await',
      '/articles/ts-generics.md',
      '/articles/ts-interfaces.md',
      '/articles/node-crawl-vmgirls-photo.md',
      '/articles/webpack-frontend-automated-imports.md',
      '/articles/github-pr.md'
    ]
  },
  {
    text: 'Awesome',
    link: '/awesome/'
  }
]
