/**
 *
 * @desc 实现一个简易的模板引擎
 * @github 原理见： https://github.com/careteenL/webFEDeveloper/blob/master/Front-end-knowledge/advanced/20180801-template_engine.md
 * @example
 ```
 // 模板语法如下
 <script type="text/html" id="template">
 	<ul>
 		<% if (obj.show) { %>
 			<% for (var i = 0; i < obj.users.length; i++) { %>
 				<li>
 					<a href="<%= obj.users[i].url %>">
 						<%= obj.users[i].name %>
 					</a>
 				</li>
 			<% } %>
 		<% } else { %>
 			<p>不展示列表</p>
 		<% } %>
 	</ul>
 </script>
 // js调用如下
 const arr = [{
 	"name": "google",
 	"url": "https://www.google.com"
 }, {
 	"name": "baidu",
 	"url": "https://www.baidu.com/"
 }, {
 	"name": "凯斯",
 	"url": "https://www.zhihu.com/people/Uncle-Keith/activities"
 }]
 const html = tmpl('list', arr)
 console.log(html)
 ```
 */

let tpl = ''
let match = ''
const cache = {}
// 匹配模板id
const idReg = /[\s\W]/g
// 匹配JavaScript语句或变量
const tplReg = /<%=?\s*([^%>]+?)\s*%>/g
// 匹配各种关键字
const keyReg = /(for|if|else|switch|case|break|{|})/g

const add = (str, result, js) => {
	str = str.replace(/[\r\n\t]/g, '')
		.replace(/\\/g, '\\\\')
		.replace(/'/g, "\\'")
	result += js ? str.match(keyReg) ? `${str}` : `result.push(${str});` : `result.push('${str}');`
	return result
}

const tmpl = (str, data) => {
	let cursor = 0
	let result = 'let result = [];'
        // 如果是模板字符串，会包含非单词部分（<, >, %,  等）；如果是id，则需要通过getElementById获取
	if (!idReg.test(str)) {
		tpl = document.getElementById(str).innerHTML
		// 缓存处理
		if (cache[str]) {
			return cache[str].apply(data)
		}
	} else {
		tpl = str
	}
    // 使用exec函数，动态改变index的值
	while (match = tplReg.exec(tpl)) {
		result = add(tpl.slice(cursor, match.index), result) // 匹配HTML结构
		result = add(match[1], result, true)		     // 匹配JavaScript语句、变量
		cursor = match.index + match[0].length		     // 改变HTML结果匹配的开始位置
	}
	result = add(tpl.slice(cursor), result)		             // 匹配剩余的HTML结构
	result += 'return result.join("")'
	let fn = new Function(result)		                     // 转成可执行的JS代码
	if (!cache[str] && !idReg.test(str)) {                       // 只有传入的是id的情况下才缓存模板
		cache[str] = fn
	}
	return fn.apply(data)		                              // apply改变函数执行的作用域
}
