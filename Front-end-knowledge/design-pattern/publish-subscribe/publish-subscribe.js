/**
 * @desc 全局通用发布-订阅模式
 * 		可支持：1、先发布(or触发事件)后订阅(or注册事件)
 * 					 2、新增命名空间 
 */ 
var Event = (function () {
  var _event,
      _default = 'default';
  _event = function () {
    var _listen,
        _trigger,
        _remove,
        _create,
        each,
        _slice = Array.prototype.slice,
        _shift = Array.prototype.shift,
        _unshift = Array.prototype.unshift,
        namespaceCache = {}; // 命名空间
    /**
     * @desc 内部函数 - 遍历
     * @param {Array} arr
     * @param {Function} fn fn(index, item)
     */ 
    each = function (arr, fn) {
      var ret;
      for (var index = 0, len = arr.length; index < len; index++) {
        var item = arr[index];
        // 将回调函数fn的this指向item
        ret = fn.call(item, index, item);        
      }
      return ret;
    };

    /**
     * @desc 内部函数 - 注册事件
     * @param {String} key 事件名
     * @param {Function} fn 事件函数
     * @param {Object} cache 某个命名空间下存放多个事件栈的对象
     */ 
    _listen = function (key, fn, cache) {
      if (!cache[key]) {
        cache[key] = [];
      }
      cache[key].push(fn);
    };

    /**
     * @desc 内部函数 - 触发事件
     * @param {Object} cache 某个命名空间下存放多个事件栈的对象
     * @param {String} key 事件名
     * @param {Arguments} ...args 回调函数所需参数
     */ 
    _trigger = function () {
      var cache = _shift.call(arguments),
          key = _shift.call(arguments),
          args = arguments,
          _self = this,
          stack = cache[key];
      // 触发的某个事件的事件栈里若没函数
      if (!stack || !stack.length) {
        return;
      }
      // 有则遍历
      return each(stack, function () {
        // 下面this指向stack中的每一项
        // 然后再指向_trigger函数
        return this.apply(_self, args);
      })
    };

    /**
     * @desc 内部函数 - 移除某个或所有注册事件
     * @param {String} key 事件名
     * @param {Function} fn 事件函数
     * @param {Object} cache 某个命名空间下存放多个事件栈的对象
     */ 
    _remove = function (key, fn, cache) {
      // 有注册过才会删除
      if (cache[key]) {
        // 若传了特定函数，删除特定
        if (fn) {
          for (var i = cache[key].length; i >= 0; i--) { // 反向遍历
            if (cache[key] === fn) {
              cache[key].splice(i, 1);
            }            
          }
        } else {
          // 否则删除所有注册函数
          cache[key] = [];
        }
      }
    };

    /**
     * @desc 内部函数 - 创建命名空间 核心函数
     * @param {String} namespace 默认值为 _default
     */ 
    _create = function (namespace) {
      var namespace = namespace || _default,
          cache = {},
          offlineStack = [], // 离线事件 - 主要是为了实现先调用后注册
          ret = {
            /**
             * @desc 注册事件
             * @param {String} key
             * @param {Function} fn
             * @param {String} last 先调用后注册场景下，注册时只会读取最新一次注册事件 携带的参数
             */ 
            listen: function (key, fn, last) {
              _listen(key, fn, cache);
              // 注册过了 则不进行下面的
              if (offlineStack === null) {
                return;
              }
              // 没有注册就触发了事件 
              // 在trigger函数中将触发事件 离线缓存到了offlineStack
              if (last === 'last') {
                // 订阅时只会读取最新一次注册事件 携带的参数
                offlineStack.length && offlineStack.pop()();
              } else {
                // 遍历触发离线缓存的事件栈
                each(offlineStack, function () {
                  // 下面this指向offlineStack中的每一项
                  this();
                })
              }
              // 置为null 表示已经注册过了
              offlineStack = null;
            },

            /**
             * @desc 单例
             * 参数同 listen
             */ 
            one: function (key, fn, last) {
              _remove(key, cache);
              this.listen(key, fn, last)
            },

            /**
             * @desc 触发事件
             * @param {String} key 
             * @param {Arguments} args 触发时带的参数
             */ 
            trigger: function () {
              var fn,
                  args,
                  _self = this;
              // 将 某个命名空间下存放多个事件栈的对象cache 放到参数队头
              _unshift.call(arguments, cache);
              args = arguments;
              // 调用事件
              fn = function () {
                return _trigger.apply(_self, args);
              }
              // offlineStack为[]时，为未注册先调用，将事件fn放进 离线事件栈offlineStack中
              if (offlineStack) {
                return offlineStack.push(fn);
              }
              // 否则触发事件
              return fn();
            },

            /**
             * @desc 移除某个事件的某个或所有注册函数
             * @param {String} key 某个事件
             * @param {Function} fn 传则移除某个事件，否则移除所有事件
             */ 
            remove: function (key, fn) {
              _remove(key, cache, fn);
            }
          };
      // 缓存命名空间 
      return namespace ? 
        (namespaceCache[namespace] ?
          namespaceCache[namespace] :
          namespaceCache[namespace] = ret) :
        ret;
    };

    /**
     * @desc 对外暴露API
     */ 
    return {
      // 创建命名空间
      create: _create,
      // 以下均使用默认的命名空间
      listen: function (key, fn, last) {
        var event = this.create();
        event.listen(key, fn, last)
      },
      one: function (key, fn, last) {
        var event = this.create();
        event.one(key, fn, last)
      },
      trigger: function () {
        var event = this.create();
        event.trigger.apply(this, arguments);
      },
      remove: function (key, fn) {
        var event = this.create();
        event.remove(key, fn);
      }
    }
  }()
  return _event;
})();

/**
 * @desc 测试用例 
 *
 */ 
// 先发布后订阅
console.log('先发布后订阅：');
Event.trigger('click', 'careteen');
Event.trigger('click', 'lanlan');
Event.listen('click', function (data) {
  console.log('_default:' + data);
});
// 输出 -> careteen  & lanlan

// 先发布后订阅 传last时，订阅只会读取最新一次发布的数据
console.log('先发布后订阅 传last时，订阅只会读取最新一次发布的数据：');
Event.create('nameThree').trigger('tap', 'letme');
Event.create('nameThree').trigger('tap', 'mlxg');

Event.create('nameThree').listen('tap', function (data) {
  console.log('data is:' + data);
}, 'last');
// 输出 -> data is: mlxg

// 使用命名空间
console.log('使用命名空间：');
Event.create('nameOne').listen('click', function (data) {
  console.log('nameOne:' + data); // lanlan
});
Event.create('nameOne').trigger('click', 'lanlan');

Event.create('nameTwo').listen('click', function (data) {
  console.log('nameTwo:' + data); // high
});
Event.create('nameTwo').trigger('click', 'high');

