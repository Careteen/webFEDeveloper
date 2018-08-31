## 常用数据结构&算法总结

### 栈

#### 概念

- 栈是一个线性结构，在计算机中是一个相当常见的数据结构。
- 栈的特点是只能在某一端添加或删除数据，遵循先进后出的原则。

#### 实现

- 每种数据结构都可以用很多种方式来实现，其实可以把栈看成是数组的一个子集，所以这里使用数组来实现

```js
class Stack {
  constructor() {
    this.stack = []
  }
  push(item) {
    this.stack.push(item)
  }
  pop() {
    this.stack.pop()
  }
  peek() {
    return this.stack[this.getCount() - 1]
  }
  getCount() {
    return this.stack.length
  }
  isEmpty() {
    return this.getCount() === 0
  }
}
```

#### 应用

- [有效的括号 -leetcode](https://leetcode-cn.com/problems/valid-parentheses/description/)

### 队列

#### 概念

- 队列一个线性结构，特点是在某一端添加数据，在另一端删除数据，遵循先进先出的原则。

#### 实现

- 这里会讲解两种实现队列的方式，分别是单链队列和循环队列。

##### 单链队列
```js
class Queue {
  constructor() {
    this.queue = []
  }
  enQueue(item) {
    this.queue.push(item)
  }
  deQueue() {
    return this.queue.shift()
  }
  getHeader() {
    return this.queue[0]
  }
  getLength() {
    return this.queue.length
  }
  isEmpty() {
    return this.getLength() === 0
  }
}
```
因为单链队列在出队操作的时候需要 O(n) 的时间复杂度，所以引入了循环队列。循环队列的出队操作平均是 O(1) 的时间复杂度。

###### 循环队列

顺序队列中存在“假溢出”现象。因为在入队和出队操作中，头、尾指针只增加不减小，致使被删除元素的空间永远无法重新利用。因此，尽管队列中实际元素个数可能远远小于数组大小，但可能由于尾指针巳超出向量空间的上界而不能做入队操作。该现象称为假溢出。

为充分利用向量空间，克服上述“假溢出”现象的方法是：将为队列分配的向量空间看成为一个首尾相接的圆环，并称这种队列为循环队列(Circular Queue)。

在循环队列中进行出队、入队操作时，队首、队尾指针仍要加1，朝前移动。只不过当队首、队尾指针指向向量上界(this.queue.length-1)时，其加1操作的结果是指向向量的下界0。

用模运算可简化为：i=(i+1)%this.queue.length ;

显然，为循环队列所分配的空间可以被充分利用，除非向量空间真的被队列元素全部占用，否则不会上溢。因此，真正实用的顺序队列是循环队列。

```js
class SqQueue {
  constructor(length) {
    this.queue = new Array(length + 1)
    // 队头
    this.first = 0
    // 队尾
    this.last = 0
    // 当前队列大小
    this.size = 0
  }
  enQueue(item) {
    // 判断队尾 + 1 是否为队头
    // 如果是就代表需要扩容数组
    // % this.queue.length 是为了防止数组越界
    if (this.first === (this.last + 1) % this.queue.length) {
      this.resize(this.getLength() * 2 + 1)
    }
    this.queue[this.last] = item
    this.size++
    this.last = (this.last + 1) % this.queue.length
  }
  deQueue() {
    if (this.isEmpty()) {
      throw Error('Queue is empty')
    }
    let r = this.queue[this.first]
    this.queue[this.first] = null
    this.first = (this.first + 1) % this.queue.length
    this.size--
    // 判断当前队列大小是否过小
    // 为了保证不浪费空间，在队列空间等于总长度四分之一时
    // 且不为 2 时缩小总长度为当前的一半
    if (this.size === this.getLength() / 4 && this.getLength() / 2 !== 0) {
      this.resize(this.getLength() / 2)
    }
    return r
  }
  getHeader() {
    if (this.isEmpty()) {
      throw Error('Queue is empty')
    }
    return this.queue[this.first]
  }
  getLength() {
    return this.queue.length - 1
  }
  isEmpty() {
    return this.first === this.last
  }
  resize(length) {
    let q = new Array(length)
    for (let i = 0; i < length; i++) {
      q[i] = this.queue[(i + this.first) % this.queue.length]
    }
    this.queue = q
    this.first = 0
    this.last = this.size
  }
}
```
- 题目描述：假设某银行有4个窗口对外接待客户，从早晨银行开门起不断有客户进入银行。由于每个窗口在某个时刻只能接待一个客户，因此在客户人数众多时需在每个窗口前顺次排队们对于刚进入银行的客户，如果某个窗口的业务员正空闲，则可上前办理业务。反之，若4个窗口均有客户所占，他便会排在人数最少的队伍后面。现在需要编制一个程序以模拟银行的这种业务活动并计算一天中客户的银行逗留的平均时间。
> 代码实现见[离散事件模拟，利用链表和队列模拟银行业务程序](https://www.cnblogs.com/webFrontDev/p/3683420.html)

- 题目描述：一群猴子排成一圈，按 1，2，...，n 依次编号。然后从第 1 只开始数，数到第 m 只,把它踢出圈，从它后面再开始数，再数到第 m 只，在把它踢出去...，如此不停的进行下去，直到最后只剩下一只猴子为止，那只猴子就叫做大王。要求编程模拟此过程，输入 m、n，输出最后那个大王的编号。
> 代码实现[循环队列来模拟击鼓传花的游戏（约瑟夫环问题）](https://www.cnblogs.com/dee0912/p/4960025.html)

### 链表

#### 概念

- 链表是一个线性结构，同时也是一个天然的递归结构。链表结构可以充分利用计算机内存空间，实现灵活的内存动态管理。但是链表失去了数组随机读取的优点，同时链表由于增加了结点的指针域，空间开销比较大。
- 许多链表的实现都在链表前面有一个特殊的节点，叫做头节点。最后一个节点指向null，所以最后再加上一个null节点。
- 在链表中插入一个节点的效率很高。向链表中插入一个节点，需要修改它前面的节点，使其指向新加入的节点，而新加入的节点则指向前面指向的节点。
- 从链表中删除一个节点也很简单，将待删除的元素的前驱节点指向待删除的后续节点，同时将待删除元素指向null来释放。

#### 实现
单项链表
```js
class Node {
  constructor(v, next) {
    this.value = v
    this.next = next
  }
}
class LinkList {
  constructor() {
    // 链表长度
    this.size = 0
    // 虚拟头部
    this.dummyNode = new Node(null, null)
  }
  find(header, index, currentIndex) {
    if (index === currentIndex) return header
    return this.find(header.next, index, currentIndex + 1)
  }
  addNode(v, index) {
    this.checkIndex(index)
    // 当往链表末尾插入时，prev.next 为空
    // 其他情况时，因为要插入节点，所以插入的节点的 next 应该是 prev.next
    // 然后设置 prev.next 为插入的节点
    let prev = this.find(this.dummyNode, index, 0)
    prev.next = new Node(v, prev.next)
    this.size++
    return prev.next
  }
  insertNode(v, index) {
    return this.addNode(v, index)
  }
  addToFirst(v) {
    return this.addNode(v, 0)
  }
  addToLast(v) {
    return this.addNode(v, this.size)
  }
  removeNode(index, isLast) {
    this.checkIndex(index)
    index = isLast ? index - 1 : index
    let prev = this.find(this.dummyNode, index, 0)
    let node = prev.next
    prev.next = node.next
    node.next = null
    this.size--
    return node
  }
  removeFirstNode() {
    return this.removeNode(0)
  }
  removeLastNode() {
    return this.removeNode(this.size, true)
  }
  checkIndex(index) {
    if (index < 0 || index > this.size) throw Error('Index error')
  }
  getNode(index) {
    this.checkIndex(index)
    if (this.isEmpty()) return
    return this.find(this.dummyNode, index, 0).next
  }
  isEmpty() {
    return this.size === 0
  }
  getSize() {
    return this.size
  }
}
```

### 二叉树

#### what？二叉树是什么？目的是什么？做什么工作？有什么特征？

- 二叉树是一种特殊的树，特征如下：
    - 子节点个数不超过2；
    - 子节点次序不能任意颠倒。

- 二叉查找树是一种特殊的二叉树，特征如下：
    - 相对较小的值存储在左节点，较大的值存储在右节点。


#### why？为什么要使用二叉树？可不可以不使用？有没有替代方案？


#### where？在哪些场景适合使用二叉树？


#### how？怎么使用二叉树？如何提高效率？具体详细使用方法？



#### STAR？举个栗子🌰

- [二叉查找树的实现(前序、中序、后续遍历)](https://github.com/careteenL/webFEDeveloper/blob/master/Front-end-knowledge/algorithm/20180611-algorithm-summary.js)

####  附录

参考： [二叉树与JS](http://foreverz.cn/2016/10/19/%E4%BA%8C%E5%8F%89%E6%A0%91%E4%B8%8EJavaScript/)

### 冒泡排序

- 实现见[冒泡排序](https://github.com/careteenL/webFEDeveloper/blob/master/Front-end-knowledge/algorithm/20180831-quickSort.js)

### 插入排序

- 实现见[插入排序](https://github.com/careteenL/webFEDeveloper/blob/master/Front-end-knowledge/algorithm/20180831-insertionSort.js)

### 选择排序

- 实现见[选择排序]()

### 快排

- 实现见[快排](https://github.com/careteenL/webFEDeveloper/blob/master/Front-end-knowledge/algorithm/20180831-quickSort.js)

### 归并排序

- 实现见[归并排序](https://github.com/careteenL/webFEDeveloper/blob/master/Front-end-knowledge/algorithm/20180831-mergeSort.js)

### 系统自带的排序

- [v8实现](https://github.com/v8/v8/blob/ad82a40509c5b5b4680d4299c8f08d6c6d31af3c/src/js/array.js##L760:7)是小于是个数时使用插入排序，否则使用快排。