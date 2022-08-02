# Github-Pr

## fork the project you want to participate in

There are many excellent open source projects on github. Many times we are not only satisfied with using, but also want to participate in the development of open source projects and contribute our own code. Today's article will show you how to submit PR on github, let's contribute to the open source community together.

Find the open source project you want to participate in on github (here, ant-design is used as an example), and then click the fork button in the upper right corner, a copy of this open source project will be created in your own code repository, and all subsequent code submissions will be made commit to this repo so you don't have to worry about unreviewed code messing up the original repo.

![pr-fork](/images/articles/pr-fork.png)

After completing the fork step, a copy of the open source project you want to participate in will be created in your own code repository.

## Clone the new repository to local

Execute the git clone command to clone this copy locally (ssh is recommended to avoid entering a user name and password).

```sh
git clone git@github.com:astonishqft/ant-design.git
```

## Modify the code and submit

Create a local branch and make code changes:

```sh
git checkout -b dev origin/master
```

After modification, submit the changed code:

```sh
git add xxx
git commit -m 'xxx commit'
git push -u orign dev:master
```

At this point, the code has been successfully modified and submitted to your fork repository. In theory, PR can be submitted. However, you need to consider that in the process of modifying the code, the open source repository may also submit the code synchronously, so you need to do a code synchronization operation before submitting the PR.

If you are sure that the repository has not changed, you can skip the synchronization operation

Use the `git remote` command to establish a link between the original repository and the local repository.

```sh
git remote add upstream git@github.com:ant-design/ant-design.git
```

Execute the git fetch upstream command to get the updates of the remote host to the local.

```sh
git fetch upstream
```

Execute the `git rebase` command to merge the updates. The difference between `git rebase` and `git merge` is that `git rebase` forms a line. It is recommended that you use the `git rebase` command.

```sh
git rebase upstream/master
```

If a conflict is encountered, execute the following command after resolving the conflict.

```sh
git add conflicting files
git rebase --continue
```

At this point, the preparations before PR are all completed, and the PR operation can be performed.

## Submit PR

Open the open source project fork on github and create a pull request.

Carefully read the author's Pr detailed specification, and submit according to the specification for review
