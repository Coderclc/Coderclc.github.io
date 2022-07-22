import { defineClientConfig } from '@vuepress/client'

import '@vuepress/plugin-palette/palette';
import '@vuepress/plugin-palette/style';


export default defineClientConfig({
  enhance({ app, router, siteData }) {},
  setup() {},
  rootComponents: []
})
