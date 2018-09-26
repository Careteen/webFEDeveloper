/**
 * @desc 校验类，执行时校验过程及结果委托给Strategies策略类
 */ 

// var Strategies = require('./strategies.js');

var Validator = function () {
  // 存储单个实例所有校验规则
  this.cache = [];
};
Validator.prototype.add = function (dom, rules) {
  var self = this;
  for (var i = 0, rule; rule = rules[ i++ ];) {
    (function (rule){
      // 将strategy和参数分开
      var strategyAry = rule.strategy.split(':');
      var errorMsg = rule.errorMsg;
      // 将校验步骤用空函数包装起来，并且存储在cache中
      self.cache.push(function () {
        // 用户指定的strategy
        var strategy = strategyAry.shift();
        // 将被校验值加入参数列表
        strategyAry.unshift(dom);
        // 将errorMsg也加入参数列表
        strategyAry.push(errorMsg);
        // 委托 策略类封装的校验规则 进行校验
        return Strategies[strategy].apply(dom, strategyAry);
      });
    })(rule)
  }
};
Validator.prototype.start = function () {
  // 遍历所有加入的校验规则
  for (var i = 0, validatorFunc; validatorFunc = this.cache[ i++ ];){
    var errorMsg = validatorFunc();
    // 若没通过校验则终止遍历并返回当前错误信息
    if (errorMsg){
      return errorMsg;
    }
  }
};

// module.exports = Validator;