# Half-Star Rating

## Application Demo:
![img.png](img.png)

## Functionality Requirements
Complete the implementation of the component according to the following requirements:

The Rating component should accept the following props:

| Name |  Type | Possible Values  | Default  |  
|---|---|---|---|
| value  | Number  | 0.5 to 5  | undefined  |
| emptyIcon  | String  | Path to a valid icon  |  empty.svg | 
| halfFilledIcon  | String  | Path to a valid ico  |  half.svg | 
| filledIcon  | String  | Path to a valid ico  |  filled.svg | 
| steps  | Number  | 0.5, 1  | 1  | 

### Basic Features

1. Initial State:
    - The component should render 5 rating icons in the initial empty state.
    - Each icon should be rendered in an img tag using the src property to set the corresponding icon.
    - Each icon must have the data-testid="rating-icon".
    - The icons must be rendered inside a container that must have the data-testid="star-rating-container".
    - If a valid value is passed as a prop to the component, the corresponding icons must be rendered as filled. Eg: If value 3 is passed as a prop, the first 3 icons must be filled and the remaining must be empty.
   ```jsx
   <Rating value={3} />
   ```

2. Select/Unselect the Rating:
    - Clicking on an icon must set the value of the component.
    - If half ratings are allowed,
        - clicking on the left side (0 to 50% of the width) of the icon should set the value as decimals i.e 1.5, 2.
        - clicking on the right side of the icon (51 to 100% of the width) of the icon should set the value as integers i.e 1,2,4.
    - Clicking on the same icon (which was previously selected) again must clear the value of the component.

3. Hovering States:
    - If the mouse hovers over the icon, all the stars leading up to the icon where the mouse hovers should be filled. This indicates the prospective value of the component.
    - If half ratings are allowed,
        - hovering on the left side (0 to 50% of the width) of the icon should show the half rating icon.
        - hovering on the right side of the icon (51 to 100% of the width) of the icon must show the filled icon.
    - If the mouse is moved away from the icon, all the icons must revert back to their earlier state (filled if it was filled, and empty if it was empty).

4. Half Ratings:
    - Passing a value of 0.5 in the steps prop should invoke the half rating mode i.e the component must accept 1.5, 2.5, etc.
  ```jsx
<!-- Add steps={0.5} to enable half ratings mode -->
<Rating steps={0.5} />

<!-- Half Rating mode disabled when steps prop is not passed -->
<Rating />
```

### Advanced Features



1. Optimistic Toggle:
    - The component must allow updating the value programmatically when the prop value is modified by the parent.
   ```jsx
   <!-- If the value of ratingValue changes in the parent programmatically, the component must update its state accordingly -->

   <Rating value={ratingValue} />
   ```

2. Customization:
    - The component can accept any icon set to render using the emptyIcon, filledIcon, and halfFilledIcon props.
```jsx
<Rating emptyIcon="/icons/smiley/empty.svg" />

<Rating halfFilledIcon="/icons/smiley/half.svg" />

<Rating filledIcon="/icons/smiley/filled.svg" />
```

3. Accessibility:
    - The component must allow updating the value using only the keyboard.
    - Clicking on the Right Arrow key must increment the value by steps (0.5 if half ratings and 1 if full ratings).
    - Clicking on the Left Arrow key must decrement the value by steps (0.5 if half ratings and 1 if full ratings).
    - Clicking on a numeric key between 1 to 5 must update the value equal to the corresponding pressed key.

## Notes
Initially, the file is filled with boilerplate code. Note the following:
- Each icon must have the data-testid="rating-icon".
- The parent container of the ratings must have data-testid="star-rating-container".
- The parent container of the ratings must have tabIndex="0".
- A utility function `isLessThanHalf` (event) is provided to help in identifying if the mouse event happened on the left side of the icon or the right side.

_The component has these data-testid attributes for test cases and certain classes and ids for rendering purposes. They should not be changed._


**Read Only Files**
- `src/components/Rating.test.js`

