title: Maven V3.0
author: 树叶莎莎遮窗棂
tags:
  - Maven构建入门
  - ''
categories:
  - Java
abbrlink: 66cdf9cd
date: 2022-06-04 13:13:00
---
## Maven 入门、原理与实战


### 第一章 Maven 概述

#### Why？为什么要学习 Maven？

##### 1、Maven 作为依赖管理工具

①jar 包的规模
随着我们使用越来越多的框架，或者框架封装程度越来越高，项目中使用的jar包也越来越多。项目中，一个模块里面用到上百个jar包是非常正常的。

②jar 包的来源
这个jar包所属技术的官网。官网通常是英文界面，网站的结构又不尽相同，甚至找到下载链接还发现需要通过特殊的工具下载。

第三方网站提供下载。问题是不规范，在使用过程中会出现各种问题。

③jar 包之间的依赖关系
框架中使用的 jar 包，不仅数量庞大，而且彼此之间存在错综复杂的依赖关系。依赖关系的复杂程度，已经上升到了完全不能靠人力手动解决的程度。另外，jar 包之间有可能产生冲突。进一步增加了我们在 jar 包使用过程中的难度。


<!-- more -->


##### 2、Maven 作为构建管理工具

①你没有注意过的构建
你可以不使用 Maven，但是构建必须要做。当我们使用 IDEA 进行开发时，构建是 IDEA 替我们做的。

#②脱离 IDE 环境仍需构建


##### 3、结论
管理规模庞大的 jar 包，需要专门工具。
脱离 IDE 环境执行构建操作，需要专门工具。

#### What？什么是 Maven？

##### 1、构建

Java 项目开发过程中，构建指的是使用『原材料生产产品』的过程。

原材料

Java 源代码

基于 HTML 的 Thymeleaf 文件

图片

配置文件

#……
产品

一个可以在服务器上运行的项目
构建过程包含的主要的环节：

- 清理：删除上一次构建的结果，为下一次构建做好准备
- 编译：Java 源程序编译成 *.class 字节码文件
- 测试：运行提前准备好的测试程序
- 报告：针对刚才测试的结果生成一个全面的信息
- 打包
  - Java工程：jar包
  - Web工程：war包
- 安装：把一个 Maven 工程经过打包操作生成的 jar 包或 war 包存入 Maven 仓库
- 部署
  - 部署 jar 包：把一个 jar 包部署到 Nexus 私服服务器上
  - 部署 war 包：借助相关 Maven 插件（例如 cargo），将 war 包部署到 Tomcat 服务器上

##### 2、依赖
如果 A 工程里面用到了 B 工程的类、接口、配置文件等等这样的资源，那么我们就可以说 A 依赖 B。例如：

- junit-4.12 依赖 hamcrest-core-1.3
- thymeleaf-3.0.12.RELEASE 依赖 ognl-3.1.26
  - ognl-3.1.26 依赖 javassist-3.20.0-GA
- thymeleaf-3.0.12.RELEASE 依赖 attoparser-2.0.5.RELEASE
- thymeleaf-3.0.12.RELEASE 依赖 unbescape-1.1.6.RELEASE
- thymeleaf-3.0.12.RELEASE 依赖 slf4j-api-1.7.26

依赖管理中要解决的具体问题：

- jar 包的下载：使用 Maven 之后，jar 包会从规范的远程仓库下载到本地
- jar 包之间的依赖：通过依赖的传递性自动完成
- jar 包之间的冲突：通过对依赖的配置进行调整，让某些jar包不会被导入

##### 3、Maven 的工作机制

