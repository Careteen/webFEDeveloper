let sex = 0

class Animal {
	constructor(name) {
		this.name = name
	}
	say() {
		let a = 2
		console.log(`my name is ${this.name}`)
	}
    static say(words) {
        console.log(words);
    }
    get sex () {
        return sex
    }
    set sex (value) {
        sex = value
    }
}
class Cat extends Animal {
	constructor(name, age) {
		super(name)
		this.age = age
	}
	eat() {
		console.log(`i like fish...`)
	}
}

var myCat = new Cat('lanlan', '1')
myCat.eat()

// 验证 static 可继承？ 打印父类的静态属性，可得知 static 可继承
Cat.say('miao')

// 验证 get set 是否可继承？ 打印可知 get set 可继承
console.log(`before: ${myCat.sex}`)

myCat.sex = 1
console.log(`set after: ${myCat.sex}`)
