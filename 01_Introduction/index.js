// ECMAScript 5
// Primitive values;

var var0;
var var1 = undefined; // undefined
var var2 = 'string'; // string
var var3 = 20; // number ---> https://en.wikipedia.org/wiki/IEEE_754
var var4 = true; // boolean
var var5 = null; // null

// Non-primitive values:

var var6 = {prop1: 1000}; // object
var var7 = [1, 2, 3, 'string', [1, 2], {}]; // array
var var8 = function () {
    // do something
}; //function (function expression)
var8();

// Immutable
var var9 = var2 + '123';
console.log(var3); // string123
console.log(var2); // string

var2[1] = 'a';
console.log(var2); // "string"

// Non immutable
var var10 = var6;
var10.test = 123;

console.log(var10); // { prop1: 1000, test: 123 } --- Same object in the memory
console.log(var6); // { prop1: 1000, test: 123 }

console.log(typeof var0); // "undefined"
console.log(typeof var1); // "undefined"
console.log(typeof var2); // "string"
console.log(typeof var3); // "number"
console.log(typeof var4); // "boolean"
console.log(typeof var5); // "object" ???
console.log(typeof var6); // "object"
console.log(typeof var7); // "object" ???
console.log(typeof var8); // "function"

// String();
// Boolean();
// Array();

isNaN('dsda'); // true (bug)
Number.isNaN('asdsa'); // false

// Falsy values: false, NaN, null, undefined, '', 0

console.log(4 == '4'); // true -> https://262.ecma-international.org/5.1/#sec-11.9.3
console.log(4 === '4'); // false -> https://262.ecma-international.org/5.1/#sec-11.9.6

var test = null;
if (test == undefined) {
    console.log('OMG');
}
// OMG

if (test === undefined || test === null) {
    console.info('HELLO!');
}
//HELLO!

var str = '123';
if (typeof str === 'string') // NOT GOOD // https://262.ecma-international.org/5.1/#sec-7.9
{
    console.log('string');
} else if (true) {

} else {

}
// string

function doSomething() {
    console.log('do something')
    // do something
} // function declaration

function testFunction(fn) {
    return function () {
        return function () {
            return fn();
        }
    }
}

testFunction(doSomething)()(); // do something

// ECMAScript 5
// Primitive values;

var var0;
var var1 = undefined; // undefined
var var2 = 'string'; // string
var var3 = 20; // number ---> https://en.wikipedia.org/wiki/IEEE_754
var var4 = true; // boolean
var var5 = null; // null

// Non-primitive values:

var var6 = {prop1: 1000}; // object
var var7 = [1, 2, 3, 'string', [1, 2], {}]; // array
var var8 = function () {
    // do something
}; //function (function expression)
var8();

// Immutable
var var9 = var2 + '123';
console.log(var3); // string123
console.log(var2); // string

var2[1] = 'a';
console.log(var2); // "string"

// Non immutable
var var10 = var6;
var10.test = 123;

console.log(var10); // { prop1: 1000, test: 123 } --- Same object in the memory
console.log(var6); // { prop1: 1000, test: 123 }

console.log(typeof var0); // "undefined"
console.log(typeof var1); // "undefined"
console.log(typeof var2); // "string"
console.log(typeof var3); // "number"
console.log(typeof var4); // "boolean"
console.log(typeof var5); // "object" ???
console.log(typeof var6); // "object"
console.log(typeof var7); // "object" ???
console.log(typeof var8); // "function"

// String();
// Boolean();
// Array();

isNaN('dsda'); // true (bug)
Number.isNaN('asdsa'); // false

// Falsy values: false, NaN, null, undefined, '', 0

console.log(4 == '4'); // true -> https://262.ecma-international.org/5.1/#sec-11.9.3
console.log(4 === '4'); // false -> https://262.ecma-international.org/5.1/#sec-11.9.6

var test = null;
if (test == undefined) {
    console.log('OMG');
}
// OMG

if (test === undefined || test === null) {
    console.info('HELLO!');
}
//HELLO!

var str = '123';
if (typeof str === 'string') // NOT GOOD // https://262.ecma-international.org/5.1/#sec-7.9
{
    console.log('string');
} else if (true) {

} else {

}
// string

function doSomething() {
    console.log('do something')
    // do something
} // function declaration

function testFunction(fn) {
    return function () {
        return function () {
            return fn();
        }
    }
}

testFunction(doSomething)()(); // do something

// Closure example
var testValue = 100;
function closureFn() {
    var best = 666;
    console.log(testValue); // undefined
    // try to comment testValue and see the difference
    var testValue = 100;
    console.log(best); // 666

    function insideClosureFn() {
        console.log(best); // 666
        console.log(testValue); // 100
    }

    insideClosureFn();
}

closureFn();

// { } do not create scope like other languages like C#m Java, C++ ...
{
    var a = 1;
    console.log(a); // 1
}

console.log(a); // 1

var generator = createGenerator();
console.log(generator()); // 0
console.log(generator()); // 1
console.log(generator()); // 2

var generator2 = createGenerator();
console.log(generator2()); // 0
console.log(generator2()); // 1

// function hoisting
function createGenerator() {
    var i = 0;
    return function generateNumber() {
        return i++;
    };
}

console.log(laterDefineVariable); // undefined
var laterDefineVariable = 100;
console.log(laterDefineVariable); // 100

var consoleLogger = createLogger(console.log);
consoleLogger('JS is cool!');
// Logger created
// JS is cool!

// pass function as argument
function createLogger(loggingFunction) {
    console.log('Logger created!');
    return loggingFunction;
}

function customLoggingFn(str) {
    console.log('Custom logger: ' + str);
}

var customLogger = createLogger(customLoggingFn);
customLogger('Pass function as argument!');
// Logger created
// Custom logger: Pass function as argument!

// fnSavedInVariable(); - VM338:1 Uncaught TypeError: fnSavedInVariable is not a function
var fnSavedInVariable = function () {
    console.log('In this way the function is not hoisted!');
}
fnSavedInVariable(); // In this way the function is not hoisted!

var result = [1, 2, 3]
    .map(element => element + 1)
    .filter(element => element % 2 === 0)
    .map(element => element + 2);

console.log(result); // [4, 6]

var reducedArray = [1, 2, 3]
    .reduce((accumulator, currentElement, currentIndex, array) => {
        var num = currentElement + 1;
        if (num % 2 === 0) {
            return accumulator.concat(num + 2);
        }

        return accumulator;
    }, []);

console.log(reducedArray); // [4, 6]