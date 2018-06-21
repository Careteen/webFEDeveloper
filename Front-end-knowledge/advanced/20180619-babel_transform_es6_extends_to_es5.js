/**
 *
 * @desc 通过babel将ES6的extends转换为ES5写法
 * babel在线转换 http://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&targets=&browsers=&builtIns=false&debug=false&code_lz=MYGwhgzhAECCB2BLAtmA3gWAFDWsA9vBAC4BOArsMfqQBTxjICmAlJjrrsQBaIQB0DZtAC80IU2y4AvlOgQwAT1ps5uEE2LQwo6ACY1eQhHwb-IfAHNaAA2SLxjJtD7QAJGh59BT6TZZyslhBoJAwAMJgWkwAHsRM8AAmMAgo6NgERGSU1HQSADRglqzsnLgQ5AAOTHlOLADchtBeAkXOIm2NHEG4TFEqpWWZJmYW1jaI0CCIANbOAGZ83Pwr_oHY0kA
 */

// ES6 写法
class Animal {
	constructor(name) {
		this.name = name
	}
	say() {
		let a = 2
		console.log(`my name is ${this.name}`)
	}
}
class Cat extends Animal {
	constructor(name, age) {
		super(name);
		this.age = age;
	}
	eat() {
		console.log(`i like fish...`)
	}
}


// 经过babel转换后 - ES5 写法

"use strict";

var _createClass = function() {
    // 通过 Object.defineProperty() 创建一个类
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
}();

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}
	return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}
	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: {
			value: subClass,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});

	if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var Animal = function() {
	function Animal(name) {
		_classCallCheck(this, Animal);

		this.name = name;
	}

	_createClass(Animal, [{
		key: "say",
		value: function say() {
			var a = 2;
			console.log("my name is " + this.name);
		}
	}]);

	return Animal;
}();

var Cat = function(_Animal) {
    // 继承父类的原型方法
	_inherits(Cat, _Animal);

	function Cat(name, age) {
		_classCallCheck(this, Cat);
        // es6会通过super来调用父类的属性和方法
        // Object.getPrototypeOf 返回对象的原型
        // 下面这句话等价于 Animal.call(this,name)
		var _this = _possibleConstructorReturn(this, (Cat.__proto__ || Object.getPrototypeOf(Cat)).call(this, name));

		_this.age = age;
		return _this;
	}

	_createClass(Cat, [{
		key: "eat",
		value: function eat() {
			console.log("i like fish...");
		}
	}]);

	return Cat;
}(Animal);
