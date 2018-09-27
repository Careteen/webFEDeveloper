## JS的双等号，隐式转换

### 前言

### 应用

解析`[] == ![] => true`
```js
// [] 转成 true 然后取反 false
[] == false
// 一方为 Boolean 会转为 Number
[] == 0
// 一方为 Object，一方为 String or Number ，对象会转为基本类型
'' == 0
// 一方为 String，一方为 Number ，String 会转为 Number
0 == 0 => true
```


### 引用

- [通过一张简单的图，让你彻底地、永久地搞懂JS的==运算](http://www.admin10000.com/document/9242.html)
