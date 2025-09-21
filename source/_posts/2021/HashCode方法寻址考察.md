title: HashCode方法寻址考察
author: 树叶莎莎遮窗棂
tags:
  - Java
categories:
  - Java
abbrlink: 147997b7
date: 2021-12-07 21:50:00
---
本题可采用内存分析，Set底层代码是Map实现，数组+指针

```java
public void test3(){
        HashSet set = new HashSet();
        Person p1 = new Person(1001,"AA");
        Person p2 = new Person(1002,"BB");

        set.add(p1);
        set.add(p2);
        System.out.println(set);

        p1.name = "CC";
        set.remove(p1);//移除时先算hashCode值，此时有两个
        System.out.println(set);
        set.add(new Person(1001,"CC"));
        System.out.println(set);
        set.add(new Person(1001,"AA"));//此时hash值一样，但是equals不一样，此时结果4个
        System.out.println(set);

    }
```