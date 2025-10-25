const parent = document.querySelector(".parent");
const child = document.querySelector(".child");

const addGlobalEventListener = (type, selector, callback, options) => {
    document.addEventListener(type, (e) => {
        if(e.target.matches(selector)){
            callback(e);
        }
    }, option)
}

addGlobalEventListener("click", "button", () => {
    console.log("Button Clicked")
}, {
    capture: true
})
