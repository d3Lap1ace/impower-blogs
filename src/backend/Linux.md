# centOS7
# 配置网络

ifconfig    ip addr
vi /etc/sysconfig/network-scripts/ifcfg-ens33
ens33网络配置默认信息如下

```
TYPE="Ethernet" #网络类型（通常是Ethemet，工业以太网）
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="dhcp"  #dhcp 为动态IP
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
UUID="e8582df9-96c3-4ddc-9fc6-19282dd5e019"
DEVICE="ens33"
ONBOOT="yes" #系统启动的时候网络接口是否有效（yes/no）
```

以下选项,有则修改,无则增加

```
BOOTPROTO="static" #静态网址 (已有)
ONBOOT="yes" #开机启用 (已有)
IPADDR=192.168.6.100 #IP地址 (增加)
GATEWAY=192.168.6.2 #网关(增加)
DNS1=192.168.6.2 #DNS域名解析(增加)
```

重启网络服务

```bash
systemctl status network
systemctl restart network
systemctl is-enabled network
systemctl enable network
ping url
```

可能的故障问题

```bash
查看服务systemctl status NetworkManager.service
停止服务 systemctl stop NetworkManager
查看自启动 systemctl is-enabled NetworkManager
关闭自启动systemctl disable NetworkManager
```

systemctl status network


# 换源

rpm -qa       （功能描述：查询所安装的所有rpm软件包）
rpm -ql  服务名 (功能描述:查看安装位置)

cd /etc/yum.repos.d    yum文件位置  可以备份

```bash
阿里云
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
清华
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak
vi /etc/yum.repos.d/CentOS-Base.repo
```

yum clean all  清缓存

yum makecache  产生新的缓存

# 同步时间
第一步：安装ntp服务yum -y install ntp第二步：开启开机启动服务systemctl enable ntpd第三步：启动服务systemctl start ntpd第四步：更改时区timedatectl set-timezone Asia/Shanghai第五步：启用ntp同步timedatectl set-ntp yes第六步：同步时间ntpq -p

# 基操

```
lsof -i:端口号

hostname  //主机名
vim /etc/hostname   //修改主机名

systemctl --type service   //查看所有服务
```
## 文件目录
dir
	mkdir  -p       创建多层目录[未存在]
	rmdir
file
       touch 文件名称
	cp   源文件  目标文件
		cp -r 递归复制
	rm  -frv
	mv   可以重命名
	cat/more/less
	head/tail  -f 动态显示
	echo
		echo  -e 转义
	> / >>
	ln 软连接
	history
## 用户管理
user
```bash
useradd  用户名
useradd -g  组名 用户名
passwd 用户名
id 用户名   //用户是否存在
cat /etc/passwd     // 查看创建的所有用户
su 用户名称      （功能描述：切换用户，只能获得用户的执行权限，不能获得环境变量）
su - 用户名称    （功能描述：切换到用户并获得该用户的环境变量及执行权限）
userdel 用户名          （功能描述：删除用户但保存用户主目录）
userdel -r 用户名       （功能描述：用户和用户主目录，都删除）
who am i
```
	
vi /etc/sudoers
修改 /etc/sudoers 文件，找到下面一行(91行)，在root下面添加一行，如下
```bash
## Allow root to run any commands anywhere
root  ALL=(ALL)   ALL
```


## 组管理
group

	groupadd 组名

	groupdel 组名

permission

	chmod

	chgrp

search

	find [搜索范围] [选项]  	-name<查询方式> -user<用户名>-size<文件大小>

yasuo

tar -zcvf houma.tar.gz

tar -zxvf xiyou.tar.gz -C

## 进程管理

ps -aux | grep xxx     （功能描述：查看系统中所有进程）
ps -ef  | grep xxx     （功能描述：可以查看子父进程之间的关系）

netstat -ntlp
lsof -i:端口号
**netstat -anp | grep** 端口号   查看端口号是否被占用
kill -9 进程号
killall  name
**磁盘**
top  查看内存
iotop 查看磁盘io读写  （yum install iotop）
iotop -o 查看较高的磁盘读写程序
df -h（功能描述：列出文件系统的整体磁盘使用量，检查文件系统的磁盘空间占用情况）
fdisk -l         （功能描述：查看磁盘分区详情）




# 文件目录
> Centos7的文件目录结构

