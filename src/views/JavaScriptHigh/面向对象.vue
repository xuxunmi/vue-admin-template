一. Object构造函数模式
    * 套路：先创建空Object对象，再动态添加属性/方法
    * 适用场景：起始时不确定对象内部数据
    * 缺点：语句太多

eg： 
    var p = new Object();
    p.name = "xuxunmi";
    p.age = 18;
    p.setName = function(name){
        this.name = name;
    }
    // 调用
    p.setName('xuxundao');
    console.log(p.name, p.age, p);

二. 对象字面量模式
    * 套路：使用 {} 创建对象，同时指定属性/方法
    * 适用场景：起始时对象内部数据是确定的
    * 缺点：如果创建对个对象，有重复代码

eg: 
    var p = {
        name: 'xuxunmi',
        age: 18,
        setName: function(name){
            this.name = name
        }
    }
    p.setName('xuxundao');
    console.log(p.name, p.age, p);

三. 工厂模式
    * 套路：通过工厂函数动态创建对象并返回
    * 适用场景：需要创建多个对象时
    * 缺点：对象没有一个具体的类型，都是Object类型

eg:
    function createPerson(name,age){ // 返回一个对象的函数===>工厂函数
        var obj = {
            name: name,
            age: age,
            setName: function(name){
                this.name = name
            }
        }
        return obj
    }
    // 创建2个人
    var p1 = createPerson('xuxunmi', 18)
    var p2 = createPerson('xuxundao', 18)
    console.log(p1, p2);
    // p1/p2是Object类型

    function createStudent(name, price){
        var obj = {
            name: name,
            price: price
        }
        return obj
    }
    var s = createStudent('张三', 999999)
    // s也是Object类型

四. 自定义构造函数模式
    * 套路：自定义构造函数，通过new创建对象
    * 适用场景：需要创建多个类型确定的对象
    * 缺点：每个对象都有相同的数据，浪费内存

eg: 
    // 自定义类型
    function Person(name,age){
        this.name = name;
        this.age = age;
        this.setName = function(name){
            this.name = name;
        }
    }
    var p1 = new Person('xuxunmi', 18);
    p1.setName('xuxundao');
    console.log(p1.name, p1.age, p1);
    console.log(p1 instanceof Person);

    function Student(name,price){
        this.name = name;
        this.price = price;
        this.setName = function(name){
            this.name = name;
        }
    }
    var p2 = new Student('xuxunmi', 9999);
    p2.setName('xuxundao');
    console.log(p2.name, p2.price, p2);
    console.log(p2 instanceof Student);

    console.log(p1, p2);

五. 构造函数 + 原型的组合模式
    * 套路：自定义构造函数，属性在函数中初始化，方法添加到原型上
    * 适用场景：需要创建多个类型确定的对象

eg: 
    function Person(name,age){ // 在构造函数中只初始化属性/一般函数
        this.name = name;
        this.age = age
    }
    Person.prototype.setName = function(name){
        this.name = name;
    }
    var p1 = new Person('xuxunmi', 18);
    var p2 = new Person('xuxundao', 20);
    console.log(p1, p2);
