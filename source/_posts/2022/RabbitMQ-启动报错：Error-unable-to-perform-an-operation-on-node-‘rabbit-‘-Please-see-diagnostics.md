title: RabbitMQ 启动报错
author: 树叶莎莎遮窗棂
tags:
  - Java
  - RabbitMQ
categories:
  - Java
abbrlink: '67550989'
date: 2022-10-09 22:40:00
---
### Error: unable to perform an operation on node ‘rabbit@***‘. Please see diagnostics...

问题描述：

安装完 ErLang 和 RabbitMQ 之后执行 rabbitmqctl status 报错：

<!-- more -->


```
Error: unable to perform an operation on node 'rabbit@wangshuo'. Please see diagnostics information and suggestions below.

Most common reasons for this are:

 * Target node is unreachable (e.g. due to hostname resolution, TCP connection or firewall issues)
 * CLI tool fails to authenticate with the server (e.g. due to CLI tool's Erlang cookie not matching that of the server)
 * Target node is not running

In addition to the diagnostics info below:

 * See the CLI, clustering and networking guides on https://rabbitmq.com/documentation.html to learn more
 * Consult server logs on node rabbit@wangshuo
 * If target node is configured to use long node names, don't forget to use --longnames with CLI tools

DIAGNOSTICS
===========

attempted to contact: [rabbit@wangshuo]

rabbit@wangshuo:
  * connected to epmd (port 4369) on wangshuo
  * epmd reports: node 'rabbit' not running at all
                  no other nodes on wangshuo
  * suggestion: start the node

Current node details:
 * node name: 'rabbitmqcli-19760-rabbit@wangshuo'
 * effective user's home directory: C:\Users\13343
 * Erlang cookie hash: y1wQRjvcOXX+x5pqGKKOWw==
 ```
 
 错误的原因是 Erlang 的 cookie 出现问题，Erlang 会生成两个 cookie 文件：
 
 ```C:\Windows\System32\config\systemprofile\.erlang.cookie``` 
 
 ```C:\用户\你的用户名\.erlang.cookie```。

用后者的文件替换掉前者的文件。

> 如果还不行，那就卸载了，然后使用 默认路径 重装。此方法最好使，能避免很多坑！

重装之后启动服务并执行 rabbitmqctl status。