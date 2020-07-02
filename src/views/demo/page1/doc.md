# Linux安装MySQL
> 2019-12-16 14:02:26 星期一

[TOCM]
### 一、检车系统是否带有MySQL

	rpm -qa|grep mysql
如果有先删除
### 二、下载MySQL
##### 1.官网下载
https://dev.mysql.com/downloads/mysql/5.7.html
![mysql-5.7.28-linux-glibc2.12-x86_64.tar.gz](https://only-dream.oss-cn-shenzhen.aliyuncs.com/admin/note/496da8641b4b41d5bd0b62749a114458.png "mysql-5.7.28-linux-glibc2.12-x86_64.tar.gz")
##### 2.本地下载
我这里是将下载文件放在/program目录下，如果不在这个目录下后面关于这个目录的操作请改成你自己的
### 二、解压
1.解压

	tar -zxvf mysql-5.7.28-linux-glibc2.12-x86_64.tar.gz
2.将源码包删除

	rm -f mysql-5.7.28-linux-glibc2.12-x86_64.tar.gz
3.将解压包改名

	mv mysql-5.7.28-linux-glibc2.12-x86_64 mysql57
4.创建存储数据的文件夹

	cd mysql57
	mkdir data
### 三、创建mysql用户和mysql组
1.先查看有没有mysql组

	cat /etc/group | grep mysql
2.查看有没有mysql用户

	cat /etc/passwd |grep mysql
3.若没有则创建。创建组

	groupadd mysql
4.创建mysql用户并添加到mysql用户组中(//useradd -r参数表示mysql用户是系统用户，不可用于登录系统；第一个mysql是用户组，第二个mysql是用户)

	useradd -r -g mysql mysql
5.检查是否创建成功

	groups mysql
出现mysql : mysql表示创建成功
### 四、配置MySQL
1.创建mysql.sock、mysqld.pid、mysqld.log文件

	mkdir tmp
	touch tmp/mysql.sock
	touch tmp/mysqld.pid
	mkdir log
	touch log/mysqld.log
2.设置mysql目录访问权限，用户组

	chown -R mysql /program/mysql57
	chgrp -R mysql /program/mysql57
	chmod 777 /program/mysql57
可以使用ll查看权限是否正确
### 五、初始化MySQL
##### 1.安装
	bin/mysqld --initialize --user=mysql --basedir=/program/mysql57/ --datadir=/program/mysql57/data/
如果出现以下报错

	bin/mysqld: error while loading shared libraries: libnuma.so.1: cannot open shared object file: No such file or directory
首先检查该链接库文件有没有安装使用 命令进行核查

	rpm -qa|grep libaio
运行命令后发现系统中无该链接库文件，安装此库

	yum install  libaio-devel.x86_64
库文件安装成功后，再执行

	bin/mysqld --initialize --user=mysql --basedir=/program/mysql57/ --datadir=/program/mysql57/data/
安装成功后要记住初始密码
![初始密码](https://only-dream.oss-cn-shenzhen.aliyuncs.com/admin/note/18e320d0e4e8482483766950aa2c93df.png "初始密码")
##### 2.配置SSL参数
	bin/mysql_ssl_rsa_setup --datadir=/program/mysql57/data/
##### 3.修改my.cnf配置文件

	vim /etc/my.cnf
修改配置

	[mysqld]
	symbolic-links=0
	character_set_server=utf8
	basedir=/program/mysql57
	datadir=/program/mysql57/data
	port = 3306
	socket=/tmp/mysql.sock
	#表名不区分大小写
	lower_case_table_names = 1
	max_connections=5000
	sql_mode=STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
	[mysqld_safe]
	log-error=/program/mysql57/log/mysqld.log
	pid-file=/program/mysql57/tmp/mysqld.pid
### 六、启动MySQL
##### 配置MySQL自启动
1.将服务文件复制一份到init.d下，并重命名为mysql

	cp support-files/mysql.server /etc/init.d/mysql
	vim /etc/init.d/mysql
2.修改basedir、和datadir
![修改basedir和datadir](https://only-dream.oss-cn-shenzhen.aliyuncs.com/admin/note/c1fa0054b2be437ca20b218e0a574a63.png "修改basedir和datadir")
3.对文件赋予执行权限

	chmod +x /etc/init.d/mysql 或 chmod 777 /etc/init.d/mysql
4.增加mysqld服务

	chkconfig --add mysql
5.查询mysqld服务情况
	
	chkconfig --list mysql
6.如果3，4，5 为off
	
	chkconfig --level 345 mysql on
##### 使用服务方式启动MySQL
	#查看mysql状态
	/etc/init.d/mysql status 或者 service mysql status
	#启动mysql
	/etc/init.d/mysql start 或者 service mysql start
	#停止mysql
	/etc/init.d/mysql stop 或者 service mysql stop
	#重新启动mysql
	/etc/init.d/mysql restart 或者 service mysql restart
### 七、配置MySQL到环境变量
	vim /etc/profile
在最后面添加

	# mysql
	export MYSQL57_HOME=/program/mysql57/bin
	export PATH=$PATH:$MYSQL57_HOME
### 八、修改密码
使用安装时的临时密码登录mysql

	mysql -u root -p
修改密码

	set password for root@localhost = password('填写密码');
### 九、开放远程连接

	mysql>use mysql;
	msyql>update user set user.Host='%' where user.User='root';
	mysql>flush privileges;
