# Workflow

## Husky

Git hooks 工具.对 git 执行的一些命令，通过对应的 hooks 钩子触发，执行自定义的脚本程序

## Lint-staged

检测文件插件 ,只检测 git add . 中暂存区的文件，对过滤出的文件执行脚本

## Eslint

插件化 JavaScript 代码检测工具.Js 编码规范，检测并提示错误或警告信息

## Prettier

代码格式化工具. 代码风格管理，更好的代码风格效果

## Pretty-quick

eslint 文件后再次执行 [Prettier](https://prettier.io/)

```sh
#!/bin/sh
# . "$(dirname "$0")/_/husky.sh"
. "$(dirname "$0")/common.sh"

[ -n "$CI" ] && exit 0

# Format and submit code according to lintstagedrc.js configuration
npm run lint:lint-staged

npm run lint:pretty

```

## Editorconfig

文件代码规范保持多人开发一致编码样式

## Commitlint

代码提交检测. 检测 git commit 内容是否符合定义的规范

## Commitizen

代码提交内容标准化提示定义输入标准的 git cz 内容

## Conventional

git commit 日志

## Vscode

### Auto Rename Tag

### Code Spell Checker

### AZ AL Dev Tools/AL Code Outline

### Better Comments

### DotENV

### Eslint

### GitLens — Git supercharged

### Guides

### i18n Ally

### Iconify IntelliSense

### JavaScript (ES6) code snippets

### Less IntelliSense

### Live Server

### Lorem ipsum

### Material Icon Theme

### Mithril Emmet

### Nested Comments

### Prettier - Code formatter

### Project Manager

### Quokka.js

### Stylelint

### Todo Tree

### TS in Markdown

### Vue Language Features (Volar)

### WindiCSS IntelliSense

### WakaTime

### Settings Sync

GitHub Gist: 9711955bc856f4d527c3f15c1bac8ed8