![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719315687150-26e4444c-724d-442b-bd0b-4a13d264c946.png#averageHue=%23fefefe&clientId=u188011ef-09f6-4&from=paste&height=611&id=u7244ba9d&originHeight=611&originWidth=1085&originalType=binary&ratio=1&rotation=0&showTitle=false&size=182487&status=done&style=none&taskId=u6cdb877c-df2d-4a91-87fe-88ffc0c1281&title=&width=1085)


> Linux根目录下的常见目录及作用

1. /bin：★(/usr/bin,/usr/local/bin)

是Binary的缩写, 这个目录存放着最经常使用的命令,Linux默认的环境变量已经包含该路径,所以可以直接使用该路径下的指令如 cd指令 

可以通过echo $PATH查看系统环境变量来看是否包含了该目录

2. /sbin：(/usr/sbin, /usr/local/sbin)

s就是Super User的意思，这里存放的是系统管理员使用的系统管理程序。

以上目录，任何命令在任意目录下都可执行命令

3. /home：★

存放普通用户的主目录，在Linux中每个用户都有一个自己的目录，一般该目录名是以用户的账号命名的。

4. /root：★

该目录为系统管理员，也称作超级权限者的用户主目录。

5. /lib：

系统开机所需要最基本的动态连接共享库，其作用类似于Windows里的DLL文件。几乎所有的应用程序都需要用到这些共享库。

6. /lost+found：

这个目录一般情况下是空的，当系统非法关机后，这里就存放了一些文件。

7. /etc：★

所有的系统管理所需要的配置文件和子目录。my.cnf

8. /usr：★ 

这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似与windows下的program files目录。

9. /boot：★

这里存放的是启动Linux时使用的一些核心文件，包括一些连接文件以及镜像文件，自己的安装别放这里 

10. /proc：

这个目录是一个虚拟的目录，它是系统内存的映射，我们可以通过直接访问这个目录来获取系统信息。

11. /srv：

service缩写，该目录存放一些服务启动之后需要提取的数据。

12.    /sys： 

这是linux2.6内核的一个很大的变化。该目录下安装了2.6内核中新出现的一个文件系统 sysfs 。（内核）

13.    /tmp：

这个目录是用来存放一些临时文件的。

14.    /dev：★

Device(设备)的缩写,类似windows的设备管理器，把所有的硬件用文件的形式存储。 

15.    /media：★

linux系统会自动识别一些设备，例如U盘、光驱等等，当识别后，linux会把识别的设备挂载到这个目录下。CentOS6 就在/media下,CentOS7换目录了/



16.    /mnt：★

系统提供该目录是为了让用户临时挂载别的文件系统的，我们可以将光驱挂载在/mnt/上，然后进入该目录就可以查看光驱里的内容了。

17.    /opt：★

这是给主机额外安装软件所摆放的目录。

比如你安装JDK、Tomcat则就可以放到这个目录下。默认是空的。

18.    /usr/local: ★

这是另一个给主机额外安装软件所摆放的目录.一般是通过编译源码方式安装的程序。

19.    /var：★

这个目录中存放着在不断扩充着的东西，我们习惯将那些经常被修改的目录放在这个目录下。包括各种日志文件。

# vim
## 一般模式
> 1.删除和复制操作

![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719315396918-c260717a-86fe-492d-9714-3b1279a4b4e1.png#averageHue=%23fbfbfb&clientId=u188011ef-09f6-4&from=paste&height=424&id=ud68449bb&originHeight=424&originWidth=1276&originalType=binary&ratio=1&rotation=0&showTitle=false&size=25202&status=done&style=none&taskId=u83116bf4-66eb-495b-8199-1a684a59720&title=&width=1276)
> 2.光标移动操作

![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719315412524-a73c6b7c-2092-4730-9a6f-81c2b6eaccaf.png#averageHue=%23f2f1f0&clientId=u188011ef-09f6-4&from=paste&height=181&id=u68eec85f&originHeight=181&originWidth=962&originalType=binary&ratio=1&rotation=0&showTitle=false&size=35036&status=done&style=none&taskId=u17928245-f502-4c77-9d42-cc80106394d&title=&width=962)
## 编辑模式
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719315432650-46ea0766-1a36-4248-88fc-21abdcb5bae4.png#averageHue=%23f4f3f2&clientId=u188011ef-09f6-4&from=paste&height=258&id=u2080469f&originHeight=258&originWidth=880&originalType=binary&ratio=1&rotation=0&showTitle=false&size=33900&status=done&style=none&taskId=u1d11b020-f706-43ec-a0d8-d59d2a0c46d&title=&width=880)

## 命令模式
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43928099/1719315443046-e8c91d82-d149-4e9b-bf8c-01293d5b5ad2.png#averageHue=%23f3f2f2&clientId=u188011ef-09f6-4&from=paste&height=328&id=BMa1l&originHeight=328&originWidth=926&originalType=binary&ratio=1&rotation=0&showTitle=false&size=46831&status=done&style=none&taskId=ud459dd76-1656-4d6c-99d5-2f44d497feb&title=&width=926)

