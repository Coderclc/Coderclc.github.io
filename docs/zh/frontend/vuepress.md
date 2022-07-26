# VuePress

## Bug Fix

### @vuepress/client <NpmBadge package="@vuepress/client" />

**问题描述:**

某次更新依赖后控制台报错

```js
config.js?t=1658805552990:10
Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'value')
```

**原因分析:**

断点检测发现为`@vuepress/client` 包中的 Symbol 值 `routeLocaleSymbol` 不存在 `app._context.provides`中

检查发现执行命令`pnpm i @vuepress/client` 安装的版本与`vuepress` 不符合

```json
"dependencies": {
  "@vuepress/client": "2.0.0-beta.45",
  "vuepress": "^2.0.0-beta.49"
},
```

**解决方案:**

修改安装命令为 `pnpm i @vuepress/client@next`
