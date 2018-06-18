## HTTP基础知识

### 从输入url到页面展示到底发生了什么

参考：[从输入url到页面展示到底发生了什么](https://www.itcodemonkey.com/article/3263.html)

### TCP和UDP的区别和各自的应用

- TCP可靠，在建立连接之前会通过三次握手，在传输数据过程有确认、重传、窗口机制，也由于这些机制导致TCP比较慢、占内存，也容易被别人利用，实现DDOS攻击。

- UDP不可靠，没有TCP那一套机制，所以在传输数据时，若网络质量不佳，会导致丢包。但是传输快。

- TCP应用场景：浏览器端的HTTP，邮件系统outlook的SMTP

- UDP应用场景：qq语音、qq视频

参考：[传输层TCP和UDP的区别分析与应用场景 -CSDN](https://blog.csdn.net/u013777351/article/details/49226101)

### 三次握手，四次挥手。为什么三次握手？为什么四次挥手？

- [图解TCP三次握手与四次分手 -掘金](https://juejin.im/post/5a7835a46fb9a063606eb801)

### 引用

- [从输入url到页面展示到底发生了什么](https://www.itcodemonkey.com/article/3263.html)
