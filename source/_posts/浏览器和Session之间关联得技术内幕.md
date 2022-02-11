title: 浏览器和Session之间关联的技术内幕
author: 树叶莎莎遮窗棂
tags:
  - JavaWeb
  - Session技术内幕
categories:
  - JavaWeb
abbrlink: 9a8d88a0
date: 2022-01-23 22:07:00
---
### Session技术，底层其实是基于Cookie技术来实现的

1.浏览器没有任何的cookie信息，浏览器向服务器发起请求。
2.服务器第一次使用request.getSession();(第一次使用本方法作用：创建会话对象)，服务器每次创建一个Cookie对象。这个Cookie对象的key永远是：JSESSIONID值是新创建出来的Session的id值。
3.通过响应把新创建出来的Session的id值返回给客户端Set-cookie: JSESSIONID=23423234211XAS223XASH233HSDF23;
4.浏览器解析到数据，就马上创建出一个Cookie对象。
5.浏览器端有了JSESSIONID之后的每次请求，都会把SESSION的id以Cookie的形式发送给服务器。
6.浏览器收到请求后再次使用request.getSession();(第二次使用本方法作用：通过Cookie中的id找到服务器之前创建好的Session对象，并返回)