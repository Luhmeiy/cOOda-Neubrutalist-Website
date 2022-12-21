const navToggle = document.querySelector(".header__button");
const headerTop = document.querySelector(".header__top");
const headerBottom = document.querySelector(".header__bottom");
const headerIcon = document.querySelector(".header__icon");

navToggle.addEventListener('click', () => {
    headerTop.classList.toggle("header__top--black");
    headerBottom.classList.toggle("header__bottom--active");
    headerIcon.classList.toggle("header__icon--active");
})