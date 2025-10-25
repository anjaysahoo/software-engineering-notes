
<details >
 <summary style="font-size: x-large; font-weight: bold">Inheritance</summary>


1. #### Inheritance using `Classes`

```javascript
class Person {
  talk() {
    return 'Talking';
  }
}

const me = new Person();
const you = new Person();
me.talk(); // Talking
you.talk(); // Talking

// To update the function for both instances you only have to do it once:
Person.prototype.talk = function () {
  return 'New and improved Talking';
}; 
```

2. Inheritance using a `Constructor Function`

```javascript
function Person() {};
Person.prototype.talk = function () {
  return 'Talking';
}

const me = new Person();
const you = new Person();
me.talk(); // Talking
you.talk(); // Talking
```

3. **Prototypal Inheritance:** Inheritance using `pure objects with Object.create`

```javascript
const person = {
  talk() {
    return 'Talking';
  }
}
const me = Object.create(person);
me.talk(); // Talking
```
Note: Using Object.create to build the inheritance chain is no longer recommended. Use Object.setPrototypeOf instead.

4. Inheritance using `pure objects with Object.setPrototypeOf`

```javascript
const person = {}
person.__proto__.talk = function (){
  return 'Talking';
}
const me = {};
Object.setPrototypeOf(me, person);
me.talk(); // Talking
```

5. Extending a Class using `extends`
```javascript
class Person {
  talk() {
    return 'talking';
  }
}

class SuperHuman extends Person {
  fly() {
    return 'flying';
  }
}
const me = new Person();
console.log(me.talk); // talk exists
console.log(me.fly); // fly does NOT exists

const you = new SuperHuman();
console.log(you.fly); // fly exists
console.log(you.talk); // talk also exists!
```

Important caveat

1. `Properties vs. Methods`

![img.png](images/img.png)

Anything that is not defined as `method` will not change for child instances
even if we change it in the parent. Like in above example property `age` is not changed even
after changing `age` of parent `person`

![img_1.png](images/img_1.png)

_**`Property` is what a parent have and `Method` are what they do**_

Referred Video: https://youtu.be/1UTqFAjYx1k?si=FHSI15TwIILvqMIs


---
</details>



<details >
 <summary style="font-size: x-large; font-weight: bold">`prototype` Vs `__proto__`</summary>

### `__proto__`

Creating an Object

```javascript
//1.
const me = {};

//2.
const me = new Object();

//3. 
const me = Object.create({});
```

![img_3.png](images/img_3.png)

Every `Object` has an `__proto__` property.
![img_4.png](images/img_4.png)

1. `__proto__` in `Array`
   ![img_6.png](images/img_6.png)

2. `__proto__` in `String`
   ![img_7.png](images/img_7.png)

3. `__proto__` in `Chain of Object`
   ![img_8.png](images/img_8.png)

Creating instance of `ben` from `sina` object
![img_9.png](images/img_9.png)
![img_12.png](images/img_12.png)

![img_13.png](images/img_13.png)


### `prototype`

![img_14.png](images/img_14.png)
![img_16.png](images/img_16.png)

`prototype` does not belong to any `Object` or instances but only to `Constructor functions` or
`Classes`

![img_17.png](images/img_17.png)
![img_18.png](images/img_18.png)
![img_19.png](images/img_19.png)

![img_20.png](images/img_20.png)

We are creating instances of `me` constructor function of Object
![img_21.png](images/img_21.png)


Referred Video: https://youtu.be/1UTqFAjYx1k?si=_rYdylQi8aK3zaO6



![img.png](img.png)
![img_1.png](img_1.png)
![img_2.png](img_2.png)

```js
class Spiderman {
  lookOut() {
    alert('My Spider-Sense is tingling.');
  }
}

let miles = new Spiderman();
miles.lookOut();
```

```js
// class Spiderman {
let SpidermanPrototype = {
  lookOut() {
    alert('My Spider-Sense is tingling.');
  }
};

// let miles = new Spiderman();
let miles = { __proto__: SpidermanPrototype };
miles.lookOut();
```

![img_3.png](img_3.png)

---
</details>


<details >
 <summary style="font-size: medium; font-weight: bold">GFE: Explain how prototypal inheritance works in JavaScript</summary>

## TL;DR

Prototypical inheritance in JavaScript is a way for objects to inherit properties and methods from other objects. Every JavaScript object has a special hidden property called `[[Prototype]]` (commonly accessed via `__proto__` or using `Object.getPrototypeOf()`) that is a reference to another object, which is called the object's "prototype".

