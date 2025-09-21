---
title: JS异步之宏队列与微队列
author: 树叶莎莎遮窗棂
tags:
  - Web
  - JavaScript
categories:
  - Web
abbrlink: f7278d2d
date: 2022-04-16 00:18:00
---
1. 宏列队: 用来保存待执行的宏任务(回调), 比如: 定时器回调/DOM事件回调/ajax回调
2. 微列队: 用来保存待执行的微任务(回调), 比如: promise的回调/MutationObserver的回调
3. JS执行时会区别这2个队列
	JS引擎首先必须先执行所有的初始化同步任务代码
	每次准备取出第一个宏任务执行前, 都要将所有的微任务一个一个取出来执行
    
![浏览器线程渲染](https://img-blog.csdnimg.cn/34b9692a0aec43499eaf44c4adf3894d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAc3lzc3pjbA==,size_20,color_FFFFFF,t_70,g_se,x_16)