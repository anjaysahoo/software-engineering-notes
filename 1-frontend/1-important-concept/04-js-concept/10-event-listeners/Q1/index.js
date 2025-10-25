//Event Propagation
// Q1 : event.target vs this.target vs event.currentTarget

const div = document.querySelector("div");
const form = document.querySelector("form");
const button = document.querySelector("button");

div.addEventListener("click", func);

form.addEventListener("click", func);

button.addEventListener("click", func);

function func(event){
    alert("target : " + event.target.tagName +
        " currentTarget : " + event.currentTarget.tagName +
        " this : " + this.tagName
    );
}
