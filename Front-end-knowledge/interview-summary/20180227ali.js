// ----------------------------------------------
//              ali 题
// ----------------------------------------------


/**
 *
 * @desc 比较两个版本号
 * @example
 ```js
 compareVersion('0.1','1.1.1'); // return -1
 compareVersion('13.7','1.2'); // return 1
 compareVersion('1.1','1.1.0'); // return 0
 ```
 */
function compareVersion(v1, v2) {
    var arr1 = v1.split('.');
    var arr2 = v2.split('.');

    if (arr1.length < 2 || arr2.length < 2) {
        console.log('请传入正确的版本号！');
        return false;
    }

    if (+arr1[0] > +arr2[0]) {
        return 1;
    } else if (+arr1[0] < +arr2[0]) {
        return -1;
    } else {

        if (+arr1[1] > +arr2[1]) {
            return 1;
        }else if (+arr1[1] < +arr2[1]) {
            return -1;
        } else {
            if (arr1.length < 3 ) {
                arr1[2] = 0;
            }
            if (arr2.length < 3) {
                arr2[2] = 0;
            }

            if (+arr1[2] > +arr2[2]) {
                return 1;
            }else if (+arr1[2] < +arr2[2]) {
                return -1;
            } else {
                return 0;
            }
        }
    }
}


/**
 *
 * @desc 一个简单的事件订阅机制
 * @example
 ```js
 const event = new EventEmitter();
 event.on('some_event', (...args) => {});
 event.emit('some_event', 'abc', 123)
 ```
 */
function isFunction(obj) {
    return typeof obj == 'function' || false;
}

class EventEmitter {
    constructor(){
        this.listeners = new Map();
    }
    on(label, callback) {
        this.listeners.has(label) || this.listeners.set(label, []);
        this.listeners.get(label).push(callback);
    }
    off(label, callback) {
        let listenerArr = this.listeners.get(label);
        let targetIndex;
        if (listenerArr && listenerArr.length) {
            targetIndex = listenerArr.reduce((i, listener, index) => {
                return (isFunction(listener) && listener === callback) ? i = index : i;
            }, -1);
        }
        if (targetIndex > -1) {
            listenerArr.splice(targetIndex, 1);
            this.listeners.set(label, listenerArr);
            return true;
        }

        return false;
    }
    emit(label, ...args) {
        let listenerArr = this.listeners.get(label);
        if (listenerArr && listenerArr.length) {
            listenerArr.forEach((listener) => {
                listener(...args);
            })
            return true;
        }
        return false;
    }
}
/**
 *
 * @desc 获取一个数字数组中的最大值
 * @example
 ```js
 getMaxFromArray([1,3,5,6,9]); // return 9;
 ```
 */
function getMaxFromArray(arr) {
    if (Object.prototype.toString.call(arr) != '[Object Array]') {
        console.error('请传入数组');
        return false;
    }

    return Math.max.apply(null, arr);
}

/**
 *
 * @desc 给定一个编码字符，岸边吗规则进行解码，输出字符串
 * @example
 ```js
 const s = '3[a]2[]bc'; decodeString(s); // return 'aaabcbc';
 const s = '3[a2[c]]'; decodeString(s); // return 'accaccacc'
 ```
 */
function decodeString(str) {
  	let exp = /(\d)\[([a-zA-Z]+)\]/
    while(true){
    	if(exp.test(str) === false){
        	return str
        }else {
        	str = str.replace(exp,(match,count,letter)=>{
            	return letter.repeat(Number.parseInt(count))
            })
        }
    }
}

function decodeString(str) {
    let result = '',
        tempSub = '',
        tempLeft = 0,
        i = 0,
        flag = -1;
    while (i < str.length) {
        // 数字
        if (!isNaN(str[i])) {
            // 是新子串
            if (flag === -1) {
                flag = parseInt(str[i], 10);
                tempSub = '';
                tempLeft = 1;
                i += 2;
            } else {
                tempSub += str[i];
                i++;
            }
        } else if (str[i] === '[') {
            tempSub += str[i];
            tempLeft++;
            i++;
        } else if (str[i] === ']') {
            if (tempLeft === 1) {
                if (flag > 0) {
                    tempSub = decodeString(tempSub);
                    for (let j = 0; j < flag; j++) {
                        result += tempSub;
                    }
                    flag = -1;
                }
            } else {
                tempSub += str[i];
                tempLeft--;
            }
            i++;
        } else {
            if (flag === -1) {
                result += str[i];
            } else {
                tempSub += str[i];
            }
            i++;
        }
    }
    return result;
}

/**
 *
 * @desc 计算多个区间的交集
 * @example
 ```js
 getIntersection([5,2],[4,9],[3,6]); //return [4,5];
 getIntersection([1,7],[8,9]); //return null;
 ```
 */
function swap(arr) {
    if (arr[0] > arr[1]) {
        let temp = arr[0];
        arr[0] = arr[1];
        arr[1] = temp;
    }
    return arr;
}
function getIntersection() {
    let arrList = arguments,
        result = null;
    if (arguments.length > 0 && arguments[0] != null) {
        result = swap(arguments[0]);

        for (let i = 1; i < arguments.length; i++) {
            if (arguments[i] != null) {
                let curArr = swap(arguments[i]);
                if (curArr[0] > result[0]) {
                    result[0] = curArr[0];
                }
                if (curArr[1] < result[1]) {
                    result[1] = curArr[1];
                }
                if (result[0] > result[1]) {
                    result = null;
                    break;
                }
            } else {
                result = null;
                break;
            }
        }
    }
    return result;
}
