// Selecting DOM elements
var addBtn = document.querySelector(".add_button");
var modal = document.getElementsByClassName("modal")[0];
var closeBtn = document.getElementsByClassName("close")[0];
var submitBtn = document.querySelector(".submit");
var todoList = document.querySelector(".todo-list");
var eventForm = document.getElementById("eventForm");

// Show modal on add button click
addBtn.addEventListener("click", () => {
    modal.style.display = "block";
    // set default color to transparent
    document.getElementById("color").value = "#ffffff";
});

// Hide modal on close button click
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Function to format the date and time
function formatDateTime(dateTime) {
    var options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTime).toLocaleString('en-US', options);
}

// Function to create a new todo item
function createTodoItem(event) {
    event.preventDefault();

    // Get form values
    var eventName = document.getElementById("eventName").value;
    var description = document.getElementById("description").value;
    var color = document.getElementById("color").value;
    var dateTime = document.getElementById("dateTime").value;

    // Format the date and time
    //     if dateTime is null, no error
    if (!dateTime) {
        dateTime = "";
    } else {
        var formattedDateTime = formatDateTime(dateTime);
    }

    // Create todo item
    var li = document.createElement("li");
    li.classList.add("todo-item");


    // Add delete button
    var deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove_button");
    deleteBtn.innerHTML = "-";
    deleteBtn.addEventListener("click", () => {
        todoList.removeChild(li);
        saveTasks();
    });
    li.appendChild(deleteBtn);


    var span = document.createElement("span");
    span.style.backgroundColor = color;
    span.textContent = eventName;

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
    li.appendChild(span);
    li.appendChild(div);

    // Add event listener to the checkbox
    checkbox.addEventListener("click", () => {
        li.classList.toggle("checked");
        saveTasks();
    });



    // Append todo item to the list
    todoList.appendChild(li);

    // Save tasks to local storage
    saveTasks();

    // Hide modal and reset form
    modal.style.display = "none";
    eventForm.reset();
}

// Save tasks to local storage
function saveTasks() {
    var tasks = [];
    document.querySelectorAll(".todo-item").forEach(item => {
        tasks.push({
            eventName: item.querySelector("span").textContent,
            description: item.querySelector("input").value,
            color: item.querySelector("span").style.backgroundColor,
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
        deleteBtn.innerHTML = "-";
        deleteBtn.addEventListener("click", () => {
            todoList.removeChild(li);
            saveTasks();
        });
        li.appendChild(deleteBtn);

        var span = document.createElement("span");
        span.style.backgroundColor = task.color;
        span.textContent = task.eventName;

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
        li.appendChild(span);
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
