/**
 * @desc 尝试手写一个轻量级类underscore
 */ 
(function() {
  /**
   * @desc 执行环境判断
   *       希望服务于浏览器（全局对象为window，但是self比window更通用，能用于一些不具有窗口的上下文环境中（web workers））
   *       也能服务于诸如nodejs搭建的服务器（nodejs全局对象全局对象为global）
   */ 
  var root = typeof self == 'object' && self.self === self && self || 
    typeof global == 'object' && global.global === global && global ||
    this;

  // 松弛绑定之前全局环境中的 _
  var previousUnderscore = root._;

  /**
   * @desc 构造函数
   *       使用函数而非普通对象，是为了能被oop方式调用
   *       _.each([1,2,3],function () {...}) 也可以下方式调用
   *       _([1,2,3]).each(function() {...})
   * @param {*} obj 
   */ 
  var _ = function (obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj)
    this._wraped = obj;
  }

  // 松弛绑定之前全局环境中的 _
  _.noConflict = function () {
    root._ = previousUnderscore;
    return this;
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
   *    // 1.不传参数
   *    function print () {
   *      console.log('hi careteen')
   *    }
   *    window.onscroll = _.debounce(print, 1000);
   *    // 2.传参数
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
   * @param {Object} options:{leading: boolean, trailng: boolean}
   *                          leading: 是否马上触发回调函数
   *                          trailing: 是否触发最后一次回调函数
   * @scence 固定时间段间断执行函数
   *         1.DOM元素的拖拽功能（mousemove）
   *         2.canvas模拟画板功能（mousemove）
   *         3.联想搜索（keyup）
   *         4.射击游戏的mousemove/keydown事件（单位时间只能发一颗子弹）
   *         ...
   * @example
   */ 
  _.throttle = function (func, wait, options) {
    var context, args, result;
    var timer = null;
    var previous = 0;
    if (!options) {
      options = {}
    }
    var later = function () {
      // 如果设置第一个回调不立即执行
      // 则每次触发回调后 previous 置为0
      // 否则为当前时间戳
      previous = options.leading === false ? 0 : _.now();
      timer = null;
      result = func.apply(context, args);
      if (!timer) {
        context = args = null;
      }
    }
    return function () {
      context = this;
      args = arguments;
      var now = _.now();
      // 第一次执行回调 并且设置第一个回调不立即执行
      if (!previous && options.leading === false) {
        previous = now;
      }
      // 距离下次触发 func 还需要等待的时间
      var remaining = wait - (now - previous);
      // 间隔时间到了触发 func 或者 remaining > wait 表示客户端系统时间被修改过
      if (remaining <= 0 || remaining > wait) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timer) {
          context = args = null;
        }
      } else if (!timer && options.trailing !== false) { // 最后一次需要触发的情况
        timer = setTimeout(later, remaining);
      }
      return result;
    }
  }

  /**
   * @desc 对外暴露
   */ 
  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != module && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }
  
})();
