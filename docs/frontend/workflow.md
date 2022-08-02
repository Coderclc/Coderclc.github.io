# Workflow

## Husky

Git hooks tool. Some commands executed on git are triggered by corresponding hooks to execute custom script programs

## Lint-staged

Detect file plugins, only detect files in the staging area of git add . , and execute scripts on the filtered files

## Eslint

Plug-in JavaScript code detection tool.Js coding standard, detect and prompt errors or warnings

## Prettier

Code formatting tool. Code style management, better code style effect

## Pretty-quick

Execute [Prettier](https://prettier.io/) again after eslint file

````sh
#!/bin/sh
# . "$(dirname "$0")/_/husky.sh"
. "$(dirname "$0")/common.sh"

[ -n "$CI" ] && exit 0

# Format and submit code according to lintstagedrc.js configuration
npm run lint:lint-staged

npm run lint:pretty

````

##Editorconfig

File code specification to maintain a consistent coding style for multi-person development

## Commitlint

Code commit detection. Detect whether the git commit content conforms to the defined specification

## Commitizen

Code commit content standardization prompt to define input standard git cz content

## Conventional

git commit log

## Vscode

### Auto Rename Tag

### Code Spell Checker

### AZ AL Dev Tools/AL Code Outline

### Better Comments

### DotENV

### Eslint

### GitLens — Git supercharged

### Guides

### i18n Ally

### Iconify IntelliSense

### JavaScript (ES6) code snippets

### Less IntelliSense

### Live Server

### Lorem ipsum

### Material Icon Theme

### Mithril Emmet

### Nested Comments

### Prettier - Code formatter

### Project Manager

### Quokka.js

### Stylelint

### Todo Tree

### TS in Markdown

### Vue Language Features (Volar)

### WindiCSS IntelliSense

### WakaTime

### Settings Sync

GitHub Gist: 9711955bc856f4d527c3f15c1bac8ed8
