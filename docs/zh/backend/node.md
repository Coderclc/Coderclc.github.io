# Node

## [Npm](https://www.npmjs.com/)

### Package.json

- 版本号 ~ 和 ^ 的区别

  - x.x.x 分别为 大版本.次要版本.小版本
  - 指定版本：比如 1.2.2,安装时只安装指定版本。
  - ~号（tilde）+指定版本：比如~1.2.2，表示安装 1.2.x 的最新版本（不低于 1.2.2），但是不安装 1.3.x，也就是说安装时不改变大版本号和次要版本号。
  - ^号（caret）+指定版本：比如 ˆ1.2.2，表示安装 1.x.x 的最新版本（不低于 1.2.2），但是不安装 2.x.x，也就是说安装时不改变大版本号
  - 需要注意的是，如果大版本号为 0，则^号的行为与~号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。

- engines 限制node环境
  ```json
    "engines": {
      "node": "^12 || >=14"
    }
  ```

## [Pnpm](https://pnpm.io/zh/)

### CLI

--frozen-lockfile

如果设置 true, pnpm 不会生成 lockfile 且如果 lockfile 跟 manifest 不同步/ 文件需要更新或不存在 lockfile 则会安装失败.

## [Yarn](https://yarnpkg.com/)

### [Autoclean](https://yarn.bootcss.com/docs/cli/autoclean/)

autoclean 默认关闭.当`.yarnclean`文件存在于包中时，以下情况之后将启用自动清理功能

1. install 之后
2. add 之后
3. `yarn autoclean --force`运行
