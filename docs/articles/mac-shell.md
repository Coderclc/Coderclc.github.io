# Mac Shell

When learning to use MAC shell, install 'pnpm' globally through 'NPM'`

Error reported

`The operation was rejected by your operating system`

Check the NPM global installation location. The 'NPM get config prefix' is the system disk under ` / usr / local '

A better solution is to modify the NPM global installation script location

`npm config set prefix ‘~/.npm/_ global’`

At this time, execute 'NPM install pnpm - G' to install to ` ~ / npm/_ 'global' position, but 'pnpm' is still not found in the shell`

Because it is not added to the shell path environment, there are two types of MAC shells, namely `bash 'and` Zsh'`

`The user-defined path script under bash ` is `bash_ Profile` corresponds to `. Zprofile 'under' Zsh '`

For example, 'echo export path = ~ /' under bash npm/_ global/bin:$PATH > ~/. bash_ Profile ` updating shell with source (` source ~ /. Bash)\_ profile`

Zsh homology
