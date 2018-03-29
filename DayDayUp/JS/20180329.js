/**
 *
 * @desc 计算某个字符串中 出现次数最多的字符
 */

let str = 'asdfghjklaqwertyuiopiaia'

const statStringNumber = (str) => {
    let result = [...str].reduce((initial, curVal) => {
        if (curVal in initial) {
            initial[curVal] ++;
        } else {
            initial[curVal] = 1;
        }
        return initial;
    },{})
    let max = 0, maxVal = '';

    for (var key in result) {
        if (result.hasOwnProperty(key)) {
            if (result[key] > max) {
                max = result[key];
                maxVal = key;
            }
        }
    }
    return maxVal;
}

let result = statStringNumber(str);
console.log(`result:${result}`);

/**
 *
 * @desc 将一个二维数组推平为一维数组 -- 优雅的实现扁平化
 *      方式二不能确保保持元素的类型，都会变为String
 */

const flatten = arr => arr.reduce((pre, val) => pre.concat(Array.isArray(val) ? flatten(val) : val), []);

const flatten2 = arr => arr.toString().split(',');

let result2 = flatten([[1,2],[3,4],[5,6]]);
let result3 = flatten([1,[2,[3,[4,[5,[6]]]]]]);
let result4 = flatten2([1,[2,[3,[4,[5,[6]]]]]]);

console.log(`result2:${result2}`);
console.log(`result3:${result3}`);
console.log(`result4:${result4}`);

/**
 *
 * @desc bind 的 pollyfill
 */


 if (!Function.prototype.bind) {
   Function.prototype.bind = function(oThis) {
     if (typeof this !== 'function') {
       // closest thing possible to the ECMAScript 5
       // internal IsCallable function
       throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
     }

     var aArgs   = Array.prototype.slice.call(arguments, 1),
         fToBind = this,
         fNOP    = function() {},
         fBound  = function() {
           return fToBind.apply(this instanceof fNOP
                  ? this
                  : oThis,
                  // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
                  aArgs.concat(Array.prototype.slice.call(arguments)));
         };

     // 维护原型关系
     if (this.prototype) {
       // Function.prototype doesn't have a prototype property
       fNOP.prototype = this.prototype;
     }
     fBound.prototype = new fNOP();

     return fBound;
   };
 }

function foo() {
    this.b = 100;
    return this.a;
}
var func = foo.bind({a:1});
func();
new func();
