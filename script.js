const form = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");

//* Add Items
function addItem(e) {
  e.preventDefault();

  //! Check if input empty to alert
  const newItem = itemInput.value;
  if (newItem === "") alert("Please add an item");

  //! Create an item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  //! Add remove button to each item
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  //! Add item to list
  itemList.appendChild(li);

  //! Clear input after added item
  itemInput.value = "";
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
    e.target.parentElement.parentElement.remove();
  }
}

//! Clear All
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
}

//0 Add Item
form.addEventListener("submit", addItem);
//0 Remove item
itemList.addEventListener("click", removeItem);
//0 Clear All
clearBtn.addEventListener("click", clearItems);
