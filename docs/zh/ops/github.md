# Github

## [Github Docs](https://docs.github.com/cn)

## [Github Actions](https://docs.github.com/cn/actions)

### Github Pages CNAME 丢失问题

[添加 CNAME 文件到你的存储库中](http://doc.yonyoucloud.com/doc/wiki/project/github-pages-basics/cname-file.html)

### Pnpm: command not found

Github Action 中 Pnpm 需要手动安装 [Setup pnpm](https://github.com/marketplace/actions/setup-pnpm)

### Github Action Workflow Can't work

```yml
on:
  # 每当 push 到 master 分支时触发部署
  push:
    branches: [master]
  # 手动触发部署
  workflow_dispatch:
```

```sh
git push // × 无法触发workflow
git push origin master // √ 需指定分支
```

### 缓存依赖项以加快工作流程

```yml
# 缓存 node_modules
name: Cache dependencies
uses: actions/cache@v2
id: pnpm-cache
with:
  path: |
    **/node_modules
  key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/pnpm-lock.yaml') }}
  restore-keys: |
    ${{ runner.os }}-build-${{ env.cache-name }}-
    ${{ runner.os }}-build-
    ${{ runner.os }}-
```

`restore-keys` 缓存后续步骤用 if 判断依赖是否安装

### [Ssh Deploy](https://github.com/easingthemes/ssh-deploy)

ssh 链接远程服务器自动部署

1. ssh 创建时采用 PEM 格式 不然会报错`Load key “/home/runner/.ssh/deploy_key”: invalid format`

2. 将公钥写入`.ssh/authorized_keys `中,`vim ~/.ssh/authorized_keys `,且添加到 github SSH keys

3. 私钥作为 `SSH_PRIVATE_KEY: ${{ secrets.SERVER_SSH_KEY }}` 在工作流中上传

4. 采用 github Secrets actions 环境添加敏感数据

## [Gitpod](https://www.gitpod.io/)

自动化和现成代码开发环境

```yaml
ports:
  - port: 2333
    onOpen: open-preview
tasks:
  - init: yarn
    command: yarn dev
```
