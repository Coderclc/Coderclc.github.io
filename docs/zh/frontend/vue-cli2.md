# Vue Cli2

- --inline 默认开启,浏览器刷新应用程序启用*内联模式(inline mode)*。一段处理实时重载的脚本被插入到你的包中并且构建消息将会出现在浏览器控制台。

  ```javascript
  log.js?4244:23 [HMR] Waiting for update signal from WDS...
  ```

  使用模块热替换的内联模式，因为它包含来自 websocket 的 HMR 触发器。轮询模式可以为替代方案但需要一个额外的入口点：'webpack/hot/poll?1000`

- --process 将运行进度输送到控制台

- assetsSubDirectory 静态资源存放路径

- assetsPublicPath 静态资源引用路径

- proxyTable 配置代理后端规则

- "--port 8888" 修改运行端口号

- autoOpenBrowser 自启

- errorOverlay 错误覆盖全屏

- notifyOnErrors 错误通知

- poll 定制 watch 模式轮询间隔

- devtool 生成 source map

- cacheBusting 指定是否通过在文件名称后面添加一个查询字符串来创建 source map 的缓存 bug vue devtools 产生 bug,可将其关闭试试

- index index.html 生成路径

- productionSourceMap 生成环境的 sourcemap devtool:'#source-map' 生产环境 map 格式

- productionGzip

  - npm install --save-dev compression-webpack-plugin 必须安装相关依赖
  - HTTP 协议上的 GZIP 编码是一种用来改进 WEB 应用程序性能的技术。大流量的 WEB 站点常常使用 GZIP 压缩技术来让用户感受更快的速度。减少文件大小有两个明显的好处，一是可以减少存储空间，二是通过网络传输文件时，可以减少传输的时间。

- productionGzipExtensions 压缩那些后缀类型文件

- bundleAnalyzerReport 打包编译报告

- extract-text-webpack-plugin css 分离

- path.posix.join path 模块跨平台兼容交互

- 默认不加载 postcssLoader 需配置 vue-loader.conf.js loaders.usePostCSS = true

- css extraction 请只在生产环境下使用 CSS 提取，这将便于你在开发环境下进行热重载。开发环境下提取无法热重载

- ```javascript
  ExtractTextPlugin.extract({
          use: loaders,
          fallback: 'vue-style-loader'
        })
        返回一个数组数组为拼接的所有loader
        [
    {
      loader: 'C:\\Users\\Coderclc\\Documents\\Code\\vue-cli2\\node_modules\\extract-text-webpack-plugin\\dist\\loader.js',
      options: { omit: 1, remove: true }
    },
    { loader: 'vue-style-loader' },
    { loader: 'css-loader', options: { sourceMap: true } },
    { loader: 'postcss-loader', options: { sourceMap: true } }
  ]
  ```

- transformToRequire 默认情况下,vue-loader 处理.vue 文件时,所有的资源路径 img src, background url 会作为模块依赖,需要动态 require 引入,也可以配置 transformToRequire 即不需要动态 require 引入

- entry webpack 查找开始构建 bundle 的地方

- context 入口文件所处的目录的绝对路径的字符串

- node {setImmediate } 防止 Web 包因为 Vue 而注入无用的 setImmediate polyfill source 包含它（尽管只有在它是本机的情况下才使用它）。

- copy-webpack-plugin 在 webpack 中拷贝文件和文件夹

- friendly-errors-webpack-plugin 友好的错误提示插件

- portfinder 自动获取可用的端口
