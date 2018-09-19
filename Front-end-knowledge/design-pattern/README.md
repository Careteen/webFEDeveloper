## JS设计模式

### 前言

提高代码可读性、复用性、可扩展性。

### 目录

- [单例模式](#单例模式)
- [简单工厂模式](#简单工厂模式)
...

### 单例模式

#### What

单例模式定义为产生一个类的唯一实例。

#### How & Where

简易单例(创建一个浮层)
```js
let singleton = () =>{
  let createMask
  return () => {
    return createMask || (createMask = document.body.appendChild(document.createElement('div')))
  }
}()
// use
singleton() // 执行创建
singleton() // 利用缓存
// 多次调用只会执行一次创建代码
```
利用闭包内使用外部函数的变量不会被垃圾回收机制回收的特性，可缓存`createMask`变量，实现单例模式。

以上实现存在一定缺点，如对`createMask`操作变化，需直接修改`singleton`，那就毫无复用性可言。

优化如下
```js
let singleton = (fn) => {
  let result
  return () => {
    return result || (result = fn.apply(this, arguments))
  }
}
// use
let createMask = singleton(() => {
  return document.body.appendChild(document.createElement('div')))
})
```
真正创建浮层的代码是通过回调函数的方式传入`singleton`包装器中，其实这种方式叫`桥接模式`。往后会介绍此模式。

### 简单工厂模式

#### What

简单工厂模式是由一个方法来决定到底要创建哪个类的实例, 而这些实例经常都拥有相同的接口. 这种模式主要用在所实例化的类型在编译期并不能确定， 而是在执行期决定的情况。 说的通俗点，就像公司茶水间的饮料机，要咖啡还是牛奶取决于你按哪个按钮。