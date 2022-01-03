console.log(Symbol('test1') === Symbol('test1')); // false

const mySymbol = Symbol('test1');

const obj = {
    [mySymbol]: 123
};

console.log(obj[mySymbol]); // 123
console.log(Object.keys(obj)); // []
console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(test1) ]

const symbol2 = Symbol.for('test2');

const arr = [1, 2, 3, 4];
const arrIterator = arr[Symbol.iterator]();
console.log(arrIterator.next()); // { value: 1, done: false }
console.log(arrIterator.next()); // { value: 2, done: false }
console.log(arrIterator.next()); // { value: 3, done: false }
console.log(arrIterator.next()); // { value: 4, done: false }
console.log(arrIterator.next()); // { value: undefined, done: true }

const person = {
    name: 'Ivan',
    age: 20,
    test: 123,
    [Symbol.iterator]() {
        let counter = 0;
        const keys = Object.keys(this);

        return {
            next: () => {
                return counter < keys.length
                    ? { value: this[keys[counter++]], done: false }
                    : { value: undefined, done: true };
            }
        }
    }
}


for(const value of person) {
    console.log(value);
}
// Ivan
// 20
// 123

const personPropertyValues = [...person];
console.log(personPropertyValues);

function* idGen() {
    let index = 0;
    while (true) {
        yield index++;
    }
}

const iter = idGen();
console.log(iter.next()); // { value: 0, done: false }

