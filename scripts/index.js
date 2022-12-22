const starEl = document.querySelector(".section-hero__star");
const imageInfoEl = document.querySelector(".section-stories__image-info");
const breadEl = document.querySelector(".section-stories__bread");

window.addEventListener('scroll', () => {
    const value = window.scrollY;

    starEl.style.transform= `translateY(${-value * .1}px)`;
    imageInfoEl.style.transform= `translateY(${-value * .2}px)`;
    breadEl.style.transform= `translateY(${-value * .2}px)`;
})