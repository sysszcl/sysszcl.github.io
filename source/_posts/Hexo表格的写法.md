title: Hexo表格的写法
author: 树叶莎莎遮窗棂
tags:
  - Hexo
categories:
  - Hexo
abbrlink: f574e2bb
date: 2022-08-09 21:02:00
---
每个属性对应的行为也就是下面的表


```
|        |  换行符     | 	空格符的合并及忽略 |	自动换行 |
|:--------- |:------------- |:-------------------- |:-------- |
|normal    |当成空格，并且合并|	合并       	|是      |
|nowrap	   |当成空格，并且合并|	合并	        |否      |
|pre	   |保留	         |保留          |否      |
|pre-wrap  |	保留        |	保留          |是      |
|pre-line  | 保留	         |合并           |是     |
```

<!-- more -->

渲染html结果如下所示：

![](https://img-blog.csdnimg.cn/fe848d5900f14509836d4906424831aa.jpeg)