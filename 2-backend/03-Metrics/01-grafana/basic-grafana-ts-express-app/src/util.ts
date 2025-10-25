/**
 * @param {Array<T>} array
 * @returns {T}
 * @template T
 */
function getRandomValue(array: any) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Simulates a heavy, asynchronous task that might succeed or fail.
 * @returns {Promise<number>} A promise that resolves with the time taken in milliseconds if successful, or rejects with an Error.
 */
function doSomeHeavyTask() {
    const ms = getRandomValue([100, 150, 200, 300, 600, 500, 1000, 1400, 2500]);
    const shouldThrowError = getRandomValue([1, 2, 3, 4, 5, 6, 7, 8]) === 8;

    if (shouldThrowError) {
        const randomError = getRandomValue([
            "DB Payment Failure",
            "DB Server is Down",
            "Access Denied",
            "Not Found Error",
        ]);
        throw new Error(randomError);
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms);
        }, ms);
    });
}

export default doSomeHeavyTask;