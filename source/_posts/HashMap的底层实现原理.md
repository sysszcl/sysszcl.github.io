title: HashMap的底层实现原理
author: 树叶莎莎遮窗棂
tags:
  - Java
  - HashMap
  - 底层原理
categories:
  - Java
abbrlink: 2e64946d
date: 2021-12-07 22:36:00
---
### 以jdk7为例说明：
       HashMap map = new HashMap():
       在实例化以后，底层创建了长度是16的一维数组Entry[] table。
       ...可能已经执行过多次put...
       map.put(key1,value1):
       首先，调用key1所在类的hashCode()计算key1哈希值，此哈希值经过某种算法计算以后，得到在Entry数组中的存放位置。
       
<!-- more -->
       
       如果此位置上的数据为空，此时的key1-value1添加成功。 ----情况1
       如果此位置上的数据不为空，(意味着此位置上存在一个或多个数据(以链表形式存在)),比较key1和已经存在的一个或多个数据
       的哈希值：
               如果key1的哈希值与已经存在的数据的哈希值都不相同，此时key1-value1添加成功。----情况2
               如果key1的哈希值和已经存在的某一个数据(key2-value2)的哈希值相同，继续比较：调用key1所在类的equals(key2)方法，比较：
                       如果equals()返回false:此时key1-value1添加成功。----情况3
                       如果equals()返回true:使用value1替换value2。
 
        补充：关于情况2和情况3：此时key1-value1和原来的数据以链表的方式存储。
 
       在不断的添加过程中，会涉及到扩容问题，当超出临界值(且要存放的位置非空)时，扩容。默认的扩容方式：扩容为原来容量的2倍，并将原有的数据复制过来。
 
 ### jdk8 相较于jdk7在底层实现方面的不同：
       1. new HashMap():底层没有创建一个长度为16的数组
       2. jdk 8底层的数组是：Node[],而非Entry[]
       3. 首次调用put()方法时，底层创建长度为16的数组
       4. jdk7底层结构只有：数组+链表。jdk8中底层结构：数组+链表+红黑树。
          4.1 形成链表时，七上八下（jdk7:新的元素指向旧的元素。jdk8：旧的元素指向新的元素）
          4.2 当数组的某一个索引位置上的元素以链表形式存在的数据个数 > 8 且当前数组的长度 > 64时，此时此索引位置上的所数据改为使用红黑树存储。
 
       DEFAULT_INITIAL_CAPACITY : HashMap的默认容量，16
       DEFAULT_LOAD_FACTOR：HashMap的默认加载因子：0.75
       threshold：扩容的临界值，=容量*填充因子：16 * 0.75 => 12
       TREEIFY_THRESHOLD：Bucket中链表长度大于该默认值，转化为红黑树:8
       MIN_TREEIFY_CAPACITY：桶中的Node被树化时最小的hash表容量:64