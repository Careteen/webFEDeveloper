/**
 * @desc 在`http://a.com/b`页面执行
 *      `history.pushState((), '', 'http://b.com/c')`，
 *      是否可以跳转？
 *      页面是否会重新加载？
 *      并解释其原因！
 */ 

// WHY？

// 会报错，因为第三个参数为相对路径，而不是绝对路径。