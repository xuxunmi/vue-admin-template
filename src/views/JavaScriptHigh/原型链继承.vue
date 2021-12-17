方式1：原型链继承
    1. 套路
        1. 定义父类型构造函数
        2. 给父类型的原型添加方法
        3. 定义子类型的构造函数
        4. 创建父类型的对象赋值给子类型的原型
        5. 将子类型原型的构造属性设置为子类型
        6. 给子类型原型添加方法
        7. 创建子类型对象：可以调用父类型的方法
    2. 关键
        1. 子类型的原型为父类型的一个实例对象

eg: 
    // 父类型
    function father(){
        this.fatherProp = 'father prototype'
    }
    father.prototype.showFatherProp = function(){
        console.log(this.fatherProp);
    }
    // 子类型
    function children(){
        this.childrenProp = 'children prototype'
    }
    // 子类型的原型为父类型的一个实例对象
    children.prototype = new father();
    // 让子类型的原型的constructor指向子类型
    children.prototype.constructor = children;

    children.prototype.showChildrenrProp = function(){
        console.log(this.childrenProp);
    }
    var child = new children();
    child.showFatherProp(); // 继承
    child.showChildrenrProp();

    console.log(child.constructor); // father()
