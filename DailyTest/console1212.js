console.log('%s年%s月%s日', '2016', '12', '12');

var people = {
    'careteen': {
        'age': 21,
        'sex': 'male'
    },
    'lanlan': {
        'age': 22,
        'sex': 'female'
    }
};
console.table(people)

console.time('careteen')
var arr = [];
for (var i = 0; i < 10000; i++) {
    arr.push({
        'key': i
    })
}
console.timeEnd('careteen')

var arr = [1, 2, 3, 4];
console.assert(arr.length === 5)

for (var i = 0; i < 10; i++) {
    console.count('lanlan')
}
