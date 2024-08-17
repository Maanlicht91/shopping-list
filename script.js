const form = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filter = document.getElementById("filter");

//* Add Items
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
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  itemsFromStorage.push(item);

  //! Convert JSON string and set to localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
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

//* Remove item and Clear all items

//! Remove item
function removeItem(e) {
  if (e.target.classList.contains("fa-xmark")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }

    //! Reset UI
    checkUI();
  }
}

//! Clear All
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  //! Reset UI
  checkUI();
}

//* ResetUI or checkUI - remove filter and clear button when none item

function checkUI() {
  const hasItem = itemList.children.length;
  // const hasItem = itemList.firstElementChild;
  filter.style.display = hasItem ? "block" : "none";
  clearBtn.style.display = hasItem ? "block" : "none";
}

//* Filter Items
function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll("li");

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase().trim();
    item.style.display = itemName.includes(text) ? "flex" : "none";
    //item.style.display = itemName.startsWith(text) ? "flex" : "none";
  });
}

//0 Add Item
form.addEventListener("submit", onAddItemSubmit);
//0 Remove item
itemList.addEventListener("click", removeItem);
//0 Clear All
clearBtn.addEventListener("click", clearItems);
//0 Filter Items
filter.addEventListener("input", filterItems);
//0 Reset UI
checkUI();
