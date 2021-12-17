1. 函数的prototype属性：
    * 每个函数都有一个prototype属性，它默认指向一个Object空对象(即称为：原型对象)
    * 原型对象中有一个属性constructor，它指向函数对象

2. 给原型对象添加属性(方法)：
    * 作用：函数的所有实例对象自动拥有原型对象中的属性(方法)
eg: 
    function Fun() {
        // 快捷键alt + shift + r(重命名rename)
    }
    console.log(Fun.prototype)
    Fun.prototype.test=function(){
        console.log('test()');
    }
    var fun = new Fun();
    fun.test();

3. * 函数的prototype属性：在定义函数时自动添加的，默认值是一个空Object实例对象(但Object不满足)
   * 对象的__proto__属性：创建对象时自动添加的，默认值为构造函数的prototype属性值
eg：
    function Fn() {// 内部语句： this.prototype = {}

    }
    // 1. 每个函数function都有一个prototype，即显式原型
    console.log(Fn.prototype);
    // 2. 每个实例对象都有一个__proto__,可称为隐式原型
    var fn = new Fn(); // fn是Fn的实例对象，内部语句：this.__proto__ === Fn.prototype
    console.log(fn.__proto__);
    // 3. 对象的隐式原型的值为其对应构造函数的显式原型的值
    console.log(Fn.prototype === fn.__proto__); // true
    // 给原型对象添加方法
    Fn.prototype.test = function() {
        console.log('test()');
    }
    // 通过实例对象调用原型的方法
    fn.test();

4. 原型链：
    * 访问一个对象的属性时，先在自身属性中查找，找到返回，如果没有，再沿着__proto__这条链向上查找，找到返回，如果最终没找到，返回undefined
eg: 
    function Fn() {
        this.test1 = function() {
            console.log('test1()');
        }
    }
    Fn.prototype.test2 = function() {
        console.log('test2()')
    }
    var fn = new Fn();
    fn.test1();
    fn.test2();
    console.log(fn.toString());
    console.log(fn.test3());
    fn.test3();

4.1. 函数的显示原型指向的对象默认是空Object实例对象(但Object不满足)
eg：
    console.log(Fn.prototype instanceof Object); // true
    console.log(Object.prototype instanceof Object); // false
    console.log(Function.prototype instanceof Object); // true

4.2. 所有函数都是Function的实例(包含Function)
eg：
    console.log(Function.__proto__ === Function.prototype); // true

4.3. Object的原型对象是原型链尽头
eg：
    console.log(Object.prototype.__proto__); // null

4.4. * 读取对象的属性值时： 会自动到原型链中查找
     * 设置对象的属性值时：不会查找原型链，如果当前对象中没有此属性，直接添加此属性并设置其值
     * 方法一般定义在原型中，属性一般通过构造函数定义在对象本身上

5. instanceof是如何判断的？
    * 表达式：A instanceof B
    * 如果B函数的显示原型对象在A对象的原型链上，返回true，否则返回false

   Function是通过new自己产生的实例
eg：
案例1：
    function Foo(){};
    var f1 = new Foo();
    console.log(f1 instanceof Foo); // true
    console.log(f1 instanceof Object); // true

案例2：
    console.log(Object instanceof Function); // true
    console.log(Object instanceof Object); // true
    console.log(Function instanceof Function); // true
    console.log(Function instanceof Object); // true

    function Foo() {};
    console.log(Function instanceof Foo); // false

6. 变量和函数声明提升
    * 变量声明提升： 通过var声明的变量，在定义语句之前就可以访问到值，值为undefined
eg: 
    var a = 1;
    function fn(){
        console.log(a);
        var a = 2
    }
    fn(); // undefined

    console.log(b); // undefined 变量提升
    var b = 3;

    f(); // 函数提升
    function f() {
        console.log('f()');
    }

    * 函数声明提升：通过function声明的函数，在之前就可以直接调用，值为函数定义
eg: 

