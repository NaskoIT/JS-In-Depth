// ECMAScript 5
// Primitive values;

var var0;
var var1 = undefined; // undefined
var var2 = 'string'; // string
var var3 = 20; // number
var var3 = true; // boolean
var var5 = null; // null

// Non-primitive values:

var var6 = { prop1: 1000 }; // object
var var7 = [ 1, 2, 3, 'string', [1, 2], {} ]; // array
var var8 = function() { 
    // do something
}; //function
var8();

// Immutable
var var9 = var2 + '123';
console.log(var3);
console.log(var2);

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

String();
Boolean();
Array();

isNaN('dsda'); // true
Number.isNaN('asdsa'); // false

var test = null;
if (test == undefined) {
    console.log('OMG');
}

if(test === undefined || test === null) {
    console.info('HELLO!');
}

var str = '123';
if(typeof str === 'string') {
    console.log('string');
}

function doSomething() {
    console.log('do something')
    // do something
} // function declaration

function test(fn) {
    return function() {
        return function() {
            return fn();
        }
    }
}

test()()(doSomething);

var testVar

function testFn() {
    var best = 333;
    console.log(best);
    console.log(best);
}

function createGenerator() {
    var i = 0;
    return function generateNumber(i) {
        return i++;
    };
};

var generator = createGenerator();
console.log(generator());
console.log(generator());
console.log(generator());

var consoleLogger = createLogger(console.log);
consoleLogger('JS is cool!');

function createLogger(loggingFunction) {
    console.log('Logger created!');
    return loggingFunction;
}

function customLoggingFn(str) {
    console.log('Custom logger: ' + str);
}

var customLogger = createLogger(customLoggingFn);
customLogger('Pass function as argument!');

var result = [1, 2, 3]
    .map(element => element + 1)
    .filter(element => element % 2 == 0)
    .map(element => element + 2);

console.log(result);

var reducedArray = [1, 2, 3]
    .reduce((accumolator, currentElement) => {
        var num = currentElement + 1;
        if(num % 2 === 0) {
            return accumolator.concat(num + 2);
        }

        return accumolator;
    }, []);

console.log(reducedArray);