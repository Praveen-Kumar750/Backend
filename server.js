const puppeteer = require('puppeteer');

(async () => {
  try {
    // Launch the browser
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the target website
    await page.goto('https://incois.gov.in/portal/osf/Alerts.html', { waitUntil: 'networkidle2' });

    // Wait for the specific table or container to load
    await page.waitForSelector('table');  // Adjust this selector based on the actual table's HTML

    // Extract the table data
    const tableData = await page.evaluate(() => {
      // Select the table by its selector, e.g., 'table', 'table.table-class', etc.
      const rows = Array.from(document.querySelectorAll('table tr'));  // Adjust the selector as necessary

      return rows.map(row => {
        const columns = Array.from(row.querySelectorAll('td')).map(column => column.innerText.trim());
        return columns;
      });
    });

    console.log('Extracted Table Data:', tableData);

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();


