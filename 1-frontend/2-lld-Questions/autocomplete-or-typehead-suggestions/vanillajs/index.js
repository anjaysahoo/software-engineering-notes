import handleSearchUtil from "./src/utils/handle-search.util.js";
import debounceUtil from "./src/utils/debounce.util.js";

const searchInput = document.getElementById("search-input");
const resultContainer = document.getElementById("result-container");

searchInput.addEventListener("input", debounceUtil((event) => {
    const prefix = event.target.value;

    if(prefix === ""){
        console.log("prefix", prefix);
        resultContainer.innerHTML = "";
    }
    else{
        handleSearchUtil(prefix);
    }
}, 500));


/**
 * Method-2 to select an element
 * We data-value attribute in the div to
 * know the value of the element.
 *
 * This way user click on padding and all are ignored
 */
resultContainer.addEventListener("click", (event) => {
    const selectedDiv = event.target;
    searchInput.value = selectedDiv.getAttribute("data-value");
    resultContainer.innerHTML = "";
})
