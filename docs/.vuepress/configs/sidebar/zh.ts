import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = [
  {
    text: '前端',
    children: ['/zh/frontend/html.md', '/zh/frontend/css.md', '/zh/frontend/vuepress.md']
  },
  {
    text: '后端',
    children: ['/zh/backend/mysql.md', '/zh/backend/node.md']
  },
  {
    text: '运维',
    children: ['/zh/ops/github.md']
  }
]
