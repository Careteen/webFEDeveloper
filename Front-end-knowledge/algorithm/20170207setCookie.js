// 有些机型的微信中不能存储信息到localstorage中，或者是页面一旦关闭，存储的信息就失效了。
// 此时可行的解决方法就是用cookie代替localstorage。

// 设置cookie
function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

//取回cookie
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

// 测试

//设置cookie，有效期为365天
setCookie('username','123',365);

//取回，若cookie失效，将返回空
getCookie('username');
