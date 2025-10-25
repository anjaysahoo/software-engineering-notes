// Modifying Element

// const body = document.body;
//
// const div = document.createElement('div');
// div.innerText = 'Hello World';
//
// body.append(div);


// Inserting HTML in DOM

// const body = document.body;
//
// const div = document.createElement('div');
//
// // 1st Method: Unsafe
// // div.innerHTML = "<strong>Hello World</strong>";
//
// // 2nd Method: Safe
// const strong = document.createElement('strong');
// strong.innerText = 'Hello World';
// div.append(strong);
//
// body.append(div);


// Removing HTML from DOM

const body = document.body;
const div = document.querySelector('div');
const spanHello = document.querySelector('#hello');
const spanBye = document.querySelector('#bye');

spanBye.remove();


// Fetching, Adding & Removing Attributes

// 1st Method

console.log(spanHello.getAttribute('id'));
spanHello.setAttribute('id', "span-hello-id");
spanHello.removeAttribute('id')


// 2nd Method
spanHello.id = 'span-hello-id';




