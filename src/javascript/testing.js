// Selecting DOM elements
var addBtn = document.querySelector(".add_button");
var modal = document.getElementsByClassName("modal")[0];
var closeBtn = document.getElementsByClassName("close")[0];
var submitBtn = document.querySelector(".submit");
var todoList = document.querySelector(".todo-list");
var eventForm = document.getElementById("eventForm");

// Variable to track if we are editing an existing item
var editingItem = null;

/**
 * Show modal on add button click
 * This event listener is triggered when the add button is clicked.
 * It displays the modal and resets the form for a new entry.
 */
addBtn.addEventListener("click", () => {
    modal.style.display = "block";
    eventForm.reset(); // Reset the form
    document.getElementById("color").value = "#ffffff"; // Set default color to white
    editingItem = null; // Reset the editing item
});

/**
 * Hide modal on close button click
 * This event listener is triggered when the close button on the modal is clicked.
 * It hides the modal and resets the editing item.
 */
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    editingItem = null; // Reset the editing item
});

/**
 * Format the date and time for display
 * Converts the date and time string to a more readable format.
 * @param {string} dateTime - The date and time string to format
 * @returns {string} - The formatted date and time string
 */
function formatDateTimeForDisplay(dateTime) {
    var options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTime).toLocaleString('en-US', options);
}

/**
 * Format the date and time for input
 * Converts the date and time string to a format suitable for input fields.
 * @param {string} dateTime - The date and time string to format
 * @returns {string} - The formatted date and time string in input format
 */
