## 作用域和闭包

```js
var list = [1,2,3,4,5]
for (var i = 0; i < list.length; i++) {
    setTimeout(function() {
        console.log(i + 1);
    }, 0)
}
// 上面结果每次输出 6

// 使用闭包
var list = [1,2,3,4,5]
for (var i = 0; i < list.length; i++) {
    setTimeout(function(i) {
        return function() {
            console.log(i + 1);
        }
    }(i), 0)
}
```
