title: margin 实现水平居中，垂直居中原理
author: 树叶莎莎遮窗棂
tags:
  - CSS
  - margin实现水平垂直居中
categories:
  - CSS
abbrlink: 22a31491
date: 2022-04-19 19:36:00
---
前置知识：margin的auto属性的作用是用来分配剩余空间，所以对于有剩余空间的元素才有效哦（块及元素）。比如图片设置margin: 0 auto是无效的，因为图片是内联元素，不是占一整行，没有剩余空间。

### 1.块级元素水平方向居中：

**原理：两侧auto，则平分剩余空间，相当于水平居中。**

```css
div { 
    margin-right: auto;
    margin-left: auto;
    width:200px;
    height: 200px; 
   }
``` 

<!-- more -->


跟垂直方向无关，垂直方向可随便设置，只要水平左右都设置为auto即可。

**注意：width宽度一定要设置，没有宽度的块默认就是100%，就没有auto值了。**



### 2.块级元素水平居右：

**原理：一侧auto，一侧没设置，则设置auto的一侧分配所有剩余空。**

想让div居右显示，已经很简单了。把margin-left 的值设置为auto 即可。

```css
div {
    width:200px; 
    height: 200px; 
    margin-left: auto;
   }
```



**原理：一侧定值,一侧auto,auto为剩余空间大小。**

```css
div {
   width:200px;
   height: 200px;
   margin-left: auto;
   margn-right: 100px;
   }
```

以上方法只能实现水平方向，对于垂直方向是无效的，因为垂直方向没有剩余空间，这点不再解释了。

### 3.想要实现垂直方向的居中可以用(绝对定位+margin)

```css
div  {
       background: #FF0000;
       width: 200px;
       height: 200px;
       position: absolute;
       top: 0;
       left: 0;
       right: 0;
       bottom: 0;
       margin: auto;
    }
```

**这里要注意哦，上下左右四个一个不能少，当我们给他定位让他上下左右都是0的时候，我们就有了多余空间，auto就能平分剩余的空间去实现水平垂直居中,```margin: auto;```  是关键，没有设置此项，也不会水平垂直居中哦。**

 仅实现垂直方向居中:
```css
   margin-top: auto;
   margin-bottom: auto;
```

解释下原理:

- 在普通内容流中，margin:auto的效果等同于margin-top:0;margin-bottom:0。

- position:absolute使绝对定位块跳出了内容流，内容流中的其余部分渲染时绝对定位部分不进行渲染。

- 为块区域设置top: 0; left: 0; bottom: 0; right: 0;将给浏览器重新分配一个边界框，此时该块块将填充其父元素的所有可用空间，所以margin 垂直方向上有了可分配的空间。

- 再设置margin 垂直方向上下为auto，即可实现垂直居中。（注意高度得设置）。


版权声明：本文为CSDN博主「shizhan1881」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/linshizhan/article/details/71521140