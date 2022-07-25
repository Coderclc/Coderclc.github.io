import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarZh: NavbarConfig = [
  {
    text: '文档',
    children: [
      {
        text: '前端',
        children: ['/zh/frontend/html.md','/zh/frontend/css.md']
      },
      {
        text: '后端',
        children: ['/zh/backend/mysql.md']
      }
    ]
  }
]
