# Github - Pr

## fork 你要参与的项目

github 上有很多优秀的开源项目，很多时候我们不仅仅只是满足于使用，同时也想一起参与开源项目的开发，贡献自己的代码。今天这篇文章就给大家介绍一下如何在 github 上提交 PR，让我们一起为开源社区做贡献。

在 github 上找到你想要参与的开源项目(这里以 ant-design 为例)，然后点击右上角的 fork 按钮，就会在你自己的代码仓库中创建一个此开源项目的副本，后续所有代码提交都提交到此仓库，这样就不必担心未经审核的代码弄乱了原始仓库。

![pr-fork](/images/articles/pr-fork.png)

完成了 fork 步骤后，会在自己的代码仓库中创建一个你想参与的开源项目的副本。

## 克隆新仓库到本地

执行 git clone 命令，将此副本 clone 到本地(推荐使用 ssh 的形式，可以避免输入用户名和密码)。

```sh
git clone git@github.com:astonishqft/ant-design.git
```

## 修改代码并提交

创建一个本地分支，并进行代码修改：

```sh
git checkout -b dev origin/master
```

修改完毕后，提交变更的代码：

```sh
git add xxx
git commit -m 'xxx提交'
git push -u orign dev:master
```

到这里代码已经顺利修改完毕，并且已经提交到了你 fork 的仓库中，理论上已经可以提交 PR 了。但是需要考虑到在你修改代码的过程中，可能开源仓库也在同步提交代码，所以在提交 PR 之前需要做一次代码同步操作。

如果确定仓库没有变化的话可以跳过同步操作

使用 `git remote` 命令建立原始仓库与本地仓库之间的链接。

```sh
git remote add upstream git@github.com:ant-design/ant-design.git
```

执行 git fetch upstream 命令将远程主机的更新获取到本地。

```sh
git fetch upstream
```

执行 `git rebase` 命令合并更新。`git rebase` 和 `git merge` 的区别是 `git rebase` 形成的是一条线，这里推荐大家使用 `git rebase` 命令。

```sh
git rebase upstream/master
```

如果遇到冲突，解决完冲突后执行下面的命令。

```sh
git add 冲突的文件
git rebase --continue
```

到这里，PR 之前的准备工作就全部完成了，可以进行 PR 操作了。

## 提交 PR

打开 github 上 fork 的开源项目，创建一个 pull request。

仔细阅读作者的Pr详细规范,按照规范提交 等待审核
