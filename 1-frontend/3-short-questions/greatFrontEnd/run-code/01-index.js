function curry(func) {
    return function curried(...args){
        if(args.length >= func.length){
            return func.apply(this, args);
        }

        return (newArgs) => newArgs === undefined ?
            curried.apply(this,args) :
            curried.apply(this,[...args, newArgs]);

    }
}

function multiplyThree(a, b, c) {
    return a * b * c;
}
const curriedMultiplyThree = curry(multiplyThree);
console.log(curriedMultiplyThree(4)(5)(6)); // 120
console.log(curriedMultiplyThree(4)(5, 6)); // 120
console.log(curriedMultiplyThree(4, 5)(6)); // 120
console.log(curriedMultiplyThree(4, 5, 6)); // 120
