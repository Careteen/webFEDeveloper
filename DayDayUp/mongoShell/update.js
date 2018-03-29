var db = connect('log');

// 批量插入
// var workmate1 = {
//     name: 'careteen',
//     sex: 1,
//     regeditTime: new Date()
// };
// var workmate2 = {
//     name: 'lanlan',
//     sex: 1,
//     regeditTime: new Date()
// };
// db.workmate.insert([workmate1, workmate2]);

// 修改指定项
// db.workmate.update({name: 'lanlan'}, {'$set':{sex:0}})

// 为所有项增加一个字段
// db.workmate.update({}, {$set: {interset: []}}, {multi: true})

// 修改一个不存在的值 -- 会自动insert
// db.workmate.update({name: 'highShao'}, {$set: {sex: 1}}, {upsert: true})

// 批量追加
// var newInterset = ['sing', 'dance', 'code'];
// db.workmate.update({name: 'careteen'}, {$addToSet: {interset: {$each: newInterset}}});

// 删除数组指定项
// db.workmate.update({name: 'careteen'}, {$pop: {interset: 1}})

// 修改数组指定项
// db.workmate.update({name: 'careteen'}, {$set: {'interset.2': 'code'}})

// 应答式命令
// db.workmate.update({sex: 1}, {$set:{ moneny: 1000}}, false, true)
// var resultMessage = db.runCommand({getLastError:1})
// printjson(resultMessage);

// findAndModify 更加安全
var myModify = {
    findAndModify: 'workmate',
    query: {name: 'careteen'},
    update: {$set: {sex: 0}},
    new: true
};
var resultMessage = db.runCommand(myModify);
printjson(resultMessage)







print('[success]: inserted successfully');
