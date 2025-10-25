<details >
 <summary style="font-size: large; font-weight: bold">Introduction</summary>

![lld1.png](images/lld1.png)
![lld2.png](images/lld2.png)
![lld3.png](images/lld3.png)
![lld4.png](images/lld4.png)
![lld5.png](images/lld5.png)

Referred Video: https://www.youtube.com/watch?v=m9OSBJaQTlM

**Things to keep in mind while approaching LLD question:**

1. Don't bother yourself thinking best solution, first just try to solve the things in the simplest way, mostly think about a success scenario
2. Once you are done with that, talk and update code with the below points
   1. Solve any potential bug you see in code
   2. Add `try catch` block for error handling
   3. Input validation
   4. Empty check
   5. Accessibility
      1. Use `<form>` for keyboard accessibility, `<label>`, semantic HTML
   6. CSS


Go through the [Todo List](../../2-lld-Questions/todo-list) question to appreciate this well.
https://www.greatfrontend.com/questions/user-interface/todo-list/react/solution/improved

---
</details>




<details >
 <summary style="font-size: large; font-weight: bold">LLD Questions</summary>

Promise based questions :

1. Implement custom javascript promises
2. Implement custom Promise.all
3. Implement custom Promise.any
4. Implement custom Promise.race
5. Implement custom Promise.allSettled


"this" keyword based questions :

1. Implement custom call method
2. Implement custom apply method
3. Implement custom bind method


Async tasks based questions :

1. Implement 'N' async tasks in series
2. Implement 'N' async tasks in parallel
3. Implement 'N' async tasks in race
4. Implement custom setTimeout
5. Implement custom setInterval
6. Implement promisifying async callbacks


Object / Array manipulation based questions :

1. Deep Flatten I, II, III, IV
2. Implement custom Deep Equal
3. Implement custom Deep Clone
4. Implement custom Object assign
5. Implement custom Object is
6. Implement custom JSON stringify
7. Implement custom JSON parse


API Request based questions :

1. Implement auto-retry on failure
2. Implement throttling API calls by batching
3. Implement debouncing rate limiting
4. Implement throttling rate limiting
5. Implement memoize / caching identical APIs


Misc popular library questions :

1. Implement custom lodash get
2. Implement custom lodash set
3. Implement custom lodash omit
4. Implement custom lodash partial
5. Implement custom lodash chunk
6. Implement custom lodash once
7. Implement custom lodash memoize
8. Implement Virtual DOM I (serializing)
9. Implement Virtual DOM II (deserializing)
10. Implement cutsom "classnames" library
11. Implement cutsom "Immer" library


---
</details>




<details >
 <summary style="font-size: large; font-weight: bold">Infinite Scroll</summary>

1. Real time(Dynamic)
2. Addictive(Social Media)
3. Mobile Friendly
4. ❌ Bad for SEO
5. ❌ Searching is difficult

<details >
 <summary style="font-size: medium; font-weight: bold">Technique-1: Using Scroll Event</summary>

**Using _Throttling_ to make below code optimized**

```js
import { useEffect, useState } from "react";
import { MemeCard } from "./MemeCard";
import Shimmer from "./Shimmer";

const Body = () => {
  const [memes, setMemes] = useState([]);
  const [showShimmer, setShowShimmer] = useState(false);

  useEffect(() => {
    fetchMemes();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    //scrollY - how much I have scrolled
    // innerHeight - heigh of the window(visible setion)
    // document.body.scrollHeight - total height of the web page
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      fetchMemes();
    }
  };

  const fetchMemes = async () => {
    setShowShimmer(true);
    const data = await fetch("https://meme-api.com/gimme/20");
    const json = await data.json();

    setShowShimmer(false);
    setMemes((memes) => [...memes, ...json.memes]);
  };

  return (
    <div className="flex flex-wrap">
      {memes.map((meme, i) => (
        <MemeCard key={i} data={meme} />
      ))}

      {showShimmer && <Shimmer />}
    </div>
  );
};
export default Body;
```

---
</details>




<details >
 <summary style="font-size: medium; font-weight: bold">Technique-2: Intersection Observer(Infinite Scroll & Lazy Loading)</summary>

### Usecase
1. Lazy loading
2. Infinite scroll


#### Basic intersection observer code

```javascript
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle('show', entry.isIntersecting);

            /** unobserve the element once it become visible **/
            if(entry.isIntersecting) observer.unobserve(entry.target);
        })
    },
    {
        threshold: 1
    }
)


const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    observer.observe(card);
})
```


