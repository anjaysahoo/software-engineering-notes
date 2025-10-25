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

