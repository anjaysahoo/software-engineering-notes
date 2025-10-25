// "use strict";
//
// console.log('Direct Strict mode log:', typeof this === 'undefined')
//
// function myFunction() {
//     console.log('Strict mode:', typeof this === 'undefined'); // Logs true
// }
//
// myFunction();
//
// let bfSyncObject = {
//     name: "Ranbir Kapoor",
//     age: 41,
//     gfFnInnerFn: function() {
//         let a = 10;
//         function inner() {
//             console.log("a : ", a);
//             console.log("Normal Function with Normal Inner Function : ", this)
//         }
//         inner();
//     },
//     gfFnArrowInnerFn: function() {
//         let a = 10;
//         const inner = () => {
//             console.log("a : ", a);
//             console.log("Normal Function with Arrow Inner Function : ", this)
//         }
//         inner();
//     },
//     gfArrowFnInnerFn: () => {
//         let a = 10;
//         function inner() {
//             console.log("a : ", a);
//             console.log("Arrow Function with Normal Inner Function : ", this)
//         }
//         inner();
//     },
//     gfArrowFnArrowInnerFn: () => {
//         let a = 10;
//         const inner = () => {
//             console.log("a : ", a);
//             console.log("Arrow Function with Arrow Inner Function : ", this)
//         }
//         inner();
//     }
// }
//
//
// let bfAsynObject = {
//     name: "Ranbir Kapoor",
//     age: 41,
//     gfFnAsyncInnerFn: function() {
//         setTimeout(function() {
//             console.log("Normal Function with Async Normal Inner Function : ", this)
//         }, 1000)
//     },
//     gfFnAsyncArrowInnerFn: function() {
//         setTimeout(() => {
//             console.log("Normal Function with Async Arrow Inner Function : ", this)
//         }, 1000)
//     },
//     gfArrowFnAsyncInnerFn: () => {
//         setTimeout(function() {
//             console.log("Arrow Function with Async Normal Inner Function : ", this)
//         }, 1000)
//     },
//     gfArrowFnAsyncArrowInnerFn: () => {
//         setTimeout(() => {
//             console.log("Arrow Function with Async Arrow Inner Function : ", this)
//         }, 1000)
//     }
// }
//
// //With BF Synchronous Calls
//
// console.log("With BF Synchronous Calls :-");
//
// //Case-1
//
// bfSyncObject.gfFnInnerFn();
//
// //Case-2
// bfSyncObject.gfFnArrowInnerFn();
//
// //Case-3
// bfSyncObject.gfArrowFnInnerFn();
//
// //Case-4
// bfSyncObject.gfArrowFnArrowInnerFn();
//
//
//
// //With BF Asynchronous Calls
//
// console.log("With BF Asynchronous Calls :-");
//
// //Case-1
// bfAsynObject.gfFnAsyncInnerFn();
//
// //Case-2
// bfAsynObject.gfFnAsyncArrowInnerFn();
//
// //Case-3
// bfAsynObject.gfArrowFnAsyncInnerFn();
//
// //Case-4
// bfAsynObject.gfArrowFnAsyncArrowInnerFn();
//


class createLazyMan {
    queue = [];
    logFn;

    action = {
        eat: (food) => {this.logFn(`Eat ${food}.`)},
        greet: (name) => {this.logFn(`Hi, I'm ${name}.`)},
        sleep: async (seconds) => {
            await delay(seconds);
            this.logFn(`Wake up after ${seconds} second${seconds !== 1 ? 's' : ''}.`);
        }
    };

    // activity = {
        eat (food)  {
            this.queue.push({key: 'eat', value: food});
            return this;
        }
        sleep =  (seconds) => {
            this.queue.push({key: 'sleep', value: seconds});
            return this;
        }
        sleepFirst = (seconds) => {
            this.queue.unshift({key: 'sleep', value: seconds});
            return this;
        }
    // }

    constructor(name, logFn) {
        this.logFn = logFn;
        this.queue.push({key: 'greet', value: name});
        Promise.resolve().then(this.execute);

        return this;
    }

    execute = async () => {
        for(let item of this.queue) {
            await this.action[item.key](item.value);
        }
    }
}

function LazyMan(name, logFn) {
    return new createLazyMan(name, logFn);
}

// Helper function for all versions
function delay(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

LazyMan('Jack', console.log)
    .eat('banana')
    .eat('apple')
    .sleepFirst(1)
    .eat('egg')
    .sleepFirst(1)

