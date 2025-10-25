function fetchWithAutoRetry(fetcher, maximumRetryCount) {

    return new Promise((resolve, reject) => {
        let count = 0;

        const callFetcher = () => {
            /**
             * 1. Note that fetcher return Promise hence executing is important
             * 2. Here we could have did just `fetcher().then((data) => { ... })`
             * but we have to check whether `fetcher()` is `Promise` or not
             * Hence using `Promise.resolve(fetcher())`
             */
            return Promise.resolve(fetcher()).then((resp) => {
                    resolve(resp);
                    return;
                },
                (error) => {
                    if(count === maximumRetryCount){
                        reject(error);
                        return;
                    }
                    else
                        callFetcher();

                    console.log("Tried " + count + " times");
                    count++;
                });
        };

        callFetcher();
    });

}


const fetcher = () => {
    return new Promise((resolve, reject) => {
        const random = Math.random()
        console.log("random: " + random);

        if(random > 0.5){
            resolve(1);
        }
        else{
            reject(new Error("Error executing P2"))
        }
    })
}

(async function a() {
    try{
        await fetchWithAutoRetry(fetcher, 3)
    }
    catch (e) {
        console.log(e)
    }
})()
