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
    submitButton.addEventListener("click", addProject);
    /**
     * Prompts the user for a project name and adds the project.
     */
    function addProject(event){
        event.preventDefault();
        let projectName = document.getElementById("eventName").value;
        let deadline = document.getElementById("dateTime").value;
        if (!projectName) {
            //createProjectElement(projectName); // Create a new project element with the given name
            //updateProjectCount(1); // Increment the project count
            //saveProject(projectName); // Save the project name to local storage
            event.preventDefault();
            alert("Project Name cannot be empty!")
            return;
        } 
        const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
        const createdDate = new Date().toISOString().slice(0,16);
        if (deadline && !dateRegex.test(deadline)) {
            alert("The deadline must be in the format YYYY-MM-DDTHH:MM.");
                return;
        } else if (deadline){
            createProjectElement(projectName, createdDate, deadline);
        } else {
            createProjectElement(projectName);
        }
        
        // else if (!deadline){
        //     //create undated project
        //     createProjectElement(projectName); // Create a new project element with the given name
        //     updateProjectCount(1); // Increment the project count
        //     saveProject(projectName); // Save the project name to local storage
        // } else {
        //     const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        //     if (!dateRegex.test(deadline)){
        //         alert("The deadline must be in the format YYYY-MM-DD.");
        //         return;
        //     }
        // const date = new Date()
        // const currentDate = date.toISOString().split('T')[0]; // get current date in (YYYY-MM-DD) format
        // createProjectElement(projectName, currentDate, deadline); // Create a new project element with the given name
        // }
        //updateProjectCount(1);
        //saveProject(projectName);
        modal.style.display = "none";
        eventForm.reset();
    }
    
    // /**
    //  * Creates a new project element with the specified name and adds it to the DOM.
    //  * @param {string} name - The name of the project.
    //  */
    // function createProjectElement(name) {
    //     const newProject = document.createElement('div'); // Create a new div element for the project
    //     newProject.className = 'project'; // Add the 'project' class to the div
    //     newProject.dataset.name = name; // Store the project name in a data attribute for later reference
  
    //     const projectNameSpan = document.createElement('span'); // Create a span element for the project name
    //     projectNameSpan.ClassName = 'project-title' // Set the class name to the project-title
    //     projectNameSpan.textContent = name; // Set the text content to the project name
  
    //     const rocket = document.createElement('div'); // Create a div element for the rocket icon
    //     rocket.className = 'rocket'; // Add the 'rocket' class to the div
  
    //     const progressDiv = document.createElement('div'); // Create a div element for the progress bar
    //     progressDiv.id = `project${name.replace(/\s+/g, '')}progress`; // Set the id of the div based on the project name
  
    //     const inputRange = document.createElement('input'); // Create an input element for the progress bar
    //     inputRange.type = 'range'; // Set the type to 'range' for the slider
    //     inputRange.name = 'bar'; // Set the name attribute
    //     inputRange.id = `${name.replace(/\s+/g, '')}bar`; // Set the id based on the project name
    //     inputRange.value = '0'; // Set the initial value to 0
    //     inputRange.min = '0'; // Set the minimum value to 0
    //     inputRange.max = '100'; // Set the maximum value to 100
    //     inputRange.step = '1'; // Set the step value to 1
    //     inputRange.className = 'progress-bar'; // Add the 'progress-bar' class to the input
    //     inputRange.addEventListener('input', updateColor); // Add an event listener to update the color on input
        
    //     // create the delete button for each project
    //     const deleteProject = document.createElement("div"); // creates a new div element
    //     const deleteBtn = deleteButton(name); //creates delete button for the item
    //     deleteProject.appendChild(deleteBtn); // Appends the delete button

    //     progressDiv.appendChild(inputRange); // Append the input element to the progress div
    //     newProject.appendChild(projectNameSpan); // Append the project name span to the project div
    //     newProject.appendChild(deleteProject); // Append the project delete button to the project div
    //     newProject.appendChild(rocket); // Append the rocket div to the project div
    //     newProject.appendChild(progressDiv); // Append the progress div to the project div
    //     projectsContainer.appendChild(newProject); // Append the new project div to the projects container
        

    //     // Initial color update
    //     updateColor({ target: inputRange });
    // }
    
    function createProjectElement(name, createdDate = null, deadline = null) {
        if (!checkDate(createdDate, deadline)){
            return;
        }
        const newProject = document.createElement('div'); // Create a new div element for the project
        newProject.className = 'project'; // Add the 'project' class to the div
        newProject.dataset.name = name; // Store the project name in a data attribute for later reference
        
        const projectNameSpan = document.createElement('span'); // Create a span element for the project name
        projectNameSpan.className = 'project-title' // Set the class name to the project-title
        projectNameSpan.textContent = name; // Set the text content to the project name
        
        const percentageSpan = document.createElement('span');
        percentageSpan.className = 'percentage';
        percentageSpan.textContent = '0%';

        const rocket = document.createElement('div'); // Create a div element for the rocket icon
        rocket.className = 'rocket'; // Add the 'rocket' class to the div
  
        const progressDiv = document.createElement('div'); // Create a div element for the progress bar
        progressDiv.className = 'progress-container';
        progressDiv.id = `project-${name.replace(/\s+/g, '')}-progress`; // Set the id of the div based on the project name
    
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
        //inputRange.disabled = true;
        inputRange.addEventListener('input', () => updateProgressBar(newProject));
        if (deadline) {
            // newProject.dataset.createdDate = createdDate;
            // newProject.dataset.deadline = deadline;
            inputRange.disabled = true;
            const percentage = calculateTimePassed(createdDate, deadline);
            setInterval(() => updateProgressBar(newProject), 1000 * 60);
            //inputRange.value = percentage;
            const deadlineSpan = document.createElement('span');
            deadlineSpan.className = 'deadline';
            deadlineSpan.textContent = `Deadline: ${deadline}`;
            progressDiv.appendChild(deadlineSpan);
        } //else {
        //     inputRange.addEventListener('input', updateColor);
        // }

        // create the delete button for each project
        const deleteProject = document.createElement("div"); // creates a new div element
        const deleteBtn = deleteButton(name); //creates delete button for the item
        deleteProject.appendChild(deleteBtn); // Appends the delete button

        progressDiv.appendChild(inputRange); // Append the input element to the progress div
        newProject.appendChild(projectNameSpan); // Append the project name span to the project div
        newProject.appendChild(percentageSpan);
        newProject.appendChild(deleteProject); // Append the project delete button to the project div
        newProject.appendChild(rocket); // Append the rocket div to the project div
        newProject.appendChild(progressDiv); // Append the progress div to the project div
        projectsContainer.appendChild(newProject); // Append the new project div to the projects container
        

        // updateProgressBar(newProject);
        // updateProjectCount(1);
        // saveProject(projectName, percentage);
        // // Initial color update
        updateColor({ target: inputRange });
        updateProjectCount(1);
        saveProject(name, createdDate, deadline, inputRange.value);
    }

    function calculateTimePassed(createdDate, deadline) {
        const currentDate = new Date();
        const projectCreatedDate = new Date(createdDate);
        const projectDeadline = new Date(deadline);

        projectCreatedDate.setHours(0, 0, 0, 0);
        projectDeadline.setHours(0, 0, 0, 0);
        const totalTime = projectDeadline - projectCreatedDate;
        const timePassed = currentDate - projectCreatedDate;

        const percentage = (timePassed / totalTime) * 100;
        return Math.min(Math.max(percentage, 0), 100); // Ensure the percentage is not negative and not greater than 100
    }

    function checkDate(createdDate, deadline){
        const projectCreatedDate = new Date(createdDate);
        const projectDeadline = new Date(deadline);

        // Check if the provided dates are valid
        if (isNaN(projectCreatedDate.getTime()) || isNaN(projectDeadline.getTime())) {
            alert("Invalid date format. Please enter dates in the format YYYY-MM-DD.");
            return false;
        }
        else if ((projectDeadline - projectCreatedDate) < 0 ){
            alert("Deadline entered has already passed");
            return false;
        }
        return true;
    }

    /*
    * Updates the progress bar based on the time passed from the creation date to the deadline.
    * @param {HTMLElement} projectElement - The project element containing the progress bar.
    */
   function updateProgressBar(projectElement, createdDate, deadline) {
        const projectName = projectElement.dataset.name;
        const inputRange = projectElement.querySelector('.progress-bar');
        const percentageSpan = projectElement.querySelector('.percentage');

        inputRange.disabled = !!deadline; // Disable input if there's a deadline

        const percentage = inputRange.value;
        percentageSpan.textContent = `${percentage}%`; // Update displayed percentage

        if (deadline) {
            const progress = calculateTimePassed(createdDate, deadline);
            inputRange.value = progress;
            saveProject(projectName, createdDate, deadline, progress);
        } else {
            saveProject(projectName, null, null, percentage);
        }

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
  
    // /**
    //  * Saves the project name to local storage.
    //  * @param {string} name - The name of the project.
    //  */
    // function saveProject(name) {
    //     let projects = JSON.parse(localStorage.getItem('projects')) || []; // Get the projects from local storage or initialize an empty array
    //     projects.push(name); // Add the new project name to the array
    //     localStorage.setItem('projects', JSON.stringify(projects)); // Save the updated array to local storage
    // }

    function saveProject(name, createdDate = null, deadline = null, progress) {
        let projects = JSON.parse(localStorage.getItem('projects')) || []; // Get the projects from local storage or initialize an empty array
        const existingProjectIndex = projects.findIndex(project => project.name === name);
        if (existingProjectIndex !== -1) {
            projects[existingProjectIndex] = { name, createdDate, deadline, progress };
        } else {
            projects.push({ name, createdDate, deadline, progress });
        }
        //projects.push({name, createdDate, deadline}); // Add the new project name to the array
        //localStorage.setItem('projects', JSON.stringify(projects)); // Save the updated array to local storage
    }
  
    // /**
    //  * Loads the projects from local storage and adds them to the DOM.
    //  */
    // function loadProjects() {
    //     let projects = JSON.parse(localStorage.getItem('projects')) || []; // Get the projects from local storage or initialize an empty array
    //     projects.forEach(name => {
    //         createProjectElement(name); // Create a project element for each project name
    //     });
    //     updateProjectCount(projects.length); // Update the project count with the number of loaded projects
    // }
    /**
     * Loads the projects from local storage and adds them to the DOM.
     */
    function loadProjects() {
        let projects = JSON.parse(localStorage.getItem('projects')) || []; // Get the projects from local storage or initialize an empty array
        projects.forEach(project => {
            createProjectElement(project.name, project.createdDate, project.deadline, project.progress); // Create a project element for each project name
            const projectElement = projectsContainer.querySelector(`.project[data-name="${project.name}"]`);
            if (projectElement) {
                const inputRange = projectElement.querySelector('.progress-bar');
                inputRange.value = project.progress;
                updateProgressBar(projectElement, project.createdDate, project.deadline);
            }
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
        projects = projects.filter(project => project.name !== name); // Remove the project name from the array
        localStorage.setItem('projects', JSON.stringify(projects)); // Save the updated array to local storage
    }
  
    loadProjects(); // Load projects from local storage when the page is loaded
  });
