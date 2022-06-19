---
title: java.sql.SQLException Unknown system variable query_cache_size
author: 树叶莎莎遮窗棂
abbrlink: cd72f990
date: 2022-06-19 16:48:29
tags:
---
###  java.sql.SQLException: Unknown system variable ‘query_cache_size‘

<!-- more -->


```java
java.sql.SQLException: Unknown system variable 'query_cache_size'
	at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:964)
	at com.mysql.jdbc.MysqlIO.checkErrorPacket(MysqlIO.java:3973)
	at com.mysql.jdbc.MysqlIO.checkErrorPacket(MysqlIO.java:3909)
	at com.mysql.jdbc.MysqlIO.sendCommand(MysqlIO.java:2527)
	at com.mysql.jdbc.MysqlIO.sqlQueryDirect(MysqlIO.java:2680)
	at com.mysql.jdbc.ConnectionImpl.execSQL(ConnectionImpl.java:2497)
	at com.mysql.jdbc.ConnectionImpl.execSQL(ConnectionImpl.java:2455)
	at com.mysql.jdbc.StatementImpl.executeQuery(StatementImpl.java:1369)
	at com.mysql.jdbc.ConnectionImpl.loadServerVariables(ConnectionImpl.java:3777)
	at com.mysql.jdbc.ConnectionImpl.initializePropsFromServer(ConnectionImpl.java:3240)
	at com.mysql.jdbc.ConnectionImpl.connectOneTryOnly(ConnectionImpl.java:2249)
	at com.mysql.jdbc.ConnectionImpl.createNewIO(ConnectionImpl.java:2035)
	at com.mysql.jdbc.ConnectionImpl.<init>(ConnectionImpl.java:790)
	at com.mysql.jdbc.JDBC4Connection.<init>(JDBC4Connection.java:47)
	at sun.reflect.GeneratedConstructorAccessor23.newInstance(Unknown Source)
	at sun.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45)
	at java.lang.reflect.Constructor.newInstance(Constructor.java:423)
	at com.mysql.jdbc.Util.handleNewInstance(Util.java:425)
	at com.mysql.jdbc.ConnectionImpl.getInstance(ConnectionImpl.java:400)
	at com.mysql.jdbc.NonRegisteringDriver.connect(NonRegisteringDriver.java:330)
	at com.mchange.v2.c3p0.DriverManagerDataSource.getConnection(DriverManagerDataSource.java:175)
	at com.mchange.v2.c3p0.WrapperConnectionPoolDataSource.getPooledConnection(WrapperConnectionPoolDataSource.java:220)
	at com.mchange.v2.c3p0.WrapperConnectionPoolDataSource.getPooledConnection(WrapperConnectionPoolDataSource.java:206)
	at com.mchange.v2.c3p0.impl.C3P0PooledConnectionPool$1PooledConnectionResourcePoolManager.acquireResource(C3P0PooledConnectionPool.java:203)
	at com.mchange.v2.resourcepool.BasicResourcePool.doAcquire(BasicResourcePool.java:1138)
	at com.mchange.v2.resourcepool.BasicResourcePool.doAcquireAndDecrementPendingAcquiresWithinLockOnSuccess(BasicResourcePool.java:1125)
	at com.mchange.v2.resourcepool.BasicResourcePool.access$700(BasicResourcePool.java:44)
	at com.mchange.v2.resourcepool.BasicResourcePool$ScatteredAcquireTask.run(BasicResourcePool.java:1870)
```

原因服务器中装的数据库版本是8.0及以上版本（版本高）
持久层中数据库驱动是5.7及以上（版本低）

```java
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
	<version>8.0.11</version>
</dependency>
```



###  Eclipse中使用MySql遇到：Loading class `com.mysql.jdbc.Driver'. This is deprecated. The new driver class is...



遇到的问题如下：

原来是因为使用最新的驱动包中```com.mysql.jdbc.Driver```类已经过时，新的```com.mysql.cj.jdbc.Driver```通过SPI自动注册，不再需要手动加载驱动类)

```java
Loading class `com.mysql.jdbc.Driver'. This is deprecated. The new driver class is `com.mysql.cj.jdbc.Driver'. The driver is automatically registered via the SPI and manual loading of the driver class is generally unnecessary.
```

解决办法： 使用```com.mysql.cj.jdbc.Driver```类替换```com.mysql.jdbc.Driver```类

但是后面还有一个如下的问题：

```java
The server time zone value 'ÖÐ¹ú±ê×¼Ê±¼ä' is unrecognized or represents more than one time zone. You must configure either the server or JDBC driver (via the serverTimezone configuration property) to use a more specifc time zone value if you want to utilize time zone support.
```

需要在数据库 URL中设置serverTimezone属性：（就是代码第八行）

static final String DB_URL = "jdbc:mysql://localhost:3306/RUNOOB" + "?serverTimezone=GMT%2B8"; 这里的 GMT%2B8 代表是东八区。

jdbc:mysql://localhost:3306/javamysql 端口号后面是你的数据库

最后问题解决了，如果有遇到相同问题的小伙伴可以参考一下！



### Unescaped & or nonterminated character/entity reference

```java
提示Unescaped & or nonterminated character/entity reference
因为&是特殊字符，解决方法是：&改写成&amp;复制代码
```

