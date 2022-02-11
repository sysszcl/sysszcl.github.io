title: ArrayList、LinkedList、Vector三者的异同？
author: 树叶莎莎遮窗棂
tags:
  - 面试题
  - List集合
  - List集合异同
categories:
  - Java
abbrlink: 3b7fd52b
date: 2021-12-05 23:51:00
---
同：三个类都是实现了List接口，存储数据的特点相同：存储有序的、可重复的数据。
不同：
```java
|----ArrayList：作为List接口的主要实现类；线程不安全的，效率高；底层使用Object[] elementData存储
|----LinkedList：对于频繁的插入、删除操作，使用此类效率比ArrayList高；底层使用双向链表存储
|----Vector：作为List接口的古老实现类；线程安全的，效率低；底层使用Object[] elementData存储
```