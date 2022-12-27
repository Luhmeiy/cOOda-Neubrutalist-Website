// CONNECT TO DATABASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDuIy7G8gaw4a-HyBO6GfYlGHSDQlKm_eg",
    authDomain: "gelo-3a1e8.firebaseapp.com",
    databaseURL: "https://gelo-3a1e8.firebaseio.com",
    projectId: "gelo-3a1e8",
    storageBucket: "gelo-3a1e8.appspot.com",
    messagingSenderId: "52061308019",
    appId: "1:52061308019:web:6f85b975313d41caf45606"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database);


// GET PRODUCTS
get(child(dbRef, "Products"))
.then((snapshot) => {
    let products = [];

    snapshot.forEach(childSnapshot => {
        products.push(childSnapshot.val());
    })

    if (window.location.href.split('/').at(-1) == 'products.html') {
        addProducts(products.reverse());
    }
    else if (window.location.href.split('?').at(-2).split('/').at(-1) == 'product.html') {
        addProduct(products.reverse());
    }
})

// GROUP PRODUCTS PAGE
function addProducts(products) {
    const sectionProductsEl = document.querySelector(".section-products");

    let i = 0;

    products.forEach(product => {
        i++;
        sectionProductsEl.innerHTML += `<div class="section-products__item section-products__item--${i}">
                                            <div class="section-products__info">
                                                <h2 class="heading-2">${product.Cta}</h2>
                                                <p class="paragraph">${product.Weight}</p>
                                            </div>

                                            <div class="section-products__image-container section-products__image-container--${i} mb-sm">
                                            </div>

                                            <div class="section-products__info">
                                                <span class="span__small mb-sm">${product.Small_text}</span>
                                            </div>

                                            <a href="product.html?cod=${i-1}" class="btn-product btn-product--end btn-product--${i}">Purchase</a>
                                        </div>`;
    })
}

function addStars(review) {
    const starsEl = document.querySelectorAll(".stars-container");

    for (let i = 0; i < review; i++) {
        starsEl[starsEl.length - 1].innerHTML += `<i class="fa-solid fa-star">`;
    }

    if (review != 5) {
        for (let i = 0; i < 5 - review; i++) {
            starsEl[starsEl.length - 1].innerHTML += `<i class="fa-solid fa-star none">`;
        }
    }
}

