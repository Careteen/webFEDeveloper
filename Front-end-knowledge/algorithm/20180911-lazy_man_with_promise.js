/**
 * @desc promise 实现
 * @param {String} name 
 */ 
function LazyMan(name) {
  class Lazy {
    constructor(name) {
      this.sleepFirstTime = 0;
      this.promise = Promise.resolve().then(
        () => this.sleepFirstTime && this._sleep(this.sleepFirstTime)
      ).then(() => {
        console.log(`Hi! This is ${name}!`);
      });
    }
    sleepFirst(time) {
      this.sleepFirstTime = time;
      return this;
    }
    eat(food) {
      this.promise = this.promise.then(() => {
        console.log(`Eat ${food}~`);
      });
      return this;
    }
    sleep(time) {
      this.promise = this.promise.then(()=>this._sleep(time));
      return this;
    }
    _sleep(time){
      return new Promise((next) => {
        setTimeout(() => {
          console.log(`Wake up after ${time}`);
          next();
        }, time * 1000);
      });
    }
  }
  return new Lazy(name);
}
console.log('start:');
LazyMan('Hank').eat('cake').sleepFirst(3).sleep(5).eat('dinner').sleep(3).eat('supper');