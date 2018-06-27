/**
 *
 * @desc 斐波那契数列
 * @example
    ```
    数学公式：f(1) = 1,f(2) = 1, f(n) = f(n-1) + f(n-2)
    ```
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