// INDIVIDUAL PRODUCT PAGE
function addProduct(products) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let cod = urlParams.get('cod');

    const mainEl = document.getElementById("main");

    // ADD OVERALL LAYOUT
    mainEl.innerHTML = `<section class="section-product section-product--${cod}">
                            <div class="section-product__left">
                                <div class="section-product__image-container section-product__image-container--${cod} mb-sm">
                                </div>
                            </div>

                            <div class="section-product__right">
                                <h2 class="heading-2">${products[cod].Cta}</h2>
                                <p class="paragraph mb-lg">${products[cod].Weight}</p>
                                <span class="span__small mb-md">${products[cod].Small_text}</span>
                                <a href="product.html?cod=${cod}" onclick="alert('You cannot add this item to cart!')" class="btn-product btn-product--center btn-product--${Number(cod)+1}">Add to cart</a>
                            </div>

                            <div class="section-product__info">
                                <div class="section-product__info-header section-product__info-header--${cod}">
                                    <p class="section-product__info-header-item section-product__info-header-item--${cod} section-product__info-header-item--thick" id="description">Description</p>
                                    <p class="section-product__info-header-item section-product__info-header-item--${(Number(cod)+1 == 3 ? 0 : Number(cod)+1)}" id="reviews">Reviews</p>
                                </div>

                                <div class="section-product__info-body">
                                    <div class="section-product__description">
                                        ${products[cod].Description}
                                    </div>

                                    <div class="section-product__reviews">
                                        <div class="section-product__reviews-stars section-product__reviews-stars--${cod}"></div>

                                        <div class="section-product__reviews-messages"></div>
                                    </div>
                                </div>
                            </div>
                        </section>`;

    // ADD PERCENTAGE
    const reviewsStarsEl = document.querySelector(".section-product__reviews-stars");
    let sum = 0;
    let stars = [0, 0, 0, 0, 0];
    const reviewLength = products[cod].Reviews.length;

    for (const review of products[cod].Reviews) {
        sum += review.Stars;

        if (review.Stars == 5) {
            stars[0] += 1;
        }
        else if (review.Stars == 4) {
            stars[1] += 1;
        }
        else if (review.Stars == 3) {
            stars[2] += 1;
        }
        else if (review.Stars == 2) {
            stars[3] += 1;
        }
        else if (review.Stars == 1) {
            stars[4] += 1;
        }
    }

    let average = sum / reviewLength;
    reviewsStarsEl.innerHTML += `<h2 class="heading-2">${average.toFixed(1)} / 5.0</h2>
                                <div class="stars-container">
                                </div>
                                <span class="section-product__reviews-number mb-sm">(${reviewLength})</span>
                                <div class="section-product__reviews-percentage">
                                </div>`;

    addStars(Math.round(average));

    const percentageEl = document.querySelector(".section-product__reviews-percentage");

    percentageEl.innerHTML += `<span class="section-product__reviews-number">5 Stars</span>
                                <div class="section-product__reviews-percentage-bar section-product__reviews-percentage-bar--${cod}">
                                    <div class="section-product__reviews-percentage-pointer section-product__reviews-percentage-pointer--${cod}" style="width: ${((stars[0] * 100)/ reviewLength)}%;"></div>
                                </div>
                                <span class="section-product__reviews-number">${((stars[0] * 100)/ reviewLength).toFixed(0)}%</span>

                                <span class="section-product__reviews-number">4 Stars</span>
                                <div class="section-product__reviews-percentage-bar section-product__reviews-percentage-bar--${cod}">
                                    <div class="section-product__reviews-percentage-pointer section-product__reviews-percentage-pointer--${cod}" style="width: ${((stars[1] * 100)/ reviewLength)}%;"></div>
                                </div>
                                <span class="section-product__reviews-number">${((stars[1] * 100)/ reviewLength).toFixed(0)}%</span>

                                <span class="section-product__reviews-number">3 Stars</span>
                                <div class="section-product__reviews-percentage-bar section-product__reviews-percentage-bar--${cod}">
                                    <div class="section-product__reviews-percentage-pointer section-product__reviews-percentage-pointer--${cod}" style="width: ${((stars[2] * 100)/ reviewLength)}%;"></div>
                                </div>
                                <span class="section-product__reviews-number">${((stars[2] * 100)/ reviewLength).toFixed(0)}%</span>

                                <span class="section-product__reviews-number">2 Stars</span>
                                <div class="section-product__reviews-percentage-bar section-product__reviews-percentage-bar--${cod}">
                                    <div class="section-product__reviews-percentage-pointer section-product__reviews-percentage-pointer--${cod}" style="width: ${((stars[3] * 100)/ reviewLength)}%;"></div>
                                </div>
                                <span class="section-product__reviews-number">${((stars[3] * 100)/ reviewLength).toFixed(0)}%</span>

                                <span class="section-product__reviews-number">1 Stars</span>
                                <div class="section-product__reviews-percentage-bar section-product__reviews-percentage-bar--${cod}">
                                    <div class="section-product__reviews-percentage-pointer section-product__reviews-percentage-pointer--${cod}" style="width: ${((stars[4] * 100)/ reviewLength)}%;"></div>
                                </div>
                                <span class="section-product__reviews-number">${((stars[4] * 100)/ reviewLength).toFixed(0)}%</span>`;


    // ADD MESSAGES
    const messagesEl = document.querySelector(".section-product__reviews-messages");

    for (const review of products[cod].Reviews) {
        messagesEl.innerHTML += `<div class="section-product__reviews-message">
                                    <p class="section-product__reviews-title">${review.Title}</p>
                                    <span class="section-product__reviews-username">${review.Author}</span>
                                    <div class="stars-container"></div>
                                    <span class="span__small">${review.Message}</span>
                                </div>`

        addStars(review.Stars);
    }

    // ADD NUTRITION FACTS TABLE
    mainEl.innerHTML += `<section class="section-nutrition">
                            <div class="nutrition-facts">
                                <div class="nutrition-facts__header">
                                    <p class="paragraph--big">Nutrition facts</p>
                                </div>

                                <div class="nutrition-facts__body">
                                    <div class="nutrition-facts__item">
                                        <p class="nutrition-facts__item--big">Serving: 200ml</p>
                                    </div>

                                    <div class="nutrition-facts__item nutrition-facts__item--2">
                                        <p class="nutrition-facts__item--big">Amount Per Serving</p>
                                        <p class="nutrition-facts__item--small">% Daily Value</p>
                                    </div>

                                    <div class="nutrition-facts__item nutrition-facts__item--3">
                                        <p class="nutrition-facts__item--big">Energy</p>
                                        <p>85 kcal</p>
                                        <p class="nutrition-facts__item--big">4</p>
                                    </div>

                                    <div class="nutrition-facts__item nutrition-facts__item--3">
                                        <p class="nutrition-facts__item--big">Total Fat</p>
                                        <p>0 g</p>
                                        <p class="nutrition-facts__item--big">0</p>
                                    </div>

                                    <div class="nutrition-facts__item nutrition-facts__item--3">
                                        <p class="nutrition-facts__item--big">Carbohydrate, of which:</p>
                                        <p>35 g</p>
                                        <p class="nutrition-facts__item--big">5</p>
                                    </div>

                                    <div class="nutrition-facts__item nutrition-facts__item--3">
                                        <p class="nutrition-facts__item--big">Sugar</p>
                                        <p>35 g</p>
                                        <p class="nutrition-facts__item--big">-</p>
                                    </div>

                                    <div class="nutrition-facts__item nutrition-facts__item--3">
                                        <p class="nutrition-facts__item--big">Sodium</p>
                                        <p>11 mg</p>
                                        <p class="nutrition-facts__item--big">0</p>
                                    </div>

                                    <div class="nutrition-facts__item nutrition-facts__item--3">
                                        <p class="nutrition-facts__item--big">Protein</p>
                                        <p>0 g</p>
                                        <p class="nutrition-facts__item--big">0</p>
                                    </div>
                                </div>

                                <div class="nutrition-facts__footer">
                                    Not a significant source of saturated fat, <i>trans</i> fat, cholesterol, dietary fiber, vitamin D, calcium, iron and potassium.
                                </div>
                            </div>
                        </section>`;

    activateButtons();
}