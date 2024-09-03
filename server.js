// const puppeteer = require('puppeteer');

// (async () => {
//   try {
//     // Launch the browser
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     // Navigate to the target website
//     await page.goto('https://incois.gov.in/portal/osf/Alerts.html', { waitUntil: 'networkidle2' });

//     // Wait for the specific table or container to load
//     await page.waitForSelector('table');  // Adjust this selector based on the actual table's HTML

//     // Extract the table data
//     const tableData = await page.evaluate(() => {
//       // Select the table by its selector, e.g., 'table', 'table.table-class', etc.
//       const rows = Array.from(document.querySelectorAll('table tr'));  // Adjust the selector as necessary

//       return rows.map(row => {
//         const columns = Array.from(row.querySelectorAll('td')).map(column => column.innerText.trim());
//         return columns;
//       });
//     });

//     console.log('Extracted Table Data:', tableData);

//     // Close the browser
//     await browser.close();
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// })();



// const puppeteer = require('puppeteer');

// (async () => {
//   try {
//     // Launch the browser
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     // Navigate to the target website
//     await page.goto('https://incois.gov.in/portal/osf/Alerts.html', { waitUntil: 'networkidle2' });

//     // Wait for the table to load
//     await page.waitForSelector('table');  // Adjust this selector based on the actual table's HTML

//     // Extract the table data along with color codes
//     const tableData = await page.evaluate(() => {
//       // Select rows from the table
//       const rows = Array.from(document.querySelectorAll('table tr'));  // Adjust the selector as necessary

//       // Extract header and data rows
//       const headers = Array.from(document.querySelectorAll('table thead tr th')).map(header => header.innerText.trim());
//       const dataRows = rows.slice(1).map(row => {
//         // Extract column data
//         const columns = Array.from(row.querySelectorAll('td')).map(column => column.innerText.trim());
//         // Attempt to extract color if present
//         const colorCell = row.querySelector('td.color-class'); // Adjust selector if needed
//         const color = colorCell ? colorCell.style.backgroundColor || 'N/A' : 'N/A';
//         return { color, columns };
//       });

//       return { headers, dataRows };
//     });

//     // Log headers and data rows for debugging
//     console.log('Table Headers:', tableData.headers);
//     console.log('Extracted Table Data:', tableData.dataRows);

//     // Format and print the data into the desired output
//     tableData.dataRows.forEach(rowData => {
//       if (rowData.columns.length < 5) return;  // Ensure there's enough data to process

//       console.log(`Alert: "${rowData.columns[2] || ''}"`);
//       console.log(`Color: "${rowData.color || ''}"`);
//       console.log(`District: "${rowData.columns[1] || ''}"`);
//       console.log(`Issue Date: "${rowData.columns[4] || ''}"`);
//       console.log(`Message: "${rowData.columns[3] || ''}"`);
//       console.log('---');
//     });

//     // Close the browser
//     await browser.close();
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// })();



const puppeteer = require('puppeteer');

(async () => {
  try {
    // Launch the browser
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the target website
    await page.goto('https://incois.gov.in/portal/osf/Alerts.html', { waitUntil: 'networkidle2' });

    // Wait for the table to load
    await page.waitForSelector('table');  // Adjust this selector based on the actual table's HTML

    // Extract the table data along with color codes
    const tableData = await page.evaluate(() => {
      // Select rows from the table
      const rows = Array.from(document.querySelectorAll('table tr'));  // Adjust the selector as necessary

      // Extract header and data rows
      const headers = Array.from(document.querySelectorAll('table thead tr th')).map(header => header.innerText.trim());
      const dataRows = rows.slice(1).map(row => {
        // Extract column data
        const columns = Array.from(row.querySelectorAll('td')).map(column => column.innerText.trim());
        
        // Extract color if available (adjust selector as needed)
        const colorCell = row.querySelector('td.color-class'); // Adjust the selector based on actual color class
        const color = colorCell ? getComputedStyle(colorCell).backgroundColor : 'N/A';

        return { color, columns };
      });

      return { headers, dataRows };
    });

    // Log headers and data rows for debugging
    console.log('Table Headers:', tableData.headers);
    console.log('Extracted Table Data:', tableData.dataRows);

    // Format and print the data into the desired output
    tableData.dataRows.forEach(rowData => {
      if (rowData.columns.length < 5) return;  // Ensure there's enough data to process

      console.log(`Alert: "${rowData.columns[2] || ''}"`);
      console.log(`Color: "${rowData.color || ''}"`);
      console.log(`District: "${rowData.columns[1] || ''}"`);
      console.log(`Issue Date: "${rowData.columns[4] || ''}"`);
      console.log(`Message: "${rowData.columns[3] || ''}"`);
      console.log('---');
    });

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
