// https://tr.javascript.info/microtask-queue
// Example 1
var promise = Promise.resolve();

promise.then(() => console.log('promise done'));

console.log('code finished');

// Example 2
Promise.resolve()
    .then(() => console.log('promise 2 done'))
    .then(() => console.log('code 2 finished'));

// Example 3
setTimeout(() => console.log('timeout'));

Promise.resolve()
    .then(() => console.log('promise 3 was resolved'));

console.log('macro task and micro task demo');

// Example 4
Promise.resolve()
    .then(() => {
        setTimeout(() => console.log('timeout as promise callback'), 0);
    })
    .then(() => {
        console.log('promise 4 done')
    })