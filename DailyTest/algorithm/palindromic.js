/**
 * Created by careteen on 2016-12-16
   求一个字符串最大回文前缀长度
 */
function maxPalindromic(str) {

}

function makeOdd(str) {
    var len = str.length;
    if (len % 2 === 1) {
        return str;
    }
    var newStr = '#';
    for (i = 0; i < len; i++) {
        newStr += str[i] + '#';
    }
    return newStr;
}

function judge(str) {
    (str.length % 2 === 0) && (str = makeOdd(str));
    var len = str.length,
        half = Math.floor(len / 2),
        last = len - half;
    var i = 0;
    while (i <= last) {
        if (str[half - i] !== str[half + i]) {
            return false;
        }
        i++;
    }
    return true;
}

function getAllSubs(str) {
    var len = str.length,
        res = [];
    for (var i = 0; i < len; i++) {
        for (var j = i; j < len; j++) {
            var sub = str.substring(i, j + 1);
            // console.error(sub);  
            if (sub.length > 1 && judge(sub)) {
                res[res.length] = sub;
            }
        }
    }
    return res;
}
console.time('maxPalindromic')
console.log(getAllSubs('abcbaaca'));
console.timeEnd('maxPalindromic');
