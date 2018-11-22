/**
 * @desc 将数组平铺到指定深度
 * 使用递归，为每个深度级别depth递减1.
 */ 
const flatten = (arr, depth = 1) => (
	depth !== 1 ?
		arr.reduce((ret, item) => ret.concat(Array.isArray(item) ? flatten(item, depth - 1) : item), []) :
		arr.reduce((ret, item) => ret.concat(item), [])
)

// 测试用例
const testOne = [1, [2], 3, 4] 
const resultOne = flatten(testOne)
console.log(`${testOne} platten result is: ${resultOne}`)

const resultTwo = flatten([1, [2, [3, [4, 5], 6], 7], 8], 2)
console.log(resultTwo)
