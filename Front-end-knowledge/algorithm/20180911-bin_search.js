/**
 * @desc 二分查找
 *       思想：和快排思路差不多，对半比较
 *        ps：只适用于排好序的数组内查询
 * @param {Number} target 
 * @param {Array} arr 
 * @param {Number} start 默认为0
 * @param {Number} end 默认为数组长度减一
 */ 
function binSearch (target, arr, start, end) {
  var _start = start || 0;
  var _end = end || arr.length - 1;
  var mid = (_start + _end) >> 1;
  if (target === arr[mid]) {
    return mid;
  } else if (target > arr[mid]) {
    return binSearch(target, arr, mid + 1, _end)
  } else {
    return binSearch(target, arr, _start, mid - 1)
  }
}

// 测试用例
var testArray = [1,3,4,5,7,8,9];
var resultIndex = binSearch(7, testArray);