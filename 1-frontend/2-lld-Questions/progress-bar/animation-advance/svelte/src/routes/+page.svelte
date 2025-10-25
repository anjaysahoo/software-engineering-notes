<!-------------------- Script -------------->
<script>
    import ProgressBar from "../components/ProgressBar.svelte";

    let noOfProgressBar = 0;
</script>
<!----------------------------------------->


<!-------------------- HTML ---------------->

<main>
    <button on:click={() => noOfProgressBar++}>Add</button>
    <div class="progress-bar-list">
        {#each Array(noOfProgressBar) as _, i}
            <li>{i}</li>
            <ProgressBar index={i}></ProgressBar>
        {/each}
    </div>
</main>

<!----------------------------------------->

<!-------------------- CSS ---------------->
<style>
    .progress-bar-list{
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
<!----------------------------------------->



