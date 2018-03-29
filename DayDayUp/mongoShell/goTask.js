/**
 *
 * @desc 模拟登陆
 */

var userName = 'careteen';
var timeStamp = Date.parse(new Date());
var jsonDatabase = {
    'loginName': userName,
    'loginTime': timeStamp
};
// connect 相当于 use
var db = connect('log');
db.login.insert(jsonDatabase);


// 对比循环插入和批量插入


print('[demo]:log print success');
