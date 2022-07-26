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
          '/frontend/workflow.md',
          '/frontend/vuepress.md'
        ]
      },
      {
        text: 'Back End',
        children: ['/backend/node.md', '/backend/script.md']
      },
      {
        text: 'O&M',
        children: ['/ops/github.md']
      }
    ]
  }
]
