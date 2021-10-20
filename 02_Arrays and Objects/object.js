var student = { name: 'Atanas' };
student.name = 'Nasko';

student.age = 20;
delete student.age; // slow operation (not recommended)

function createObject(name) {
    var person = {};
    Object.defineProperty(person, 'name', {
        configurable: false,
        enumerable: true,
        value: name,
        writable: false,
        // get: function () {
        //     return 'Nasko';
        // },
        // set: function (newValue) {
        //     console.log(newValue);
        // }
    });

    return person;
}

var developer = createObject('Nasko');

// won't be changed because it is readonly:  writable: false
developer.name = 'Atanas';
console.log(developer); // { name: 'Nasko' }

function personFactory(name, age) {
    return {
        name,
        age,
        toString: function() {
            return 'Name: ' + name + ', Age: ' + age;
        }
    };
}

var person = personFactory('Nasko', 19);
console.log(person.toString()); // Name: Nasko, Age: 19

var carPrototype = {
    id: 1,
    getData: function () {
        return 100;
    }
}

// create a new object that has __proto__ ref to the given object as first argument, so car prototype will be carPrototype
var car = Object.create(carPrototype, {
    make: {
        writable: false,
        value: 'Lexus'
    },
    print: {
        writable: false,
        value: function() {
            console.log('Car print function invoked!');
        }
    }
});

console.log(car.make); // Lexus
car.print(); // Car print function invoked!
console.log(car.__proto__); // { getData: [Function: getData] }
console.log(car.__proto__ === carPrototype); // true
console.log(car.getData()); // 100
console.log(car.id); // 1

// nothing will happen because we configure this property to be readonly
car.print = function () {
    console.log('Car print function changed!');
}

car.print();

// constuctor function
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.staticData = 2021;
// this - variable that exists in every function and we can set it by using bind, call, apply
// or we call the function from an object ( obj.fn() ), in this way this points to obj
Person.prototype.toString = function (test) {
    return 'Name: ' + this.name + ', Age: ' + this.age;
}

Person.prototype.print = function (printFn) {
    printFn(this.toString());
}

var person = new Person('Gosho', 20);
person.print(console.log); //Name: Gosho, Age: 20
console.log(person.__proto__ === Person.prototype); // true
console.log(person.__proto__ === person.prototype); // false
console.log(Person.prototype === Person.__proto__); // false
console.log(person.__proto__ === Person.__proto__); // false
console.log(person.__proto__); // { staticData: 2021, toString: [Function (anonymous)], print: [Function (anonymous)] }

var tempObj = {
    name: 'Pesho'
}

// function context
tempObj.fn = Person.prototype.toString;
// this will be tempObj
console.log(tempObj.fn()); // Name: Pesho, Age: undefined

// this will be Person.prototype object
console.log(Person.prototype.toString()); // Name: undefined, Age: undefined

var toStringFn = Person.prototype.toString;
var toStringFnContext = { name: 'JS', age: 'Immortal' };
var toStringFnResult = toStringFn.call(toStringFnContext);
console.log(toStringFnResult); // Name: JS, Age: Immortal

Person.prototype.printWithArgs = function (printFn, text) {
    printFn(text);
    printFn(this.name + ' ' + this.age);
}

var personPrintFn = Person.prototype.printWithArgs;
personPrintFn.call({
        name: 'Mitko',
        age: 28,
    }, // sets the personPrintFn THIS variable
    console.log, //sets the first arg of the fn
    'Print on the console' // sets the second arg of the personPrintFn
);
// Print on the console
// Mitko 28

personPrintFn.apply({
        name: 'Pesho',
        age: 22
    }, // sets the personPrintFn THIS variable
    [ console.log, 'Invoke the function using apply' ] // sets the first and second arg of the personPrintFn
);
// Invoke the function using apply
// Pesho 22

var boundPersonPrintFn = personPrintFn.bind(person, console.log); // sets the personPrintFn THIS variable and also we can pass the function arguments
boundPersonPrintFn('Invoke the bound function');
// Invoke the bound function
// Gosho 20

var hr = new Person('Jhon', 21);
var manager = new Person('Ivan', 31);
console.log(hr.staticData); // 2021
console.log(manager.staticData); // 2021

// put prop in the current object manager
manager.prop = 'new prop';

// put staticData on the current object manager
// Person.prototype.staticData will remain the same
manager.staticData = 2020;
console.log(manager.staticData); // 2020
console.log(Person.prototype.staticData); // 2021
// Setters always work on the direct object
// Getter work on the full proto chain
// (if the value is not found on the current object it will be searched for on
// the __proto__)

// Prototypal chain search for a property (used only when GETTING a property!!!)
// hr.hasOwnProperty()
//
// {
//   name: 'Jhon',
//   age: 21,      (* searching for hasOwnProperty())
//   __proto: ----- * ------> {
// }                             staticData: 2021,
//                               toString: fn,    (* searching for hasOwnProperty())
//                               __proto__  ------*-------> {
//                             }                               hasOwnProperty: fn <-- hasOwnProperty is found
//                                                          }

// manager.staticData
//
// {
//   name: 'Ivan',
//   age: 31,      (* searching for staticData)
//   staticData: 2020,
//   prop: 'new prop',
//   __proto: ----- * ------> {
// }                             staticData: 2021,  <-- staticData is found
//                               toStrings: fn,
//                               __proto__  --------------> {
//                             }                               hasOwnProperty: fn
//                                                          }

function User(name, age) {
    this.name = name;
    this.age = age;
}

User.prototype.test = function() {
    console.log('test');
}

function Admin(name, age) {
    // similar to super()
    User.call(this, name, age);
    this.type = 'Admin';
}

// similar to extends
Admin.prototype = Object.create(User.prototype);

// bad practice, because if we change the Admin.prototype it will affect also the User.prototype
// Admin.prototype = User.prototype;
// var newAdmin = new Admin('New root', 30);

Admin.prototype.adminTest = function() {
    console.log('Admin test');
}

var admin = new Admin('Root', 20);
console.log(admin); // User { name: 'Root', age: 20, type: 'Admin' }
admin.test(); // test
admin.adminTest(); // Admin test