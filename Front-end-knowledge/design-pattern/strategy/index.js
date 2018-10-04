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
var userName = document.getElementById('userName');
var userNameError = document.getElementById('userNameError');
var password = document.getElementById('password');
var phoneNumber = document.getElementById('phoneNumber');

var validator;
// 检验函数
var validataFnc = function () {  
  validator = new Validator();
  // 增加校验规则
  validator.add('userName', registerForm.userName.value, [{
    strategy: 'isNonEmpty',
    errorMsg: '用户名不能为空'
  }, {
    strategy: 'minLength:10',
    errorMsg: '用户名长度不能小于10位'
  }]);
  validator.add('password', registerForm.password.value, [{
    strategy: 'minLength:6',
    errorMsg: '密码长度不能小于6位'
  }]);
  validator.add('phoneNumber', registerForm.phoneNumber.value, [{
    strategy: 'isMobile',
    errorMsg: '请填写正确的手机号'
  }]);
  // 遍历规则校验
  var error = validator.start();
  return error;
}

userName.addEventListener('input', function (val) {
  console.log(registerForm.userName.value);
  var error = validator && validator.start('userName', registerForm.userName.value);
  if (error) {
    console.error(error);
    return false;
  } else {
    userNameError.innerHTML = '';
  }
})

// 表单提交
registerForm.onsubmit = function () {
  var error = validataFnc();
  if (error) {
    console.error(error);
    if (error.key === 'userName') {
      userNameError.innerHTML = error.errorMsg;
    }    
    return false;
  }
  // 提交表单正常逻辑👇
  // ...
  console.log('success');
}