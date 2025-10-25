// const Person = function (name) {
//     this.name = name;
//     const address = 'Delhi';
//     const dummyKey = name;
//     this.sayName1 = function () {
//         console.log("Normal address : ", address);
//         console.log(this.name);
//         console.log("Normal Dummy Key : ", dummyKey);
//     };
//     this.sayName2 = () => {
//         console.log("Arrow address : ", address);
//         console.log(this.name);
//         console.log("Arrow Dummy Key : ", dummyKey);
//     };
// };

// const Person = function (name) {
//     this.name = name;
//     const address = 'Delhi';
//     return {
//         dummyKey: name,
//         sayName1() {
//             console.log("Normal address : ", address);
//             console.log(this.name);
//         },
//         sayName2: () => {
//             console.log("Arrow address : ", address);
//             console.log(this.name);
//         }
//     }
// };

// const Person = function (name) {
//     const obj = {};
//     obj.name = name;
//     const address = 'Delhi';
//     obj.sayName1 = function () {
//         console.log("Normal address : ", address);
//         console.log(this.name);
//     };
//     obj.sayName2 = () => {
//         console.log("Arrow address : ", address);
//         console.log(this.name);
//     };
//     return obj;
// };


class Person {

    constructor(name) {
        this.name = name;
    }

    address = 'Delhi';

    sayName1 = function () {
        // console.log("Normal address : ", this.address);
        console.log(this.name);
    };

    sayName2 = () => {
        // console.log("Arrow address : ", this.address);
        console.log(this.name);
    };
};


const john = new Person('John');
const dave = new Person('Dave');

console.log("John : ", john);
console.log("Dave : ", dave);

john.sayName1(); // John
john.sayName2(); // John

// The regular function can have its `this` value changed, but the arrow function cannot
john.sayName1.call(dave); // Dave (because `this` is now the dave object)
john.sayName2.call(dave); // John

john.sayName1.apply(dave); // Dave (because `this` is now the dave object)
john.sayName2.apply(dave); // John

john.sayName1.bind(dave)(); // Dave (because `this` is now the dave object)
john.sayName2.bind(dave)(); // John


const sayNameFromWindow2 = john.sayName2;
sayNameFromWindow2(); // John

const sayNameFromWindow1 = john.sayName1;
sayNameFromWindow1.call(dave); // undefined (because `this` is now the window object)
