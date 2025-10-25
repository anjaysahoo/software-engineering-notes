Promise.allPolyfill = function(promises){
    let fullfilledPromises = [];
    let res = [];

   function executor(resolve, reject){
        promises.forEach((promise, index) => {
            return promise.then((value) => {
                fullfilledPromises.push(true);
                res[index] = value;

                if(fullfilledPromises.length === promises.length){
                    return resolve(res);
                }
            }).catch((error) => {
                return reject(error);
            })
        })
    }

    return new Promise(executor);
}



// // Create a Constructor Function
// function PromisePolyFill(executor){
//     let onResolve,
//         onReject,
//         isFullfilled = false,
//         isRejected = false,
//         isCalled,
//         value;
//
//     function resolve(val){
//         isFullfilled = true;
//         value = val;
//
//         if(typeof onResolve === 'function'){
//             onResolve(val);
//             isCalled = true;
//         }
//     }
//
//     function reject(val){
//         isRejected = true;
//         value = val;
//
//         if(typeof onReject === 'function'){
//             onReject(val);
//             isCalled = true;
//         }
//     }
//
//     this.then = function(callback){
//         onResolve = callback;
//
//         if(isFullfilled && !isCalled){
//             onResolve(value);
//             isCalled = true;
//         }
//         return this;
//     }
//
//     this.catch = function(callback){
//         onReject = callback;
//
//         if(isRejected && !isCalled){
//             onReject(value);
//             isCalled = true;
//         }
//         return this;
//     }
//
//     executor(resolve, reject);
// }
//
//
// const examplePromise = new PromisePolyFill((res, rej) => {
//     // setTimeout(() => {
//     rej(2);
//     // }, 1000);
// })
//
// examplePromise.then((res) => {
//     console.log("res : ", res)
// }).catch((error) => {
//     console.log("error : ", error)
// });






// function once(func, context){
//     let ran;
//
//     return function() {
//         if(func) {
//             ran = func.apply(context || this, arguments);
//             func = null;
//         }
//
//         return ran;
//     };
// }
//
// const hello = once((a,b) => console.log("hello", a, b));
//
// hello(1,2);
// hello(2,3);


// Function.prototype.myBind = function(context = {}, ...args){
//     if(typeof this !== 'function'){
//         throw new TypeError(this + 'cannot be bound as its not callable');
//     }
//
//     context.fn = this;
//     return function(...newArgs){
//         return context.fn(...args, ...newArgs);
//     }
// }
//
// const obj = {"name": "hello"};
//
// function test(){console.log("THIS : ", this)};
//
// const temp = test.myBind(obj);
//
// temp();


// function myMemoize(func, context){
//     const res = {};
//
//     return function(...args){
//         console.log("args : ", ...args);
//         const key = JSON.stringify(args);
//         console.log("key : ", key);
//         if(!res[key]){
//             res[key] = func(...args);
//         }
//
//         return res[key]
//     }
// }


// const clumsyProduct = (num1, num2) => {
//     console.log("clumsy called")
//     for(let i = 1; i <= 10000000; i++){}
//
//     return num1 * num2;
// }
//
// const memoizedClumzyProduct = myMemoize(clumsyProduct);
//
// console.log(memoizedClumzyProduct(2, 3));
// console.log(memoizedClumzyProduct(2, 3));
// console.log(memoizedClumzyProduct(2, 4));

