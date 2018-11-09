// 需要重写xhr 和 fetch

let xhr = window.XMLHttpRequset
let openOld = xhr.prototype.open
xhr.prototype.open = function () {
  // 重写
  // 记录request信息
  this.apply(openOld, arguments)
}
let sendOld = xhr.prototype.send
xhr.prototype.send = function () {
  // 重写
  // 记录返回信息
  // 可能有错误信息
  this.apply(sendOld, arguments)
}