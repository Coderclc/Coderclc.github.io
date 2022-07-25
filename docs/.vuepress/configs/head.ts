// import type { HeadConfig } from '@vuepress/core'

export const head = [
  [
    'link',
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: `/images/icons/favicon-16x16.png`
    }
  ],
  [
    'link',
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: `/images/icons/favicon-32x32.png`
    }
  ],
  ['meta', { name: 'application-name', content: 'Full Stack' }],
  ['meta', { name: 'apple-mobile-web-app-title', content: 'Full Stack' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ['meta', { name: 'msapplication-TileColor', content: '#3eaf7c' }],
  ['meta', { name: 'theme-color', content: '#3eaf7c' }]
]
