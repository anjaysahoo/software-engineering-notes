import getGadgets from "../services/get-gadgets.service.js";

const resultContainer = document.getElementById("result-container");
const searchInput = document.getElementById("search-input");


const handleSearchUtil = (prefix) => {
    getGadgets(prefix).then(
        (res) => {
            resultContainer.innerHTML = "";
            res.forEach((element) => {
                const div = document.createElement("div");
                div.classList.add("body__results__result");
                div.innerText = element;

                /**
                 * Method-2 to select an element
                 * We add data-value attribute to each element
                 */
                div.setAttribute("data-value", element);

                resultContainer.append(div);

                /******* Method-1 to select an element ********/
                // div.addEventListener("click", () => {
                //     searchInput.value = element;
                //     resultContainer.innerHTML = "";
                // })


            });
        }
    )
}

export default handleSearchUtil;
