方式3. 原型链 + 借用构造函数的组合式继承
    1. 利用原型链实现对父类型对象的方法继承
    2. 利用call()借用父类型构建函数初始化相同属性

eg: 
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.setName = function(name){
        this.name = name;
    }
    function Student(name, age, price){
        Person.call(this, name, age); // 为了得到属性
        this.price = price;
    }
    Student.prototype = new Person(); // 为了能看到父类型方法
    Student.prototype.constructor = Student // 修正constructor属性
    Student.prototype.setPrice = function(price){
        this.price = price;
    }

    var s = new Student('Tom', 12, 9999);
    s.setName('Bob');
    s.setPrice('8888');
    // s.age = '24';
    s['age'] = 24;
    console.log(s.name, s.age, s.price);
    