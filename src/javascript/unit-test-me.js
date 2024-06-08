export function sum(a, b) {
    return a + b;
}

export function convertDate(dateStr) {
    // Split the date string into year, month, and day
    const [year, month, day] = dateStr.split('-');
    
    // Remove leading zeroes from month and day
    const formattedMonth = parseInt(month, 10).toString();
    const formattedDay = parseInt(day, 10).toString();
    
    return `${year}-${formattedMonth}-${formattedDay}`;
}

/**
 * Format the date and time for display
 * Converts the date and time string to a more readable format.
 * @param {string} dateTime - The date and time string to format
 * @returns {string} - The formatted date and time string
 */
export function formatDateTimeForDisplay(dateTime) {
    let options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }; //specifies the format
    return new Date(dateTime).toLocaleString('en-US', options); // converts the dateTime to a Date object and formats based on locale 'en-US'
}

/**
 * Format the date and time for input
 * Converts the date and time string to a format suitable for input fields.
 * @param {string} dateTime - The date and time string to format
 * @returns {string} - The formatted date and time string in input format
 */
export function formatDateTimeForInput(dateTime) {
    var date = new Date(dateTime); //creates new Date object
    var year = date.getFullYear(); //gets the full current year
    var month = String(date.getMonth() + 1).padStart(2, '0'); // gets the current month
    var day = String(date.getDate()).padStart(2, '0'); // gets the current date
    var hours = String(date.getHours()).padStart(2, '0'); // gets the current time in hours
    var minutes = String(date.getMinutes()).padStart(2, '0'); // gets the current time in minutes
    return `${year}-${month}-${day}T${hours}:${minutes}`; // format for DateTime
}

/**
 * Helper function to convert rgb color to hex
 * Converts an RGB color value to a hex color string.
 * @param {string} rgb - The rgb color string
 * @returns {string} - The hex color string
 */
export function rgbToHex(rgb) {
    var result = rgb.match(/\d+/g); //matches the numbers in the RGB string
    return "#" + ((1 << 24) + (parseInt(result[0]) << 16) + (parseInt(result[1]) << 8) + parseInt(result[2])).toString(16).slice(1).toUpperCase(); //converts to hex
}