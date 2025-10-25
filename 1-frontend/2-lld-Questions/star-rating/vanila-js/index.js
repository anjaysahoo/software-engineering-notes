
const starRating = ($rootEl, {max = 5, index = 1}) => {

    let currentIndex = index;
    const STAR_ICON_CLASS = "star-icon";
    const FILLED_STAR_ICON_CLASS = "star-icon-filled";
    const STAR_TEMPLATE = `
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class=${STAR_ICON_CLASS}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    `



    function intialize(){
        const html = Array.from({length: max}, () => STAR_TEMPLATE).join('');

        $rootEl.innerHTML = html;

        $rootEl.addEventListener("click", (event) => {
            const selectedEl = event.target.closest(`.${STAR_ICON_CLASS}`);

            console.log("selectedEl : " + selectedEl);

            const selectedIndex = [...$rootEl.children].indexOf(selectedEl) + 1;

            // console.log("selectedIndex : " + selectedIndex);

            setIndex(selectedIndex);
        })

        $rootEl.addEventListener("mouseover", (event) => {
            const selectedEl =event.target.closest(`.${STAR_ICON_CLASS}`);

            // console.log("selectedEl : " + selectedEl);

            const selectedIndex = [...$rootEl.children].indexOf(selectedEl) + 1;

            highlightStar(selectedIndex);
        })

        $rootEl.addEventListener("mouseout", (event) => {
            highlightStar(currentIndex);
        })
    }

    function highlightStar(indexParam){
        for(let i = 0; i < $rootEl.children.length; i++){
            if(i < indexParam){
                $rootEl.children[i].classList.add(FILLED_STAR_ICON_CLASS);
            }
            else{
                $rootEl.children[i].classList.remove(FILLED_STAR_ICON_CLASS);
            }
        }
    }

    function setIndex(indexParam){
        currentIndex = indexParam;
        highlightStar(currentIndex);
    }

    intialize();
    highlightStar(index);
}


starRating(document.getElementById("star1"), {max: 5, index: 2});

starRating(document.getElementById("star2"), {max: 15, index: 2});
