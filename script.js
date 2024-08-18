const form = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filter = document.getElementById("filter");

//* Display Items ---------------------------------------------------------------------------
function displayItems() {
  const itemsFromStorage = getItemFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));

  checkUI();
}
//* Add Items----------------------------------------------------------------------------------
function onAddItemSubmit(e) {
  e.preventDefault();

  //! Check if input empty to alert
  const newItem = itemInput.value;
  if (newItem === "") alert("Please add an item");

  //! Add item to DOM
  addItemToDOM(newItem);

  //! Add item to localStorage
  addItemToStorage(newItem);

  //! Clear input after added item
  itemInput.value = "";

  //! Reset UI
  checkUI();
}

//* Add Item To DOM
function addItemToDOM(item) {
  //! Create an item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  //! Add remove button to each item
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  //! Add item to list
  itemList.appendChild(li);
}

//* Add Item to Local Storage
function addItemToStorage(item) {
  const itemsFromStorage = getItemFromStorage();
  itemsFromStorage.push(item);

  //! Convert JSON string and set to localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

//* Get Item from Storage
function getItemFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

//* Create Button and Icon
function createButton(classes) {
  //! Create a button
  const button = document.createElement("button");
  button.className = classes;

  //! Add icon to button
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);

  return button;
}

function createIcon(classes) {
  //! Create an icon
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

//* Remove item and Clear all items------------------------------------------------------------------------

//! Remove item
function onClickItem(e) {
  if (e.target.classList.contains("fa-xmark")) {
    removeItem(e.target.parentElement.parentElement);
  }
}

//! Remove item from DOM
function removeItem(item) {
  if (confirm("Are you sure to remove?")) {
    //-- Remove from DOM
    item.remove();

    //-- Remove from storage
    removeItemFromStorage(item.textContent);
  }

  //! Reset UI
  checkUI();
}

//! Remove item from Local Storage
function removeItemFromStorage(item) {
  let itemsFromStorage = getItemFromStorage();

  //-- Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  //-- Re-set to localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

//! Clear All
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  //! Clear All from Storage
  localStorage.removeItem("items");

  //! Reset UI
  checkUI();
}

//* ResetUI or checkUI - remove filter and clear button when none item----------------------------------------

function checkUI() {
  const hasItem = itemList.children.length;
  // const hasItem = itemList.firstElementChild;
  filter.style.display = hasItem ? "block" : "none";
  clearBtn.style.display = hasItem ? "block" : "none";
}

//* Filter Items----------------------------------------------------------------------------------------------
function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll("li");

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase().trim();
    item.style.display = itemName.includes(text) ? "flex" : "none";
    //item.style.display = itemName.startsWith(text) ? "flex" : "none";
  });
}

function init() {
  //! Add Event Listeners
  //0 Add Item
  form.addEventListener("submit", onAddItemSubmit);
  //0 Remove item
  itemList.addEventListener("click", onClickItem);
  //0 Clear All
  clearBtn.addEventListener("click", clearItems);
  //0 Filter Items
  filter.addEventListener("input", filterItems);
  //0 Reset UI
  checkUI();
  //0 Display items
  document.addEventListener("DOMContentLoaded", displayItems);
}

init();
