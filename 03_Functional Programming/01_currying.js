function add(a, b) {
    return a + b;
}

console.log(add(5, 6)); // 11

function add5(a) {
    return add(a, 5);
}

console.log(add5(10)); // 15

function addX(x) {
    return function (y) {
        return x + y;
    }
}

var add3 = addX(3);
var res = add3(17); // 20
console.log(res);

function createLog(serviceName) {
    return function (message) {
        console.log('[' + serviceName + ']' + ' ' + message);
    }
}

var logger = createLog('Index');
logger('Run successfully!'); // [Index] run successfully!

var add10 = add.bind(null, 10);
console.log(add10(20)); // 30

// currying
function curry(fn) {
    return function curried() {
        var args = [].slice.call(arguments);
        if (arguments.length >= fn.length) {
            return fn.apply(this, arguments);
        } else {
            return function () {
                var args2 = [].slice.call(arguments);
                args2 = args.concat(args2);
                return curried.apply(this, args2);
            }
        }
    }
}

function addNumbers(a, b, c, d) {
    return a + b + c + d;
}

var curried = curry(addNumbers);
console.log(curried(1, 2, 3, 4)); // 10
console.log(curried(1, 2)(3, 4)); // 10
console.log(curried(1)(2)(3)(4)); // 10
console.log(curried(1)(2, 3)(4)); // 10
