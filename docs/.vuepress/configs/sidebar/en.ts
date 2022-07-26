import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarEn: SidebarConfig = [
  {
    text: 'Front End',
    children: ['/frontend/html.md', '/frontend/css.md', '/frontend/vuepress.md']
  },
  {
    text: 'Back End',
    children: ['/backend/mysql.md', '/backend/node.md']
  },
  {
    text: 'O&M',
    children: ['/ops/github.md']
  }
]
