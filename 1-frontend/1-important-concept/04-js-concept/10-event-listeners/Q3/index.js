//Event Propagation
// Q3: Create a modal which closes by clicking on negative space

const modalContainer = document.querySelector(".modal-container");
const modal = document.querySelector(".modal");


modal.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    console.log("modal clicked");
});

modalContainer.addEventListener("click", (e) => {
    console.log("modal container clicked");
    toggle();
});

function toggle(){
    modalContainer.classList.toggle("modal-container-display");
}
