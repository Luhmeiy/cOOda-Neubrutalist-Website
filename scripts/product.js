function activateButtons() {
    const descriptionBtnEl = document.querySelector(".section-product__info-header-item--1");
    const reviewsBtnEl = document.querySelector(".section-product__info-header-item--2");
    const descriptionEl = document.querySelector(".section-product__description");
    const reviewsEl = document.querySelector(".section-product__reviews");

    descriptionBtnEl.addEventListener('click', () => {
        reviewsEl.style.display = "none";
        descriptionEl.style.display = "block";
    
        descriptionBtnEl.classList.add("section-product__info-header-item--thick");
        reviewsBtnEl.classList.remove("section-product__info-header-item--thick");
    })
    
    reviewsBtnEl.addEventListener('click', () => {
        descriptionEl.style.display = "none";
        reviewsEl.style.display = "block";
    
        reviewsBtnEl.classList.add("section-product__info-header-item--thick");
        descriptionBtnEl.classList.remove("section-product__info-header-item--thick");
    })
}