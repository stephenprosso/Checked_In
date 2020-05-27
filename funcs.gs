//1.//change "Copy of Data back to Data" updateRecordById, userClick, getTableData
//**** ListDetail-js.html function  ****//
function updateRecordById(recordInfo){
   //test data
  //var recordInfo = {};
  //recordInfo.id = 4;
  //recordInfo.checkInState = false;
  
  
 var spreadSheet = SpreadsheetApp.openByUrl(url);
 var workSheet = spreadSheet.getSheetByName("Copy of Data");
 var ids = workSheet.getRange(2, 1,workSheet.getLastRow()-1,1).getValues().map(function(r){return r[0]});
 var positionInArray =  ids.indexOf(parseInt(recordInfo.id));
 var rowNumber = positionInArray === -1 ? 0 : positionInArray +2;
 //2.//old time data is 5 and will need to be moved to 6
  var oldTimeData = workSheet.getRange(rowNumber,6).getValue();
  //old line//var oldTimeData = workSheet.getRange(rowNumber,5).getValue();
 
  var checkInDate;
  if(recordInfo.checkInState){
  
   checkInDate = oldTimeData =="" ? new Date(): oldTimeData;
  } else {
  
  checkInDate = "";
  }
  var newTimeData = [checkInDate,recordInfo.checkInState];  
  //3.//old time data is 5 and will need to be changed to 6
  workSheet.getRange(rowNumber,6,1,2).setValues([newTimeData]);
   //OLD LINE//workSheet.getRange(rowNumber,5,1,2).setValues([newTimeData]);
 
  // on 5/19/20 I missed this change to return the correct column for the time data
  return workSheet.getRange(rowNumber,6,1,2).getDisplayValues()[0];
 //OLD LINE//return workSheet.getRange(rowNumber,5,1,2).getDisplayValues()[0];
  
}

//**** AddGuest-js.html functions ****//
//fucntion that adds line and data to the *"COPY OF DATA"* file for a guest list
//the max will increase the number are using for an ID.
function userClick(userInfo){

  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Copy of Data");
  var ids = workSheet.getRange(2, 1,workSheet.getLastRow()-1,1).getValues().map(function(r){return r[0]});
  
  //find the max id from this list
  var maxID = Math.max.apply(null,ids);
  var newID = maxID+1;

  workSheet.appendRow([newID, userInfo.fname, userInfo.lname, userInfo.ctype, userInfo.org, userInfo.checkinDate, userInfo.checkBox, userInfo.eventID]);

  
  //Logger.log(name + "Your CLick is My Command");

}
//**** LIST DETAIL JS FUNCTION ****//
function getTableData(ev) {

     var ss = SpreadsheetApp.openByUrl(url);
     var ws = ss.getSheetByName("Copy of Data");
     //4.//the get range is 7 and will need to be changed to 8 to the 8th column that was added
     //remember that the range starts at column 1 not 0
     var data = ws.getRange(2,1, ws.getLastRow() -1, 8).getDisplayValues();

     //5. //var data = ws.getRange(2,1, ws.getLastRow() -1, 7).getDisplayValues();
    data = data.filter(function(r){
    //6. //in this filter function we need the  column in javascript which starts at 0
    //6. //the 6 needs to be changed to a 7
    return r[7] == ev;
     //old line//return r[6] == ev;
  
  });
     Logger.log("data : " + data);
     return data;
}

//**** LIST DETAIL JS FUNCTION ****//
function getTableTitle(ev) {

  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Event");
  var data = ws.getRange(2,1, ws.getLastRow() - 1,4).getValues();  
  var gridTitleArray = data.filter(function(r){return r[0] == ev;}).map(function(r){return r[2] + " @ " + r[1] + " - " + r[3]});
  
  
  Logger.log(gridTitleArray);
  return gridTitleArray;
   
}

//**** AddEvent-js.html function ****//
function userClickAddEvent(userInfo){

  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Event");
  var ids = workSheet.getRange(2, 1,workSheet.getLastRow()-1,1).getValues().map(function(r){return r[0]});
  
  //find the max id from this list
  var maxID = Math.max.apply(null,ids);
  var newID = maxID+1;

  workSheet.appendRow([newID,userInfo.vname,userInfo.ename,userInfo.sdate]);
  

}

//**** Dashboard-js.html functions ****//
function getEventTableData() {
  
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Event");
  var data = ws.getRange(2,1,ws.getLastRow()-1,4).getDisplayValues();
  Logger.log(data);
  return data;

}


function getEditList(ev) {

     var ss = SpreadsheetApp.openByUrl(url);
     var ws = ss.getSheetByName("Copy of Data");
     //4.//the get range is 7 and will need to be changed to 8 to the 8th column that was added
     //remember that the range starts at column 1 not 0
     var data = ws.getRange(2,1, ws.getLastRow() -1, 8).getDisplayValues();

     //5. //var data = ws.getRange(2,1, ws.getLastRow() -1, 7).getDisplayValues();
    data = data.filter(function(r){
    //6. //in this filter function we need the  column in javascript which starts at 0
    //6. //the 6 needs to be changed to a 7
    return r[7] == ev;
     //old line//return r[6] == ev;
  
  });
     Logger.log("data : " + data);
     return data;
}

//**FUNCTIONS NOT IN USE GO BELOW THIS LINE**//
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