When a property is accessed on an object and if the property is not found on that object, the JavaScript engine looks at the object's `__proto__`, and the `__proto__`'s `__proto__` and so on, until it finds the property defined on one of the `__proto__`s or until it reaches the end of the prototype chain.

This behavior simulates classical inheritance, but it is really more of [delegation than inheritance](https://davidwalsh.name/javascript-objects).

Here's an example of prototypal inheritance:

```js live
// Parent object constructor.
function Animal(name) {
  this.name = name;
}

// Add a method to the parent object's prototype.
Animal.prototype.makeSound = function () {
  console.log('The ' + this.constructor.name + ' makes a sound.');
};

// Child object constructor.
function Dog(name) {
  Animal.call(this, name); // Call the parent constructor.
}

// Set the child object's prototype to be the parent's prototype.
Object.setPrototypeOf(Dog.prototype, Animal.prototype);

// Add a method to the child object's prototype.
Dog.prototype.bark = function () {
  console.log('Woof!');
};

// Create a new instance of Dog.
const bolt = new Dog('Bolt');

// Call methods on the child object.
console.log(bolt.name); // "Bolt"
bolt.makeSound(); // "The Dog makes a sound."
bolt.bark(); // "Woof!"
```

Things to note are:

- `.makeSound` is not defined on `Dog`, so the JavaScript engine goes up the prototype chain and finds `.makeSound` on the inherited `Animal`.
- Using `Object.create()` to build the inheritance chain is no longer recommended. Use `Object.setPrototypeOf()` instead.

---

## Prototypical Inheritance in Javascript

Prototypical inheritance is a feature in JavaScript used to create objects that inherit properties and methods from other objects. Instead of a class-based inheritance model, JavaScript uses a prototype-based model, where objects can directly inherit from other objects.

### Key Concepts

1. **Prototypes** : Every object in Javascript has a prototype, which is another object. When you create an object using an object literal or a constructor function, the new object is linked to the prototype of its constructor function or the `Object.prototype` if no prototype is specified. This is commonly referenced using `__proto__` or `[[Prototype]]`. You can also get the prototype by using inbuilt method `Object.getPrototypeOf()` and you can set the prototype of an object via `Object.setPrototypeOf()`.

```js live
// Define a constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Add a method to the prototype
Person.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

// Create a new object using the constructor function
let john = new Person('John', 30);

// The new object has access to the methods defined on the prototype
john.sayHello(); // "Hello, my name is John and I am 30 years old."

// The prototype of the new object is the prototype of the constructor function
console.log(john.__proto__ === Person.prototype); // true

// You can also get the prototype using Object.getPrototypeOf()
console.log(Object.getPrototypeOf(john) === Person.prototype); // true

// You can set the prototype of an object using Object.setPrototypeOf()
let newProto = {
  sayGoodbye: function () {
    console.log(`Goodbye, my name is ${this.name}`);
  },
};

Object.setPrototypeOf(john, newProto);

// Now john has access to the methods defined on the new prototype
john.sayGoodbye(); // "Goodbye, my name is John"

// But no longer has access to the methods defined on the old prototype
console.log(john.sayHello); // undefined
```

2. **Prototype chain**: When a property or method is accessed on an object, JavaScript first looks for it on the object itself. If it doesn't find it there, it looks at the object's prototype, and then the prototype's prototype, and so on, until it either finds the property or reaches the end of the chain (i.e., `null`).

3. **Constructor functions**: JavaScript provides constructor functions to create objects. When a function is used as a constructor with the new keyword, the new object's prototype (`[[Prototype]]`) is set to the constructor's prototype property.

```js live
// Define a constructor function
function Animal(name) {
  this.name = name;
}

// Add a method to the prototype
Animal.prototype.sayName = function () {
  console.log(`My name is ${this.name}`);
};

// Define a new constructor function
function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// Set the prototype of Dog to be a new instance of Animal
Dog.prototype = Object.create(Animal.prototype);

// Add a method to the Dog prototype
Dog.prototype.bark = function () {
  console.log('Woof!');
};

// Create a new object using the Dog constructor function
let fido = new Dog('Fido', 'Labrador');

// The new object has access to the methods defined on its own prototype and the Animal prototype
fido.bark(); // "Woof!"
fido.sayName(); // "My name is Fido"

// If we try to access a method that doesn't exist on the Dog prototype or the Animal prototype, JavaScript will return undefined
console.log(fido.fly); // undefined
```

4. **`Object.create()`**: This method creates a new object with the specified prototype object and properties. It's a straightforward way to set up prototypical inheritance. If you create a object via `Object.create(null)` it will not inherit any properties from `Object.prototype`. This means the object will not have any built-in properties or methods like `toString()`, `hasOwnProperty()`,

```js live
// Define a prototype object
let proto = {
  greet: function () {
    console.log(`Hello, my name is ${this.name}`);
  },
};

// Use `Object.create()` to create a new object with the specified prototype
let person = Object.create(proto);
person.name = 'John';

// The new object has access to the methods defined on the prototype
person.greet(); // "Hello, my name is John"

// Check if the object has a property
console.log(person.hasOwnProperty('name')); // true

// Create an object that does not inherit from Object.prototype
let animal = Object.create(null);
animal.name = 'Rocky';

// The new object does not have any built-in properties or methods
console.log(animal.toString); // undefined
console.log(animal.hasOwnProperty); // undefined

// But you can still add and access custom properties
animal.describe = function () {
  console.log(`Name of the animal is ${this.name}`);
};

animal.describe(); // "Name of the animal is Rocky"
```

## Resources

- [Inheritance and the prototype chain | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [JavaScript Visualized: Prototypal Inheritance](https://dev.to/lydiahallie/javascript-visualized-prototypal-inheritance-47co)

---
</details>



<details >
 <summary style="font-size: medium; font-weight: bold">GFE: What are the various ways to create objects in JavaScript?</summary>

https://www.greatfrontend.com/questions/quiz/what-are-the-various-ways-to-create-objects-in-javascript?practice=practice&tab=quiz

## TL;DR

Creating objects in JavaScript offers several methods:

- **Object literals (`{}`)**: Simplest and most popular approach. Define key-value pairs within curly braces.
- **`Object()` constructor**: Use `new Object()` with dot notation to add properties.
- **`Object.create()`**: Create new objects using existing objects as prototypes, inheriting properties and methods.
- **Constructor functions**: Define blueprints for objects using functions, creating instances with `new`.
- **ES2015 classes**: Structured syntax similar to other languages, using `class` and `constructor` keywords.

---

## Objects in JavaScript

Creating objects in JavaScript involves several methods. Here are the various ways to create objects in JavaScript:

## Object literals (`{}`)

This is the simplest and most popular way to create objects in JavaScript. It involves defining a collection of key-value pairs within curly braces (`{}`). It can be used when you need to create a single object with a fixed set of properties.

```js live
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 50,
  eyeColor: 'blue',
};

console.log(person); // {firstName: "John", lastName: "Doe", age: 50, eyeColor: "blue"}
```

## `Object()` constructor

This method involves using the `new` keyword with the built-in `Object` constructor to create an object. You can then add properties to the object using dot notation. It can be used when you need to create an object from a primitive value or to create an empty object.

```js live
const person = new Object();
person.firstName = 'John';
person.lastName = 'Doe';

console.log(person); // {firstName: "John", lastName: "Doe"}
```

## `Object.create()` Method

This method allows you to create a new object using an existing object as a prototype. The new object inherits properties and methods from the prototype object. It can be used when you need to create a new object with a specific prototype.

```js live
// Object.create() Method
const personPrototype = {
  greet() {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`,
    );
  },
};

