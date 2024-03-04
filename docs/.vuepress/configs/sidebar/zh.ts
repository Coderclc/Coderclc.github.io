import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
  '/': [
    {
      text: '前端',
      children: [
        '/zh/frontend/html.md',
        '/zh/frontend/css.md',
        '/zh/frontend/scss.md',
        '/zh/frontend/jsx.md',
        '/zh/frontend/javascript.md',
        '/zh/frontend/typescript.md',
        '/zh/frontend/webpack.md',
        '/zh/frontend/vue.md',
        '/zh/frontend/workflow.md',
        '/zh/frontend/vuepress.md'
      ]
    },
    {
      text: '后端',
      children: [
        '/zh/backend/node.md',
        '/zh/backend/script.md',
        '/zh/backend/mysql.md',
        '/zh/backend/python.md'
      ]
    },
    {
      text: '算法',
      children: [
        '/zh/algorithm/base-element.md',
        '/zh/algorithm/data-structure.md',
        '/zh/algorithm/sort.md',
        '/zh/algorithm/dynamic-programming.md'
      ]
    },
    {
      text: '运维',
      children: ['/zh/ops/github.md','/zh/ops/git.md']
    }
  ],
  '/zh/articles': [
    {
      children: [
        '/zh/articles/js-class.md',
        '/zh/articles/js-this',
        '/zh/articles/js-promise',
        '/zh/articles/js-async&&await',
        '/zh/articles/ts-generics.md',
        '/zh/articles/ts-interfaces.md',
        '/zh/articles/node-crawl-vmgirls-photo.md',
        '/zh/articles/webpack-frontend-automated-imports.md',
        '/zh/articles/github-pr.md',
        '/zh/articles/deploy-v2ray.md',
        '/zh/articles/vuepress-search.md',
        '/zh/articles/el-collapse-transition.md',
        '/zh/articles/mac-shell.md'
      ]
    }
  ],
  '/zh/awesome/': [
    {
      children: ['/zh/awesome/']
    }
  ]
}
