var elements = document.getElementsByClassName("removeButton");
const taskList = document.getElementById("taskList");
const removeButtonInner = '<span class="cursorPointer">✖</span>';

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

var items = new Array();

function saveItems() {
    localStorage.setItem("items", JSON.stringify(items));
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
            items = items.filter(function( obj ) {
                return obj.id !== element.parentNode.parentNode.id.toString();
            });
            element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
            saveItems();
        };
    }
}

const submitButton = document.getElementById("submitItem");

submitButton.onclick = () => {
    let itemText = document.getElementById("listTextInput").value;
    if (itemText != "") {
        var listItem = {text:itemText, id:uuidv4()};
        createListItem(itemText, listItem.id);
        items.push(listItem);
        saveItems();
        document.getElementById("listTextInput").value = "";
    }
}

function createListItem(text, id) {
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
    row.id = id;
    //add to site
    taskList.appendChild(row);
    //empty text box
}

function onLoad() {
    var localContent = JSON.parse(localStorage.getItem("items"));
    if (localContent != null) {
        items = localContent;
    }
    console.log(items);
    items.forEach(element => {
        createListItem(element.text, element.id);
    });
}