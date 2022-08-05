import { defineClientConfig } from '@vuepress/client'

import VConsole from 'vconsole'

const vConsole = new VConsole()

export default defineClientConfig({
  enhance({ app, router, siteData }) {},
  setup() {},
  rootComponents: []
})
