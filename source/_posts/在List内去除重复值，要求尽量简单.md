title: 在List内去除重复值，要求尽量简单
author: 树叶莎莎遮窗棂
tags:
  - Java
  - Set
  - List
categories:
  - Java
  - ''
abbrlink: b842ff96
date: 2021-12-07 21:43:00
---
### 在List内去除重复值，要求尽量简单

```java
public class DuplicateList {
    public static void main(String[] args) {
        List list  = new ArrayList();
        list.add(new Integer(1));
        list.add(new Integer(2));
        list.add(new Integer(2));
        list.add(new Integer(4));
        list.add(new Integer(4));
        List list1 = DuplicateList.duplicateList(list);
        Iterator iterator = list1.iterator();
        while(iterator.hasNext()){
            System.out.println(iterator.next());
        }
    }
   public static List duplicateList(List list){
       HashSet set = new HashSet();
       set.addAll(list);
       return new ArrayList(set);
   }
}

```