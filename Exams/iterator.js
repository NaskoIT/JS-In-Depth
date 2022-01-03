class Iterator {
    getIterator() {
        const keys = Object.keys(this)
        let index = 0

        return {
            next: () => {
                const currentKey = keys[index++]
                return {
                    value: currentKey ? { [currentKey]: this[currentKey] } : null,
                    done: !currentKey
                }
            }
        }
    }
}

class User extends Iterator {
    constructor(name, age) {
        super()
        this.name = name
        this.age = age
    }
}

const user = new User('Atanas', 20)
const iterator = user.getIterator()
console.log(iterator.next()) // { value: { name: 'Atanas' }, done: false }
console.log(iterator.next()) // { value: { age: 20 }, done: false }
console.log(iterator.next()) // { value: null, done: true }