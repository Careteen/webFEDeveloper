//归并排序
function mergeSort(array, p, r) {
    if (p < r) {
        var q = Math.floor((p + r) / 2);
        mergeSort(array, p, q);
        mergeSort(array, q + 1, r);
        merge(array, p, q, r);
    }
}

function merge(array, p, q, r) {
    var n1 = q - p + 1,
        n2 = r - q,
        left = [],
        right = [],
        m = n = 0;
    for (var i = 0; i < n1; i++) {
        left[i] = array[p + i];
    }
    for (var j = 0; j < n2; j++) {
        right[j] = array[q + 1 + j];
    }
    left[n1] = right[n2] = Number.MAX_VALUE;
    for (var k = p; k <= r; k++) {
        if (left[m] <= right[n]) {
            array[k] = left[m];
            m++;
        } else {
            array[k] = right[n];
            n++;
        }
    }
}

console.log(mergeSort([1, 4, 7, 3, 6, 9, 2, 8]))

/**
 *1、实现一个函数：
    参数：两个已经排好序的数组
    返回值：一个排好序的数组
 */
function merge2(arr1, arr2) {
    var result = [];
    var k = 0;
    var len = arr2.length + arr1.length;
    if (arr1[arr1.length - 1] <= arr2[0]) {
        return result.concat(arr1, arr2);
    } else if (arr1[0] >= arr2[arr2.length - 1]) {
        return result.concat(arr2, arr1);
    } else {
        for (var i = 0, j = 0; k < len; k++) {
            if (arr1[i] <= arr2[j]) {
                result[k] = arr1[i];
                i++;
            } else {
                result[k] = arr2[j];
                j++;
            }
        }
        return result;
    }


}
console.log(merge2([1, 3, 5], [20, 40, 60]))

/**
 *实现一个函数：
    参数：一个字符串如。cookie=‘key1=value1;key2=value2;key3=value3;key4=value4’
    匹配第一个value值为纯数字的key
 */
function regE(cookie) {
    var reg = /([^=;]+)=(\d+)[;$]/g;
    var result = [];
    cookie.replace(reg, function (res, $1, $2) {
        console.log($1)
        console.log($2)
        result.push($2);
        return res;
    });
    return result;
}
console.log(regE('key1=value1;key2=234w;key3=3333;key4=4'))
