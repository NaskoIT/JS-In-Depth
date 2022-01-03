const person = {
    name: 'Atanas',
    age: 20,
    job: 'Software engineer',
    *[Symbol.iterator]() {
        const keys = Object.keys(this)
        let index = 0
        while (index < keys.length) {
            const key = keys[index++]
            yield [key, this[key]]
        }
    }
}

// [ 'name', 'Atanas' ]
// [ 'age', 20 ]
// [ 'job', 'Software engineer' ]

for (const pair of person) {
    console.log(pair)
}

const personPropertyValues = [...person]
console.log(personPropertyValues) 
// [ [ 'name', 'Atanas' ], [ 'age', 20 ], [ 'job', 'Software engineer' ] ]