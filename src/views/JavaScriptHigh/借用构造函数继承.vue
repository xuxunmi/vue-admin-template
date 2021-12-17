方式2. 借用构造函数继承
    1. 套路
        1. 定义父类型构造函数
        2. 定义子类型构造函数
        3. 在子类型构造函数中调用父类型构造
    2. 关键
        1. 在子类型构造函数中通过call()调用父类型构造函数

eg: 
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    function Student(name, age, price){
        Person.call(this, name, age); // 相当于：this.Person(name, age)
        // this.name = name;
        // this.age = age;
        this.price = price;
    }

    var s = new Student('Tom', 12, 9999);
    console.log(s.name, s.age, s.price);