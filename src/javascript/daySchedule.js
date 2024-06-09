/**
    @module daySchedule
*/

// Selecting DOM elements
var addBtn = document.querySelector(".add_button"); // button to add tasks
var modal = document.getElementsByClassName("modal")[0]; //gets the modal display
var closeBtn = document.getElementsByClassName("close")[0]; //button to close the modal display
var submitBtn = document.querySelector(".submit"); //button to submit the form
var todoList = document.querySelector(".todo-list"); //gets the TODO list
var eventForm = document.getElementById("eventForm"); //gets the form

// Variable to track if we are editing an existing item
var editingItem = null;

/**
 * Show modal on add button click
 * This event listener is triggered when the add button is clicked.
 * It displays the modal and resets the form for a new entry.
 */
addBtn.addEventListener("click", () => { //event listener for the add button
    modal.style.display = "block"; //modal display as a block
    eventForm.reset(); // Reset the form
    document.getElementById("color").value = "#ADD8E6"; // sets default color
    editingItem = null; // reset the editing item

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

/**
 * Hide modal on close button click
 * This event listener is triggered when the close button on the modal is clicked.
 * It hides the modal and resets the editing item.
 */
closeBtn.addEventListener("click", () => { //listens for when the close button is clicked
    modal.style.display = "none"; //changes the display to none
    editingItem = null; //reset the editing item
});

/**
 * Format the date and time for display
 * Converts the date and time string to a more readable format.
 * @param {string} dateTime - The date and time string to format
 * @returns {string} - The formatted date and time string
 */
function formatDateTimeForDisplay(dateTime) {
    let options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }; //specifies the format
    return new Date(dateTime).toLocaleString('en-US', options); // converts the dateTime to a Date object and formats based on locale 'en-US'
}

/**
 * Format the date and time for input
 * Converts the date and time string to a format suitable for input fields.
 * @param {string} dateTime - The date and time string to format
 * @returns {string} - The formatted date and time string in input format
 */
function formatDateTimeForInput(dateTime) {
    var date = new Date(dateTime); //creates new Date object
    var year = date.getFullYear(); //gets the full current year
    var month = String(date.getMonth() + 1).padStart(2, '0'); // gets the current month
    var day = String(date.getDate()).padStart(2, '0'); // gets the current date
    var hours = String(date.getHours()).padStart(2, '0'); // gets the current time in hours
    var minutes = String(date.getMinutes()).padStart(2, '0'); // gets the current time in minutes
    return `${year}-${month}-${day}T${hours}:${minutes}`; // format for DateTime
}

/**
 * Function to create a delete button
 * @param {HTMLElement} li - list item element to append the delete button to
 * @returns {HTMLButtonElement} - created delete button
 */
function createDeleteButton(li) {
    let deleteBtn = document.createElement("button"); //creates button element
    deleteBtn.classList.add("delete_button"); //adds the "remove_button" class to the element
    deleteBtn.innerHTML = "delete"; //button will say "delete"
    deleteBtn.addEventListener("click", () => { //listens for if the button is clicked
        todoList.removeChild(li); // then remove the child
        saveTasks(); // save the tasks to update the local storage
    });
    return deleteBtn; // returns the created delete button
}

/**
 * Function to create a checkbox
 * @param {HTMLElement} li - list item element to append the checkbox to
 * @returns {HTMLButtonElement} - created checkbox button
 */
function createCheckbox(li) {
    let checkbox = document.createElement("button"); //creates button element
    checkbox.classList.add("checkbox"); //adds the "checkbox" class to the element
    checkbox.innerHTML = "✔"; //button will have the checkmark symbol
    checkbox.addEventListener("click", () => { //listens for if the button is clicked
        li.classList.toggle("checked"); // then toggles the "checked" class 
        saveTasks(); // save the tasks to update the local storage
    });
    return checkbox; // returns the created checkbox button
}

/**
 * Function to create a todo item
 * @param {string} eventName - name of the event
 * @param {string} description - description of the event
 * @param {string} color - color of the event
 * @param {string} dateTime - date and time of the event
 * @param {boolean} checked - whether the task is checked
 * @returns {HTMLElement} - the created todo item
 */
function createTodoElement(eventName, description, color, dateTime, checked = false) {
    let li = document.createElement("li"); //creates the list item
    li.classList.add("todo-item"); // adds the class "todo-item" to the list item
    li.setAttribute("date-datetime", dateTime);
    if (checked) { //checks if the task is checked
        li.classList.add("checked"); // then adds the class "checked" to the list item
    }

    let deleteBtn = createDeleteButton(li); //creates delete button for the item

    // Add edit button
    var editBtn = document.createElement("button"); //creates edit button
    editBtn.classList.add("edit_button"); // adds class "edit_button" to the element
    editBtn.innerHTML = "edit"; // sets text to be "edit"
    editBtn.addEventListener("click", () => { // if clicked
        editTodoItem(li); // edit the item
    });

    // creates Title as a span
    let span = document.createElement("span"); //creates new span element
    span.style.backgroundColor = color; //sets the background color of span 
    span.textContent = eventName; // sets text content to be the eventName
    span.classList.add("title"); // adds the class "title" to the span

    // creates a titleContainer for the title and delete button
    let titleContainer = document.createElement("div"); // creates a new div element
    titleContainer.appendChild(span); // Appends the span
    titleContainer.appendChild(editBtn); // Appends the edit button
    titleContainer.appendChild(deleteBtn); // Appends the delete button
    titleContainer.classList.add("title-container"); // Adds the class 'title-container' to the div element

    let div = document.createElement("div"); // Creates a new div element to contain the task details
    div.classList.add("task"); // Adds the class 'task' to the div element

    // creates input element for the description
    let input = document.createElement("input"); // Creates a new input element
    input.type = "text"; // Sets the input type to 'text'
    input.value = description; // Sets the input value to the description of the event
    input.classList.add("width"); // Adds the class 'width' to the input element
    input.disabled = true; // Disables the input element to make it read-only

    // creates div element for the date and time
    let dateTimeDiv = document.createElement("div"); // Creates a new div element
    dateTimeDiv.classList.add("datetime"); // Adds the class 'datetime' to the div
    dateTimeDiv.textContent = dateTime; // Sets the text content of the div element to the date and time

    let checkbox = createCheckbox(li); // Creates a checkbox for the list item

    div.appendChild(input); // Appends the input (description) to the task div
    div.appendChild(dateTimeDiv); // Appends the date and time div to the task div
    div.appendChild(checkbox); // Appends the checkbox to the task div

    li.appendChild(titleContainer); // Appends the title container to the list item
    li.appendChild(div); // Appends the task div to the list item

    return li; // Returns the created list item element
}

/**
 * Create or update a todo item
 * Handles the creation of a new todo item or updating an existing item.
 * @param {Event} event - The event object
 */
function createTodoItem(event) {
    event.preventDefault(); // prevents default behavior

    // Get form values
    let eventName = document.getElementById("eventName").value; // name of event
    let description = document.getElementById("description").value; // description of event
    let color = document.getElementById("color").value; // color of event
    let dateTime = document.getElementById("dateTime").value; // dateTime of event

    //Check if the input is valid
    if (eventName == "") {
        event.preventDefault();
        alert("Event Name cannot be empty!") //ensures that the eventName is required
        return; //Terminate the function execution
    }

    // makes dateTime optional
    var formattedDateTime = dateTime ? formatDateTimeForDisplay(dateTime) : "";

    if (editingItem) {
        // Update the existing item
        editingItem.querySelector("span.title").textContent = eventName; //updates the title
        editingItem.querySelector("span.title").style.backgroundColor = color; //updates the background color
        editingItem.querySelector("input.width").value = description; // updates the description
        editingItem.querySelector(".datetime").textContent = formattedDateTime; // updates the dateTime
        editingItem.setAttribute("data-datetime", dateTime); // sets data-datetime of the exisiting item
        editingItem = null; // Reset editing item
    } else {
        let todoItem = createTodoElement(eventName, description, color, dateTime); // creates a new todo element
        todoList.appendChild(todoItem); //append todo item to the list
    }
    // Save tasks to local storage
    saveTasks();

    sortTasks(); //sorts tasks

    // Hide modal and reset form
    modal.style.display = "none"; //hides modal
    eventForm.reset(); //resets form inputs
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
    var result = rgb.match(/\d+/g); //matches the numbers in the RGB string
    return "#" + ((1 << 24) + (parseInt(result[0]) << 16) + (parseInt(result[1]) << 8) + parseInt(result[2])).toString(16).slice(1).toUpperCase(); //converts to hex
}

/**
 * Save tasks to local storage
 * Stores the current list of tasks in local storage.
 */
function saveTasks() {
    let tasks = [];
    document.querySelectorAll(".todo-item").forEach(item => {
        tasks.push({ //retrieves all this data of each todo item
            eventName: item.querySelector("span.title").textContent,
            description: item.querySelector("input.width").value,
            color: item.querySelector("span.title").style.backgroundColor,
            dateTime: item.querySelector(".datetime").textContent,
            dataDateTime: item.getAttribute("data-datetime"),
            checked: item.classList.contains("checked") 
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks)); //saves tasks to localStorage
}

/**
 * Load tasks from local storage
 * Retrieves the list of tasks from local storage and populates the todo list.
 */
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // gets tasks from localStorage

    tasks.forEach(task => {
        let todoItem = createTodoElement(task.eventName, task.description, task.color, task.dateTime, task.checked); // creates TODO element
        todoList.appendChild(todoItem); //populates the todo list
    });
    sortTasks(); //sort tasks
}
/**
 * Sort tasks by date and time
 * Sorts the tasks in the todo list by their date and time in ascending order.
 */
function sortTasks() {
    var items = Array.from(todoList.children); // creates an array of the items in the todo list
    items.sort((a, b) => new Date(a.getAttribute("data-datetime")) - new Date(b.getAttribute("data-datetime"))); // sorts based on time
    items.forEach(item => todoList.appendChild(item)); //append based on new order
}

// Add event listener to the submit button
submitBtn.addEventListener("click", createTodoItem);

// Load tasks when the page loads
window.addEventListener("load", loadTasks);