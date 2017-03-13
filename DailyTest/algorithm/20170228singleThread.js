// js单线程参考资料：http://blog.csdn.net/talking12391239/article/details/21168489
function foo() {
    console.log('first');
    setTimeout(
        function () {
            console.log('second');
        }, 5);

}

for (var i = 0; i < 100; i++) {
    foo();
}
// 直到long()执行完。

// 根据先进先出原则




$('#do').on('click', function () {

    $('#status').text('calculating....'); //此处会触发redraw事件的fired，但会放到队列里执行，直到long()执行完。

    // without set timeout, user will never see "calculating...."
    //long();//执行长时间任务，阻塞

    // with set timeout, works as expected
    setTimeout(long, 50); //用定时器，大约50ms以后执行长时间任务，放入执行队列，但在redraw之后了，根据先进先出原则

})



function long() {
    var result = 0
    for (var i = 0; i < 1000; i++) {
        for (var j = 0; j < 1000; j++) {
            for (var k = 0; k < 1000; k++) {
                result = result + i + j + k;
            }
        }
    }
    $('#status').text('calclation done ')
        //
        // has to be in here
        // for this example.or
        // else it will ALWAYS run instantly.This is the same as passing it a callback
}
// < button id = 'do' >Do long calc! < /button> 
// < div id = 'status' > < /div> 
// < div id = 'result' > < /div>

function loadJs(jsurl, head, callback) {
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");

    if (callback) {
        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function () {
                callback();
            };
        }
    }
    script.setAttribute("src", jsurl);

    if (head)
        document.getElementsByTagName('head')[0].appendChild(script);
    else
        document.body.appendChild(script);

}




