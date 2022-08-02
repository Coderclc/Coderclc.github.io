# Script

## [Yaml](https://www.runoob.com/w3cnote/yaml-intro.html)

`${}` usage

Customize a domain name attribute in yml:

`mytest: domainName: https://blog.csdn.net/imHanweihu/article/details/96111227`

Then in this configuration file, you can replace the domain name with `${}`

`url: helpCenter: ${xboot.domainName}/szoa/app/html/getHelpDetailById?helpId=`

## [Shell](https://www.runoob.com/linux/linux-shell.html)

### [husky](https://typicode.github.io/husky/#/)

Some commands executed by the Git hooks tool to git are triggered by the corresponding hooks hooks to execute custom script programs

script.prepare will be executed after yarn or npm install

```json
   "scripts": {
     "prepare": "husky install",
   },
```
