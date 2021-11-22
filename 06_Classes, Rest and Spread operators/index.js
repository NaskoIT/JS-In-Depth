const data = [
    {
        id: 1,
        name: 'Ivan',
        age: 30,
        comments: [
            {
                id: 10,
                userId: 1,
                text: 'Hello World'
            }
        ]
    },
    {
        id: 2,
        name: 'Dragan',
        age: 21,
        comments: [
            {
                id: 13,
                userId: 2,
                text: 'Hello World 2'
            }
        ]
    },
    {
        id: 3,
        name: 'Gosho',
        age: 3,
        comments: [
            {
                id: 15,
                userId: 3,
                text: 'Hello World 3'
            }
        ]
    },
];

const [
    {
        comments: [{text: firstUserFirstComment, ...rest}],
        comments: firstUserComments,
    },
    {
        comments: secondUserComments
    },
    ...best
] = data;

function getComments(data) {
    // return data.reduce((acc, { comments }) => acc.concat(comments), []);
    return data.flatMap(({comments}) => comments);
}

const allComments = getComments(data);
console.log(allComments);

function removeProperty(propName, {[propName]: removedProp, ...rest}) {
    return rest;
}

const removeProp = (_, {[_]: __, ...rest}) => rest;

const obj = {data: 123, test: 'Some test'};
const newObj = removeProp('data', obj);
console.log(newObj);

function multipleArgs(a, b, c, d) {
    console.log(a + b + c + d);
}

const fnArgs = [1, 2, 3, 4];
multipleArgs(...fnArgs); // 10
multipleArgs(...[4, 5, 6, ...fnArgs]); // 16

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    logData() {
        console.log("This is person!");
    }
}

class Employee extends Person {
    static logData(obj) {
        console.log(obj.name, obj.age, obj.position);
    }

    constructor(name, age, position) {
        super(name, age);

        this.position = position;
    }

    logData() {
        super.logData();
        console.log('This is Employee');
    }

    set data(obj) {
        this.name = obj.name;
        this.age = obj.age;
        this.position = obj.position;
    }

    get data() {
        return {...this};
    }
}

const employee = new Employee('Pesho', 20, 'Developer');
Employee.logData(employee); // Pesho 20 Developer
employee.logData();
// This is person!
// This is Employee

console.log(employee.data); // { name: 'Pesho', age: 20, position: 'Developer' }

employee.data = {
    name: 'Nasko',
    age: 19,
    position: 'Developer'
}

console.log(employee); // Employee { name: 'Nasko', age: 19, position: 'Developer' }