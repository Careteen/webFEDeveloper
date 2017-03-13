function A(){}
A.abc=123;
A.prototype.abc=456;
console.log((new A()).abc)


function foo(){
	this.b=100;
	return this.a;
}
var func =foo.bind({a:1});
func();
new func();


