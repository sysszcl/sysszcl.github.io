title: synchronized 与 Lock的异同？
author: 树叶莎莎遮窗棂
tags:
  - java
  - 面试题
  - 多线程同步机制异同
categories:
  - java
  - 多线程
abbrlink: b3c95c5f
date: 2021-12-02 21:28:00
---
#### 相同：二者都可以解决线程安全问题

#### 不同：synchronized机制在执行完相应的同步代码以后，自动的释放同步监视器

         Lock需要手动的启动同步（lock())，同时结束同步也需要手动的实现(unlock())