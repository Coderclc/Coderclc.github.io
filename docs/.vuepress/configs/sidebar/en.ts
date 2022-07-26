import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarEn: SidebarConfig = [
  {
    text: 'Front End',
    children: [
      '/frontend/html.md',
      '/frontend/css.md',
      '/frontend/scss.md',
      '/frontend/jsx.md',
      '/frontend/typescript.md',
      '/frontend/workflow.md',
      '/frontend/vuepress.md'
    ]
  },
  {
    text: 'Back End',
    children: ['/backend/node.md', '/backend/script.md']
  },
  {
    text: 'O&M',
    children: ['/ops/github.md']
  }
]
