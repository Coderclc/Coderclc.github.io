# Deploy V2ray

## Purchase VPS

[Vultr](https://www.vultr.com/)

## Deploy VPS

ping Ip `ping ip`

telnet ip + port `telnet ip port`

After pinging the vps, you can connect via ssh. Of course, you can also skip the ping step and try connecting directly.

### SSH connection

1. [XSHELL 7](https://www.xshell.com/en/xshell-2/) The most powerful SSH client in the industry
2. [Git for Windows](https://git-for-windows.github.io/) In the windows command window, or the Git Bash window of Git for Windows, enter: `ssh root@your-vps-ip` , Then press Enter, and then enter the root password of the vps. The password can be copied and pasted by right-clicking the mouse.

### transfer file

[WinSCP](https://winscp.net/eng/index.php) WinSCP is a popular SFTP client and FTP client for Microsoft Windows! Copy files between local computer and remote server using

### Install V2ray

Install curl command: `apt-get install -y curl`

Install V2ray command `source <(curl -sL https://multi.netlify.app/v2ray.sh) --zh`

V2ray recommends the `websocket` protocol

**Debian view firewall switch and status**

View existing firewall rules:

`ufw status`

Turn on/off the firewall:

`ufw enable //on ufw disable //off`

Open the specified tcp or udp port:

`ufw allow 2333/tcp`

Open both tcp and udp ports:

`ufw allow 2333`

Delete port:

`ufw delete allow 2333`

**Debian view port and status**

View all ports

`netstat -tunlp`

View the specified port

`netstat -tunlp | grep 2333`

### Synchronous Time Protocol

1. Generally, foreign VPS images are in the default foreign time zone, which is not very convenient to use. You can change it to Beijing time, it will be much more convenient. Modify the China time zone code as follows:

`\cp -f /usr/share/zoneinfo/Asia/Shanghai /etc/localtime`

2. Use NTP to synchronize the time protocol

CentOS system first install NTP: `yum install ntp ntpdate -y`

If it is an Ubuntu/Debian system, execute the following 2 commands to install NTP

`apt-get update`

`apt-get install ntp ntpdate -y`

After installing NTP, execute the following three commands in sequence, namely, stop NTP service, synchronize NTP time, and start NTP service:

`service ntpd stop`

`ntpdate us.pool.ntp.org`

`service ntpd start`

After the execution is complete, the VPS will have a relatively accurate time setting. Many applications that depend on the system time will work just as well. Note: When the vps restarts, enter date to check the time. If the time is not up to date, execute the above 3 commands.

In addition to synchronizing the time through NTP, you can also manually modify the vps system time, you need to modify the China time zone first, and then enter the time command, the format (the number is changed to the same as your computer time, the error is within 30 seconds): `date -s "2020 -2-02 19:14:00"`

### One-click acceleration VPS server

Five-in-one TCP network acceleration script, including BBR original, BBR magic revision, violent BBR magic revision, BBR plus (preferred), Lotus (sharp speed) installation scripts. Available for KVMXen architecture, not compatible with OpenVZ (OVZ). Support Centos 6+ / Debian 7+ / Ubuntu 14+, BBR magic version does not support Debian 8.

`wget -N --no-check-certificate "https://raw.githubusercontent.com/chiakge/Linux-NetSpeed/master/tcp.sh"`

`chmod +x tcp.sh`

`./tcp.sh`

## Link VPS

### Window

[V2rayN](https://github.com/2dust/v2rayN)

Direct download `v2rayN-Core.zip` contains `v2ray-core` and `Xray-core`

###IOS

Shadowrocket