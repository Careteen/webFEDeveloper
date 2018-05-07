/**
 * @desc 实现双向绑定Proxy比defineproperty优劣如何?
 * 参考：https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf#heading-0
 */


// Vue三要素

// 响应式: 例如如何监听数据变化,其中的实现方法就是我们提到的双向绑定
// 模板引擎: 如何解析模板
// 渲染: Vue如何将监听到的数据变化和解析后的HTML进行渲染

// 主要内容

// 基于数据劫持实现的双向绑定的特点
// 基于Object.defineProperty双向绑定的特点
// 基于Proxy双向绑定的特点
