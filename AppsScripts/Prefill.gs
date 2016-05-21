var FormsData = {};
FormsData.SheetId = "1i9_gQT2t-o3vSwOa1CO5b5DpYYmYUMyC0REEwumHPKE";
FormsData.FormId = "1ehF2LJ7y4g4j2S9sF4a3SQaeicOsjLjeAkRNj31DJ_I";
FormsData.JobNumberQuestionId = 1476579537;
FormsData.DateQuestionId = 913231628;

function GetSheetData(userEmail) {
  var jobCodeColumn = 2; // ID of the selected column
  var sheet = SpreadsheetApp.openById(FormsData.SheetId);
  var range = sheet.getDataRange();
  var values = range.getValues();
  var arrayOfJobs = [];
  
  for (var i = 0; i < values.length; i++) {
   for (var j = 0; j < values[i].length; j++) {
     if (values[i][j]) {
       if (values[i] == userEmail){
         arrayOfJobs.push(values[j]);
       }
     }
   }
 }
 return arrayOfJobs;
}

function GetPrefilledFormUrl(userEmail){
  var arrayOfJobs = GetSheetData(userEmail);
  var existingForm = FormApp.openById(FormsData.FormId);
  var jobNumberQuestion = existingForm.getItemById(FormsData.JobNumberQuestionId);
  jobNumberQuestion.asListItem().setChoices(arrayOfJobs);
  var dateQuestion = existingForm.getItemById(FormsData.DateQuestionId);
  ItemResponse 
  dateQuestion.asDateItem().createResponse(response)
}