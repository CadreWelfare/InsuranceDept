
/**
 * GOOGLE APPS SCRIPT BACKEND
 * 1. Open a Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste this code.
 * 4. Click 'Deploy' > 'New Deployment'.
 * 5. Select 'Web App'.
 * 6. Set 'Execute as' to 'Me' and 'Who has access' to 'Anyone'.
 * 7. Copy the Web App URL and paste it into your app's api.ts.
 */

function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const jsonData = rows.map(row => {
    let obj = {};
    headers.forEach((header, i) => {
      let val = row[i];
      // Try to parse JSON strings back into objects/arrays
      if (typeof val === 'string' && (val.startsWith('[') || val.startsWith('{'))) {
        try { val = JSON.parse(val); } catch (e) {}
      }
      obj[header] = val;
    });
    return obj;
  });
  
  return ContentService.createTextOutput(JSON.stringify(jsonData))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const payload = JSON.parse(e.postData.contents);
  const action = payload.action;
  const fileData = payload.data;
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  // Ensure headers exist
  if (!headers || headers.length === 0 || headers[0] === "") {
    const newHeaders = Object.keys(fileData);
    sheet.appendRow(newHeaders);
    headers = newHeaders;
  }

  if (action === 'CREATE') {
    const newRow = headers.map(h => {
      const val = fileData[h];
      return (typeof val === 'object') ? JSON.stringify(val) : val;
    });
    sheet.appendRow(newRow);
  } 
  else if (action === 'UPDATE' || action === 'DELETE') {
    const idIndex = headers.indexOf('FILE_ID');
    const rows = sheet.getDataRange().getValues();
    let rowIndex = -1;
    
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][idIndex] === fileData.FILE_ID) {
        rowIndex = i + 1;
        break;
      }
    }
    
    if (rowIndex !== -1) {
      if (action === 'UPDATE') {
        const updatedRow = headers.map(h => {
          const val = fileData[h];
          return (typeof val === 'object') ? JSON.stringify(val) : val;
        });
        sheet.getRange(rowIndex, 1, 1, headers.length).setValues([updatedRow]);
      } else {
        sheet.deleteRow(rowIndex);
      }
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