![Maven 的工作机制](https://img-blog.csdnimg.cn/d9809f23c066435884ee49e516e4290d.png)

### 第二章 Maven 核心程序解压和配置

#### Maven 核心程序解压与配置

##### 1、Maven 官网地址
首页：

[Maven – Welcome to Apache Maven](https://maven.apache.org/)

下载页面：

[Maven – Download Apache Maven](https://maven.apache.org/download.cgi)


具体下载地址：[具体下载地址](https://dlcdn.apache.org/maven/maven-3/3.8.4/binaries/apache-maven-3.8.4-bin.zip)

##### 2、解压Maven核心程序
核心程序压缩包：apache-maven-3.8.4-bin.zip，解压到非中文、没有空格的目录。

在解压目录中，我们需要着重关注 Maven 的核心配置文件：conf/settings.xml

##### 3、指定本地仓库
本地仓库默认值：用户家目录/.m2/repository。由于本地仓库的默认位置是在用户的家目录下，而家目录往往是在 C 盘，也就是系统盘。将来 Maven 仓库中 jar 包越来越多，仓库体积越来越大，可能会拖慢 C 盘运行速度，影响系统性能。所以建议将 Maven 的本地仓库放在其他盘符下。配置方式如下：
```sh
<!-- localRepository
| The path to the local repository maven will use to store artifacts.
|
| Default: ${user.home}/.m2/repository
<localRepository>/path/to/local/repo</localRepository>
-->
<localRepository>D:\maven-repository</localRepository>
```
本地仓库这个目录，我们手动创建一个空的目录即可。

**记住**：一定要把 localRepository 标签从**注释中拿出来**。

**注意**：本地仓库本身也需要使用一个**非中文、没有空格**录。

##### 4、配置阿里云提供的镜像仓库
Maven 下载 jar 包默认访问境外的中央仓库，而国外网站速度很慢。改成阿里云提供的镜像仓库，**国内网站**以让 Maven 下载 jar 包的时候速度更快。配置的方式是：

#①将原有的例子配置注释掉
```sh
<!-- <mirror>
  <id>maven-default-http-blocker</id>
  <mirrorOf>external:http:*</mirrorOf>
  <name>Pseudo repository to mirror external repositories initially using HTTP.</name>
  <url>http://0.0.0.0/</url>
  <blocked>true</blocked>
</mirror> -->
```

#②加入我们的配置
将下面 mirror 标签整体复制到 settings.xml 文件的 mirrors 标签的内部。
```sh
	<mirror>
		<id>nexus-aliyun</id>
		<mirrorOf>central</mirrorOf>
		<name>Nexus aliyun</name>
		<url>http://maven.aliyun.com/nexus/content/groups/public</url>
	</mirror>
``` 
    
##### 5、配置 Maven 工程的基础 JDK 版本
如果按照默认配置运行，Java 工程使用的默认 JDK 版本是 1.5，而我们熟悉和常用的是 JDK 1.8 版本。修改配置的方式是：将 profile 标签整个复制到 settings.xml 文件的 profiles 标签内。

```sh
	<profile>
	  <id>jdk-1.8</id>
	  <activation>
		<activeByDefault>true</activeByDefault>
		<jdk>1.8</jdk>
	  </activation>
	  <properties>
		<maven.compiler.source>1.8</maven.compiler.source>
		<maven.compiler.target>1.8</maven.compiler.target>
		<maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
	  </properties>
	</profile>
 ```


#### 配置环境变量

##### 1、检查 JAVA_HOME 配置是否正确
Maven 是一个用 Java 语言开发的程序，它必须基于 JDK 来运行，需要通过 JAVA_HOME 来找到 JDK 的安装位置。

可以使用下面的命令验证：

```sh
C:\Users\Administrator>echo %JAVA_HOME%
D:\software\Java

C:\Users\Administrator>java -version
java version "1.8.0_141"
Java(TM) SE Runtime Environment (build 1.8.0_141-b15)
Java HotSpot(TM) 64-Bit Server VM (build 25.141-b15, mixed mode)
```

##### 2、配置 MAVEN_HOME

TIP

配置环境变量的规律：

XXX_HOME 通常指向的是 bin 目录的上一级

PATH 指向的是 bin 目录

##### 3、配置PATH


##### 4、验证

```sh
C:\Users\Administrator>mvn -v
Apache Maven 3.8.4 (9b656c72d54e5bacbed989b64718c159fe39b537)
Maven home: D:\software\apache-maven-3.8.4
Java version: 1.8.0_141, vendor: Oracle Corporation, runtime: D:\software\Java\jre
Default locale: zh_CN, platform encoding: GBK
OS name: "windows 10", version: "10.0", arch: "amd64", family: "windows"
```



### 第三章 使用 Maven：命令行环境

##### 一：根据坐标创建 Maven 工程

 1、Maven 核心概念：坐标
①Maven中的坐标

[1]向量说明

使用三个『向量』在『Maven的仓库』中唯一的定位到一个『jar』包。

- groupId：公司或组织的 id
- artifactId：一个项目或者是项目中的一个模块的 id
- version：版本号

[2]三个向量的取值方式

- groupId：公司或组织域名的倒序，通常也会加上项目名称
  - 例如：com.atguigu.maven
- artifactId：模块的名称，将来作为 Maven 工程的工程名
- version：模块的版本号，根据自己的需要设定
  - 例如：SNAPSHOT 表示快照版本，正在迭代过程中，不稳定的版本
  - 例如：RELEASE 表示正式版本
举例：

groupId：com.atguigu.maven
artifactId：pro01-atguigu-maven
version：1.0-SNAPSHOT
#②坐标和仓库中 jar 包的存储路径之间的对应关系
坐标：

```sh
  <groupId>javax.servlet</groupId>
  <artifactId>servlet-api</artifactId>
  <version>2.5</version>
 ```
上面坐标对应的 jar 包在 Maven 本地仓库中的位置：

```sh
Maven本地仓库根目录\javax\servlet\servlet-api\2.5\servlet-api-2.5.jar
一定要学会根据坐标到本地仓库中找到对应的 jar 包。
```

##### 2、实验操作
①创建目录作为后面操作的工作空间
例如：D:\maven-workspace\space201026

WARNING

此时我们已经有了三个目录，分别是：

Maven 核心程序：中军大帐
Maven 本地仓库：兵营
本地工作空间：战场
#②在工作空间目录下打开命令行窗口
./images

③使用命令生成Maven工程
images

运行 mvn archetype:generate 命令

![](https://img-blog.csdnimg.cn/67ba727240b4466faec6e79d69ececec.png)

下面根据提示操作

TIP

Choose a number or apply filter (format: [groupId:]artifactId, case sensitive contains): 7:【直接回车，使用默认值】

Define value for property 'groupId': com.atguigu.maven

Define value for property 'artifactId': pro01-maven-java

Define value for property 'version' 1.0-SNAPSHOT: :【直接回车，使用默认值】

Define value for property 'package' com.atguigu.maven: :【直接回车，使用默认值】

Confirm properties configuration: groupId: com.atguigu.maven artifactId: pro01-maven-java version: 1.0-SNAPSHOT package: com.atguigu.maven Y: :【直接回车，表示确认。如果前面有输入错误，想要重新输入，则输入 N 再回车。】

④调整
Maven 默认生成的工程，对 junit 依赖的是较低的 3.8.1 版本，我们可以改成较适合的 4.12 版本。

自动生成的 App.java 和 AppTest.java 可以删除。

```sh
<!-- 依赖信息配置 -->
<!-- dependencies复数标签：里面包含dependency单数标签 -->
<dependencies>
	<!-- dependency单数标签：配置一个具体的依赖 -->
	<dependency>
		<!-- 通过坐标来依赖其他jar包 -->
		<groupId>junit</groupId>
		<artifactId>junit</artifactId>
		<version>4.12</version>
		
		<!-- 依赖的范围 -->
		<scope>test</scope>
	</dependency>
</dependencies>
```

⑤自动生成的 pom.xml 解读

```sh
<!-- 当前Maven工程的坐标 -->
  <groupId>com.atguigu.maven</groupId>
  <artifactId>pro01-maven-java</artifactId>
  <version>1.0-SNAPSHOT</version>
  
  <!-- 当前Maven工程的打包方式，可选值有下面三种： -->
  <!-- jar：表示这个工程是一个Java工程  -->
  <!-- war：表示这个工程是一个Web工程 -->
  <!-- pom：表示这个工程是“管理其他工程”的工程 -->
  <packaging>jar</packaging>

  <name>pro01-maven-java</name>
  <url>http://maven.apache.org</url>

  <properties>
	<!-- 工程构建过程中读取源码时使用的字符集 -->
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>

  <!-- 当前工程所依赖的jar包 -->
  <dependencies>
	<!-- 使用dependency配置一个具体的依赖 -->
    <dependency>
	
	  <!-- 在dependency标签内使用具体的坐标依赖我们需要的一个jar包 -->
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
	  
	  <!-- scope标签配置依赖的范围 -->
      <scope>test</scope>
    </dependency>
  </dependencies>
  ```
##### 3、Maven核心概念：POM
①含义
POM：Project Object Model，项目对象模型。和 POM 类似的是：DOM（Document Object Model），文档对象模型。它们都是模型化思想的具体体现。

②模型化思想
POM 表示将工程抽象为一个模型，再用程序中的对象来描述这个模型。这样我们就可以用程序来管理项目了。我们在开发过程中，最基本的做法就是将现实生活中的事物抽象为模型，然后封装模型相关的数据作为一个对象，这样就可以在程序中计算与现实事物相关的数据。

③对应的配置文件
POM 理念集中体现在 Maven 工程根目录下 pom.xml 这个配置文件中。所以这个 pom.xml 配置文件就是 Maven 工程的核心配置文件。其实学习 Maven 就是学这个文件怎么配置，各个配置有什么用。

##### 4、Maven核心概念：约定的目录结构

①各个目录的作用

另外还有一个 target 目录专门存放构建操作输出的结果。

②约定目录结构的意义
Maven 为了让构建过程能够尽可能自动化完成，所以必须约定目录结构的作用。例如：Maven 执行编译操作，必须先去 Java 源程序目录读取 Java 源代码，然后执行编译，最后把编译结果存放在 target 目录。

③约定大于配置
Maven 对于目录结构这个问题，没有采用配置的方式，而是基于约定。这样会让我们在开发过程中非常方便。如果每次创建 Maven 工程后，还需要针对各个目录的位置进行详细的配置，那肯定非常麻烦。

目前开发领域的技术发展趋势就是：约定大于配置，配置大于编码。


#### 第二节 实验二：在 Maven 工程中编写代码

#### 第三节 实验三：执行 Maven 的构建命令

##### 1、要求
运行 Maven 中和构建操作相关的命令时，必须进入到 pom.xml 所在的目录。如果没有在 pom.xml 所在的目录运行 Maven 的构建命令，那么会看到下面的错误信息：

```sh
The goal you specified requires a project to execute but there is no POM in this directory
```

TIP

mvn -v 命令和构建操作无关，只要正确配置了 PATH，在任何目录下执行都可以。而构建相关的命令要在 pom.xml 所在目录下运行——操作哪个工程，就进入这个工程的 pom.xml 目录。

##### 2、清理操作
mvn clean

效果：删除 target 目录

##### 3、编译操作
主程序编译：mvn compile

测试程序编译：mvn test-compile

主体程序编译结果存放的目录：target/classes

测试程序编译结果存放的目录：target/test-classes

##### 4、测试操作
mvn test

测试的报告存放的目录：target/surefire-reports

##### 5、打包操作
mvn package

打包的结果——jar 包，存放的目录：target

##### 6、安装操作
mvn install

```sh
[INFO] Installing D:\maven-workspace\space201026\pro01-maven-java\target\pro01-maven-java-1.0-SNAPSHOT.jar to D:\maven-rep1026\com\atguigu\maven\pro01-maven-java\1.0-SNAPSHOT\pro01-maven-java-1.0-SNAPSHOT.jar
[INFO] Installing D:\maven-workspace\space201026\pro01-maven-java\pom.xml to D:\maven-rep1026\com\atguigu\maven\pro01-maven-java\1.0-SNAPSHOT\pro01-maven-java-1.0-SNAPSHOT.pom
```

安装的效果是将本地构建过程中生成的 jar 包存入 Maven 本地仓库。这个 jar 包在 Maven 仓库中的路径是根据它的坐标生成的。

坐标信息如下：

```sh
  <groupId>com.atguigu.maven</groupId>
  <artifactId>pro01-maven-java</artifactId>
  <version>1.0-SNAPSHOT</version>
 ```
在 Maven 仓库中生成的路径如下：

```sh
D:\maven-rep1026\com\atguigu\maven\pro01-maven-java\1.0-SNAPSHOT\pro01-maven-java-1.0-SNAPSHOT.jar
```

另外，安装操作还会将 pom.xml 文件转换为 XXX.pom 文件一起存入本地仓库。所以我们在 Maven 的本地仓库中想看一个 jar 包原始的 pom.xml 文件时，查看对应 XXX.pom 文件即可，它们是名字发生了改变，本质上是同一个文件。

#### 第四节 实验四：创建 Maven 版的 Web 工程

#### 第五节 实验五：让 Web 工程依赖 Java 工程


##### 以树形结构查看当前 Web 工程的依赖信息

mvn dependency:tree

##### 以列表结构查看当前 Web 工程的依赖信息

mvn dependency:list

#### 第六节 实验六：测试依赖范围

##### 1、依赖范围
标签的位置：dependencies/dependency/scope

标签的可选值：compile/test/provided/system/runtime/import

①compile 和 test 对比

|  | main目录（空间） | test目录（空间） | 开发过程（时间） | 部署到服务器（时间） |
|:------ |:------  | :------ |  :------|:------  |
| compile | 有效 | 有效 | 有效 | 有效 |
|  test | 无效 | 有效 | 有效 | 无效 |
			
		

②compile 和 provided 对比

|  | main目录（空间） | test目录（空间） | 开发过程（时间） | 部署到服务器（时间） |
|:------ |:------  | :------ |  :------|:------  |
| compile | 有效 | 有效 | 有效 | 有效 |
|  provided | 有效 | 有效 | 有效 | 无效 |


③结论
compile：通常使用的第三方框架的 jar 包这样在项目实际运行时真正要用到的 jar 包都是以 compile 范围进行依赖的。比如 SSM 框架所需jar包。

test：测试过程中使用的 jar 包，以 test 范围依赖进来。比如 junit。

provided：在开发过程中需要用到的“服务器上的 jar 包”通常以 provided 范围依赖进来。比如 servlet-api、jsp-api。而这个范围的 jar 包之所以不参与部署、不放进 war 包，就是避免和服务器上已有的同类 jar 包产生冲突，同时减轻服务器的负担。说白了就是：“服务器上已经有了，你就别带啦！


#### 第七节 实验七：测试依赖的传递性

##### 1、依赖的传递性


①概念

A 依赖 B，B 依赖 C，那么在 A 没有配置对 C 的依赖的情况下，A 里面能不能直接使用 C？

②传递的原则

在 A 依赖 B，B 依赖 C 的前提下，C 是否能够传递到 A，取决于 B 依赖 C 时使用的依赖范围。

B 依赖 C 时使用 compile 范围：可以传递

B 依赖 C 时使用 test 或 provided 范围：不能传递，所以需要这样的 jar 包时，就必须在需要的地方明确配置依赖才可以。



#### 第八节 实验八：测试依赖的排除

##### 1、概念
当 A 依赖 B，B 依赖 C 而且 C 可以传递到 A 的时候，A 不想要 C，需要在 A 里面把 C 排除掉。而往往这种情况都是为了避免 jar 包之间的冲突。

![](https://img-blog.csdnimg.cn/8b812c97e19c457f87777ff3e95f775c.png)

所以配置依赖的排除其实就是阻止某些 jar 包的传递。因为这样的 jar 包传递过来会和其他 jar 包冲突。

##### 2、配置方式

```sh
<dependency>
	<groupId>com.atguigu.maven</groupId>
	<artifactId>pro01-maven-java</artifactId>
	<version>1.0-SNAPSHOT</version>
	<scope>compile</scope>
	<!-- 使用excludes标签配置依赖的排除	-->
	<exclusions>
		<!-- 在exclude标签中配置一个具体的排除 -->
		<exclusion>
			<!-- 指定要排除的依赖的坐标（不需要写version） -->
			<groupId>commons-logging</groupId>
			<artifactId>commons-logging</artifactId>
		</exclusion>
	</exclusions>
</dependency>
```

#### 第九节 实验九：继承

##### 1、概念

Maven工程之间，A 工程继承 B 工程

- B 工程：父工程
- A 工程：子工程

本质上是 A 工程的 pom.xml 中的配置继承了 B 工程中 pom.xml 的配置。

##### 2、作用

在父工程中统一管理项目中的依赖信息，具体来说是管理依赖信息的版本。

它的背景是：

对一个比较大型的项目进行了模块拆分。

一个 project 下面，创建了很多个 module。

每一个 module 都需要配置自己的依赖信息。

它背后的需求是：

在每一个 module 中各自维护各自的依赖信息很容易发生出入，不易统一管理。
使用同一个框架内的不同 jar 包，它们应该是同一个版本，所以整个项目中使用的框架版本需要统一。
使用框架时所需要的 jar 包组合（或者说依赖信息组合）需要经过长期摸索和反复调试，最终确定一个可用组合。这个耗费很大精力总结出来的方案不应该在新的项目中重新摸索。
通过在父工程中为整个项目维护依赖信息的组合既保证了整个项目使用规范、准确的 jar 包；又能够将以往的经验沉淀下来，节约时间和精力。

#### 第十节 实验十：聚合

##### 1、聚合本身的含义

部分组成整体


##### 2、Maven 中的聚合

使用一个“总工程”将各个“模块工程”汇集起来，作为一个整体对应完整的项目。

项目：整体

模块：部分

TIP

概念的对应关系：

从继承关系角度来看：

父工程

子工程

从聚合关系角度来看：

总工程
模块工程

##### 3、好处

一键执行 Maven 命令：很多构建命令都可以在“总工程”中一键执行。

以 mvn install 命令为例：Maven 要求有父工程时先安装父工程；有依赖的工程时，先安装被依赖的工程。我们自己考虑这些规则会很麻烦。但是工程聚合之后，在总工程执行 mvn install 可以一键完成安装，而且会自动按照正确的顺序执行。

配置聚合之后，各个模块工程会在总工程中展示一个列表，让项目中的各个模块一目了然。

#4、聚合的配置
在总工程中配置 modules 即可：

```sh
<modules>  
		<module>pro04-maven-module</module>
		<module>pro05-maven-module</module>
		<module>pro06-maven-module</module>
	</modules>
```
##### 5、依赖循环问题

如果 A 工程依赖 B 工程，B 工程依赖 C 工程，C 工程又反过来依赖 A 工程，那么在执行构建操作时会报下面的错误：

DANGER

 [ERROR] The projects in the reactor contain a cyclic reference:

这个错误的含义是：循环引用。


### 第四章 使用 Maven：IDEA环境

### 第五章 其他核心概念


#### 1、生命周期

①作用
为了让构建过程自动化完成，Maven 设定了三个生命周期，生命周期中的每一个环节对应构建过程中的一个操作。

②三个生命周期

| 生命周期名称 |	作用|	各个环节|
|:------------ |:-----|:-------|
|<br> Clean	|<br>清理操作相关	| pre-clean <br> clean <br> post-clean|
|<br><br>Site|<br><br>	生成站点相关	|pre-site<br>site<br>post-site<br>deploy-site|
|<br><br><br><br><br><br><br><br><br><br><br><br>Default | <br><br><br><br><br><br><br><br><br><br><br><br>主要构建过程 |	validate<br>generate-sources<br>process-sources<br>generate-resources<br>process-resources 复制并处理资源文件，至目标目录，准备打包。<br>compile 编译项目 main 目录下的源代码。<br>process-classes<br>generate-test-sources<br>process-test-sources<br>generate-test-resources<br>process-test-resources 复制并处理资源文件，至目标测试目录。<br>test-compile 编译测试源代码。<br>process-test-classes<br>test 使用合适的单元测试框架运行测试。这些测试代码不会被打包或部署。<br>prepare-package<br>package 接受编译好的代码，打包成可发布的格式，如JAR。<br>pre-integration-test<br>integration-test<br>post-integration-test<br>verify<br>install将包安装至本地仓库，以让其它项目依赖。<br>deploy将最终的包复制到远程的仓库，以让其它开发人员共享；或者部署到服务器上运行（需借助插件，例如：cargo）。|

#③特点

- 前面三个生命周期彼此是独立的。
- 在任何一个生命周期内部，执行任何一个具体环节的操作，都是从本周期最初的位置开始执行，直到指定的地方。（本节记住这句话就行了，其他的都不需要记）

Maven 之所以这么设计其实就是为了提高构建过程的自动化程度：让使用者只关心最终要干的即可，过程中的各个环节是自动执行的。

#### 2、插件和目标

 ①插件
 
Maven 的核心程序仅仅负责宏观调度，不做具体工作。具体工作都是由 Maven 插件完成的。例如：编译就是由 maven-compiler-plugin-3.1.jar 插件来执行的。

 ②目标
 
一个插件可以对应多个目标，而每一个目标都和生命周期中的某一个环节对应。

Default 生命周期中有 compile 和 test-compile 两个和编译相关的环节，这两个环节对应 compile 和 test-compile 两个目标，而这两个目标都是由 maven-compiler-plugin-3.1.jar 插件来执行的。

#### 3、仓库

- 本地仓库：在当前电脑上，为电脑上所有 Maven 工程服务
- 远程仓库：需要联网
  - 局域网：我们自己搭建的 Maven 私服，例如使用 Nexus 技术。
  - Internet
     - 中央仓库
     - 镜像仓库：内容和中央仓库保持一致，但是能够分担中央仓库的负载，同时让用户能够就近访问提高下载速度，例如：Nexus aliyun
     
建议：不要中央仓库和阿里云镜像混用，否则 jar 包来源不纯，彼此冲突。

专门搜索 Maven 依赖信息的网站：https://mvnrepository.com/


### 第六章 单一架构案例