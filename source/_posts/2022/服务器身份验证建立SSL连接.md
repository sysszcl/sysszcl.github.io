title: Establishing SSL connection without server’s identity
author: 树叶莎莎遮窗棂
tags:
  - Mysql
categories:
  - Mysql
  - ''
abbrlink: 6f62772
date: 2022-06-19 16:45:00
---

##### 关于WARN: Establishing SSL connection without server‘s identity的解决方案

当你运行程序出来这个警告时：

```java
Sun Jul 12 12:06:56 CST 2020 WARN: Establishing SSL connection without server’s identity verification is not recommended. According to MySQL 5.5.45+, 5.6.26+ and 5.7.6+ requirements SSL connection must be established by default if explicit option isn’t set. For compliance with existing applications not using SSL the verifyServerCertificate property is set to ‘false’. You need either to explicitly disable SSL by setting useSSL=false, or set useSSL=true and provide truststore for server certificate verification.
```

<!-- more -->

别急

让我猜猜

你的连接数据库的url是不是也这样写的

![](https://img-blog.csdnimg.cn/5f1a024f874e45c594cc6a997a7fa44a.png)

用我蹩脚的英语给你翻译一波

```java
Sun Jul 12 12:06:56 CST 2020警告：不建议在没有服务器身份验证的情况下建立SSL连接。根据MySQL 5.5.45 +，5.6.26 +和5.7.6+的要求，如果未设置显式选项，则默认情况下必须建立SSL连接。为了与不使用SSL的现有应用程序兼容，将verifyServerCertificate属性设置为’false’。您需要通过设置useSSL = false来显式禁用SSL，或者设置useSSL = true并为服务器证书验证提供信任库。
```

现在，当你看到了中文翻译，是不是突然知道如何解决咯
呐，就这样，就阔以了

```java
url: jdbc:mysql://localhost:3306/test1?useSSL = false
```

but，为了保证万无一失
送你一个锦囊

把url改成这样

```java
url: jdbc:mysql://localhost:3306/test1?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC&useSSL=false
```



这句话可以帮你避免好多坑，谁用谁知道！



>  版权声明：本文为CSDN博主「佑佑有话说」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
> 原文链接：https://blog.csdn.net/youyou0710/article/details/107297577