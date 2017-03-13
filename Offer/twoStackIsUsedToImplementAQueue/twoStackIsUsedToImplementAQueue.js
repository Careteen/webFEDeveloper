/**
 *题目：用两个栈实现队列：实现两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入节点和在在队列头部删除节点的功能
 *思路：1、定义两个栈 stack1 ，stack2 。
 *     2、入栈操作 appendTail 都放入 stack1 。
 *     3、将stack1所有元素出栈，并压入 stack2 。
 *     4、出栈操作 deleteHead 在 stack2 中进行。
 */
/**
 *   参考：剑指offer 面试题七-用两个栈实现队列
 *        牛客网 剑指offer https://www.nowcoder.com/profile/9144128/codeBookDetail?submissionId=8246331
 */
var stack1 = [],
  stack = [];
//入栈操作
function appendTail(node) {
  stack2.push(node);
}
//出栈操作
function deleteHead() {
  if (stack2.length == 0) {
    while (stack1.length > 0) {
      stack2.push(stack1.pop());
    }
  }
  return stack2.pop();
}

module.export = {
  push: appendTail,
  pop: deleteHead
}
