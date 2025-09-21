title: Promise执行顺序举一反三
author: 树叶莎莎遮窗棂
tags:
  - Web
  - JavaScript
categories:
  - Web
abbrlink: a80659d3
date: 2022-04-16 16:27:00
---
### 事件队列循环原理参照文章（JS异步之宏队列与微队列）
### Promise相关面试题1

```javascript
 setTimeout(()=>{
      console.log(1)
    },0)
    Promise.resolve().then(()=>{
      console.log(2)
    })
    Promise.resolve().then(()=>{
      console.log(4)
    })
    console.log(3)
```
**打印结果： 3 2 4 1**

<!-- more -->

### Promise相关面试题2

```javascript
  setTimeout(() => {
        console.log(1)
      }, 0)
      new Promise((resolve) => {
        console.log(2)
        resolve()
      }).then(() => {
        console.log(3)
      }).then(() => {
        console.log(4)
      })
      console.log(5)
```
**打印结果： 2 5 3 4 1**


### Promise相关面试题3

```javascript
 const first = () => (new Promise((resolve, reject) => {
        console.log(3)
        let p = new Promise((resolve, reject) => {
          console.log(7)
          setTimeout(() => {
            console.log(5)
            resolve(6)
          }, 0)
          resolve(1)
        })
        resolve(2)
        p.then((arg) => {
          console.log(arg)
        })
    
      }))
    
      first().then((arg) => {
        console.log(arg)
      })
      console.log(4)
```
**打印结果： 3 7 4 1 2 5**


### Promise相关面试题4

```javascript
 setTimeout(() => {
        console.log("0")
      }, 0)
      new Promise((resolve,reject)=>{
        console.log("1")
        resolve()
      }).then(()=>{        
        console.log("2")
        new Promise((resolve,reject)=>{
          console.log("3")
          resolve()//不会重复调用回调函数，同一个回调函数只执行一次
        }).then(()=>{      
          console.log("4")
        }).then(()=>{       
          console.log("5")
        })
      }).then(()=>{  
        console.log("6")
      })
    
      new Promise((resolve,reject)=>{
        console.log("7")
        resolve()
      }).then(()=>{         
        console.log("8")
      })
```
**打印结果：1 7 2 3 8 4 6 5 0**