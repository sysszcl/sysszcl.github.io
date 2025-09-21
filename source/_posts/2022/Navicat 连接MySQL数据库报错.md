title: Navicat 连接MySQL数据库报错
author: 树叶莎莎遮窗棂
tags:
  - Mysql
categories:
  - Mysql
abbrlink: a11705e4
date: 2022-06-19 16:21:00
---
### 2059 - authentication plugin...错误解决方法

##### Navicat 连接MySQL数据库出现错误：2059 - authentication plugin 'caching_sha2_password'的解决方法。

**错误原因：MySQL新版本（8以上版本）的用户登录账户加密方式是【caching_sha2_password】，Navicat不支持这种用户登录账户加密方式。**

<!-- more -->

1.我们需要打开MySQL 命令行客户端，点击【MySQL 8.0 command line client】或者cmd进入Windows命令行，到mysql环境执行路径下，```mysql -u root -p``` ；

2.输入自己安装MySQL时设置的密码，登录客户端；

3.我们先查看一下加密的方式，输入：show variables like 'default_authentication_plugin';

回车，如图所示；

![](https://img-blog.csdnimg.cn/a783fcecd7564227815baf562ccd9122.png)

接下来，查看本地mysql用户的信息，

输入：select host,user,plugin from mysql.user;

回车，如图所示，可以看到root账户的加密方式是caching_sha2_password；

![](https://img-blog.csdnimg.cn/2fc6d081dbb0479a97a8e03c1877c36d.png)

 > 但是Navicat不支持MySQL新版本的这种用户登录账户加密方式，所以下面我们要修改root账户的加密方式为【mysql_native_password】，如图所示，输入：ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

回车，即可修改成功，注意这里最后的root是你设置的root账户的密码，我设置的是“root”。

![](https://img-blog.csdnimg.cn/078f909560fa42018dc5fd397604b051.png)

最后，我们再重新连接MySQL，就可以成功用root账户连接了。