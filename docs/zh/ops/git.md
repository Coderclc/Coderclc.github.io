# Git

## 工作状态

Working directory 工作区 add -> Staging 暂存区 commit -> Local Repository 本地仓库

## 文件状态

文件的四种状态：未跟踪（Untrack）未修改（Unmodified）已修改（Modified）已暂存（Staged)

## 指令

### Config

`git config --global user.name`

`git config --global user.email`

### Restore

`git restore ./<file>` 还原所有/file 工作区的改变

`git restore —staged ./<file>` 还原所有/file 暂存区的改变到工作区的

### Reset

`git reset`

- `—mixed` 默认是`mixed`回退到某一个版本 并且所有改变留在工作区
- `-soft` 回退到某一个版本 并且所有改变留在暂存区
- `—hard` 丢弃所有改变

### Reflog

`git reflog` 操作历史记录

### Ls-Files

`git ls-files` 查看暂存区的内容

## Commit

`git commit -a -m ''`

`git commit -am ''`

## Rm

`git rm <file>` 把文件从工作区和暂存区中删除

`git rm —cached <file>` 文件从暂存区中删除，工作区保留

## Log

`git log --graph --oneline --decorate -all`

## Rebase

`git rebase` 找到当前分支和目标分支的祖先，然后将当前分支的共同祖先后的 commit 嫁接到目标分支的后面

## Review

- .gitignore 不能是已经被添加到版本库中的文件

- alias graph="git log --graph --oneline --decorate"

- git config --global alias.graph "log --graph --oneline --decorate"
