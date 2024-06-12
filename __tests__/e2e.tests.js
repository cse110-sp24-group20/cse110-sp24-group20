//const puppeteer = require('puppeteer');
import {jest} from '@jest/globals'
import puppeteer from "puppeteer";
jest.setTimeout(30000); //30 seconds

describe('Basic user flow for Website', () => {
    let browser;
    let page;

    // First, visit the dev log website
    beforeAll(async () => {
      browser = await puppeteer.launch({headless: false});
      page = await browser.newPage();
      await page.goto('https://cse110-sp24-group20.github.io/cse110-sp24-group20/');
    });

    afterAll(async () => {
        await browser.close();
    });
  
    // Next, Check for all four feature buttons
    it('Initial Home Page - Check for all four feature buttons', async () => {
      console.log('Checking for 20 product items...');
      const numFeatures = await page.$$eval('button', (buttons) => {
        return buttons.length;
      });
      // Expect there that array from earlier to be of length 4, meaning 4 buttons elements where found
      expect(numFeatures).toBe(4);
    });

    // Test navigation to Day Schedule page
    it('Navigate to Schedule Your Day page', async () => {
      await page.click('.day-schedule-button');
      await page.waitForSelector('.container');
      const title = await page.title();
      expect(title).toBe('Schedule Your Day');
    });
    // Test navigation to Reflect Day page
    it('Navigate to Reflect On Your Day page', async () => {
      await page.goto('https://cse110-sp24-group20.github.io/cse110-sp24-group20/');
      await page.click('.reflect-button');
      await page.waitForSelector('.reflect');
      const title = await page.title();
      expect(title).toBe('Reflect On The Day');
    });
    // Test navigation to Month Schedule page
    it('Navigate to Schedule Your Month page', async () => {
      await page.goto('https://cse110-sp24-group20.github.io/cse110-sp24-group20/');
      await page.click('.month-schedule-button');
      await page.waitForSelector('.calendar');
      const title = await page.title();
      expect(title).toBe('Monthly Calendar');
    });
    // Test navigation to Project Tracker page
    it('Navigate to Track Your Project Page', async () => {
      await page.goto('https://cse110-sp24-group20.github.io/cse110-sp24-group20/');
      await page.click('.project-button');
      await page.waitForSelector('.project-tracker');
      const title = await page.title();
      expect(title).toBe('Track Your Project');
    });
    
    /** 
     * Testing for Day Schedule Page
    */
   //Test to add a new task and verify it is on the list
    it('Schedule Your Day Page - Add a new task', async () => {
      await page.goto('https://cse110-sp24-group20.github.io/cse110-sp24-group20/src/html/daySchedule.html');
      await page.click('.add_button');
      await page.waitForSelector('.modal');

      // Fill in the task details and submit the form
      await page.type('#eventName', 'Test Event');
      await page.type('#description', 'This is a test event.');
      //await page.type('#dateTime', '2024-06-07T10:00');
      await page.evaluate(() => {
        document.querySelector('#dateTime').value = '2024-06-07T10:00';
      });
      await page.click('.submit');

      await page.waitForSelector('.todo-item');
      const taskName = await page.$eval('.todo-item .title', el => el.textContent);
      expect(taskName).toBe('Test Event');
    }, 10000); // Set timeout to 10 seconds for this test

    // Test to verify tasks are displayed on the calendar
    it('Schedule Your Month Page - Display tasks on the calendar', async () => {
      await page.goto('https://cse110-sp24-group20.github.io/cse110-sp24-group20/src/html/monthSchedule.html');
      await page.waitForSelector('#\\32 024-6-7');
      // Evaluate inside the browser context
      const eventExists = await page.evaluate(() => {
        const td = document.querySelector('#\\32 024-6-7'); // Using escape sequences for the selector
        if (td) {
          const event = td.querySelector('.event');
          return event !== null;
        }
        return false
      })
      expect(eventExists).toBe(true);
    }, 10000);

    // Test to edit a task and verify it changes
    it('Schedule Your Day Page - Edit a task', async () => {
      await page.goto('https://cse110-sp24-group20.github.io/cse110-sp24-group20/src/html/daySchedule.html');
      
      // Ensure the edit button appears by waiting for an existing todo item and then edit button
      await page.waitForSelector('.todo-item');
      await page.waitForSelector('.edit_button');

      await page.click('.edit_button');
      await page.waitForSelector('.modal');

      //Clear the input field before typing the new value
      await page.evaluate(() => {
        document.getElementById('eventName').value = '';
        document.getElementById('description').value = '';
        document.getElementById('dateTime').value = '';
      });

      //Update the task details and sumbit the form
      await page.type('#eventName', 'Updated Event');
      await page.click('.submit');

      await page.waitForSelector('.todo-item');
      const taskName = await page.$eval('.todo-item .title', el => el.textContent);
      expect(taskName).toBe('Updated Event');
    }, 10000); // Set timeout to 10 seconds for this test

    // Test to delete a task and verify it is removed from the list
    it('Schedule Your Day Page - Delete a task', async () => {
      await page.goto('https://cse110-sp24-group20.github.io/cse110-sp24-group20/src/html/daySchedule.html');
      await page.click('.delete_button');
      await page.waitForSelector('.todo-item', {hidden: true});
      const tasks = await page.$$('.todo_iten');
      expect(tasks.length).toBe(0);
    }, 10000); // Set timeout to 10 seconds for this test

    // Test to verify tasks are remove on the calendar
    it('Schedule Your Month Page - Remove tasks on the calendar', async () => {
      await page.goto('https://cse110-sp24-group20.github.io/cse110-sp24-group20/src/html/monthSchedule.html');
      await page.waitForSelector('#\\32 024-6-7');
      // Evaluate inside the browser context
      const eventExists = await page.evaluate(() => {
        const td = document.querySelector('#\\32 024-6-7'); // Using escape sequences for the selector
        if (td) {
          const event = td.querySelector('.event');
          return event == null;
        }
        return false
      })
      expect(eventExists).toBe(true);
    }, 10000);

    /**
     * Testing for Reflect Day page
    */
    // Test to add new reflection and verify it appears in list
    it('Reflect On Your Day Page - Add a new reflection', async () => {
      await page.goto('https://cse110-sp24-group20.github.io/cse110-sp24-group20/src/html/reflectDay.html');
      await page.click('.add-button');
      await page.waitForSelector('.sentiment-widget', { visible: true });

      // Select the radio button with value 3
      await page.evaluate(() => {
          const radio = document.querySelector('input[name="rating"][value="3"]');
          if (radio) {
              radio.click();
          }
      });

      // Verify the radio button is selected
      const isSelected = await page.$eval('input[name="rating"][value="3"]', el => el.checked);
      expect(isSelected).toBe(true);

      // Close the sentiment widget by selecting the sentiment
      await page.evaluate(() => {
          const selectedSentiment = document.querySelector('#rating3');
          if (selectedSentiment) {
              selectedSentiment.click();
          }
      });

      // Wait for the reflection to appear in the list
      await page.waitForSelector('.previous-reflection');
      const reflectionCount = await page.$eval('#reflect-count', el => el.textContent);
      expect(reflectionCount).toBe('2');
    }, 30000); // Set timeout to 30 seconds for this test
    // Test to edit a reflection and verify it changes
    it('Reflect On Your Day Page - Edit a reflection', async () => {
      await page.goto('https://cse110-sp24-group20.github.io/cse110-sp24-group20/src/html/reflectDay.html');
    
      // Wait for the reflection to be present
      await page.waitForSelector('.previous-reflection');
      
      // Click the edit button
      await page.click('.edit-item');
      
      // Wait for the reflection input to become editable and change its content
      await page.evaluate(() => {
          const textArea = document.querySelector('.previous-reflection textarea');
          textArea.disabled = false;
          textArea.value = 'Updated Reflection Text';
          textArea.dispatchEvent(new Event('input'));
      });

      // Verify the reflection text has been updated
      const reflectionText = await page.$eval('.previous-reflection textarea', el => el.value);
      expect(reflectionText).toBe('Updated Reflection Text');
    }, 30000); // Set timeout to 30 seconds for this test
    // Test to delete a reflection and verify it is removed from the list
    it('Reflect On Your Day Page - Delete a reflection', async () => {
      await page.goto('https://cse110-sp24-group20.github.io/cse110-sp24-group20/src/html/reflectDay.html');
    
      // Wait for the reflection to be present
      await page.waitForSelector('.previous-reflection');
      
      // Click the delete button
      await page.click('.delete-item');
      
      // Verify the reflection is removed from the list
      const reflectionCount = await page.$eval('#reflect-count', el => el.textContent);
      expect(reflectionCount).toBe('1');
    }, 30000); // Set timeout to 30 seconds for this test

    /**
     * Testing for Month Schedule page
    */
   // Test to verify that the calendar loads correctly 
    it('Schedule Your Month Page - Load the calendar', async () => {
      await page.goto('https://cse110-sp24-group20.github.io/cse110-sp24-group20/src/html/monthSchedule.html');
      await page.waitForSelector('.calendar');
      const calendarExists = await page.$eval('.calendar', el => !!el);
      expect(calendarExists).toBe(true);
    });
 
    /**
     * Testing for Project Tracker page
    */
   // Test to add a new project and verify it appears on the list
    it('Project Tracker Page - Add a new project', async () => {
      await page.goto('https://cse110-sp24-group20.github.io/cse110-sp24-group20/src/html/projectTracker.html');
      await page.click('.add_button');
      await page.waitForSelector('.modal');

      await page.type('#eventName', 'New Project');
      await page.click('.submit');

      await page.waitForSelector('.project-title');
      const projectName = await page.$eval('.project-title', el => el.textContent);
      expect(projectName).toBe('New Project');
    }, 30000);
    // Test to delete a project annd verify it is removed from list
    it('Project Tracker Page - Delete a project', async () => {
      await page.goto('https://cse110-sp24-group20.github.io/cse110-sp24-group20/src/html/projectTracker.html');
      await page.click('.remove_button');
      await page.waitForSelector('.project-title', { hidden: true });
      const projects = await page.$$('.project');
      expect(projects.length).toBe(0);
    }, 30000);
  });