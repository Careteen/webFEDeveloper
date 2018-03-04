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

print('[demo]:log print success');
