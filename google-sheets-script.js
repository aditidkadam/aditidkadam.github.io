// Google Apps Script to handle form submissions and add data to Google Sheets
// This code should be deployed as a web app in Google Apps Script

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet by ID
    // The spreadsheet ID is from the URL: https://docs.google.com/spreadsheets/d/1-4GDk5ADtIG9TDIa60oTnIrw6lE0-WoaZTlAoogX0Z4/edit?usp=sharing
    const ss = SpreadsheetApp.openById('1-4GDk5ADtIG9TDIa60oTnIrw6lE0-WoaZTlAoogX0Z4');
    
    // Get the first sheet
    const sheet = ss.getSheets()[0];
    
    // Check if headers exist, if not add them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Name', 'Email', 'Message', 'Timestamp']);
    }
    
    // Append the data to the sheet
    sheet.appendRow([
      data.name,
      data.email,
      data.message,
      new Date().toISOString()
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// This function is needed to allow cross-origin requests
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 'result': 'success', 'message': 'Service is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}