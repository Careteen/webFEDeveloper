/**
 * @desc 在`http://a.com/b`页面执行
 *      `history.pushState((), '', 'http://b.com/c')`，
 *      是否可以跳转？
 *      页面是否会重新加载？
 *      并解释其原因！
 */ 

// WHY？

// 会报错，因为第三个参数为相对路径，而不是绝对路径。 --- 解释错误

// @careteen 更正
//  会报错，因为第三个参数的url必须和当前页面同域，不然会抛出异常，可以是相对路径，也可以是绝对路径。