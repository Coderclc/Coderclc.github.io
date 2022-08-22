# Mac Shell

Install `pnpm` globally via `npm` when learning to use the Mac Shell

error

`The operation was rejected by your operating system`

View the npm global installation location `npm get config prefix` is the system disk under `/usr/local`

A better solution is to modify the location of the npm global installation script

`npm config set prefix '~/.npm/_global'`

At this point, executing `npm install pnpm -g` will install it to the `'~/.npm/_global'` location, but still cannot find `pnpm` in the shell

Because it is not added to the shell PATH environment, there are two types of mac shells, `bash` and `zsh`

The user-defined PATh script under `bash` is `.bash_profile` corresponding to `.zprofile` under `zsh`

For example, `echo export PATH=~/.npm/_global/bin:$PATH > ~/.bash_profile` under bash is updating the shell with source `source ~/.bash_profile`

zsh is the same
