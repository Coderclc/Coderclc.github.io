# Git

## Working status

Working directory workspace add -> Staging temporary storage area commit -> Local Repository local warehouse

## File status

Four statuses of files: Untracked, Unmodified, Modified, Staged

## Commands

### Config

`git config --global user.name`

`git config --global user.email`

### Restore

`git restore ./<file>` Reverts all changes to /file workspace

`git restore —staged ./<file>` Restores all changes in the /file staging area to the workspace

### Reset

`git reset`

- `—mixed` The default is `mixed` to roll back to a certain version and leave all changes in the workspace
- `-soft` rolls back to a certain version and leaves all changes in the staging area
- `—hard` discard all changes

### Reflog

`git reflog` operation history

### Ls-Files

`git ls-files` View the contents of the staging area

## Commit

`git commit -a -m ''`

`git commit -am ''`

## Rm

`git rm <file>` deletes files from the workspace and staging area

`git rm —cached <file>` The file is deleted from the staging area and retained in the workspace

## Log

`git log --graph --oneline --decorate -all`

## Rebase

`git rebase` finds the ancestors of the current branch and the target branch, and then grafts the commit after the common ancestor of the current branch to the target branch

## Review

- .gitignore cannot be a file that has been added to the repository

- alias graph="git log --graph --oneline --decorate"

- git config --global alias.graph "log --graph --oneline --decorate"
