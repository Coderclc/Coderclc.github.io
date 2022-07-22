import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarZh: NavbarConfig = [
  {
    text: '文档',
    children: [
      {
        text: '前端',
        children: ['/zh/front-end/html.md']
      },
      {
        text: '后端',
        children: ['/zh/back-end/mysql.md']
      }
    ]
  }
]
