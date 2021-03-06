/**
 *
 * @desc 正则表达式奇技淫巧
 */

const RegExpFns = {
    /**
     *
     * @desc 驼峰式命名改成短横线命名
     * @param {String} str
     * @return {String} str
     * @example
     ```js
     RegExpFns._camel2Kebab('careteenLanlan'); // careteen-lanlan
     ```
     */
    _camel2Kebab (str) {
        return str.replace(/([A-Z])/g, '-$1').toLowerCase();
    },

    /**
     *
     * @desc 短横线命名改成驼峰式命名
     * @param {String} str
     * @return {String} str
     * @example
     ```js
     RegExpFns._kebab2Camel('careteen-lanlan'); // careteenLanlan
     ```
     */
    _kebab2Camel (str) {
        return str.replace(/-(\w)/g, (match, $1) => {
            return $1.toUpperCase();
        })
    },

    /**
     *
     * @desc 千位分隔符
     * @param {String|Number} str 只适合整数字符
     * @return {String} str
     * @example
     ```js
     RegExpFns._thousandSeq('1234567'); // 1,234,567
     ```
     */
    _thousandSeq (str) {
        return str && str.toString().replace(/(?!^)(?=(\d{3})+$)/g, ',');
    },

    /**
     *
     * @desc 判断一个数是否为素数
     * @param {Number} num
     * @return {Boolean}
     * @example
     ```js
     RegExpFns._isPrime(2); // true
     ```
     * @reference https://github.com/jawil/blog/issues/20
     */
    _isPrime (num) {
        return !/^1?$|^(11+?)\1+$/.test(Array(num + 1).join('1'));
    },

    /**
     *
     * @desc 去掉字符前后空格
     * @param {String} str
     * @return {String|Boolean}
     * @example
     ```js
     RegExpFns._trim(' care teen  '); // 'care teen'
     ```
     */
    _trim (str) {
        if (typeof str !== 'string') {
            console.error('[TypeError]: argument must be a string');
            return false;
        }
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },

    /**
     *
     * @desc 获取 url 某个 param 的 value
	 * @param  {String} name
     * @param  {String} url   [default: location.href]
	 * @return {String|Boolean}
     * @example
     ```js
     RegExpFns._getParam('name', 'http://blog.careteen.wang?name=careteen&age=22'); // 'careteen'
     ```
     */
    _getParam (name, url) {
        if (typeof name !== 'string') return false;
		if (!url) url = window.location.href;
        // 当遇到name[xx]时，对方括号做一下转义为 name\[xxx\]，因为下面还需要使用name做正则
		name = name.replace(/[\[\]]/g, '\\$&');
		const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
		const results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
}


/**
 *
 * @desc 测试用例
 */
// console.log('_camel2Kebab', RegExpFns._camel2Kebab('careteenLanlan'));
// console.log('_kebab2Camel', RegExpFns._kebab2Camel('careteen-lanlan-a'));
// console.log('_thousandSeq', RegExpFns._thousandSeq('1234567'));
console.log('_isPrime', RegExpFns._thousandSeq('2'));

// export default RegExpFns;
