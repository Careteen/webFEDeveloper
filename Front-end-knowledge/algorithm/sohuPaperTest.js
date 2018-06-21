// 1、
function a(t){
	console.log(i);
	for(var i=0;i<t;i++){
		console.log(i);
	}
	console.log(i);
}
a(3);
// print-> undefined 0 1 2 3

// 2、
function b(){
	console.log(c());
	function c(){
		return 1;
	}
	console.log(c());
}
b();
// 函数申明提前 print-> 1 1

// 3、
function d(){
	this.e=1;
}
d.prototype={
	f:2
}
var h=new d();
console.log(h.e,h.f,h.g);
d.prototype={
	e:3,
	f:4,
	g:5
}
var i=new d();
console.log(h.e,h.f,h.g);
console.log(i.e,i.f,i.g);
//print-> 1 2 undefined		1 2 undefined		1 4 5

// 4、
function j(){
	var k=(6*9).toString(13);
	console.log(k)
	setTimeout(function(){
		k =33;
		console.log(k)
	},0);
	return k;
}
console.log(j())
// print->42 42 33

// 5、标准二分查找
// 6、判断一个数是否是整数
// 7、a的n次方
// 8、算法题
// 9、