var elements = document.getElementsByClassName("removeButton");
const taskList = document.getElementById("taskList");
const removeButtonInner = '<span class="cursorPointer">✖</span>';

for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    addRemoveOnClick(element);
}

function addRemoveOnClick(element) {
    element.onclick = function() {
        element.parentNode.parentNode.removeChild(element.parentNode);
    };
}

const submitButton = document.getElementById("submitItem");

submitButton.onclick = () => {
    let item = document.getElementById("listTextInput").value;
    if (item != "") {
        //create remove button
        var removeButton = document.createElement("td");
        removeButton.classList.add("removeButton");
        removeButton.innerHTML = removeButtonInner;
        addRemoveOnClick(removeButton);

        //create task item
        var task = document.createElement("td");
        task.innerText = item;

        //put them together in one row
        var row = document.createElement("tr");
        row.appendChild(task);
        row.appendChild(removeButton);

        //add to site
        taskList.appendChild(row);
    }
    
}

