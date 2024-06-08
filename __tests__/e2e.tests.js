const puppeteer = require('puppeteer');

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
  
    // Next, check to make sure that all 20 <product-item> elements have loaded
    it('Initial Home Page - Check for all four feature buttons', async () => {
      console.log('Checking for 20 product items...');
      // Query select all of the <product-item> elements and return the length of that array
      const numFeatures = await page.$$eval('button', (buttons) => {
        return buttons.length;
      });
      // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
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
      await page.type('#dateTime', '2024-06-07T10:00');
      await page.click('.submit');

      await page.waitForSelector('.todo-item');
      const taskName = await page.$eval('.todo-item .title', el => el.textContent);
      expect(taskName).toBe('Test Event');
    });
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
    });
    // Test to delete a task and verify it is removed from the list
    it('Schedule Your Day Page - Delete a task', async () => {
      await page.goto('https://cse110-sp24-group20.github.io/cse110-sp24-group20/src/html/daySchedule.html');
      await page.click('.delete_button');
      await page.waitForSelector('.todo-item', {hidden: true});
      const tasks = await page.$$('.todo_iten');
      expect(tasks.length).toBe(0);
    });

    /**
     * Testing for Reflect Day page
    */
    // Test to add new reflection and verify it appears in list
    it('', async () => {

    });
    // Test to edit a reflection and verify it changes
    it('', async () => {
      
    });
    // Test to delete a reflection and verify it is removed from the list
    it('', async () => {
      
    });

    /**
     * Testing for Month Schedule page
    */
   // Test to verify that the calendar loads correctly 
    it('', async () => {
      
    });
    // Test to verify tasks are displayed on the calendat
    it('', async () => {
      
    });

    /**
     * Testing for Project Tracker page
    */
   // Test to add a new project and verify it appears on the list
    it('', async () => {
      
    });
    // Test to delete a project annd verify it is removed from list
    it('', async () => {
      
    });
  });