#### Code for Infinite scroll
```javascript
/**
 * This function replicate like calling api to load more items to list
 */
const loadNewCards = () => {
    for(let i = 0; i < 10; i++){
        const cardContainer = document.querySelector(".card-container");
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerText = "New card";
        observer.observe(card);
        cardContainer.append(card);
    }
}


const lastCardObserver = new IntersectionObserver(
    entries => {
        const lastCard = entries[0];

        if(!lastCard.isIntersecting) return;

        /** You make the network call here for infinite scrolling **/
        loadNewCards();

        /*** Unobserve the last card once it become visible ***/
        lastCardObserver.unobserve(lastCard.target);

        /*** Observe the new last card ***/
        const newLastCard = document.querySelector(".card:last-child");
        lastCardObserver.observe(newLastCard);
    },
    {
        rootMargin: "100px" // During network request you want to load card before 100px of the last card
    }
)

lastCardObserver.observe(document.querySelector(".card:last-child"));
```

Referred Video: https://www.youtube.com/watch?v=2IbRtjez6ag


---
</details>


### Preserving feed scroll position

```html
 <script>
    document.addEventListener("DOMContentLoaded", function(event) {
    var scrollpos = localStorage.getItem('scrollpos');
    if (scrollpos) window.scrollTo(0, scrollpos);
});

    window.onbeforeunload = function(e) {
    localStorage.setItem('scrollpos', window.scrollY);
};
</script>
```

---
</details>

<details >
 <summary style="font-size: large; font-weight: bold">Pagination</summary>

1. Structural & Hierarchy is present
2. Finite Data
3. Back & forth movement is easy
4. Can have footer alike infinite scroll can't have a footer

![img_2.png](img_2.png)
Referred Article: https://betterprogramming.pub/understanding-the-offset-and-cursor-pagination-8ddc54d10d98

<details >
 <summary style="font-size: medium; font-weight: bold">Offset Pagination</summary>

The offset pagination leverages the OFFSET and LIMIT commands in SQL to paginate data.
![img.png](img.png)

API --- `/products?page=5&count=20`

- **offset** ➡️ page = 5
- **limit** ➡️ count = 20

[1,2,.....,1000] : 1000 entries
<br>
So above request will give `81-100 entries`

#### Pros
- It allows the clients to view the total number of pages.
- It allows clients to jump to a specific page by passing the page number.

#### Cons
- **Result inconsistency:**
  - If an item in a previous page is deleted, data will shift forward, causing some results to be skipped.
  - If an item in a previous page is added, data will shift backwards, causing some results to be duplicated.
- **Offset inefficiency — Doesn’t scale well with large dataset**
  - The database looks up for (offset + limit) number of records before discarding the unwanted ones and returning the remaining.
  - Hence, the query time increases drastically as the offset increases.
  - **_Time Complexity is `O(n)`_**
  - It's like iterating through `Linked List` and getting the data



---
</details>


<details >
 <summary style="font-size: medium; font-weight: bold">Cursor Pagination</summary>

- The cursor pagination utilizes a pointer that refers to a specific database record.
Proposed by Facebook
- If the cursor is not given, the server fetches from the first record.
![img_1.png](img_1.png)

- the `limit` is equal to the given `page size plus one`.
- If the number of records returned is less than the LIMIT, it implies that we are on the last page.
- The extra record is not returned to the client. The ID of the extra record is passed back to the client as the next_cursor.

#### Pros
- **Stable pagination window**
  - Since we are fetching from a stable reference point, the addition or deletion of record will not affect the pagination window.
- **Scale well with large datasets**
  - The cursor is unique and indexed.
  - The database jumps directly to the record without iterating through the unwanted data. Hence, making it more efficient.

#### Cons
- The cursor pagination doesn’t allow clients to jump to a specific page.
- The cursor must come from a unique and sequential column (E.g. timestamp). Otherwise, some data will be skipped.
- Limited sort features. If the requirement is to sort based on a non-unique column (E.g. first name), it will be challenging to implement using cursor pagination. Concatenating multiple columns to get a unique key leads to slower time complexity.
- **_Time Complexity is `O(1)`_**
- It's like using `Map` to get the data using key


<details >
 <summary style="font-size: small; font-weight: bold">Encoded Cursor</summary>

- The encoded cursor suggests returning an encoded base64 string regardless of the underlying pagination solution.
- When using offset pagination, we encode the `page_number` and `total_page` into a base64 string and return it as a cursor to the clients.
```json
"response": {
    // "page=3|offset=20|total_pages=30"
    next_cursor: "dcjadfaXMDdQTQ"
}
```
- Similarly, we can encode the cursor in the cursor pagination into a base64 string before returning it to the clients.
```json
response: {
    // "next_cursor:1234"
    next_cursor: "dcjadfaXMDdQTQ"
}
```
- The client can always pass a cursor and a page_size without knowing the underlying implementation.
```json
request: {
    cursor: "dcjadfaXMDdQTQ",
    page_size: 10
}
```

This allows the server to implement different underlying pagination solutions while providing a consistent interface to the API consumers.

---
</details>


---
</details>


---
</details>
