//Event Propagation
// Q2 : Event Delegation

document.addEventListener("click", (e) => {
    if(e.target.matches(".gadget")){
        console.log("Gadget Clicked : " + e.target.innerText);
        window.location.href = "/" + e.target.innerText;
    }
})
