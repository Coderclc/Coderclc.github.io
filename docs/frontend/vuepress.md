# VuePress

## Bug Fixes

### @vuepress/client <NpmBadge package="@vuepress/client" />

**Problem Description:**

The console reports an error after a dependency update

````js
config.js?t=1658805552990:10
Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'value')
````

**Cause Analysis:**

Breakpoint detection found that the Symbol value `routeLocaleSymbol` in the `@vuepress/client` package does not exist in `app._context.provides`

Check and find that the version installed by executing the command `pnpm i @vuepress/client` does not conform to `vuepress`

````json
"dependencies": {
   "@vuepress/client": "2.0.0-beta.45",
   "vuepress": "^2.0.0-beta.49"
},
````

**solution:**

Modify the installation command to `pnpm i @vuepress/client@next`