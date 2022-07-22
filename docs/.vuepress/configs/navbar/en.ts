import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarEn: NavbarConfig = [
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
]
