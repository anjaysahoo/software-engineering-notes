
<script>
    import { onMount } from 'svelte';
    import {CurrentProgressBarIndexStore} from "../stores/current-progress-bar-index.store.js";

    let startTransition = false;
    export let index;
    let alreadyAnimated = false;

    onMount(() => {

        const unsub = CurrentProgressBarIndexStore.subscribe((fetchedCurrentProgressBarIndex) => {
            console.log("CurrentProgressBarIndexStore called");

            if (!alreadyAnimated && fetchedCurrentProgressBarIndex === index) {
                setTimeout(() => {
                    console.log("fetchedCurrentProgressBarIndex : ", fetchedCurrentProgressBarIndex);
                    console.log("index : "+ index);
                    alreadyAnimated = true;
                    startTransition = true;
                    setTimeout(() => {
                        CurrentProgressBarIndexStore.setCurrentProgressBarIndex(fetchedCurrentProgressBarIndex + 1);
                    }, 2000);
                    unsub();
                }, 0)

            }
        })

    })
</script>


<!-------------------- HTML ---------------->

<div class="progress-bar">
    <div class="fill" class:filled={startTransition}></div>
</div>


<!----------------------------------------->


<!-------------------- CSS ---------------->
<style>
    .progress-bar{
        width: 100%;
        height: 20px;
        background-color: #c5c5c5;
        /*box-shadow: grey 0 0 10px;*/
    }

    .fill{
        height: 100%;
        background-color: green;
        transform: scaleX(0);
        transform-origin: left;
        transition-timing-function: linear;
        transition-duration: 2000ms;
    }

    .filled{
        transform: scaleX(1);
    }
</style>
<!----------------------------------------->




