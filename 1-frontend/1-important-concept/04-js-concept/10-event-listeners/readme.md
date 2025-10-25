## Event Listeners

Understand whole concept in just 18 min through this video: https://www.youtube.com/watch?v=XF1_MlZ5l6M

Article for same: https://blog.webdevsimplified.com/2022-01/event-listeners/

<details >
 <summary style="font-size: x-large; font-weight: bold">Event Bubbling & Capture</summary>


```html
<div class="parent">
  <div class="child"></div>
</div>
```
```javascript
parent.addEventListener("click", () => {
  console.log("Parent Bubble")
})

parent.addEventListener(
  "click",
  () => {
    console.log("Parent Capture")
  },
  { capture: true }
)

child.addEventListener("click", () => {
  console.log("Child Bubble")
})

child.addEventListener(
  "click",
  () => {
    console.log("Child Capture")
  },
  { capture: true }
)
```

With the above code if we click on the child it will log out the following.

```javascript
Parent Capture
Child Capture
Child Bubble
Parent Bubble
```

As you can see all the capture event listeners we created 
fire first and then the bubble event listeners fire next.

### Stopping Event Propagation

**stopPropagation()**

```javascript
parent.addEventListener(
    "click",
    e => {
        console.log("Parent Capture 1")
        e.stopPropagation()
    },
    { capture: true }
)

parent.addEventListener("click",() => {
    console.log("Parent Capture 2")
}, {
    capture: true
})

child.addEventListener("click", () => {
    console.log("Child Bubble")
})
```

If you click on child or parent output will be
```javascript
Parent Capture 1
Parent Capture 2
```

**stopImmediatePropagation()**
```javascript
parent.addEventListener(
  "click",
  e => {
    console.log("Parent Capture 1")
    e.stopImmediatePropagation()
  },
  { capture: true }
)

parent.addEventListener(
  "click",
  e => {
    console.log("Parent Capture 2")
  },
  { capture: true }
)

child.addEventListener("click", () => {
  console.log("Child Bubble")
})
```

If you click on child or parent output will be
```javascript
Parent Capture 1
```

Note: It is important to note that the event listeners 
on the same element will trigger in the order they 
are defined so if you want to stop other event listeners 
from firing with this method they must be defined after 
the listener that stops propagation.

Bubble Note: One important thing to know about event bubbling is that not all events bubble up. 
Events like the focus event which fire when an element receives focus do not bubble up. 
Generally events that do not bubble make sense not to bubble since they only pertain to 
the individual element the event fires on such as the focus event.


### removeEventListener()

```javascript
button.addEventListener("click", sayHi)
button.removeEventListener("click", sayHi)

function sayHi() {
  console.log("Hi")
}
```

### Running Events Once
```javascript
button.addEventListener(
  "click",
  () => {
    console.log("Clicked")
  },
  { once: true }
)
```

### Abortable Event Listeners
If you wanted to create an event listener that works 
until a certain condition is met this may be the 
perfect option for you.

```javascript
let count = 0
const controller = new AbortController()

button.addEventListener(
  "click",
  () => {
    count++
    console.log(count)
    if (count >= 3) {
      controller.abort()
    }
  },
  { signal: controller.signal }
)
```

## Benefits

- **Cleaner code:** Reduced number of event listeners improves code readability and maintainability.
- **Efficient event handling:** Minimizes performance overhead by attaching fewer listeners.
- **Flexibility:** Allows handling events happening on child elements without directly attaching listeners to them.

## Pitfalls

- **Accidental event handling:** Be mindful that parent elements might unintentionally capture events meant for children. Use `event.target` to identify the specific element that triggered the event.
- **Event order:** Events bubble up in a specific order. If multiple parents have event listeners, their order of execution depends on the DOM hierarchy.
- **Over-delegation:** While delegating events to a common ancestor is efficient, attaching a listener too high in the DOM tree might capture unintended events.


1. Event Bubbling: https://www.greatfrontend.com/questions/quiz/describe-event-bubbling?practice=practice&tab=quiz
2. Event Capturing: https://www.greatfrontend.com/questions/quiz/describe-event-capturing?practice=practice&tab=quiz
---
</details>



<details >
 <summary style="font-size: x-large; font-weight: bold">Event Delegation</summary>

```javascript
const buttons = document.querySelectorAll("button")
buttons.forEach(button => {
  button.addEventListener("click", () => {
    console.log("Clicked Button")
  })
})

const newButton = document.createElement("button")
document.body.append(newButton)
```

This new button does NOT have any click event listener
attached to it since it was added to the page after
our event listeners were added.

```javascript
document.addEventListener("click", e => {
  if (e.target.matches("button")) {
    console.log("Clicked Button")
  }
})

const newButton = document.createElement("button")
document.body.append(newButton)
```

```javascript
function addGlobalEventListener(type, selector, callback, options) {
  document.addEventListener(
    type,
    e => {
      if (e.target.matches(selector)) callback(e)
    },
    options
  )
}

addGlobalEventListener(
  "click",
  ".btn",
  () => {
    console.log("Clicked Button")
  },
  { once: true }
)
```

For Interview Questions: https://youtu.be/rS_4YfbEo2U?si=zw-vPyr8lzchUFR9


Event delegation is a technique in JavaScript where a single event listener is attached to a parent element instead of attaching event listeners to multiple child elements. When an event occurs on a child element, the event bubbles up the DOM tree, and the parent element's event listener handles the event based on the target element.

Event delegation provides the following benefits:

- **Improved performance**: Attaching a single event listener is more efficient than attaching multiple event listeners to individual elements, especially for large or dynamic lists. This reduces memory usage and improves overall performance.
- **Simplified event handling**: With event delegation, you only need to write the event handling logic once in the parent element's event listener. This makes the code more maintainable and easier to update.
- **Dynamic element support**: Event delegation automatically handles events for dynamically added or removed elements within the parent element. There's no need to manually attach or remove event listeners when the DOM structure changes

However, do note that:

- It is important to identify the target element that triggered the event.
- Not all events can be delegated because they are not bubbled. Non-bubbling events include: `focus`, `blur`, `scroll`, `mouseenter`, `mouseleave`, `resize`, etc.

### Event delegation in JavaScript frameworks

In [React](https://react.dev/), event handlers are attached to the React root's DOM container into which the React tree is rendered. Even though `onClick` is added to child elements, the actual event listeners are attached to the root DOM node, leveraging event delegation to optimize event handling and improve performance.

When an event occurs, React's event listener captures it and determines which React component rendered the target element based on its internal bookkeeping. React then dispatches the event to the appropriate component's event handler by calling the handler function with a synthetic event object. This synthetic event object wraps the native browser event, providing a consistent interface across different browsers and capturing information about the event.

#### By using event delegation, React avoids attaching individual event handlers to each component instance, which would create significant overhead, especially for large component trees. Instead, React leverages the browser's native event bubbling mechanism to capture events at the root and distribute them to the appropriate components.

More Details: https://www.greatfrontend.com/questions/quiz/explain-event-delegation?format=quiz

---
</details>
