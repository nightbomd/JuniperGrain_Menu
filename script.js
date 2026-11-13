// =============================================================
// 2.04 Juniper & Grain Menu
// Paste your /exec web address from the Setup Guide below.
// Write the rest of the JavaScript yourself.
// =============================================================

const API = "https://script.google.com/macros/s/AKfycbzBUy4Rehh4pBWYO92zxzok6DbTiL9MKXXpIba0kZltyjj8t-hwAodB5qgPJe61N5KeEQ/exec";

const statusMessage = document.getElementById("status");
const menuContainer = document.getElementById("menu");
const filterContainer = document.getElementById("filters");

let allItems = [];
let filterButtons = [];

// 1. async function loadMenu()
//    fetch the API, check response.ok, return the JSON.
async function loadMenu() {
    const res = await fetch(API);

    if (!res.ok) {
        throw new Error("Failed to load menu");
    }

    const items = await res.json();
    console.log(items);

    return items;

}

/*
async function getCategories() {
    const categories = [...new Set(allItems.map(i => i.category))]
    console.log(categories)
    return categories;
}*/

// 2. async function startMenu()
//    Show a loading message. In try: load the menu, build the
//    buttons, show every item. In catch: show a friendly error.

async function startMenu() {
  statusMessage.innerHTML = `
    <div class="d-flex justify-content-center align-items-center p-5">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
`;
    try {
        const items = await loadMenu();
        allItems = items;

        filterButtons = ["All", ...getCategorys()];
        buildFilters();

        statusMessage.innerHTML = "";
        showMenu(allItems);

    } catch (error) {
        console.error(error);
        statusMessage.innerHTML = "Failed to load menu.";
    }
}
// 3. function showMenu(items)
//    One heading per category, then a card for each item:
//    photo, name, description, price, popular badge, tags, sold out.
const getCategorys = () => {
    const categories = [];

    allItems.forEach(item => {
        if (!categories.includes(item.category)) {
            categories.push(item.category);
        }

    })
    return categories;
}

function showMenu(items) {

    const menu = [...new Set(items.map(i => i.category))].map(category => {

        const categoryItems = items.filter(i => i.category === category);

        return `
            <h2 class="mt-4 header">${category}</h2>
           <hr style="width: min(100%, ${categoryItems.length * 18 + (categoryItems.length - 1) * 1}rem);">
            <div class="d-flex flex-wrap gap-3 mb-4">
                ${categoryItems.map(i => `
                    <div class="card shadow ${i.soldOut ? 'sold-out' : ''}" style="width: 18rem;">
                        <img src="${i.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <span class="badge espresso">${i.category}</span>
                            <span class="badge bg-success-subtle text-dark">${i.tags.join(", ")}</span>
                            <h5 class="fs-5 card-title">${i.name} ${i.popular ? `<span class="badge bg-danger">Popular</span>` : ""}</h5>
                            <p class="card-text">${i.description}</p>
                            <p class="text-success fw-bold">$${i.price.toFixed(2)}</p>
                            <button class="btn btn-primary" ${i.soldOut ? 'disabled' : ''}>
                                ${i.soldOut ? 'Sold Out' : 'Go Somewhere'}
                            </button>
                        </div>
                    </div>
                `).join("")}
            </div>
        `;
    }).join("");

    menuContainer.innerHTML = `
        <div class="container p-3">
            ${menu}
        </div>
    `;
}



const buildFilters = () => {
    const container = document.createElement("div");

    container.classList.add(
        "container",
        "d-flex",
        "flex-wrap",
        "justify-content-center",
        "gap-3",
        "p-4"

    );

    const buttons = filterButtons.map(b => {
        return `
            <div class="col-auto">
                <button class="btn btn-primary p-2 rounded-5 shadow filter-btn" value="${b}">
                    ${b}
                </button>
            </div>
        `;
    }).join("");

    container.innerHTML = buttons;
    filterContainer.innerHTML = "";
    filterContainer.appendChild(container);

    const btns = document.querySelectorAll(".filter-btn");

    btns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const chosenCategory = e.target.value;

            if (chosenCategory.toLowerCase() === "all") {
                showMenu(allItems);
                return;
            }

            const filteredCards = allItems.filter(
                item => item.category.toLowerCase() === chosenCategory.toLowerCase()
            );

            showMenu(filteredCards);
        });
    });
};



// 4. function buildFilters(items)
//    One "All" button, plus one button per category in the data.
//    A click shows only that category's items.

// 5. Call startMenu() when the page opens.
startMenu();
console.log(getCategorys());


