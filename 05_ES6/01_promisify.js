const promisify = (func) => {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return new Promise((resolve, reject) => {
            const handler = (error, data) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(data);
            }

            func(...args, handler);
        });
    }
}

const fs = require('fs');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

readFile('./data.txt')
    .then(content => content + ' more data')
    .then(data => writeFile('./ data.txt', data))
    .then(() => console.log('Operation completed'));