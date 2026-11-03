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
function showMenu(items) {
    const menu = items.map(i => `<div class="card" style="width: 18rem;">
  <img src="${i.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${i.name}</h5>
    <p class="card-text">${i.description}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`).join(" ");

    menuContainer.innerHTML = menu;
}
// 4. function buildFilters(items)
//    One "All" button, plus one button per category in the data.
//    A click shows only that category's items.

// 5. Call startMenu() when the page opens.
startMenu();