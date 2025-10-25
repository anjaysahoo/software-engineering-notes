# DOM Traversal

## `getElementById`

```html
<div class="grandparent" id="grandparent-id">
        <div class="parent">
            <div class="child"></div>
            <div class="child"></div>
        </div>
        <div class="parent">
            <div class="child"></div>
            <div class="child"></div>
        </div>
    </div>
```

```javascript
const grandparent = document.getElementById("grandparent-id");

const changeColor = (element) => {
    element.style.backgroundColor = "grey";
}

changeColor(grandparent);

```


## `getElementsByClassName`

```javascript
const parents = Array.from(document.getElementsByClassName("parent"));

parents.forEach(changeColor);
```

## `querySelector`

```javascript
const grandparent = document.querySelector("#grandparent-id");
const grandparent = document.querySelector(".grandparent");
changeColor(grandparent);
```
If want to know all selectors we can use refer "CSS Selector Cheat Sheet - Dark" pdf present in this repo

By defult it will select first element
```javascript
const parent = document.querySelector(".parent");
```

To select all the elements
```javascript
const parents = document.querySelectorAll(".parent");
```

### Selecting Children

```javascript
const grandparent = document.querySelector(".grandparent");
const parents = Array.from(grandparent.children);

parents.forEach(changeColor)
```

```javascript
const parentOne = parents[0];
const childerns = parentOne.children;

changeColor(childerns[0]);
```

### Selecting Parent

```javascript
const childOne = document.querySelector("#child-one");

const parent = childOne.parentElement;
const grandparent = parent.parentElement;

changeColor(grandparent)
```

Referred Video: https://www.youtube.com/watch?v=v7rSSy8CaYE&t=334s
