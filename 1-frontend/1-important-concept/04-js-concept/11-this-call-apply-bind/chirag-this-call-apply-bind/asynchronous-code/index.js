// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export is correct.
class EventEmitter {
    map;
    constructor() {
        this.map = new Map();
    }

    /**
     * @param {string} eventName
     * @param {Function} listener
     * @returns {{off: Function}}
     */
    on(eventName, listener) {
        const prevListeners = this.map.has(eventName) ? this.map.get(eventName) : [];

        this.map.set(eventName, [...prevListeners, listener]);

        return {
            newMap: this.map,
            off() {
                /** Here eventName & listener are all accessible to off
                 * function because of closure
                 */
                const listeners = this.newMap.get(eventName);

                listeners.forEach((fn, index) => {
                    if(fn === listener){
                        listeners.splice(index, 1);
                        this.newMap.set(eventName, listeners);
                    }
                })
            }
        }
    }

    /**
     * @param {string} eventName
     * @param {...any} args
     * @returns boolean
     */
    emit(eventName, ...args) {
        if(!this.map.has(eventName))
            return false;

        for(let fn of this.map.get(eventName)){
            fn.call(this, ...args);
        }

        return true;
    }
}

const emitter = new EventEmitter();

function addTwoNumbers(a, b) {
    console.log(`The sum is ${a + b}`);
}

// Returns a subscription object that has an .off() method.
const sub = emitter.on('foo', addTwoNumbers);
emitter.emit('foo', 2, 5);
// > "The sum is 7"

emitter.on('foo', (a, b) => {
    console.log(`The product is ${a * b}`);
});
emitter.emit('foo', 4, 5);
// > "The sum is 9"
// > "The product is 20"

sub.off(); // This unsubscribes the callback that logs the sum of the numbers.
emitter.emit('foo', -3, 9);
// > "The product is -27"
// (Only the multiply callback is triggered, the first one was unsubscribed.)

