document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add_button'); // Button to add new projects
    const projectsContainer = document.querySelector('.projects'); // Container for all project elements
    const projectCountElement = document.getElementById('project-count'); // Element to display the project count
    
    // Modal elements
    const modal = document.getElementsByClassName("modal")[0];
    const closeButton = document.getElementsByClassName("close")[0];
    const submitButton = document.querySelector(".submit");
    const eventForm = document.getElementById("eventForm");

    addButton.addEventListener('click', () => { // Event listener for the add button
        modal.style.display = "block"; //modal display as a block
        eventForm.reset(); // Reset the form
    }); 

    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    })
    /**
     * Prompts the user for a project name and adds the project.
     */
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        const projectName = document.getElementById("eventName").value;
        const deadline = document.getElementById("dateTime").value;
        if (projectName) {
            createProjectElement(projectName); // Create a new project element with the given name
            updateProjectCount(1); // Increment the project count
            saveProject(projectName); // Save the project name to local storage
            modal.style.display = "none";
            eventForm.reset();
        }
    });
  
    /**
     * Creates a new project element with the specified name and adds it to the DOM.
     * @param {string} name - The name of the project.
     */
    function createProjectElement(name) {
        const newProject = document.createElement('div'); // Create a new div element for the project
        newProject.className = 'project'; // Add the 'project' class to the div
        newProject.dataset.name = name; // Store the project name in a data attribute for later reference
  
        const projectNameSpan = document.createElement('span'); // Create a span element for the project name
        projectNameSpan.ClassName = 'project-title' // Set the class name to the project-title
        projectNameSpan.textContent = name; // Set the text content to the project name
  
        const rocket = document.createElement('div'); // Create a div element for the rocket icon
        rocket.className = 'rocket'; // Add the 'rocket' class to the div
  
        const progressDiv = document.createElement('div'); // Create a div element for the progress bar
        progressDiv.id = `project${name.replace(/\s+/g, '')}progress`; // Set the id of the div based on the project name
  
        const inputRange = document.createElement('input'); // Create an input element for the progress bar
        inputRange.type = 'range'; // Set the type to 'range' for the slider
        inputRange.name = 'bar'; // Set the name attribute
        inputRange.id = `${name.replace(/\s+/g, '')}bar`; // Set the id based on the project name
        inputRange.value = '0'; // Set the initial value to 0
        inputRange.min = '0'; // Set the minimum value to 0
        inputRange.max = '100'; // Set the maximum value to 100
        inputRange.step = '1'; // Set the step value to 1
        inputRange.className = 'progress-bar'; // Add the 'progress-bar' class to the input
        inputRange.addEventListener('input', updateColor); // Add an event listener to update the color on input
        
        // create the delete button for each project
        const deleteProject = document.createElement("div"); // creates a new div element
        const deleteBtn = deleteButton(name); //creates delete button for the item
        deleteProject.appendChild(deleteBtn); // Appends the delete button

        progressDiv.appendChild(inputRange); // Append the input element to the progress div
        newProject.appendChild(projectNameSpan); // Append the project name span to the project div
        newProject.appendChild(deleteProject); // Append the project delete button to the project div
        newProject.appendChild(rocket); // Append the rocket div to the project div
        newProject.appendChild(progressDiv); // Append the progress div to the project div
        projectsContainer.appendChild(newProject); // Append the new project div to the projects container
        

        // Initial color update
        updateColor({ target: inputRange });
    }
  
    /**
     * Updates the color of the progress bar based on its value.
     * @param {Event} event - The input event.
     */
    function updateColor(event) {
        const value = event.target.value; // Get the current value of the input
        const percent = value / 100; // Calculate the percentage
        const red = percent < 0.5 ? 255 : Math.floor(255 - (2 * (percent - 0.5) * 255)); // Calculate the red component
        const green = percent > 0.5 ? 255 : Math.floor(2 * percent * 255); // Calculate the green component
        event.target.style.background = `linear-gradient(to right, rgb(${red}, ${green}, 0) ${value}%, #ddd ${value}%)`; // Set the background gradient
    }
  
    /**
     * Saves the project name to local storage.
     * @param {string} name - The name of the project.
     */
    function saveProject(name) {
        let projects = JSON.parse(localStorage.getItem('projects')) || []; // Get the projects from local storage or initialize an empty array
        projects.push(name); // Add the new project name to the array
        localStorage.setItem('projects', JSON.stringify(projects)); // Save the updated array to local storage
    }
  
    /**
     * Loads the projects from local storage and adds them to the DOM.
     */
    function loadProjects() {
        let projects = JSON.parse(localStorage.getItem('projects')) || []; // Get the projects from local storage or initialize an empty array
        projects.forEach(name => {
            createProjectElement(name); // Create a project element for each project name
        });
        updateProjectCount(projects.length); // Update the project count with the number of loaded projects
    }
  
    /**
     * Updates the displayed project count.
     * @param {number} change - The change in the project count.
     */
    function updateProjectCount(change) {
        const currentCount = parseInt(projectCountElement.textContent, 10); // Get the current project count
        projectCountElement.textContent = currentCount + change; // Update the project count
    }
  

    /**
     * Function to create a delete button
     * @param {HTMLElement} li - list item element to append the delete button to
     * @returns {HTMLButtonElement} - created delete button
     */
    function deleteButton(name) {
        let deleteBtn = document.createElement("button"); //creates button element
        deleteBtn.classList.add("remove_button"); //adds the "remove_button" class to the element
        deleteBtn.innerHTML = "delete"; //button will say "delete"
        deleteBtn.addEventListener("click", () => { 
            const projectElement = projectsContainer.querySelector(`.project[data-name="${name}"]`); // Find the project element by its data-name attribute
            projectsContainer.removeChild(projectElement); // Remove the project element from the DOM
            updateProjectCount(-1); // Decrement the project count
            removeProjectFromStorage(name); // Remove the project from local storage
        });
        return deleteBtn; // returns the created delete button
    }
  
    /**
     * Removes the project name from local storage.
     * @param {string} name - The name of the project to remove.
     */
    function removeProjectFromStorage(name) {
        let projects = JSON.parse(localStorage.getItem('projects')) || []; // Get the projects from local storage or initialize an empty array
        projects = projects.filter(project => project !== name); // Remove the project name from the array
        localStorage.setItem('projects', JSON.stringify(projects)); // Save the updated array to local storage
    }
  
    loadProjects(); // Load projects from local storage when the page is loaded
  });
