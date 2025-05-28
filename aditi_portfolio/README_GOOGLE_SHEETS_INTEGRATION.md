# Google Sheets Integration for Contact Form

This document provides instructions on how to set up the Google Sheets integration for the contact form in Aditi's portfolio website.

## Overview

The contact form is configured to send the submitted data (name, email, and message) to a Google Sheet. This integration uses Google Apps Script to create a web API that receives the form data and appends it to the specified Google Sheet.

## Setup Instructions

### Step 1: Access the Google Sheet

1. Open the Google Sheet at this URL: https://docs.google.com/spreadsheets/d/1-4GDk5ADtIG9TDIa60oTnIrw6lE0-WoaZTlAoogX0Z4/edit?usp=sharing
2. Make sure you have edit access to this sheet. If not, request access from the sheet owner.

### Step 2: Set Up Google Apps Script

1. In the Google Sheet, click on "Extensions" > "Apps Script" to open the Apps Script editor.
2. Delete any code in the editor and paste the contents of the `google-sheets-script.js` file from this project.
3. Save the project with a name like "Contact Form Handler".

### Step 3: Deploy the Web App

1. Click on "Deploy" > "New deployment".
2. For "Select type", choose "Web app".
3. Fill in the following details:
   - Description: "Contact Form Handler"
   - Execute as: "Me" (your Google account)
   - Who has access: "Anyone" (This allows the form to send data without authentication)
4. Click "Deploy".
5. After deployment, you'll see a URL. Copy this URL as you'll need it in the next step.

### Step 4: Update the Website Code

1. Open the file `js/dynamic-features.js` in your code editor.
2. Find line 250 with the placeholder URL:
   ```javascript
   const scriptURL = 'https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec';
   ```
3. Replace `YOUR_DEPLOYED_SCRIPT_ID` with the actual deployed web app URL you copied in Step 3.
4. Save the file.

## Testing the Integration

1. Open the portfolio website in a browser.
2. Navigate to the Contact section.
3. Fill out the form with test data and submit.
4. Check the Google Sheet to verify that the data has been added.
5. You should see a new row with the name, email, message, and timestamp.

## Troubleshooting

If the form submission is not working:

1. Check the browser console for any JavaScript errors.
2. Verify that the script URL in `dynamic-features.js` is correct.
3. Make sure the Google Sheet is accessible and the Apps Script has the necessary permissions.
4. Check if the Apps Script deployment is set to "Anyone" for access.

## Security Considerations

- This implementation allows anyone to submit data to your Google Sheet.
- Consider implementing additional security measures like CAPTCHA or rate limiting if spam becomes an issue.
- The Google Sheet URL and script URL are visible in the client-side code, which is normal for this type of integration.