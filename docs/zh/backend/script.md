# Script

## [Yaml](https://www.runoob.com/w3cnote/yaml-intro.html)

`${}` 用法

yml 中自定义一个域名属性：

`mytest: domainName: https://blog.csdn.net/imHanweihu/article/details/96111227`

那么在此配置文件中，就可通过 `${}` 来代替域名了

`url: helpCenter: ${xboot.domainName}/szoa/app/html/getHelpDetailById?helpId=`

## [Shell](https://www.runoob.com/linux/linux-shell.html)

### [husky](https://typicode.github.io/husky/#/)

Git hooks 工具对 git 执行的一些命令，通过对应的 hooks 钩子触发，执行自定义的脚本程序

script.prepare 将会在 yarn or npm install 后执行

```json
  "scripts": {
    "prepare": "husky install",
  },
```
