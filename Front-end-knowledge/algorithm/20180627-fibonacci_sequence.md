## 斐波那契数列

### 前言

斐波那契数列用常规递归方式实现会产生堆栈溢出的问题，所以需要使用尾递归优化。

### 什么是斐波那契数列？

也叫兔子数列

```js
/**
 *
 * @desc 斐波那契数列
 * @example
    数学公式：f(1) = 1,f(2) = 1, f(n) = f(n-1) + f(n-2)
 */

// 最常见版本
function fibonacci(n) {
    if (n <= 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 尾递归
// 尾递归实质：将方法需要的上下文通过方法的参数传递给下一次调用，已达到去除依赖。
function fibonacciNew(n, num1 = 1, num2 = 1) {
    if (n <= 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    }
    return fibonacciNew(n - 1, num2, num1 + num2)
}

// 直接使用递归的方式调用，会产生堆栈溢出，所以得慎用。

```
### 总结

慎用直接使用递归的方式调用，会产生堆栈溢出。

### 引用

- [JS的递归与TCO尾调用优化 - 强烈推荐](https://segmentfault.com/a/1190000004018047)

- [尾调用优化 -ruanES6](http://es6.ruanyifeng.com/#docs/function#%E5%B0%BE%E8%B0%83%E7%94%A8%E4%BC%98%E5%8C%96)

- [朋友你听说过尾递归吗](http://imweb.io/topic/584d33049be501ba17b10aaf)

- [斐波那契数列 -百度百科](https://baike.baidu.com/item/%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91%E6%95%B0%E5%88%97/99145)