function formatDateTimeForInput(dateTime) {
    var date = new Date(dateTime);
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Create or update a todo item
 * Handles the creation of a new todo item or updating an existing item.
 * @param {Event} event - The event object
 */
function createTodoItem(event) {
    event.preventDefault();

    // Get form values
    var eventName = document.getElementById("eventName").value;
    var description = document.getElementById("description").value;
    var color = document.getElementById("color").value;
    var dateTime = document.getElementById("dateTime").value;

    // Format the date and time
    var formattedDateTime = dateTime ? formatDateTimeForDisplay(dateTime) : "";

    if (editingItem) {
        // Update the existing item
        editingItem.querySelector("span.title").textContent = eventName;
        editingItem.querySelector("span.title").style.backgroundColor = color;
        editingItem.querySelector("input.width").value = description;
        editingItem.querySelector(".datetime").textContent = formattedDateTime;
        editingItem.setAttribute("data-datetime", dateTime);
        editingItem = null; // Reset editing item
    } else {
        // Create a new todo item
        var li = document.createElement("li");
        li.classList.add("todo-item");
        li.setAttribute("data-datetime", dateTime);

        // Add delete button
        var deleteBtn = document.createElement("button");
        deleteBtn.classList.add("remove_button");
        deleteBtn.innerHTML = "delete";
        deleteBtn.addEventListener("click", () => {
            todoList.removeChild(li);
            saveTasks();
        });

        // Add edit button
        var editBtn = document.createElement("button");
        editBtn.classList.add("edit_button");
        editBtn.innerHTML = "edit";
        editBtn.addEventListener("click", () => {
            editTodoItem(li);
        });

        var span = document.createElement("span");
        span.style.backgroundColor = color;
        span.textContent = eventName;
        span.classList.add("title");

        var titleContainer = document.createElement("div");
        titleContainer.appendChild(span);
        titleContainer.appendChild(editBtn);
        titleContainer.appendChild(deleteBtn);
        titleContainer.classList.add("title-container");

        var div = document.createElement("div");
        div.classList.add("task");

        var input = document.createElement("input");
        input.type = "text";
        input.value = description;
        input.classList.add("width");
        input.disabled = true;

        var dateTimeDiv = document.createElement("div");
        dateTimeDiv.classList.add("datetime");
        dateTimeDiv.textContent = formattedDateTime;

        var checkbox = document.createElement("button");
        checkbox.classList.add("checkbox");
        checkbox.innerHTML = "✔";

        // Append elements to the task div
        div.appendChild(input);
        div.appendChild(dateTimeDiv);
        div.appendChild(checkbox);

        // Append elements to the todo item
        li.appendChild(titleContainer);
        li.appendChild(div);

        // Add event listener to the checkbox
        checkbox.addEventListener("click", () => {
            li.classList.toggle("checked");
            saveTasks();
        });

        // Append todo item to the list
        todoList.appendChild(li);
    }

    // Save tasks to local storage
    saveTasks();

    // Sort tasks by date and time
    sortTasks();

    // Hide modal and reset form
    modal.style.display = "none";
    eventForm.reset();
}

/**
 * Edit a todo item
 * Populates the modal with the current values of the selected todo item for editing.
 * @param {HTMLLIElement} li - The list item element to edit
 */
function editTodoItem(li) {
    // Get current values
    var eventName = li.querySelector("span.title").textContent;
    var description = li.querySelector("input.width").value;
    var color = li.querySelector("span.title").style.backgroundColor;
    var dateTime = li.querySelector(".datetime").textContent;
    var formattedDateTime = dateTime ? formatDateTimeForInput(dateTime) : "";

    // Populate modal with current values
    document.getElementById("eventName").value = eventName;
    document.getElementById("description").value = description;
    document.getElementById("color").value = rgbToHex(color);
    document.getElementById("dateTime").value = formattedDateTime;

    // Show modal
    modal.style.display = "block";

    // Set editing item
    editingItem = li;
}

/**
 * Helper function to convert rgb color to hex
 * Converts an RGB color value to a hex color string.
 * @param {string} rgb - The rgb color string
 * @returns {string} - The hex color string
 */
function rgbToHex(rgb) {
    var result = rgb.match(/\d+/g);
    return "#" + ((1 << 24) + (parseInt(result[0]) << 16) + (parseInt(result[1]) << 8) + parseInt(result[2])).toString(16).slice(1).toUpperCase();
}

/**
 * Save tasks to local storage
 * Stores the current list of tasks in local storage.
 */
function saveTasks() {
    var tasks = [];
    document.querySelectorAll(".todo-item").forEach(item => {
        tasks.push({
            eventName: item.querySelector("span.title").textContent,
            description: item.querySelector("input.width").value,
            color: item.querySelector("span.title").style.backgroundColor,
            dateTime: item.querySelector(".datetime").textContent,
            dataDateTime: item.getAttribute("data-datetime"),
            checked: item.classList.contains("checked")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * Load tasks from local storage
 * Retrieves the list of tasks from local storage and populates the todo list.
 */
function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        var li = document.createElement("li");
        li.classList.add("todo-item");
        if (task.checked) {
            li.classList.add("checked");
        }
        li.setAttribute("data-datetime", task.dataDateTime);

        // Add delete button
        var deleteBtn = document.createElement("button");
        deleteBtn.classList.add("remove_button");
        deleteBtn.innerHTML = "delete";
        deleteBtn.addEventListener("click", () => {
            todoList.removeChild(li);
            saveTasks();
        });

        // Add edit button
        var editBtn = document.createElement("button");
        editBtn.classList.add("edit_button");
        editBtn.innerHTML = "edit";
        editBtn.addEventListener("click", () => {
            editTodoItem(li);
        });

        var span = document.createElement("span");
        span.style.backgroundColor = task.color;
        span.textContent = task.eventName;
        span.classList.add("title");

        var titleContainer = document.createElement("div");
        titleContainer.appendChild(span);
        titleContainer.appendChild(editBtn);
        titleContainer.appendChild(deleteBtn);
        titleContainer.classList.add("title-container");

        var div = document.createElement("div");
        div.classList.add("task");

        var input = document.createElement("input");
        input.type = "text";
        input.value = task.description;
        input.classList.add("width");
        input.disabled = true;

        var dateTimeDiv = document.createElement("div");
        dateTimeDiv.classList.add("datetime");
        dateTimeDiv.textContent = task.dateTime;

        var checkbox = document.createElement("button");
        checkbox.classList.add("checkbox");
        checkbox.innerHTML = "✔";

        // Append elements to the task div
        div.appendChild(input);
        div.appendChild(dateTimeDiv);
        div.appendChild(checkbox);

        // Append elements to the todo item
        li.appendChild(titleContainer);
        li.appendChild(div);

        // Add event listener to the checkbox
        checkbox.addEventListener("click", () => {
            li.classList.toggle("checked");
            saveTasks();
        });

        // Append todo item to the list
        todoList.appendChild(li);
    });

    // Sort tasks by date and time
    sortTasks();
}

/**
 * Sort tasks by date and time
 * Sorts the tasks in the todo list by their date and time in ascending order.
 */
function sortTasks() {
    var items = Array.from(todoList.children);
    items.sort((a, b) => new Date(a.getAttribute("data-datetime")) - new Date(b.getAttribute("data-datetime")));
    items.forEach(item => todoList.appendChild(item));
}

// Add event listener to the submit button
submitBtn.addEventListener("click", createTodoItem);

// Load tasks when the page loads
window.addEventListener("load", loadTasks);