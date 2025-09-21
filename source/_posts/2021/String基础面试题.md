title: String基础面试题
author: 树叶莎莎遮窗棂
tags:
  - 面试题
  - Java
categories:
  - 面试题
abbrlink: ae2bbb84
date: 2021-12-04 10:09:00
---
#### 一、String s = new String("abc"）；方式创建对象，在内存中创建了几个对象？


```
两个： 一个是堆空间中new结构，另一个是char[]对应的常量池中的数据： "abc"
```

<!-- more -->

#### 二、String底层赋值笔试题
 
    结论：
    1.常量与常量的拼接结果在常量池。且常量池中不会存在相同内容的常量。
    2.只要其中有一个是变量，结果就在堆中。
    3.如果拼接的结果调用intern()方法，返回值就在常量池中
     
```java
@Test
    public void test3(){
        String s1 = "javaEE";
        String s2 = "hadoop";
        String s3 = "javaEEhadoop";
        String s4 = "javaEE" + "hadoop";
        String s5 = s1 + "hadoop";
        String s6 = "javaEE" + s2;
        String s7 = s1 + s2;
        System.out.println(s3 == s4);//true
        System.out.println(s3 == s5);//false
        System.out.println(s3 == s6);//false
        System.out.println(s3 == s7);//false
        System.out.println(s5 == s6);//false
        System.out.println(s5 == s7);//false
        System.out.println(s6 == s7);//false
        String s8 = s6.intern();//返回值得到的s8使用的常量值中已经存在的“javaEEhadoop”
        System.out.println(s3 == s8);//true
    }
```

#### 三、值传递面试题

注意：引用类型值传递传递的是地址值，但是String具有不可变性，故值传递后修改的只是形参的值，并不影响成员变量本身的值。

```java
public class StringTest {

    String str = new String("good");
    char[] ch = { 't', 'e', 's', 't' };

    public void change(String str, char ch[]) {
        str = "test ok";
        ch[0] = 'b';
    }
    public static void main(String[] args) {
        StringTest ex = new StringTest();
        ex.change(ex.str, ex.ch);
        System.out.println(ex.str);//good
        System.out.println(ex.ch);//best
    }
}

```