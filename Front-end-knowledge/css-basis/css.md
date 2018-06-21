### css 知识点

> 盒模型

结合css3 新属性box-sizing

> 水平垂直居中

绝对定位下 设置left、top为50%，再设置transform

> margin折叠

需要满足四个条件：毗邻、两个或多个、普通流、垂直方向。

破坏四个条件之一，即可避免margin折叠。

> 浮动

浮动的产生是为了实现文字环绕图片效果，带来的问题是高度塌陷。

解决方法：1.使用clear清除。2.使用BFC清除浮动。

参考：[CSS中的浮动和清除浮动，梳理一下！](https://www.jianshu.com/p/09bd5873bed4)

> rem 原理

em、rem都是相对单位

字体用em、宽高用rem。

参考：[Rem布局的原理解析](https://zhuanlan.zhihu.com/p/30413803)
