---
title: Windows 10专业版/Office免费激活
abbrlink: a8e3b7b7
date: 2025-07-01 23:08:31
tags:
  - Windows
categories:
  - Windows
declare: true
reward: true
---

###  Windows 10专业版免费激活方法一

#### 第一步：在cmd中使用slmgr命令进行激活
输入激活命令：在命令提示符窗口中，依次输入以下命令：
```
slmgr /ipk W269N-WFGWX-YVC9B-4J6C9-T83GX
slmgr /skms kms.03k.org
slmgr /ato
```

<!-- more -->

#### 这些命令的作用分别是：
/ipk：安装产品密钥
/skms：设置KMS服务器
/ato：激活Windows

#### 第二步：重启电脑
输入完这些命令后，系统会提示你重启电脑。重启后，你的Windows 10专业版应该就已经成功激活了！

###   Windows 10专业版/Office免费激活方法二：
1.右键【开始】菜单
找到【Windows PowerShell+管理员(A)】
```
irm https://massgrave.dev/get | iex
```
如果没有弹出窗口可以试下这个代码：
```
irm https://get.activated.win| iex
```
在弹出的窗口选择需要的激活的软件，1-永久 激活windows，2-永久激活office，3-激活Windows到2038年
输入1，永久 激活windows
输入2再输入1，永久激活office
验证：
```
slmgr /xpr
```