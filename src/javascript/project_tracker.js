document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add_button'); // Button to add new projects
    const removeButton = document.querySelector('.remove_button'); // Button to remove projects
    const projectsContainer = document.querySelector('.projects'); // Container for all project elements
    const projectCountElement = document.getElementById('project-count'); // Element to display the project count
  
    addButton.addEventListener('click', addProject); // Event listener for the add button
    removeButton.addEventListener('click', removeProject); // Event listener for the remove button
  
    /**
     * Prompts the user for a project name and adds the project.
     */
    function addProject() {
        const projectName = prompt("Enter the project name:"); // Prompt the user for a project name
        const deadline = prompt("Enter the project deadline (YYYY-MM-DD): ");
        if (!projectName || !deadline) {
            alert("Project name and deadline are required");
            return; // Exit if no name is provided
        }
        const currentDate = new Date().toISOString().split('T')[0]; // get current date in (YYYY-MM-DD) format
        createProjectElement(projectName, currentDate, deadline); // Create a new project element with the given name
        updateProjectCount(1); // Increment the project count
        saveProject(projectName, currentDate, deadline); // Save the project name to local storage
    }

    /**
     * Creates a new project element with the specified name, creation date, and deadline, then adds it to the DOM.
     * @param {string} name - The name of the project.
     * @param {string} createdDate - The creation date of the project.
     * @param {string} deadline - The deadline of the project.
     */
    function createProjectElement(name, createdDate, deadline) {
        if (!name || !createdDate || !deadline) {
            alert("Input a valid name and deadline");
            return;
        }
        const newProject = document.createElement('div'); // Create a new div element for the project
        newProject.className = 'project'; // Add the 'project' class to the div
        newProject.dataset.name = name; // Store the project name in a data attribute for later reference
        newProject.dataset.createdDate = createdDate; // Store the creation date in a data attribute
        newProject.dataset.deadline = deadline; // Store the deadline in a data attribute

        const projectNameSpan = document.createElement('span'); // Create a span element for the project name
        projectNameSpan.className = 'project-title' // Set the class name to the project-title
        projectNameSpan.textContent = name; // Set the text content to the project name
  
        const createdDateSpan = document.createElement('span');
        createdDateSpan.className = 'deadline';
        createdDateSpan.textContent = `Created On: ${createdDate}`;

        const deadlineSpan = document.createElement('span');
        deadlineSpan.className = 'deadline';
        deadlineSpan.textContent = `Deadline: ${deadline}`;

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
        //inputRange.addEventListener('input', updateColor); // Add an event listener to update the color on input
        inputRange.disabled = true; // disable user interaction

        progressDiv.appendChild(inputRange); // Append the input element to the progress div
        newProject.appendChild(createdDateSpan);
        newProject.appendChild(projectNameSpan); // Append the project name span to the project div
        newProject.appendChild(deadlineSpan);
        newProject.appendChild(rocket); // Append the rocket div to the project div
        newProject.appendChild(progressDiv); // Append the progress div to the project div
        projectsContainer.appendChild(newProject); // Append the new project div to the projects container
        
        // Initial progress update
        updateProgressBar(newProject);
        // // Initial color update
        // updateColor({ target: inputRange });
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
  
    function calculateTimePassed(createdDate, deadline) {
        const currentDate = new Date();
        const projectCreatedDate = new Date(createdDate);
        const projectDeadline = new Date(deadline);

        const totalTime = projectDeadline - projectCreatedDate;
        const timePassed = currentDate - projectCreatedDate;
        //const timeDifference = projectDeadline.getTime() - currentDate.getTime();
        //const timeRemaining = Math.max(0, timeDifference); // Ensure time remaining is not negative
        const percentage = (timePassed / totalTime) * 100;
        return Math.min(Math.max(percentage, 0), 100); // Ensure the percentage is not negative and not greater than 100
    }

    /**
     * Updates the progress bar based on the time passed from the creation date to the deadline.
     * @param {HTMLElement} projectElement - The project element containing the progress bar.
     */
    function updateProgressBar(projectElement) {
        const createdDate = projectElement.dataset.createdDate;
        const deadline = projectElement.dataset.deadline;

        const percentage = calculateTimePassed(createdDate, deadline);
        const progressBar = projectElement.querySelector('.progress-bar');
        progressBar.value = percentage;
        
        updateColor({ target: progressBar });
    }

    /**
     * Saves the project name, creation date, and deadline to local storage.
     * @param {string} name - The name of the project.
     * @param {string} createdDate - The creation date of the project.
     * @param {string} deadline - The deadline of the project.
     */
    function saveProject(name, createdDate, deadline) {
        let projects = JSON.parse(localStorage.getItem('projects')) || []; // Get the projects from local storage or initialize an empty array
        projects.push({ name, createdDate, deadline }); // Add the new project name to the array
        localStorage.setItem('projects', JSON.stringify(projects)); // Save the updated array to local storage
    }
  
    /**
     * Loads the projects from local storage and adds them to the DOM.
     */
    function loadProjects() {
        let projects = JSON.parse(localStorage.getItem('projects')) || []; // Get the projects from local storage or initialize an empty array
        projects.forEach(project => {
            createProjectElement(project.name, project.createdDate, project.deadline); // Create a project element for each project name
        });
        updateProjectCount(projects.length); // Update the project count with the number of loaded projects
    }
  
    /**
     * Updates the displayed project count.
     * @param {number} change - The change in the project count.
     */
    function updateProjectCount(change) {
        const currentCount = parseInt(projectCountElement.textContent, 10) || 0; // Get the current project count
        projectCountElement.textContent = currentCount + change; // Update the project count
    }
  
    /**
     * Prompts the user to select a project to remove and removes it.
     */
    function removeProject() {
        const projectName = prompt("Enter the name of the project to remove:"); // Prompt the user for the project name to remove
        if (!projectName) {
            return; // Exit if no name is provided
        }
  
        const projectElement = projectsContainer.querySelector(`.project[data-name="${projectName}"]`); // Find the project element by its data-name attribute
        if (projectElement) {
            projectsContainer.removeChild(projectElement); // Remove the project element from the DOM
            updateProjectCount(-1); // Decrement the project count
            removeProjectFromStorage(projectName); // Remove the project from local storage
        } else {
            alert("Project not found."); // Alert the user if the project was not found
        }
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
  
    //loadProjects(); // Load projects from local storage when the page is loaded
  });
