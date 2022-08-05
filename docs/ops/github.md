# Github

## [Github Docs](https://docs.github.com/cn)

## [Github Actions](https://docs.github.com/cn/actions)

### Github Pages CNAME missing issue

[Add the CNAME file to your repository](http://doc.yonyoucloud.com/doc/wiki/project/github-pages-basics/cname-file.html)

### Pnpm: command not found

Pnpm in Github Action needs to be manually installed [Setup pnpm](https://github.com/marketplace/actions/setup-pnpm)

### Github Action Workflow Can't work

````yml
on:
  # trigger deployment whenever push to master branch
  push:
    branches: [master]
  # Manually trigger deployment
  workflow_dispatch:
````

````sh
git push // × cannot trigger workflow
git push origin master // √ Need to specify branch
````

### Cache dependencies to speed up workflow

````yml
# cache node_modules
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
````

`restore-keys` caches subsequent steps and uses if to determine whether dependencies are installed

### [SSH Deploy](https://github.com/easingthemes/ssh-deploy)

ssh link remote server automatic deployment

1. ssh is created in PEM format, otherwise an error will be reported `Load key "/home/runner/.ssh/deploy_key": invalid format`

2. Write the public key into `.ssh/authorized_keys`, `vim ~/.ssh/authorized_keys`, and add it to github SSH keys

3. The private key is uploaded in the workflow as `SSH_PRIVATE_KEY: ${{ secrets.SERVER_SSH_KEY }}`

4. Use github Secrets actions environment to add sensitive data

## [Gitpod](https://www.gitpod.io/)

Automated and off-the-shelf code development environments

````yaml
ports:
  - port: 2333
    onOpen: open-preview
tasks:
  - init: yarn
    command: yarn dev
````