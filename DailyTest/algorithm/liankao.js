//	1、要求每次输入的单词个数不超过10个，每个单词由一个或多个大写或者小写的字母组成，
// 同时各个单词的长度不得超过10，每个单词之间用空格隔开。
var line;
while (line = read_line()) {
    line = line.split(' ');
    lowToUpper(line);
}

function lowToUpper(line) {
    var result = '';
    for (var i = 0; i < line.length; i++) {
        result += line[i].charAt(0).toUpperCase();
    }
    // console.log(result)
    print(result)
}
// lowToUpper(['aaa','bbb','ccc','ddd']);


// 2、
