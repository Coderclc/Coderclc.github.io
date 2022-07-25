import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarEn: NavbarConfig = [
  {
    text: 'Docs',
    children: [
      {
        text: 'Front End',
        children: ['/frontend/html.md','/frontend/css.md']
      },
      {
        text: 'Back End',
        children: ['/backend/mysql.md']
      }
    ]
  }
]
