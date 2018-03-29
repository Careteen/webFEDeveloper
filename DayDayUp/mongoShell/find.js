var db = connect('log')

// find 多条件查询
// $in
db.workmate.find({age: {$in: [25, 33]}}, {name: 1, 'skill.skillOne':1, age: 1, _id: 0})
// $or
var result = db.workmate.find({$or: [
    {age: {$gle: 30}},
    {'skill.skillOne': 'PHP'}
]})
// 打印
result.forEach(function(res){
    printjson(res)
});
