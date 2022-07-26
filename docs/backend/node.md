# Node

## Npm

### Package.json

- Difference between version numbers ~ and ^
  - x.x.x are major version.minor version.minor version
  - Specified version: For example, 1.2.2, only the specified version will be installed during installation.
  - ~ number (tilde) + specified version: such as ~1.2.2, it means to install the latest version of 1.2.x (not less than 1.2.2), but not to install 1.3.x, that is to say, the major version number is not changed during installation and the minor version number.
  - ^ number (caret) + specified version: such as ˆ1.2.2, it means to install the latest version of 1.x.x (not lower than 1.2.2), but not to install 2.x.x, that is to say, the major version number is not changed during installation
  - It should be noted that if the major version number is 0, the behavior of the ^ symbol is the same as that of the ~ symbol. This is because it is in the development stage at this time, and even if the minor version number changes, it may cause program incompatibility.

## [Pnpm](https://pnpm.io/en/)

### CLI commands

--frozen-lockfile

If set to true, pnpm will not generate lockfile and install will fail if lockfile is out of sync with manifest/file needs to be updated or lockfile does not exist.
