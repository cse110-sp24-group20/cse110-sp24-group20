// Selecting DOM elements
var addBtn = document.querySelector(".add_button");
var modal = document.getElementsByClassName("modal")[0];
var closeBtn = document.getElementsByClassName("close")[0];
var submitBtn = document.querySelector(".submit");
var todoList = document.querySelector(".todo-list");
var eventForm = document.getElementById("eventForm");

// Variable to track if we are editing an existing item
var editingItem = null;

// Show modal on add button click
addBtn.addEventListener("click", () => {
    modal.style.display = "block";
    eventForm.reset(); // Reset the form
    document.getElementById("color").value = "#ffffff"; // Set default color to white
    editingItem = null; // Reset the editing item
});

// Hide modal on close button click
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    editingItem = null; // Reset the editing item
});

// Function to format the date and time for display
function formatDateTimeForDisplay(dateTime) {
    var options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTime).toLocaleString('en-US', options);
}

// Function to format the date and time for input
function formatDateTimeForInput(dateTime) {
    var date = new Date(dateTime);
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// Function to create or update a todo item
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
        editingItem = null; // Reset editing item
    } else {
        // Create a new todo item
        var li = document.createElement("li");
        li.classList.add("todo-item");

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

    // Hide modal and reset form
    modal.style.display = "none";
    eventForm.reset();
}

// Function to edit a todo item
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

// Helper function to convert rgb color to hex
function rgbToHex(rgb) {
    var result = rgb.match(/\d+/g);
    return "#" + ((1 << 24) + (parseInt(result[0]) << 16) + (parseInt(result[1]) << 8) + parseInt(result[2])).toString(16).slice(1).toUpperCase();
}

// Save tasks to local storage
function saveTasks() {
    var tasks = [];
    document.querySelectorAll(".todo-item").forEach(item => {
        tasks.push({
            eventName: item.querySelector("span.title").textContent,
            description: item.querySelector("input.width").value,
            color: item.querySelector("span.title").style.backgroundColor,
            dateTime: item.querySelector(".datetime").textContent,
            checked: item.classList.contains("checked")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        var li = document.createElement("li");
        li.classList.add("todo-item");
        if (task.checked) {
            li.classList.add("checked");
        }

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
}

// Add event listener to the submit button
submitBtn.addEventListener("click", createTodoItem);

// Load tasks when the page loads
window.addEventListener("load", loadTasks);
