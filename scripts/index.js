// PARALLAX EFFECT
const starEl = document.querySelector(".section-hero__star");
const imageInfoEl = document.querySelector(".section-stories__image-info");
const breadEl = document.querySelector(".section-stories__bread");

window.addEventListener('scroll', () => {
    const value = window.scrollY;

    starEl.style.transform= `translateY(${-value * .1}px)`;
    imageInfoEl.style.transform= `translateY(${-value * .2}px)`;
    breadEl.style.transform= `translateY(${-value * .2}px)`;
})

// CHANGES SECTION HERO HEIGHT
const imageContainerEl = document.querySelector(".section-hero__image-container");
const heroEl = document.querySelector(".section-hero");

window.addEventListener('resize', () => heroEl.style.height = `${2.5 * imageContainerEl.clientHeight}px`);