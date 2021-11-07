{
    // block level visibility
    let x = 20;
    console.log(x); // 20

    // function level visibility
    // will go in the global object
    var y = 30;
}

console.log(y); // 30
// console.log(x); // ReferenceError: x is not defined

function testFn() {
    "use strict";
    console.log(var_variable); // undefined
    // console.log(let_variable); ReferenceError: Cannot access 'let_variable' before initialization

    var var_variable = 20;
    let let_variable = "test here";
}

testFn();

let joinNumberFn = (a, b, c) => [a, b, c].join(' ');
console.log(joinNumberFn(1, 2, 3)); // 1 2 3

function _l(_, _, _, _) {
    return function (_) {
        return _ + 1
    }
}

// return function with arrow function
const l = _ => _ => ({a: 20, c: 30});
console.log(l()()); // { a: 20, c: 30 }

const arrayForEach = (arr) => {
    arr.forEach((e, i) => {
        console.log('element ' + e + ' is on ' + i + '-th position');
    });
}

arrayForEach([1, 2, 3]);
// element 1 is on 0-th position
// element 2 is on 1-th position
// element 3 is on 2-th position


(new Promise((resolve, _) => {
    this.t = 20;
    this.other = 'OTHER';

    setTimeout(() => {
        // context is automatically bound
        console.log(this.t); // prints 20
        resolve(0);
    }, 1000);

    setTimeout(function () {
        console.log(this.t); // undefined
        resolve(10);
    }, 1200);

})).then((value) => {
    // even though the promise is
    // going to be resolved twice
    // this is not going to be called twice
    console.log(value); // 0
    debugger;
});

// using lambda/arrow functions
// to create objects is generally
// not a very smart idea
this.me = 'Nasko.IT';
var obj = {
    prop: "something",
    fn: () => {
        // please mind that "this" here is not the object context
        console.log(this.prop); // undefined
        console.log(this); // { t: 20, other: 'OTHER', me: 'Nasko.IT' }
    }
}

obj.fn();

let func = function (args) {
    (typeof args === 'function') && args(this.prop);
}

let context = {prop: 'Lexus'};
let boundFn = func.bind(context);
boundFn();
boundFn.call({prop: "BMW"}, console.log);   // Lexus
func.call({prop: "Mercedes"}, console.log);  // Mercedes

context.prop = 'BMW'

let prom = new Promise(boundFn);
prom.then(val => {
    console.log(val); // BMW
});

const car = {
    make: 'Lexus',
    model: 'IS 220',
    horsepower: 177,
}

let {make, model} = car;
console.log(make, model); // Lexus IS 220

// swap
[make, model] = [model, make];
console.log(make, model); // IS 220 Lexus

let destructArguments = ({make, model, test}) => console.log(make, model, test);
destructArguments(car); // Lexus IS 220 undefined

const arr = [1, 2, 3];
const [val1, val2, val3] = arr;
console.log(val1, val2, val3); // 1 2 3

const invalidArray = [1, 2, , 3, , , 4, 5, '', 'prop', undefined, null, 0, 6];
let filteredArray = invalidArray.reduce(
    (acc, element) => (element ? [...acc, element] : acc),
    []
);
console.log(filteredArray.join(' ')); // 1 2 3 4 5 prop 6