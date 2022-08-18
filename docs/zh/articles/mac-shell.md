# Mac Shell

在学习使用 Mac Shell 时 通过 `npm` 全局安装 `pnpm`

报错 error

`The operation was rejected by your operating system`

查看 npm 全局安装位置`npm get config prefix` 在 `/usr/local`下为系统盘

比较好的方案是修改 npm 全局安装脚本位置

`npm config set prefix ‘~/.npm/_global’`

此时再执行 `npm install pnpm -g` 就会安装到 `‘~/.npm/_global’` 位置处 ，但是在 shell 中仍然找不到`pnpm`

因为没有添加到 shell PATH 环境中 mac shell 有两种，分别为 `bash` 和 `zsh`

`bash` 下用户自定义 PATh 脚本为 `.bash_profile `对应 `zsh` 下的为 `.zprofile`

例如 bash 下 `echo export PATH=~/.npm/_global/bin:$PATH > ~/.bash_profile` 在使用 source 更新 shell `source ~/.bash_profile`

zsh 同理
