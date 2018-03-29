var startTime = new Date().getTime()

var db = connect('company')

print('[start]: ------')

var result = db.randomInfo.find({username: 'q781t5l'})

result.forEach(res => {printjson(res)})

var runTime = new Date().getTime() - startTime;

print('[run time is]: ------' + runTime + 'ms')

// 查看索引
// db.randomInfo.getIndexes()

// 建立索引
// db.randomInfo.ensureIndex({username: 1})

// 索引是 按索引表顺序 进行查询
// 可使用 hint 指定 索引
// db.randomInfo.find({username: 'q781t5l'}).hint({randNum0: 1})

// 删除索引 ----   并不是字段名称， 而是索引查询表中的name值
// db.randomInfo.dropIndex('randNum0_1')
