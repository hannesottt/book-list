var elements = document.getElementsByClassName("removeButton");
const taskList = document.getElementById("taskList");
const removeButtonInner = '<span class="cursorPointer">✖</span>';

var items = JSON.parse('{"taskName": "uwu","id": 1}{"taskName": "owo","id": 2}');
console.log(items);
var localStorage = window.localStorage;
var itemsLocal = localStorage.getItem("items");
if (!itemsLocal) {
    localStorage.setItem("items", items);
} else {
    loadLocalStorage();
}

function addRemoveOnClick(element) {
    //ugly
    /*assumes, that we're organized like this:
    <tbody>
        <tr>
            <td>
                <span> <-onclick is added here*/
    if (typeof element === "object" && element.nodeName === "SPAN") {
        element.onclick = function() {
            element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
            removeFromLocalStorage();
        };
    }
}

const submitButton = document.getElementById("submitItem");

submitButton.onclick = () => {
    console.log(document.getElementById("taskList").childNodes);
    let itemText = document.getElementById("listTextInput").value;
    if (itemText != "") {
        createListItem(itemText);
        document.getElementById("listTextInput").value = "";
        saveToLocalStorage(itemText);
    }
}

function createListItem(text) {
    //create remove button
    var removeButton = document.createElement("td");
    removeButton.classList.add("removeButton");
    var removeSpan = document.createElement("span");
    removeSpan.classList.add("cursorPointer");
    removeSpan.innerText = "✖";
    removeButton.appendChild(removeSpan);
    addRemoveOnClick(removeSpan);
    //create task item
    var item = document.createElement("td");
    item.classList.add("taskItem");
    item.innerText = text;
    //put them together in one row
    var row = document.createElement("tr");
    row.appendChild(item);
    row.appendChild(removeButton);
    //add to site
    taskList.appendChild(row);
    //empty text box
}

function saveToLocalStorage(text) {
    items.push(text);
    localStorage.setItem("items", items);
}

function loadLocalStorage() {
    /*items.forEach(item => {
        createListItem(item);
    });*/
    console.log(items.id)
}

function removeFromLocalStorage(index) {
    console.log(index);
}