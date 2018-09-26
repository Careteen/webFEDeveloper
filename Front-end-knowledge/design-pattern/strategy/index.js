/**
 * @desc 由于浏览器下不支持require，需要支持模块打包
 *       故模块引入在`index.html`处理
 *       请打开控制台查看效果
 * @note 优点：新增或修改校验规则和新增表单项需在`validataFnc`函数修改；
 *            和`strategies.js`修改。
 *        ps：相比于传统简单处理方式，增加了不少代码量和理解难度，
 *            但是使用策略模式更符合开放-封闭原则。
 *       缺点：使用时需了解策略模式，理解`strategies.js`每一个校验规则并进行选择，
 *            其实违背了最少知识原则，但并不太影响。
 */ 

// 校验处理器
// var Validator = require('./validator.js');

var registerForm = document.getElementById('registerForm');

// 检验函数
var validataFnc = function () {
  var validator = new Validator();
  // 增加校验规则
  validator.add(registerForm.userName.value, [{
    strategy: 'isNonEmpty',
    errorMsg: '用户名不能为空'
  }, {
    strategy: 'minLength:10',
    errorMsg: '用户名长度不能小于10 位'
  }]);
  validator.add(registerForm.password.value, [{
    strategy: 'minLength:6',
    errorMsg: '密码长度不能小于6 位'
  }]);
  // 遍历规则校验
  var errorMsg = validator.start();
  return errorMsg;
}

// 表单提交
registerForm.onsubmit = function () {
  var errorMsg = validataFnc();
  if (errorMsg) {
    // 错误处理
    console.error(errorMsg);
    return false;
  }  
  // 提交表单正常逻辑👇
  // ...
  console.log('success');
}