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

// INDIVIDUAL PRODUCT PAGE
function addProduct(products) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let cod = urlParams.get('cod');

    const mainEl = document.getElementById("main");

    mainEl.innerHTML = `<div class="section-product section-product--${cod}">
                            <div class="section-product__left">
                                <div class="section-product__image-container section-product__image-container--${cod} mb-sm">
                                </div>
                            </div>

                            <div class="section-product__right">
                                <h2 class="heading-2">${products[cod].Cta}</h2>
                                <p class="paragraph mb-lg">${products[cod].Weight}</p>
                                <span class="span__small mb-md">${products[cod].Small_text}</span>
                                <a class="btn-product btn-product--center btn-product--${Number(cod)+1}">Purchase</a>
                            </div>

                            <div class="section-product__info">
                                <div class="section-product__info-header">
                                    <p class="section-product__info-header-item section-product__info-header-item--1 section-product__info-header-item--thick">Description</p>
                                    <p class="section-product__info-header-item section-product__info-header-item--2">Reviews</p>
                                </div>

                                <div class="section-product__info-body">
                                    <div class="section-product__description">
                                        ${products[cod].Description}
                                    </div>

                                    <div class="section-product__reviews"></div>
                                </div>
                            </div>
                        </div>`;
    
    activateButtons();
}