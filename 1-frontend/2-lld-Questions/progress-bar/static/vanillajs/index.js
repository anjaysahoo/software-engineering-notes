const MIN = 0;
const MAX = 100;

const wrapperEl = document.querySelector('.wrapper');

const addProgressEl = (value) => {
    console.log("hello");

    const clampedVal = Math.max(MIN, Math.min(value, MAX));
    const progressEl = document.createElement('div');

    progressEl.setAttribute("id", `progress-${value}`);
    progressEl.setAttribute("role", "progressbar");
    progressEl.classList.add("progress");
    progressEl.setAttribute("aria-valuemin", MIN);
    progressEl.setAttribute("aria-valuemax", MAX);

    const fillEl = document.createElement('div');
    fillEl.classList.add("fill");
    fillEl.style.width = `${clampedVal}%`;
    fillEl.textContent = `${clampedVal}%`;

    progressEl.append(fillEl);

    wrapperEl.append(progressEl);
}

addProgressEl( 25);
addProgressEl( 15);
addProgressEl( -15);
addProgressEl( 115);

const sliderEl = document.querySelector('input[type="range"]');
sliderEl.addEventListener("change", (e) => {
    const value = e.target.value;
    const sliderFillEl = document.querySelector(`#slider-fill`);
    sliderFillEl.textContent = `${value}%`;
    sliderFillEl.style.width = `${value}%`;
})
