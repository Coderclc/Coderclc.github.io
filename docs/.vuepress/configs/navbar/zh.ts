import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarZh: NavbarConfig = [
  {
    text: '文档',
    children: [
      {
        text: '前端',
        children: [
          '/zh/frontend/html.md',
          '/zh/frontend/css.md',
          '/zh/frontend/scss.md',
          '/zh/frontend/jsx.md',
          '/zh/frontend/workflow.md',
          '/zh/frontend/vuepress.md'
        ]
      },
      {
        text: '后端',
        children: ['/zh/backend/node.md', '/zh/backend/script.md']
      },
      {
        text: '运维',
        children: ['/zh/ops/github.md']
      }
    ]
  }
]
