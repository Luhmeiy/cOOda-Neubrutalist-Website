function activateButtons() {
    const descriptionBtnEl = document.getElementById("description");
    const reviewsBtnEl = document.getElementById("reviews");
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