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
  });