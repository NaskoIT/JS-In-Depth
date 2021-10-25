function Person(name, age) {
    this.name = name;
    this.age = age;
    this.getName = function () {
        return name;
    }
}

Person.prototype.test = function () {
    console.log('Test func in Person was invoked!');
}

var ivan = new Person('Ivan', 20); // Person.call({}, 'Ivan', 20);

// The inheritance in JS is a linked list: Obj1 ---> Obj2 ---> Obj3
function User(name, age, role) {
    Person.call(this, name, age); // call the super class - 1st step
}

// Wrong
// User.prototype = Person.prototype;

User.prototype = Object.create(Person.prototype); // User extends Person - 2nd step

User.prototype.test = function () {
    console.log('User test func was invoked!');
}

function mix(source, destination) {
    for (var prop in source) {
        destination[prop] = source[prop];
    }
}

var funcs = {
    test: function () {
        console.log('test');
    },
    test1: function() {
        console.log('test1')
    }
}

var obj = {
    test2: function() {
        console.log('test2');
    }
};

mix(funcs, obj);
obj.test(); //test
obj.test1(); //test1
obj.test2(); //test2
