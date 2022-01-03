function compose() {
    var functions = Array.prototype.slice.call(arguments);
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return functions.reduceRight(function (acc, curr, idx) {
            return curr.apply(undefined, idx === functions.length - 1 ? acc : [acc]);
        }, args);
    }
}

function sum(a, b) { return a + b; }
function multiplyBy3(a) { return a * 3; }

var addMultiply = compose(multiplyBy3, sum);
console.log(addMultiply(10, 29));
