const grandparent = document.getElementById("grandparent-id");

const changeColor = (element) => {
    element.style.backgroundColor = "grey";
}

changeColor(grandparent);

const parents = Array.from(document.getElementsByClassName("parent"));

parents.forEach(changeColor);
