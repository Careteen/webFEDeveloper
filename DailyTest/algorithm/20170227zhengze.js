// var a=function(string){
// 	var str=JSON.stringify(string);

// }

// var arr=[['a','b','c'],['d','e']];

// function connect(arr){
// 	arr.forEach(function(item,index){
// 		if(Object.prototype.toString().call(arr).slice(8,-1)==='Array'){

// 		}
// 	});
// 	for (var i = 0; i < arr.length; i++) {

// 	}
// }
// 实现多个数组的交叉组合
var arr = [
    ["a", "b"],
    ["1", "2"]
];
var sarr = [
    []
];
for (var i = 0; i < arr.length; i++) {
    var tarr = [];
    for (var j = 0; j < sarr.length; j++) {
        for (var k = 0; k < arr[i].length; k++) {
            tarr.push(sarr[j].concat(arr[i][k]));
            console.log(tarr + '|')
        }
    }
    sarr = tarr;
}
console.log(sarr.join("\n"));

//接受可变长数组参数
function Zuhe() {
    var heads = arguments[0];
    for (var i = 1, len = arguments.length; i < len; i++) {
        if (arguments[i].length) {
            heads = addNewType(heads, arguments[i]);
        }
    }
    return heads;
};

function addNewType(heads, choices) {
    var result = [];
    for (var i = 0, len = heads.length; i < len; i++) {
        for (var j = 0, lenj = choices.length; j < lenj; j++) {
            if (heads[i] === choices[j]) {
                continue;
            } else {
                result.push(heads[i] + '' + choices[j]);
            }
        }
    }
    return result;
};

//打印结果的函数
function printResult(result) {
    for (var i = 0, len = result.length; i < len; i++) {
        console.log(result[i]);
    }
    console.log(result.length);
    return result;
}
var a = new Zuhe(["a", "b", "c"], ["a", "e"], ['a', '2']);
printResult(a);


var a = ["A", "B", "C"];
var b = ["1", "2", "3"];
window.onload = function () {
        var a1 = new objPL(a); //计算数组a的排列组合 
        var b1 = new objPL(b); //计算数组b的排列组合 
        var str = "";
        var n = 0; //a1和b1的排列组合个数就是两者相乘（双层循环） 
        for (var i = 0; i < a1.length; i++) {
            for (var j = 0; j < b1.length; j++) {
                str += a1[i] + b1[j] + " ";
                n++;
            }
            str += "<br/>";
        }
        document.write("共" + n + "个<br/>");
        document.write(str);
        console.log(str)
    } //取数组的排列组合 
function objPL(arr) {
    this.a = arr;
    this.r = [];
    this.n = 0; //从M个数里面取N个(递归) 
    this.mGetN = function (curIndex, num, curSelect) {
        if (num == 0) {
            this.r[this.n++] = curSelect;
            return;
        }
        if (this.a.length - curIndex < num) return;
        this.mGetN(curIndex + 1, num - 1, curSelect + this.a[curIndex]);
        this.mGetN(curIndex + 1, num, curSelect);
    }

    for (var i = 1; i <= this.a.length; i++) {
        this.mGetN(0, i, "");
    }
    return this.r;
}
