## 使用Promise.race和delay取消XHR请求

### 前言

XHR有一个 timeout 属性，使用该属性也可以简单实现超时功能，但是为了能支持多个XHR同时超时或者其他功能，我们采用了容易理解的异步方式在XHR中通过超时来实现取消正在进行中的操作。

可以使用Promise.race来实现超时机制。

### 引用

- [使用Promise.race和delay取消XHR请求 -github](https://github.com/Myoursky/MyBlog/issues/25)
