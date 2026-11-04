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

// 2. async function startMenu()
//    Show a loading message. In try: load the menu, build the
//    buttons, show every item. In catch: show a friendly error.

async function startMenu() {
    statusMessage.textContent = "ur shits loading";
    try {
        const items = await loadMenu();
        allItems = items;
        statusMessage.textContent = "";
        showMenu(allItems);
    }
    catch (error) {
        console.log(error);
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
    
    let badge = "";
    let soldText = "";
    let tagsHTML = "";
    let menuHTMl = ""

        const menu = items.map(i => `
        <div class="card  ${i.soldOut ? 'sold-out' : ''}"   style="width: 18rem;">
            <img src="${i.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${i.name} ${i.popular ? `<span class="badge bg-danger">Popular</span>` : ""}</h5>
                <p class="card-text">${i.description}</p>
                <p class="text-success fw-bold"> $${i.price.toFixed(2)}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    `).join("");

    menuContainer.innerHTML = `
        <div class="container d-flex flex-wrap justify-content-center gap-3">
            ${menu}
        </div>
    `;
}

const filterButtons = ["coffee", "breakfast", "bakery", "lunch", "all"];

const buildFilters = () => {
    const container = document.createElement("div");

    const buttons = filterButtons.map(b => {
        return `<button class="btn btn-success p-2 rounded-5 shadow" id="filter" value="${b}">${b}</button>`;
    }).join("");

    const nav = document.getElementById("filters");
    container.classList.add("container", "text-center", "d-flex", "gap-3", "justify-content-center")
    container.innerHTML = buttons;
    nav.appendChild(container);
};
buildFilters();
const btns = document.querySelectorAll("#filter");
btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const chosenCategory = e.target.value;
        const filteredCards = allItems.filter(item => item.category.toLowerCase() === chosenCategory.toLowerCase());
        if (chosenCategory === "all") {
            showMenu(allItems);
            return;
        }
        showMenu(filteredCards);
        console.log("gay");
    });
});


// 4. function buildFilters(items)
//    One "All" button, plus one button per category in the data.
//    A click shows only that category's items.

// 5. Call startMenu() when the page opens.
startMenu();
console.log(getCategorys());
