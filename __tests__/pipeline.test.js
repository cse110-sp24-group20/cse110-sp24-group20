// pipeline.test.js

import {
    sum,
    convertDate,
    formatDateTimeForDisplay,
    formatDateTimeForInput,
    rgbToHex
} from '../src/javascript/unit-test-me'

/**
 * Tests functions from index.js
 */
describe('Home Page Tests', () => {
    // No unit tests necessary for index.js
    test("Filler Test", () => {
        expect(sum(1, 2)).toBe(3);
    });
});

/**
 * Tests functions from monthlyCalendar.js
 */
describe('Calendar Tests', () => {
    
    test('Test Convert Date', () => {
        expect(convertDate("2024-06-15")).toBe("2024-6-15");
    });
});

/**
 * Tests functions from daySchedule.js
 */
describe('Project Tracker Tests', () => {
    // Project tracker seems to be largely an e2e testing issue
    test('Filler Test', () => {
        expect(sum(1, 2)).toBe(3);
    });
});

/**
 * Tests functions from daySchedule.js
 */
describe('Reflection Tests', () => {
    // Reflect on your day seems to be largely an e2e testing issue
    test('Filler Test', () => {
        expect(sum(1, 2)).toBe(3);
    });
});

/**
 * Tests functions from daySchedule.js
 */
describe('Day Schedule Tests', () => {
    
    test('Test formatDateTimeForDisplay', () => {
        let options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        let expectedReturn = new Date("June 15, 2024 12:00:00").toLocaleString('en-US', options);
        expect(formatDateTimeForDisplay("June 15, 2024 12:00:00")).toBe(expectedReturn);
    });

    test('Test formatDateTimeForInput', () => {
        let date = new Date("June 15, 2024 12:00:00"); //creates new Date object
        let year = date.getFullYear(); //gets the full current year
        let month = String(date.getMonth() + 1).padStart(2, '0'); // gets the current month
        let day = String(date.getDate()).padStart(2, '0'); // gets the current date
        let hours = String(date.getHours()).padStart(2, '0'); // gets the current time in hours
        let minutes = String(date.getMinutes()).padStart(2, '0'); // gets the current time in minutes
        let expectedReturn = `${year}-${month}-${day}T${hours}:${minutes}`
        expect(formatDateTimeForInput("June 15, 2024 12:00:00")).toBe(expectedReturn);
    });

    test('Test RGB Conversion', () => {
        var result = "000000".match(/\d+/g); //matches the numbers in the RGB string
        let expectedReturn = "#" + ((1 << 24) + (parseInt(result[0]) << 16) + (parseInt(result[1]) << 8) + parseInt(result[2])).toString(16).slice(1).toUpperCase(); //converts to hex
        expect(rgbToHex("000000")).toBe(expectedReturn);
    });
});