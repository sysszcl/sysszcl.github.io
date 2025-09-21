title: 自定义html 标签中的 title属性
author: 树叶莎莎遮窗棂
abbrlink: 85c205a9
tags: 
  - HTML
categories: 
  - Web
date: 2022-12-21 23:19:00
---

##### 自定义html 标签中的 title属性

<!-- more -->

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
<title>JS控制TITLE悬停效果 - veryhuo.com</title>
<script type="text/javascript">
/**
* className 类名
* tagname HTML标签名，如div,td,ul等
* @return Array 所有class对应标签对象组成的数组
* @example
<div class="abc">abc</div>
var abc = getClass('abc');
for(i=0;i<abc.length;i++){
abc[i].style.backgroundColor='red';
}
*/

function getClass(className,tagname) {
//tagname默认值为'*'，不能直接写成默认参数方式getClass(className,tagname='*')，否则IE下报错
if(typeof tagname == 'undefined') tagname = '*';
if(typeof(getElementsByClassName) == 'function') {
return getElementsByClassName(className);
}else {
var tagname = document.getElementsByTagName(tagname);
var tagnameAll = [];
for(var i = 0; i < tagname.length; i++) {
if(tagname[i].className == className) {
tagnameAll[tagnameAll.length] = tagname[i];
}
}
return tagnameAll;
}
}
/**
* JS字符切割函数
* @params string 原字符串
* @params words_per_line 每行显示的字符数
*/
function split_str(string,words_per_line) {
//空串，直接返回
if(typeof string == 'undefined' || string.length == 0) return '';
//单行字数未设定，非数值，则取默认值50
if(typeof words_per_line == 'undefined' || isNaN(words_per_line)){
words_per_line = 50;
}
//格式化成整形值
words_per_line = parseInt(words_per_line);
//取出i=0时的字，避免for循环里换行时多次判断i是否为0
var output_string = string.substring(0,1);
//循环分隔字符串
for(var i=1;i<string.length;i++) {
//如果当前字符是每行显示的字符数的倍数，输出换行
if(i%words_per_line == 0) {
output_string += "<br/>";
}
//每次拼入一个字符
output_string += string.substring(i,i+1);
}
return output_string;
}
/**
* 鼠标悬停显示TITLE
* @params obj 当前悬停的标签
*
*/
function titleMouseOver(obj,event,words_per_line) {
//无TITLE悬停，直接返回
if(typeof obj.title == 'undefined' || obj.title == '') return false;
//不存在title_show标签则自动新建
var title_show = document.getElementById("title_show");
if(title_show == null){
title_show = document.createElement("div"); //新建Element
document.getElementsByTagName('body')[0].appendChild(title_show); //加入body中
var attr_id = document.createAttribute('id'); //新建Element的id属性
attr_id.nodeValue = 'title_show'; //为id属性赋值
title_show.setAttributeNode(attr_id); //为Element设置id属性
var attr_style = document.createAttribute('style'); //新建Element的style属性
attr_style.nodeValue = 'position:absolute;' //绝对定位
+'border:solid 1px #999999; background:#EDEEF0;' //边框、背景颜色
+'border-radius:2px;box-shadow:2px 3px #999999;' //圆角、阴影
+'line-height:18px;' //行间距
+'font-size:12px; padding: 2px 5px;'; //字体大小、内间距
try{
title_show.setAttributeNode(attr_style); //为Element设置style属性
}catch(e){
//IE6
title_show.style.position = 'absolute';
title_show.style.border = 'solid 1px #999999';
title_show.style.background = '#EDEEF0';
title_show.style.lineHeight = '18px';
title_show.style.fontSize = '18px';
title_show.style.padding = '2px 5px';
}
}
//存储并删除原TITLE
document.title_value = obj.title;
obj.title = '';
//单行字数未设定，非数值，则取默认值50
if(typeof words_per_line == 'undefined' || isNaN(words_per_line)){
words_per_line = 50;
}
//格式化成整形值
words_per_line = parseInt(words_per_line);
//在title_show中按每行限定字数显示标题内容，模拟TITLE悬停效果
title_show.innerHTML = split_str(document.title_value,words_per_line);
//显示悬停效果DIV
title_show.style.display = 'block';
//根据鼠标位置设定悬停效果DIV位置
event = event || window.event; //鼠标、键盘事件
var top_down = 15; //下移15px避免遮盖当前标签
//最左值为当前鼠标位置 与 body宽度减去悬停效果DIV宽度的最小值，否则将右端导致遮盖
var left = Math.min(event.clientX,document.body.clientWidth-title_show.clientWidth);
title_show.style.left = left+"px"; //设置title_show在页面中的X轴位置。
title_show.style.top = (event.clientY + top_down)+"px"; //设置title_show在页面中的Y轴位置。
}
/**
* 鼠标离开隐藏TITLE
* @params obj 当前悬停的标签
*
*/
function titleMouseOut(obj) {
var title_show = document.getElementById("title_show");
//不存在悬停效果，直接返回
if(title_show == null) return false;
//存在悬停效果，恢复原TITLE
obj.title = document.title_value;
//隐藏悬停效果DIV
title_show.style.display = "none";
}
/**
* 悬停事件绑定
* @params objs 所有需要绑定事件的Element
*
*/
function attachEvent(objs,words_per_line){
if(typeof objs != 'object') return false;
//单行字数未设定，非数值，则取默认值50
if(typeof words_per_line == 'undefined' || isNaN(words_per_line)){
words_per_line = 50;
}
for(i=0;i<objs.length;i++){
objs[i].onmouseover = function(event){
titleMouseOver(this,event,words_per_line);
}
objs[i].onmouseout = function(event){
titleMouseOut(this);
}
}
}
// Downloads By http://www.veryhuo.com
//初始化，当页面onload的时候，对所有class="title_hover"的标签绑定TITLE悬停事件
window.onload = function(){
attachEvent(getClass('title_hover'),18); //行字数设定为18
}
</script>
</head>
<body>
<style>
tr{float:left; margin:0 50px;}
</style>
<table>
<tr>
<td title="这个是默认的TITLE这个是默认的TITLE这个是默认的TITLE这个是默认的TITLE这个是默认的TITLE这个是默认的TITLE">鼠标悬停[原生版本]</td>
</tr>
<tr>
<td title="这个是JS实现悬停的TITLE这个是JS实现悬停的TITLE这个是JS实现悬停的TITLE这个是JS实现悬停的TITLE这个是JS实现悬停的TITLE"
οnmοuseοver="titleMouseOver(this,event,15);" οnmοuseοut="titleMouseOut(this);">鼠标悬停[直接调用函数版本,设定行字数]</td>
</tr>
<tr>
<td class="title_hover" title="ABCTesterABCTesterABCTesterABCTesterABCTesterABCTesterABCTester">鼠标悬停[class控制版本]</td>
</tr>
<tr>
<td title="这个是JS实现悬停的TITLE这个是JS实现悬停的TITLE这个是JS实现悬停的TITLE这个是JS实现悬停的TITLE这个是JS实现悬停的TITLE"
οnmοuseοver="titleMouseOver(this,event);" οnmοuseοut="titleMouseOut(this);">鼠标悬停[直接调用函数版本,默认行字数]</td>
</tr>
</table>
</body>
</html><div style="text-align:center;margin:30px 0 0 0;"><hr style="color:#999;height:1px;">如不能显示效果，请按Ctrl+F5刷新本页。</div>
```