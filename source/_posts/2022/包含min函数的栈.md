title: 包含min函数的栈
author: 树叶莎莎遮窗棂
tags:
  - Algorithm
categories:
  - Algorithm
declare: true
abbrlink: 11cbd9c1
date: 2022-02-11 23:39:00
---
### 定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。

```java
MinStack minStack1 = new MinStack();
minStack1.push(-2);
minStack1.push(0);
minStack1.push(-3);
minStack1.min();   --> 返回 -3.
minStack1.pop();
minStack1.top();      --> 返回 0.
minStack1.min();   --> 返回 -2.
```
<!-- more -->

本题难点： 将 min() 函数复杂度降为 O(1)O(1) ，可通过建立辅助栈实现；
数据栈 A ： 栈 A用于存储所有元素，保证入栈 push() 函数、出栈 pop() 函数、获取栈顶 top() 函数的正常逻辑。
辅助栈 B ： 栈 B中存储栈 A 中所有 非严格降序 的元素，则栈 A 中的最小元素始终对应栈 B 的栈顶元素，即 min() 函数只需返回栈 B 的栈顶元素即可。
因此，只需设法维护好栈B的元素，使其保持非严格降序，即可实现 min()函数的O(1)复杂度。

```java
class MinStack {
    private Stack<Integer> stack1;
    private Stack<Integer> stack2;    
    /** initialize your data structure here. */
    public MinStack() {
       this.stack1 = new Stack<>();
       this.stack2 = new Stack<>();
    }
    public void push(int x) {
        stack1.push(x);
        if(stack2.empty() || stack2.peek() >= x)
            stack2.add(x);
    }
    public void pop() {
         if(stack1.pop().equals(stack2.peek()))
            stack2.pop();
    }
    public int top() {
         return stack1.peek();
    }
    public int min() {
       return stack2.peek();
    }
}

/**
 * Your MinStack object will be instantiate and called as such:
 * MinStack obj = new MinStack();
 * obj.push(x);
 * obj.pop();
 * int param_3 = obj.top();
 * int param_4 = obj.min();
 */
```