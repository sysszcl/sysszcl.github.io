title: >-
  Spring Boot运行发生异常:Factory method 'dataSource' threw exception; nested
  exception is org.springframe
author: 树叶莎莎遮窗棂
tags:
  - Java
  - Maven
categories:
  - Java
abbrlink: ccf89da9
date: 2022-08-07 15:12:00
---
异常:


```java
 Caused by: org.springframework.beans.BeanInstantiationException:
 Failed to instantiate [org.apache.tomcat.jdbc.pool.DataSource]: 
 Factory method 'dataSource' threw exception; 
 nested exception is org.springframework.boot.autoconfigure.jdbc.DataSourceProperties$DataSourceBeanCreationException: 
 Cannot determine embedded database driver class for database type NONE. 
 If you want an embedded database please put a supported one on the classpath. If you have database settings to be load from a 
particular profile you may need to active it (no profiles are current active).
```

原因:
 maven依赖包冲突，有重复的依赖。
 
<!-- more -->
 
根据这个原因那就先把依赖的问题解决，但是此时显示了另外一个原因如下：

```java
***************************
APPLICATION FAILED TO START
***************************

Description:

Failed to configure a DataSource: 'url' attribute is not specified and no embedded datasource could be configure.

Reason: Failed to determine a suitable driver class


Action:

Consider the following:
    If you want an embedded database (H2, HSQL or Derby), please put it on the classpath.
    If you have database settings to be load from a particular profile you may need to activate it (no profiles are current active).

Disconnected from the target VM, address: '127.0.0.1:54478', transport: 'socket'
```

度娘的解决方法：在启动类注解上加上 exclude = DataSourceAutoConfiguration.class，但是我的项目使用了数据源，所以此方法行不通


我IDE里面看着配置文件application.yml命名在，可就是加载不了

根据target目录发现问题：springboot启动加载不到src/main/resources下的配置文件application.yml，因为打包的时候根本没有将application.yml加载到classes文件夹中

springboot会从classpath下的/config目录或者classpath的根目录查找application.properties或application.yml！

而我的classpath中，没有src/main/resources这个目录。

classpath中有 target/classes 这个目录，正是这个目录缺少我的配置文件，所以一直加载失败。

![](https://img-blog.csdnimg.cn/a06d5da3f0ee4fcbafcaa611c2f349b9.png)

那么导致这个的原因为什么呢？在使用微服务架构的时候maven会聚合子工程，由于一些奇怪的操作后会产生```pom```的打包方式

![](https://img-blog.csdnimg.cn/40d005aba44643a4b9fe09699cc76554.png)

删除即可，可能是maven的问题，clean一下即可。

