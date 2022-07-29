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
          '/frontend/workflow.md',
          '/frontend/vuepress.md'
        ]
      },
      {
        text: 'Back End',
        children: ['/backend/node.md', '/backend/script.md']
      },
      {
        text: 'Algorithm',
        children: [
          '/algorithm/base-element.md',
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
      '/articles/webpack-frontend-automated-imports.md'
    ]
  }
]
