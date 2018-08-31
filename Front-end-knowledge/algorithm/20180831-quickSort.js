//快速排序

var quickSort = function (arr) {
    if (arr.length <= 1) {
        return arr;
    }
    // var pivotIndex = Math.floor(arr.length / 2);
    // 运算符
    var pivotIndex = arr.length >> 1;
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {　　　　
            left.push(arr[i]);
        } else {　　　　　　
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
}
console.log(quickSort([2, 7, 44, 35, 12, 6]));

// 冒泡排序

var bubbleSort = function (arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            if (arr[j] > arr[j+1]) {
                var temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr
}
