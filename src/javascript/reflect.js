document.addEventListener('DOMContentLoaded', () => {
    // Container for add, remove, previous-reflection, and reflection counter
    const addReflectionButton = document.querySelector('.add_button');
    const removeReflectionButton = document.querySelector('.remove_button');
    const reflectionsContainer = document.querySelector('.previous-reflections');
    const reflectCountSpan = document.querySelector('#reflect-count');
    
    // Add event listeners to the buttons
    addReflectionButton.addEventListener('click', addReflection);
    removeReflectionButton.addEventListener('click', removeReflection);
  
    let reflectionCount = 0; // Counter for reflection index
  
    // Load existing reflections from localStorage
    const storedReflections = JSON.parse(localStorage.getItem('reflections')) || [];
    // Create elements for each stored reflection
    storedReflections.forEach(reflection => createReflectionElement(reflection));
    reflectionCount = storedReflections.length; // Set the initial reflectionCount based on stored reflections
    updateReflectionCount(); // Update counter on load

    // Function to add a new reflection
    function addReflection() {
        const date = new Date().toLocaleDateString(); // Get the current date
        let feeling;

        try {
          // Prompt user for their feeling rating
          feeling = prompt('Rate your feeling for the day (input 1[Very Angry] - 5[Very Happy]):');
          // Check if the input is valid
          if (![1, 2, 3, 4, 5].includes(Number(feeling))) {
            throw new Error('No reflection was added.');
          }
      
          // Create a new reflection object
          const newReflection = { id: ++reflectionCount, date, feeling, text: '' };
          createReflectionElement(newReflection, true); // Create a new reflection element
          saveReflection(newReflection); // Save the new reflection
          updateReflectionCount(); // Update counter after adding
      
        } catch (error) {
          alert(error.message); // Alert the error message
        }
    }
  
    // Function to create a reflection element and add it to the container
    function createReflectionElement(reflection, editable = false) {
      const table = document.createElement('table'); // Create a table element
      table.setAttribute('data-id', reflection.id); // Set data-id attribute for identification
  
      const reflectionRow = document.createElement('tr'); // Create a table row element
      reflectionRow.classList.add('previous-reflection'); // Add a class to the row

      const indexCell = document.createElement('td'); // Create a cell for the reflection ID
      indexCell.textContent = reflection.id; // Set the ID text
  
      const iconCell = document.createElement('td'); // Create a cell for the icon
      iconCell.classList.add('widget-select-icon'); // Add a class to the icon cell
      const icon = document.createElement('img'); // Create an image element for the icon
      icon.src = `../../img/emoticons/Team404_Emoticons${reflection.feeling}.png`; // Set the icon source
      icon.style.width = '70px'; // Set icon width
      icon.style.height = '70px'; // Set icon height
      iconCell.appendChild(icon); // Append the icon to the cell
  
      const reflectionCell = document.createElement('td'); // Create a cell for the reflection text
      const reflectionInput = document.createElement('textarea'); // Create a textarea for the reflection
      reflectionInput.style.width = '100%'; // Make textarea take full width
      reflectionInput.value = reflection.text; // Set the reflection text
      if (editable) {
        // If the reflection is editable, add an input event listener
        reflectionInput.addEventListener('input', () => {
          reflection.text = reflectionInput.value; // Update the reflection text
          saveReflection(reflection); // Save the updated reflection
        });
      } else {
        reflectionInput.disabled = true; // Disable the textarea if not editable
      }
      reflectionCell.appendChild(reflectionInput); // Append the textarea to the cell
      const dateCell = document.createElement('td'); // Create a cell for the date
      dateCell.colSpan = 3; // Make the date cell span across multiple columns
      dateCell.textContent = `Date: ${reflection.date}`; // Set the date text
  
      // Append cells to the row
      reflectionRow.appendChild(indexCell);
      reflectionRow.appendChild(iconCell);
      reflectionRow.appendChild(reflectionCell);
      // Append row and date cell to the table
      table.appendChild(reflectionRow);
      table.appendChild(dateCell);
  
      reflectionsContainer.appendChild(table); // Append the table to the container
    }
  
    // Function to save a reflection to localStorage
    function saveReflection(reflection) {
      const storedReflections = JSON.parse(localStorage.getItem('reflections')) || []; // Get stored reflections
      const existingReflectionIndex = storedReflections.findIndex(r => r.id === reflection.id); // Find existing reflection
  
      if (existingReflectionIndex !== -1) {
        // If reflection exists, update it
        storedReflections[existingReflectionIndex] = reflection;
      } else {
        // If new reflection, add it
        storedReflections.push(reflection);
      }
  
      localStorage.setItem('reflections', JSON.stringify(storedReflections)); // Save reflections to localStorage
    }
  
    // Function to remove a reflection
    function removeReflection() {
      const reflectionToRemove = prompt('Enter the reflection number to remove:'); // Prompt user for reflection ID to remove
  
      if (reflectionToRemove) {
        const storedReflections = JSON.parse(localStorage.getItem('reflections')) || []; // Get stored reflections
        const updatedReflections = storedReflections.filter(reflection => reflection.id !== parseInt(reflectionToRemove)); // Filter out the reflection to remove
  
        if (updatedReflections.length !== storedReflections.length) {
          // If a reflection was removed, update localStorage
          localStorage.setItem('reflections', JSON.stringify(updatedReflections));
          const tableToRemove = document.querySelector(`table[data-id="${reflectionToRemove}"]`);
          if (tableToRemove) {
            reflectionsContainer.removeChild(tableToRemove); // Remove the table element from the container
          }
          reflectionCount = updatedReflections.length; // Update reflection count
          updateReflectionCount(); // Update counter after removal
        } else {
          alert('Invalid reflection number.'); // Alert if invalid reflection number
        }
      }
    }

    // Function to update reflection counts
    function updateReflectionCount() {
      reflectCountSpan.textContent = reflectionCount;
  }
});
