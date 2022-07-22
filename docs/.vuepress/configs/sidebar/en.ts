import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarEn: SidebarConfig = [
  {
    text: 'Front End',
    children: ['/front-end/html.md']
  },
  {
    text: 'Back End',
    children: ['/back-end/mysql.md']
  }
]
