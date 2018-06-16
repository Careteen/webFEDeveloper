function Promise() {

}

Promise.all = function(promises) {
	return new Promise((resolve, reject) => {
		let done = gen(promises.length, resolve)
		promises.forEach((promise, index) => {
			promise.then((value) => {
				done(index, value)
			}, reject)
		})
	})

}

function gen(length, resolve) {
	let count = 0;
	let values = [];
	return function(index, value) {
		values[index] = value;
		if (++count === length) {
			resolve(values)
		}
	}
}

// 保证所有异步操作完成后再执行，
// 可以采用计数的方式resolve
