//editList-js.html functions
function userClickAddGuest(userInfo){

  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("BangBang");
  
  workSheet.appendRow([userInfo.fname,userInfo.lname,userInfo.ctype]);
  
  //Logger.log(name + "Your CLick is My Command");

}

function updateRecordById(recordInfo){

  //var recordInfo = {};
  //recordInfo.id = 4;
  //recordInfo.checkInState = false;
  
  
 var spreadSheet = SpreadsheetApp.openByUrl(url);
 var workSheet = spreadSheet.getSheetByName("Data");
 var ids = workSheet.getRange(2, 1,workSheet.getLastRow()-1,1).getValues().map(function(r){return r[0]});
 var positionInArray =  ids.indexOf(parseInt(recordInfo.id));
 var rowNumber = positionInArray === -1 ? 0 : positionInArray +2;
 var oldTimeData = workSheet.getRange(rowNumber,5).getValue();
  var checkInDate;
  if(recordInfo.checkInState){
  
   checkInDate = oldTimeData =="" ? new Date(): oldTimeData;
  } else {
  
  checkInDate = "";
  }
  var newTimeData = [checkInDate,recordInfo.checkInState];  
  workSheet.getRange(rowNumber,5,1,2).setValues([newTimeData]);
  return workSheet.getRange(rowNumber,5).getDisplayValue();
}

//fucntion that adds line
function userClick(userInfo){

  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Data");
  var ids = workSheet.getRange(2, 1,workSheet.getLastRow()-1,1).getValues().map(function(r){return r[0]});
  
  //find the max id from this list
  var maxID = Math.max.apply(null,ids);
  var newID = maxID+1;

  workSheet.appendRow([newID,userInfo.fname,userInfo.lname,userInfo.ctype]);
  
  //Logger.log(name + "Your CLick is My Command");

}

function getCost(zipCode){

     var spreadSheet = SpreadsheetApp.openByUrl(url);
     var workSheet = spreadSheet.getSheetByName("Estimate");
     var data = workSheet.getRange(1,1, workSheet.getLastRow(), 2).getValues();
  
     var zipCodesList = data.map(function(r){return r[0]; });
     var costList = data.map(function(r){return r[1]; });
     var position = zipCodesList.indexOf(zipCode);
  
     if(position > -1) {
     return '$' + costList[position].toFixed(2);
      } else{
         return 'unavailable';  
     }  
}

function getCalendarBusyDays() {
    var startDate = new Date();
    var endDate = new Date(new Date().setYear(startDate.getFullYear()+1));
    var calendar = CalendarApp.getCalendarsByName("stephen@mylifeeveryday.com")[0];
    var events = calendar.getEvents(startDate,endDate);
    var days = events.map(function(e){return e.getStartTime().setHours(0,0,0,0); });
  
    var uniqueDays = [];
   
  days.forEach(function(d){
    if(uniqueDays.indexOf(d) === -1){
       uniqueDays.push(d);  
    }           
  });
 return uniqueDays;
}

function getWords() {
   var ss = SpreadsheetApp.openByUrl(url);
   var ws = ss.getSheetByName("Venue");
   var data = ws.getRange(1,1, ws.getLastRow(), 1).getValues();

   var options = {};
  data.forEach(function(v){
  
  options[v[0]] = null;
  
  
  }); 
   return options;  
}

//table-js.html functions
function formatMySpreadsheet(id) {
  // Set the background of the row to yellow where id (firstname + last name) = id 
  Logger.log(id);
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Data");
  
  //var selectedData = ws.getCurrentCell().getValue();
  var selectedData = ws.getRange(2,1).getValue();
  Logger.log(selectedData);
  if (selectedData === id) {
  //selectedData.setBackground("Yellow");
    ws.getRange(2,1,2,5).setBackground("Yellow").setFontStyle(null).setFontWeight(null).setFontSize('10').setFontColor('Red');
  } else { 
    ws.getRange(2,1,2,5).setBackground("blue").setFontStyle("italic").setFontWeight('Bold').setFontSize('18');
   }
  //return data;
                                                
}

function getTableData() {

     var ss = SpreadsheetApp.openByUrl(url);
     var ws = ss.getSheetByName("Data");
     var data = ws.getRange(2,1, ws.getLastRow() -1, 6).getDisplayValues();
     Logger.log("data : " + data);
     return data;
}

function getBBTableData() {

     var ss = SpreadsheetApp.openByUrl(url);
     var ws = ss.getSheetByName("BangBang");
     var data = ws.getRange(2,1, ws.getLastRow() -1, 4).getValues();
     Logger.log(data);
     return data;
}

function loadHome() {
  var spreadSheet = SpreadsheetApp.openByUrl(url);
 // var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var sheets = spreadSheet.getSheets();
  var holderArray = [];
  for(var i=0; i< sheets.length; i++){
  var sheetName = sheets[i].getName();
    holderArray.push(sheetName);
  }
  Logger.log(sheets);
  Logger.log(holderArray);
  var sheetArray = holderArray.map(function(s){return '<option>' + s[0] + '</option>'; }).join(''); 
   Logger.log(sheetArray);
  return render("home", {sheets: sheetArray});
}

