/**
 * @desc 尝试手写一个轻量级类underscore
 */ 
(function() {
  // 构造函数
  var _ = function (obj) {

  }

  // 内部函数
  var cb = function () {
    
  }

  /**
   * @desc 当前'时间戳'（不是时间戳，单位是ms，是时间戳*1000）
   * @returns {Number} timestamp
   */ 
  _.now = Date.now || function () {
    return new Date().getTime();
  }

  // 函数防抖动 - 简易实现
  _.debounceSimple = function (func, wait) {
    var timer, args, context;
    var later = function () {
      timer = null;
      func.apply(context, args)
    }
    return function () {
      context = this;
      args = arguments;
      clearTimeout(timer);
      timer = setTimeout(later, wait)
    }
  }

  /**
   * @desc 函数防抖动
   * @param {Function} func 
   * @param {Number} wait 
   * @scence 延迟多久触发一次回调、使连续的函数执行降低到一次
   *         1.文本输入的验证（连续输入文字进行ajax验证，验证一次就行）
   *         2.每次添加元素自动触发排序函数（连续添加100个，排序函数会触发100次，理想情况只触发一次，即添加完所有内容以后触发）
   * @example
   *    1.不传参数
   *    function print () {
   *      console.log('hi careteen')
   *    }
   *    window.onscroll = _.debounce(print, 1000);
   *    2.传参数
   *    function print (param) {
   *      console.log('hi ' + param)
   *    }
   *    var callback = _.debounce(print, 1000);
   *    window.onscroll = function () {
   *      var param = 'careteen';
   *      callback(param);
   *    }
   * @note 如果滚动100次，debounceSimple会创建100个timer，再销毁；
   *       而debounce只会创建1个timer，达到触发条件后销毁。
   */ 
  _.debounce = function (func, wait) {
    var timer, args, context, timestamp;
    var later = function () {
      var last = _.now() - timestamp;
      if (last > 0 && last < wait) {
        timer = setTimeout(later, wait - last);
      } else {
        // 可以触发了
        timer = null;
        func.apply(context, args);
      }
    }
    // 返回闭包，可以传入参数
    return function () {
      args = [].slice.call(arguments, 0);
      context = this;
      timestamp = _.now();
      if (!timer) {
        timer = setTimeout(later, wait)
      }
    }
  }

  /**
   * @desc 函数节流
   * @param {Function} func 
   * @param {Number} wait 
   * @scence 
   *         1.
   * @example
   */ 
  _.throttle = function (func, wait) {

  }
}).call(this)
