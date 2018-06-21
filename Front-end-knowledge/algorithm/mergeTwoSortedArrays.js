/**
 *1、实现一个函数：
    参数：两个已经排好序的数组
    返回值：一个排好序的数组
 */

function merge(arr1, arr2) {
    var r = [];
    subMerge(r, arr1, arr2);
    return r;
}

function subMerge(r, arr1, arr2) {
    if (arr1.length && arr2.length) {
        var e1 = arr1[0];
        var e2 = arr2[0];
        if (e1 < e2) {
            r.push(arr1.shift());
        } else {
            r.push(arr2.shift());
        }
        subMerge(r, arr1, arr2);
        return;
    }
    var keyArr = arr1;
    if (!arr1.length) {
        keyArr = arr2;
    }
    keyArr.forEach(function (item) {
        r.push(item);
    })
}
// console.log(merge([21,23,25],[20,40,60]))

function merge2(left, right) {
    var result = [],
        il = 0,
        ir = 0;

    while (il < left.length && ir < right.length) {
        if (left[il] < right[ir]) {
            result.push(left[il++]);
        } else {
            result.push(right[ir++]);
        }
    }
    //这里注意
    result = result.concat(left[il] ? left.slice(il) : right.slice(ir));
    return result;
}
var left = [1, 4, 7, 8, 9, 10];
var right = [2, 5];
console.log(merge2(left, right))



function merge3(arr1, arr2) {
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
console.log(merge3([21, 23, 45], [20, 40, 60]))
