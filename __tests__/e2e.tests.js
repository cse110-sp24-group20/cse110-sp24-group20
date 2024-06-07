const puppeteer = require('puppeteer');

describe('Basic user flow for Website', () => {
    let browser;
    let page;

    // First, visit the dev log website
    beforeAll(async () => {
      browser = await puppeteer.launch();
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
    
    /**
     * Testing for Reflect Day page
    */
    
    /**
     * Testing for Month Schedule page
    */
    
    /**
     * Testing for Project Tracker page
    */
    
  });