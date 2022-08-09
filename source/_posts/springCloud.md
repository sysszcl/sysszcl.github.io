title: springboot，springCloud，springCloudAlibaba各版本之间的对应关系
author: 树叶莎莎遮窗棂
tags:
  - Java
categories:
  - Java
abbrlink: a005595a
date: 2022-06-28 22:38:00
---
### 1. [spring-cloud-alibaba](https://link.csdn.net/?target=https%3A%2F%2Fgithub.com%2Falibaba%2Fspring-cloud-alibaba%2Fwiki%2F%25E7%2589%2588%25E6%259C%25AC%25E8%25AF%25B4%25E6%2598%258E)

spring-cloud-alibaba版本对应说明

##### 1.1 组件版本关系
Spring Cloud Alibaba Version

Sentinel Version

<!-- more -->

Nacos Version

RocketMQ Version

Dubbo Version

Seata Version

2021.0.1.0

1.8.3

1.4.2

4.9.2

2.7.15

1.4.2

2.2.7.RELEASE

1.8.1

2.0.3

4.6.1

2.7.13

1.3.0

2.2.6.RELEASE

1.8.1

1.4.2

4.4.0

2.7.8

1.3.0

2021.1 or 2.2.5.RELEASE or 2.1.4.RELEASE or 2.0.4.RELEASE

1.8.0

1.4.1

4.4.0

2.7.8

1.3.0

2.2.3.RELEASE or 2.1.3.RELEASE or 2.0.3.RELEASE

1.8.0

1.3.3

4.4.0

2.7.8

1.3.0

2.2.1.RELEASE or 2.1.2.RELEASE or 2.0.2.RELEASE

1.7.1

1.2.1

4.4.0

2.7.6

1.2.0

2.2.0.RELEASE

1.7.1

1.1.4

4.4.0

2.7.4.1

1.0.0

2.1.1.RELEASE or 2.0.1.RELEASE or 1.5.1.RELEASE

1.7.0

1.1.4

4.4.0

2.7.3

0.9.0

2.1.0.RELEASE or 2.0.0.RELEASE or 1.5.0.RELEASE

1.6.3

1.1.1

4.4.0

2.7.3

0.7.1

##### 1.2 毕业版本依赖关系(推荐使用)
Spring Cloud Version

Spring Cloud Alibaba Version

Spring Boot Version

Spring Cloud 2021.0.1

2021.0.1.0

2.6.3

Spring Cloud Hoxton.SR12

2.2.7.RELEASE

2.3.12.RELEASE

Spring Cloud 2020.0.0

2021.1

2.4.2

Spring Cloud Hoxton.SR9

2.2.6.RELEASE

2.3.2.RELEASE

Spring Cloud Greenwich.SR6

2.1.4.RELEASE

2.1.13.RELEASE

Spring Cloud Hoxton.SR3

2.2.1.RELEASE

2.2.5.RELEASE

Spring Cloud Hoxton.RELEASE

2.2.0.RELEASE

2.2.X.RELEASE

Spring Cloud Greenwich

2.1.2.RELEASE

2.1.X.RELEASE

Spring Cloud Finchley

2.0.4.RELEASE(停止维护，建议升级)

2.0.X.RELEASE

Spring Cloud Edgware

1.5.1.RELEASE(停止维护，建议升级)

1.5.X.RELEASE

### 2. spring Cloud
##### 2.1 SpringBoot和SpringCloud版本关系
这里只是大致的显示对应关系

```
1 | https://spring.io/projects/spring-cloud#overview
```

Spring Cloud Release Train

Spring Boot Version

2021.0.x

2.6.x

2020.0.x

2.4.x , 2.5.x(start with 2020.0.3)

Hoxton

2.2.x , 2.3.x(start with SR5)

Greenwich

2.1.x

Finchley

2.0.x

Edgware

1.5.x

Dalston

1.5.x

Camden

1.4.x

Brixton

1.3.x

Angle

1.2.x

更具体的对应关系可以访问链接查看

```
https://start.spring.io/actuator/info


{
    "Hoxton.SR12": "Spring Boot >=2.2.0.RELEASE and <2.4.0.M1",
    "2020.0.5": "Spring Boot >=2.4.0.M1 and <2.6.0-M1",
    "2021.0.0-M1": "Spring Boot >=2.6.0-M1 and <2.6.0-M3",
    "2021.0.0-M3": "Spring Boot >=2.6.0-M3 and <2.6.0-RC1",
    "2021.0.0-RC1": "Spring Boot >=2.6.0-RC1 and <2.6.1",
    "2021.0.1": "Spring Boot >=2.6.1 and <2.6.5-SNAPSHOT",
    "2021.0.2-SNAPSHOT": "Spring Boot >=2.6.5-SNAPSHOT and <3.0.0-M1",
    "2022.0.0-M1": "Spring Boot >=3.0.0-M1 and <3.1.0-M1"
}
```
### 2.2 maven repository
[spring-boot-starter-parent 依赖链接](https://link.csdn.net/?target=https%3A%2F%2Fmvnrepository.com%2Fartifact%2Forg.springframework.boot%2Fspring-boot-starter-parent)

[spring-cloud-dependencies依赖链接](https://link.csdn.net/?target=https%3A%2F%2Fmvnrepository.com%2Fartifact%2Forg.springframework.cloud%2Fspring-cloud-dependencies)


————————————————
> 版权声明：本文为CSDN博主「segegefe」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/segegefe/article/details/124042964