
/**
 * @desc 使用队列 + setTimeout 实现的简易 LazyMan
 * @param {String} name 
 */ 
function LazyMan (name) {
  return new _LazyMan(name);
}

// 构造一个_LazyMan类
class _LazyMan {
  constructor (name) {
    // 队列存放事件
    this.tasks = [];
    // 闭包
    let task = (name => () => {
      console.log(`This is ${name} !`);
      this.next();
    })(name);
    this.tasks.push(task);
    // 在下一个事件循环启动任务
    setTimeout(() => {
      this.next();
    }, 0);
  }
  // 事件调度函数
  next () {
    let task = this.tasks.shift();
    task && task();
  }
  eat (food) {
    let task = (food => () => {
      console.log(`Eat ${food} !`);
      this.next();
    })(food);
    this.tasks.push(task);
    // 链式调用
    return this;
  }
  sleep (time) {
    let task = (time => () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}s !`);
        this.next();
      }, time * 1000);
    })(time);
    this.tasks.push(task);
    return this;
  }
  sleepFirst (time) {
    let task = (time => () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}s !`);
        this.next();
      }, time * 1000);
    })(time);
    // 优先级最高，放到队头
    this.tasks.unshift(task);
    return this;
  }
}

// 测试用例
LazyMan('Careteen').sleep(10).eat('beef');
LazyMan('Careteen').sleepFirst(5).eat('supper');