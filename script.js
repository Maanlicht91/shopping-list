const form = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

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

//0 Add Item
form.addEventListener("submit", addItem);
