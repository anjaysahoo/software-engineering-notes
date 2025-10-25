import { writable } from "svelte/store";

function manageCurrentProgressBarIndex() {
    const currentProgressBarIndex = writable(0);

    return {
        subscribe: currentProgressBarIndex.subscribe,
        setCurrentProgressBarIndex: (fetchedCurrentProgressBarIndex) => {
            currentProgressBarIndex.set(fetchedCurrentProgressBarIndex);
        }
    };
}

export const CurrentProgressBarIndexStore = manageCurrentProgressBarIndex();
