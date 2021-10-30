setTimeout(function () {
    console.log('Hello');
}, 1000);

// IIFE (Immediately Invoked Function Expression)
var myLibrary = (function (global) {
    var a = 10;

    return {
        calculate: function (b) {
            return a + b;
        }
    };
})(global);

console.log(myLibrary.calculate(20)); // 30

for (var i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i)
    }, 0);
}
// 5 5 5 5 5

for (var i = 0; i < 5; i++) {
    setTimeout(function (a) {
        console.log(a)
    }, 0, i);
}
// 0 1 2 3 4

for (var i = 0; i < 5; i++) {
    (function (value) {
        setTimeout(function () {
            console.log(value)
        }, 0);
    })(i);
}
// 0 1 2 3 4

var timeoutId = setTimeout(function () {
    console.log('Clear timeout');
}, 2000);
clearTimeout(timeoutId);

setInterval(() => {
    console.log('Hello 2!');
}, 4000);

var fs = require('fs');
fs.writeFileSync('./text.txt', 'JS is cool');

// CPS = Continuation Passing Style
fs.readFile('./text.txt', function (error, content) {
    // Handler the error (Always handle errors!)
    if (error) {
        console.log(error);
        return;
    }

    console.log(content); // returns buffer: <Buffer 4a 53 20 69 73 20 63 6f 6f 6c>
    var modifiedContent = content + ' ' + content;

    fs.writeFile('./text.txt', modifiedContent, function (error) {
        // Handler the error (Always handle errors!)
        if (error) {
            console.log(error);
            return;
        }

        console.log('File was modified');

        // do something other
        // another callback - Callback hell
    });

    console.log('END OF READ FILE');
});

console.log('END OF FILE');

// MICRO TASKS
// MACRO TASKS

setTimeout(function () {
    console.log('Set timeout');
});

// MICRO TASK
process.nextTick(function () {
    console.log('Process next tick')
});

console.log('Promise, macro and micro tasks demo')

setTimeout(function () {
    console.log('MACRO TASK')
})

// MICRO TASK
Promise.resolve(1)
    .then(function (x) {
        return x + 1;
    })
    .then(function (x) {
        return x + 2;
    })
    .then(console.log);

console.log([1, 2, 3, 4]
    .map(x => x + 1)
    .filter(x => x % 2 === 0));

function readFile(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, function (error, content) {
            if (error) {
                return reject(error);
            }

            resolve(content);
        })
    });
}

function writeFile(path, content) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path, content, function (error) {
            if (error) {
                return reject(error);
            }

            resolve(content);
        })
    })
}

readFile('./text.txt')
    .then(function (content) {
        return content + ' ' + content;
    })
    .then(function (content) {
        return writeFile('./text.txt', content);
    })
    .then(function (content) {
        console.log('FIle was successfully modified. ' + content);
    })
    .catch(function (error) {
        console.log(error);
    });

