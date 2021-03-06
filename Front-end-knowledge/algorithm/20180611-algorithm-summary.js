/**
 *
 * @desc 二叉树
 * 二叉树遍历的四种方式及思想
 * 深度遍历：
 *  - 前序遍历：访问根 -> 遍历左子树 -> 遍历右子树
 *  - 中序遍历：遍历左子树 -> 访问根 -> 遍历右子树
 *  - 后序遍历：遍历左子树 -> 遍历右子树 -> 访问根
 * 广度遍历：按照层级一层层遍历
 */

// 中序遍历构造的一棵二叉树 (a + b * c) - (d / e)
var tree = {
    value: '-',
    left: {
        value: '+',
        left: {
            value: 'a'
        },
        right: {
            value: '*',
            left: {
                value: 'b'
            },
            right: {
                value: 'c'
            }
        }
    },
    right: {
        value: '/',
        left: {
            value: 'd'
        },
        right: {
            value: 'e'
        }
    }
}

// 前序遍历 - 递归实现
var preorderList = [];
function preorderTraversal(node) {
    if (node) {
        preorderList.push(node.value);
        preorderTraversal(node.left);
        preorderTraversal(node.right);
    }
}
// 前序遍历 - 非递归实现
function pre(root) {
    if (root) {
        let stack = [];
        // 先将根节点 push
        stack.push(root);
        // 判断栈中是否为空
        while (stack.length > 0) {
            // 弹出栈顶元素
            root = stack.pop();
            console.log(root);
            // 因为先序遍历是先左后右，栈是先进后出结构
            // 所以先 push 右边再 push 左边
            if (root.right) {
                stack.push(root.right);
            }
            if (root.left) {
                stack.push(root.left);
            }
        }
    }
} 
preorderTraversal(tree);
console.log('前序遍历： ' + preorderList);
// 前序遍历： -,+,a,*,b,c,/,d,e

// 中序遍历 - 递归实现
var inorderList = [];
function inorderTraversal(node) {
    if (node) {
        inorderTraversal(node.left);
        inorderList.push(node.value);
        inorderTraversal(node.right);
    }
}
// 中序遍历 - 非递归实现
function mid(root) {
    if (root) {
      let stack = [];
      // 中序遍历是先左再根最后右
      // 所以首先应该先把最左边节点遍历到底依次 push 进栈
      // 当左边没有节点时，就打印栈顶元素，然后寻找右节点
      // 对于最左边的叶节点来说，可以把它看成是两个 null 节点的父节点
      // 左边打印不出东西就把父节点拿出来打印，然后再看右节点
      while (stack.length > 0 || root) {
        if (root) {
          stack.push(root);
          root = root.left;
        } else {
          root = stack.pop();
          console.log(root);
          root = root.right;
        }
      }
    }
  }
inorderTraversal(tree);
console.log('中序遍历： ' + inorderList);
// 中序遍历： a,+,b,*,c,-,d,/,e

// 后序遍历 - 递归实现
var postorderList = [];
function postorderTraversal(node) {
    if (node) {
        postorderTraversal(node.left);
        postorderTraversal(node.right);
        postorderList.push(node.value);
    }
}
// 后序遍历 - 非递归实现
function pos(root) {
    if (root) {
      let stack1 = [];
      let stack2 = [];
      // 后序遍历是先左再右最后根
      // 所以对于一个栈来说，应该先 push 根节点
      // 然后 push 右节点，最后 push 左节点
      stack1.push(root);
      while (stack1.length > 0) {
        root = stack1.pop();
        stack2.push(root);
        if (root.left) {
          stack1.push(root.left);
        }
        if (root.right) {
          stack1.push(root.right);
        }
      }
      while (stack2.length > 0) {
        console.log(s2.pop());
      }
    }
  }
postorderTraversal(tree);
console.log('后序遍历： ' + postorderList);
// 后序遍历： a,b,c,*,+,d,e,/,-


/**
 *
 * @desc 二叉查找树 - 是一种特殊的二叉树，相对较小的值存储在左节点，较大的值存储在右节点
     `Bst` 类在初始状态保存着整个二叉查找树的根节点(root)，`Bst` 拥有一个用来插入节点的方法：`insert`，接收节点的数据，并插入相应的位置，根据二叉查找树的特性：较小的值存放在左节点中，较大的值存放在右节点中，所以 `insert` 算法如下：

    * 1、根据输入的数据 `value` 创建一个新的节点。
    * 2、检查是否有根节点，如果没有根节点证明这是一颗新树，将该节点作为根节点。
    * 3、否则，开始遍历树，将根节点设为当前节点，使用新节点与当前节点作比较，如果新节点的值小于当前节点。
        * 3.1、如果当前节点的左子节点为null，则将新节点设为当前节点的左子节点，退出循环。
        * 3.2、如果当前节点的左子节点不为null，则更新当前节点为当前节点的左子节点，执行下一次循环。
    * 4、如果新节点的值大于当前节点。
        * 4.1、如果当前节点的右子节点为null，则将新节点设为当前节点的右子节点，退出循环。
        * 4.2、如果当前节点的右子节点不为null，则更新当前节点为当前节点的右子节点，执行下一次循环。
 */

// 节点类
function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}
// 二叉查找树
function BST() {
    this.root = null;
}
// 插入节点
BST.prototype.insert = function(value) {
    var n = new Node(value);
    if (!this.root) {
        this.root = n;
        return
    }
    var current = this.root;
    while (true) {
        if (value < current.value) {
            if (!current.left) {
                current.left = n;
                break;
            }
            current = current.left
        } else {
            if (!current.right) {
                current.right = n;
                break
            }
            current = current.right
        }
    }
}

// ##### 查找
//
// 二叉查找树的查找分为：
// * 查找最小值
// * 查找最大值
// * 查找给定值

// ###### 查找最小值
//
// 我们知道，二叉查找树的特性就是较小的值存储在左边，所以要找到最小的值，只需要遍历左子树到最后一个节点即可，该节点即保存着最小值：

BST.prototype.getMin = function () {
    var current = this.root
    while (current.left) {
        current = current.left
    }
    return current.value
}

// ###### 查找最大值
//
// 类似于查找最小值，只不过遍历的是右子树：

BST.prototype.getMax = function () {
    var current = this.root
    while (current.right) {
        current = current.right
    }
    return current.value
}

// ###### 查找给定值
//
// 查找给定值稍微复杂一点，算法如下：
//
// * 1、设当前节点为根节点，对树进行遍历
// * 2、比较要查找的值是否等于当前节点的值，如果是则返回当前节点
// * 3、如果要查找的值小于当前节点的值，则更新当前节点为当前节点的左节点，执行第 2 步
// * 4、如果要查找的值大于当前节点的值，则更新当前节点为当前节点的右节点，执行第 2 步
// * 5、未找到返回 null
//
// 代码如下：

BST.prototype.find = function (value) {
    var current = this.root
    while (current) {
        if (current.value === value) {
            return current
        }
        if (value < current.value) {
            current = current.left
        }
        if (value > current.value) {
            current = current.right
        }
    }
    return null
}
