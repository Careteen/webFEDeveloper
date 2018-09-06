/**
 * 
 * @desc 洗牌 
 * @时间复杂度 o(n)
 * @reference https://bost.ocks.org/mike/shuffle/
 */ 
// 时间复杂度o(n*n)
function shuffleOld (array) {
  let copy = [],
      len = array.length,
      ranIndex
  while (len) {
    ranIndex = ~~(Math.random() * len--)
    copy.push(array.splice(ranIndex, 1)[0])
  }
  return copy
}

// 时间复杂度 o(n)
// 对传入数组做修改
function shuffleReturnSelf (array) {
  let len = array.length,
      ranIndex,
      temp
  while (len) {
    ranIndex = ~~(Math.random() * len--)
    temp = array[len]
    array[len] = array[ranIndex]
    array[ranIndex] = temp
  }
  return array
}
shuffleReturnSelf([1,2,3,4,5,6,7,8,9])
// 返回数组副本
function shuffleReturnCopy (array) {
  let len = array.length,
      ranIndex,
      temp,
      copy = array.concat()
  while (len) {
    ranIndex = ~~(Math.random() * len--)
    temp = copy[len]
    copy[len] = copy[ranIndex]
    copy[ranIndex] = temp
  }
  return copy
}
shuffleReturnCopy([1,2,3,4,5,6,7,8,9])