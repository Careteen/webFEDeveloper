// proxy取代数据劫持

let person = {
  age: 20
}

const personProxy = new Proxy(person, validater)