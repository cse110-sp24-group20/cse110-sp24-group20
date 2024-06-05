// Selecting DOM elements
let addBtn = document.querySelector(".add_button");
let modal = document.getElementsByClassName("modal")[0];
let closeBtn = document.getElementsByClassName("close")[0];
let submitBtn = document.querySelector(".submit");
let todoList = document.querySelector(".todo-list");
let eventForm = document.getElementById("eventForm");

// Show modal on add button click
addBtn.addEventListener("click", () => {
    modal.style.display = "block";
    // set default color to transparent
    document.getElementById("color").value = "#ADD8E6";
    
    //set default date on the modal
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    document.getElementById("dateTime").value = formattedDateTime;
});

// Hide modal on close button click
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Function to format the date and time
function formatDateTime(dateTime) {
    let options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTime).toLocaleString('en-US', options);
}

// Function to create a new todo item
function createTodoItem(event) {
    event.preventDefault();

    // Get form values
    let eventName = document.getElementById("eventName").value;
    let description = document.getElementById("description").value;
    let color = document.getElementById("color").value;
    let dateTime = document.getElementById("dateTime").value;

    //Check if the input is valid
    if (eventName == "") {
        event.preventDefault();
        alert("Event Name cannot be empty!")
    }

    // Format the date and time
    // if dateTime is null, no error
    if (!dateTime) {
        dateTime = "";
    } else {
        var formattedDateTime = formatDateTime(dateTime);
    }

    // Create todo item
    let li = document.createElement("li");
    li.classList.add("todo-item");


    // Add delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove_button");
    deleteBtn.innerHTML = "delete";
    deleteBtn.addEventListener("click", () => {
        todoList.removeChild(li);
        saveTasks();
    });
    //li.appendChild(deleteBtn);


    let span = document.createElement("span");
    span.style.backgroundColor = color;
    span.textContent = eventName;
    span.classList.add("title");

    let titleContainer = document.createElement("div");
    titleContainer.appendChild(span);
    titleContainer.appendChild(deleteBtn);
    titleContainer.classList.add("title-container");
    

    let div = document.createElement("div");
    div.classList.add("task");

    let input = document.createElement("input");
    input.type = "text";
    input.value = description;
    input.classList.add("width");
    input.disabled = true;

    let dateTimeDiv = document.createElement("div");
    dateTimeDiv.classList.add("datetime");
    dateTimeDiv.textContent = formattedDateTime;

    let checkbox = document.createElement("button");
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

    // Save tasks to local storage
    saveTasks();

    // Hide modal and reset form
    modal.style.display = "none";
    eventForm.reset();
}

// Save tasks to local storage
function saveTasks() {
    let tasks = [];
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
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.classList.add("todo-item");
        if (task.checked) {
            li.classList.add("checked");
        }
        // Add delete button
        // let deleteBtn = document.createElement("button");
        // deleteBtn.classList.add("remove_button");
        // deleteBtn.innerHTML = "-";
        // deleteBtn.addEventListener("click", () => {
        //     todoList.removeChild(li);
        //     saveTasks();
        // });
        // li.appendChild(deleteBtn);
        // Add delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("remove_button");
        deleteBtn.innerHTML = "delete";
        deleteBtn.addEventListener("click", () => {
            todoList.removeChild(li);
            saveTasks();
        });

        let span = document.createElement("span");
        span.style.backgroundColor = task.color;
        span.textContent = task.eventName;
        span.classList.add("title");

        let titleContainer = document.createElement("div");
        titleContainer.appendChild(span);
        titleContainer.appendChild(deleteBtn);
        titleContainer.classList.add("title-container");

        let div = document.createElement("div");
        div.classList.add("task");

        let input = document.createElement("input");
        input.type = "text";
        input.value = task.description;
        input.classList.add("width");
        input.disabled = true;

        let dateTimeDiv = document.createElement("div");
        dateTimeDiv.classList.add("datetime");
        dateTimeDiv.textContent = task.dateTime;

        let checkbox = document.createElement("button");
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