const person = Object.create(personPrototype);
person.name = 'John';
person.age = 30;

person.greet(); // Output: Hello, my name is John and I'm 30 years old.
```

An object without a prototype can be created by doing `Object.create(null)`.

## ES2015 classes

Classes provide a more structured and familiar syntax (similar to other programming languages) for creating objects. They define a blueprint and use methods to interact with the object's properties. It can be used when you need to create complex objects with inheritance and encapsulation.

```js live
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet = function () {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`,
    );
  };
}

const person1 = new Person('John', 30);
const person2 = new Person('Alice', 25);

person1.greet(); // Output: Hello, my name is John and I'm 30 years old.
person2.greet(); // Output: Hello, my name is Alice and I'm 25 years old.
```

## Constructor functions

Constructor functions are used to create reusable blueprints for objects. They define the properties and behaviors shared by all objects of that type. You use the `new` keyword to create instances of the object. It can be used when you need to create multiple objects with similar properties and methods.

However, now that ES2015 classes are readily supported in modern browsers, there's little reason to use constructor functions to create objects.

```js live
// Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function () {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`,
    );
  };
}

const person1 = new Person('John', 30);
const person2 = new Person('Alice', 25);

person1.greet(); // Output: Hello, my name is John and I'm 30 years old.
person2.greet(); // Output: Hello, my name is Alice and I'm 25 years old.
```

## Further reading

- [`Object()` constructor | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/Object)
- [`new` keyword | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)
- [`Object.create()` | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

---
</details>


