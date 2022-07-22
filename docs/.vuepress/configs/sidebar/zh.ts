import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = [
  {
    text: '前端',
    children: ['/zh/front-end/html.md']
  },
  {
    text: '后端',
    children: ['/zh/back-end/mysql.md']
  }
]
