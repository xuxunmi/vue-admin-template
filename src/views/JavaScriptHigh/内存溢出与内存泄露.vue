1. 内存溢出
    * 一种程序运行出现的错误
    * 当程序运行所需要的内存超过了剩余内存，浏览器就会抛出内存溢出的错误
eg： 
    var obj = {}
    for(var i = 0; i < 10000; i++){
        obj[i] = new Array(100000000)
    }
    console.log(obj);

2. 内存泄露
    * 占用的内存没有及时释放
    * 内存泄露积累过多就容易导致内存溢出
    * 常见的内存泄露：
        * 意外的全局变量
        * 没有及时清理的计时器或回调函数
        * 闭包
eg1: 意外的全局变量
    function fn(){
        a = 3;
        console.log(3)
    }
    fn();

eg2: 没有及时清理的计时器或回调函数
    var timer = setInterval(function(){
        console.log('------');
    },1000)

    // clearInterval(timer);

eg3: 闭包
    function fn1(){
        var a = 3;
        function fn2() {
            a++;
            console.log(a);
        };
        return fn2;
    }
    var f = fn1();
    f();
    //f=null  // 释放闭包