/**
 * 
 * @desc 插入排序
 * 思想： 第一个元素默认是已排序元素，去除下一个与元素和当前元素比较，
 *       如果当前元素大就交换文职，那么此时第一个元素及时当前的最小数，
 *       所以下次取出操作就从第三个元素开始，向前对比，重复之前的操作
 * @param {Array} array 
 */ 

function swap (array, left, right) {
  let leftVal = array[left]
  array[left] = array[right]
  array[right] = leftVal
} 
function insertion (array) {
  for (let i = 1; i < array.length; i++) {
    for (let j = i - 1; j >= 0 && array[j] > array[j + 1]; j--) {
      swap(array, j, j + 1)      
    }
  }
}