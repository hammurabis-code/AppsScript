var FormsData = {};
FormsData.SheetId = "1ynM6BPoDw9r559sDRunJmCLzuOMo6JHE7pc58VCTYcM";
FormsData.FormId = "1ehF2LJ7y4g4j2S9sF4a3SQaeicOsjLjeAkRNj31DJ_I";
FormsData.JobNumberQuestionId = 1476579537;
FormsData.DateQuestionId = 913231628;

function GetSheetData(userEmail) {
  Logger.log(userEmail);
  var jobCodeColumn = 2; // ID of the selected column
  var sheet = SpreadsheetApp.openById(FormsData.SheetId);
  var range = sheet.getDataRange();
  var values = range.getValues();
  var arrayOfJobs = [];
  Logger.log(values);
  Logger.log(values[1]);
  var row =[];
  row.push(values[1]);
  Logger.log(row[0][0]);
  Logger.log(row[0][1]);
  for (var i = 1; i < values.length; i++) {
    if (values[i][0] == userEmail) {
      arrayOfJobs.push(values[i][1]);
    }
  }
  Logger.log("Array of Jobs");
  Logger.log(arrayOfJobs);
  return arrayOfJobs;
}

function GetFormUrl(userEmail){
  var arrayOfJobs = GetSheetData(userEmail);
  Logger.log(arrayOfJobs);
  var existingForm = FormApp.openById(FormsData.FormId);
  var jobNumberQuestion = existingForm.getItemById(FormsData.JobNumberQuestionId);
  jobNumberQuestion.asListItem().setChoiceValues(arrayOfJobs);
  //for (var i = 0; i < arrayOfJobs.length; i++) {
  //  jobNumberQuestion.asListItem().setChoiceValues(choice) //.createChoice(arrayOfJobs[i]);  
  //}
  var dateQuestion = existingForm.getItemById(FormsData.DateQuestionId);
  //var date = Utilities.formatDate(new Date(), "GMT-4", "yyyy-MM-dd");
  dateQuestion.asDateItem().createResponse(new Date());
  return existingForm.getPublishedUrl();
}

function doGet(e) {
  Logger.log(e.parameters);
  var params = JSON.parse(JSON.stringify(e.parameters));
  Logger.log(params.parameter);
  var url = GetFormUrl(params.userEmail);
  return  ContentService.createTextOutput(url);
      //.setSandboxMode(HtmlService.SandboxMode.IFRAME);
}