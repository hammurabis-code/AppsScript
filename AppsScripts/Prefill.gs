function assignEditUrls() {
  var jobCodeColumn = 2; // ID of the selected column
  var sheet = SpreadsheetApp.openById("10wmPXLCDW-3VHNDQzbOjyvW8I8FV85ApRrnBkZUgyUY");
  var first = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues(); 
  var lr = rows.getLastRow(); 
  var docId = sheet.getRange(2, jobCodeColumn,lr,1).getValues(); //gets the data from the last row in selected column
}