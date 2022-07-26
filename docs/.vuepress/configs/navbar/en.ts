import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarEn: NavbarConfig = [
  {
    text: 'Docs',
    children: [
      {
        text: 'Front End',
        children: ['/frontend/html.md', '/frontend/css.md', '/frontend/vuepress.md']
      },
      {
        text: 'Back End',
        children: ['/backend/mysql.md','/backend/node.md']
      },
      {
        text: 'O&M',
        children: ['/ops/github.md']
      }
    ]
  }
]
