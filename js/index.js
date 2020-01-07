var elements = document.getElementsByClassName("removeButton");
const bookList = document.getElementById("bookList");
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

var id, elementToRemove;

function addRemoveOnClick(element) {
    //ugly
    /*assumes, that we're organized like this:
    <tbody>
        <tr>
            <td>
                <span> <-onclick is added here*/
    if (typeof element === "object" && element.nodeName === "SPAN") {
        element.onclick = function() {
            var instance = M.Modal.getInstance(document.getElementById("modal1"));
            id = element.parentNode.parentNode.id.toString();
            elementToRemove = element;
            instance.open();
        };
    }
}

function removeElement() {
    items = items.filter(function( obj ) {
        return obj.id !== id;
    });
    elementToRemove.parentNode.parentNode.parentNode.removeChild(elementToRemove.parentNode.parentNode);
    saveItems();
}

const filterInput = document.getElementById("filterInput");
const submitButton = document.getElementById("submitItem");

submitButton.onclick = () => {
    let bookAuthor = document.getElementById("bookAuthorInput").value;
    let bookTitle = document.getElementById("bookTitleInput").value;
    if (bookAuthor != "" && bookTitle != "") {
        var listItem = {author:bookAuthor, title:bookTitle, id:uuidv4()};
        createListItem(listItem.title, listItem.id, listItem.author);
        items.push(listItem);
        saveItems();
        document.getElementById("bookAuthorInput").value = "";
        document.getElementById("bookTitleInput").value = "";
    }
}

filterInput.oninput = () => {
    filterList(filterInput.value);
}

function filterList(text) {
    if (text !== "") {
        var filteredList = items.filter(function( obj ) {
            if (!obj.title.toLowerCase().indexOf(text.toLowerCase())) {
                return obj.title;
            };
            if (!obj.author.toLowerCase().indexOf(text.toLowerCase())) {
                return obj.author;
            };
        });
        clearList();
        filteredList.forEach(element => {
            createListItem(element.title, element.id, element.author);
        });
    } else {
        resetList();
    }
}

function resetList() {
    clearList();
    items.forEach(element => {
        createListItem(element.title, element.id, element.author);
    });
}

function clearList() {
    const myNode = document.getElementById("bookList");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function createListItem(title, id, author) {
    //create remove button
    var removeButton = document.createElement("td");
    removeButton.classList.add("removeButton");
    var removeSpan = document.createElement("span");
    removeSpan.classList.add("cursorPointer");
    removeSpan.innerText = "✖";
    removeButton.appendChild(removeSpan);
    addRemoveOnClick(removeSpan);
    //create title item
    var titleItem = document.createElement("td");
    titleItem.classList.add("titleItem");
    titleItem.innerText = title;
    //create author item
    var authorItem = document.createElement("td");
    authorItem.classList.add("authorItem");
    authorItem.innerText = author;
    //put them together in one row
    var row = document.createElement("tr");
    row.appendChild(titleItem);
    row.appendChild(authorItem);
    row.appendChild(removeButton);
    row.id = id;
    //add to site
    bookList.appendChild(row);
    //empty text box
}

function onLoad() {
    var localContent = JSON.parse(localStorage.getItem("items"));
    if (localContent != null) {
        items = localContent;
    }
    console.log(items);
    items.forEach(element => {
        createListItem(element.title, element.id, element.author);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, null);
});

document.getElementById("deleteAll").addEventListener('click', () => {
    clearList();
    localStorage.setItem('items', "");
})