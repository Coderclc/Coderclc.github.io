# Deploy V2ray

## 购买 VPS

[Vultr](https://www.vultr.com/)

[Cloudcone](https://cloudcone.com/vps/)

[Vps.Net](https://www.vps.net/)

## 部署 VPS

ping Ip `ping ip`

telnet ip + 端口 `telnet ip port`

ping 通 vps 后，就可以 ssh 连接了。当然你也可以跳过 ping 的步骤，直接连接试试看。

### SSH 连接

1. [XSHELL 7](https://www.xshell.com/en/xshell-2/) 业界最强大的 SSH 客户端
2. [Git for Windows](https://git-for-windows.github.io/)在 windows 命令窗口，或 Git for Windows 的 Git Bash 窗口，输入： `ssh root@your-vps-ip` ，然后回车，然后输入 vps 的 root 密码，密码可以点鼠标右键复制粘贴。

### 传输文件

[WinSCP](https://winscp.net/eng/index.php) WinSCP 是 Microsoft Windows 的流行 SFTP 客户端和 FTP 客户端！使用在本地计算机和远程服务器之间复制文件

### 安装 V2ray

安装 curl 命令： `apt-get install -y curl`

安装 V2ray 命令 `source <(curl -sL https://multi.netlify.app/v2ray.sh) --zh`

V2ray 推荐使用 `websocket` 协议

**Debian 查看防火墙的开关以及状态**

查看防火墙现有规则：

`ufw status`

开启/关闭防火墙：

`ufw enable //开启 ufw disable //关闭`

开启指定 tcp 或者 udp 端口：

`ufw allow 2333/tcp`

同时开启 tcp 与 udp 端口：

`ufw allow 2333`

删除端口：

`ufw delete allow 2333`

**Debian 查看端口以及状态**

查看所有端口

`netstat -tunlp`

查看指定端口

`netstat -tunlp | grep 2333`

### 同步时间协议

1、一般国外的 VPS 的镜像都是默认的国外时区，使用起来不是很方便。可以把它修改成北京时间，就会方便很多。 修改中国时区代码如下：

`\cp -f /usr/share/zoneinfo/Asia/Shanghai /etc/localtime`

2、利用 NTP 同步时间协议

CentOS 系统先安装 NTP：`yum install ntp ntpdate -y`

如果是 Ubuntu/Debian 系统执行下面 2 条命令来安装 NTP

`apt-get update`

`apt-get install ntp ntpdate -y`

安装 NTP 后，按照顺序依次执行以下 3 条命令，分别是停止 NTP 服务、同步 NTP 时间、启动 NTP 服务：

`service ntpd stop`

`ntpdate us.pool.ntp.org`

`service ntpd start`

执行完成后，VPS 上就是相对精确的时间设置了。很多依赖于系统时间的应用程序也就能正常工作了。注意：当 vps 重启后输入 date 来检查下时间，如果时间不是最新的，再执行以上 3 条命令即可。

除了通过 NTP 来同步时间以外，还可以手动修改 vps 系统时间，需要先修改中国时区，之后输入时间命令，格式（数字改为和自己电脑时间一致，误差 30 秒以内）：`date -s "2020-2-02 19:14:00"`

### 一键加速 VPS 服务器

五合一的 TCP 网络加速脚本，包括了 BBR 原版、BBR 魔改版、暴力 BBR 魔改版、BBR plus（首选）、Lotsever(锐速)安装脚本。可用于 KVMXen 架构，不兼容 OpenVZ（OVZ）。支持 Centos 6+ / Debian 7+ / Ubuntu 14+，BBR 魔改版不支持 Debian 8。

`wget -N --no-check-certificate "https://raw.githubusercontent.com/chiakge/Linux-NetSpeed/master/tcp.sh"`

`chmod +x tcp.sh`

`./tcp.sh`

## 链接 VPS

### Window

[V2rayN](https://github.com/2dust/v2rayN)

直接下载 `v2rayN-Core.zip` 包含 `v2ray-core` 和 `Xray-core`

### IOS

Shadowrocket

购买域名

[Namecheap](https://www.namecheap.com/)
