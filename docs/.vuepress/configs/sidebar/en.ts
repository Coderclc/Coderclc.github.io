import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarEn: SidebarConfig = [
  {
    text: 'Front End',
    children: ['/frontend/html.md','/frontend/css.md']
  },
  {
    text: 'Back End',
    children: ['/backend/mysql.md']
  }
]
